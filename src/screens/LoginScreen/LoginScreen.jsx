import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import Header from '../../components/Header/Header';
import styles from './LoginScreen.module.css';
import { supabase } from '../../lib/supabaseClient';

// Popular email providers for typo checking
const POPULAR_DOMAINS = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com'];

// Helper function to calculate Levenshtein distance
function getLevenshteinDistance(a, b) {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

const LoginScreen = ({ isDarkMode, toggleTheme }) => {
  const location = useLocation();
  const { t, language } = useLanguage();
  
  // Parse URL to see if it's citizen or mp
  const searchParams = new URLSearchParams(location.search);
  const initialType = searchParams.get('type') === 'mp' ? 'mp' : 'citizen';
  
  const [activeTab, setActiveTab] = useState(initialType);
  
  // Authentication State
  const [authStep, setAuthStep] = useState('login'); // 'login' | 'signup' | 'otp' | 'forgot_password'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '', '', '']); // 8-digit OTP
  
  const [authError, setAuthError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailSuggestion, setEmailSuggestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastCheck, setLastCheck] = useState({ email: '', tab: '' });

  // Email format, typo checker & auto-switching database check
  useEffect(() => {
    if (!email) {
      setEmailError('');
      setEmailSuggestion('');
      if (lastCheck.email !== '' || lastCheck.tab !== '') {
        setLastCheck({ email: '', tab: '' });
      }
      return;
    }

    const timer = setTimeout(async () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        if (email.length >= 3) {
          setEmailError('Please enter a valid email address (e.g., you@example.com).');
        } else {
          setEmailError('');
        }
        setEmailSuggestion('');
        return;
      } else {
        setEmailError('');
      }

      // Check typos
      const parts = email.split('@');
      if (parts.length === 2) {
        const username = parts[0];
        const domain = parts[1].toLowerCase();
        
        if (!POPULAR_DOMAINS.includes(domain)) {
          let closestDomain = null;
          let minDistance = 3;

          for (const popDomain of POPULAR_DOMAINS) {
              const distance = getLevenshteinDistance(domain, popDomain);
              if (distance < minDistance) {
                  minDistance = distance;
                  closestDomain = popDomain;
              }
          }

          if (closestDomain) {
              setEmailSuggestion(`${username}@${closestDomain}`);
              return; // Wait for correction
          } else {
              setEmailSuggestion('');
          }
        } else {
          setEmailSuggestion('');
        }
      }

      // Skip database check if we are in OTP or Forgot Password step, or if email/tab hasn't changed since last check
      if (authStep === 'otp' || authStep === 'forgot_password' || (email === lastCheck.email && activeTab === lastCheck.tab)) {
        return;
      }

      try {
        const { data: roleData } = await supabase.rpc('get_user_role_by_email', { p_email: email });
        const userExists = roleData && roleData[0] && roleData[0].user_exists;
        const userRole = roleData && roleData[0] ? roleData[0].user_role : null;
        const expectedRole = activeTab === 'citizen' ? 'Citizen' : 'MP';

        setLastCheck({ email, tab: activeTab });

        if (userExists) {
          if (userRole !== expectedRole) {
            setEmailError(`This email is registered as ${userRole}. Please switch tabs.`);
          } else {
            setAuthStep('login');
          }
        } else {
          setAuthStep('signup');
        }
      } catch (err) {
        console.error('Error checking user role:', err);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [email, activeTab, authStep, lastCheck]);

  // Focus management for OTP
  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling && element.value !== '') {
      element.nextSibling.focus();
    }
  };

  const handleOtpKeyDown = (e) => {
    if (e.key === 'Backspace' && e.target.value === '' && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  // Switch tabs reset state
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setAuthStep('login');
    setAuthError('');
    setEmailError('');
    setEmailSuggestion('');
    setEmail('');
    setPassword('');
    setFullName('');
    setOtp(['', '', '', '', '', '', '', '']);
  };

  const toggleAuthMode = () => {
    setAuthStep(authStep === 'signup' ? 'login' : 'signup');
    setAuthError('');
    setEmailError('');
    setEmailSuggestion('');
    // Intentionally keep email to allow autofill when switching
    setPassword('');
    setFullName('');
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    if (!email || emailError) return;
    
    setIsLoading(true);
    setAuthError('');
    
    try {
      const expectedRole = activeTab === 'citizen' ? 'Citizen' : 'MP';
      
      // Check if user exists via RPC
      const { data: roleData } = await supabase.rpc('get_user_role_by_email', { p_email: email });
      const userExists = roleData && roleData[0] && roleData[0].user_exists;
      const userRole = roleData && roleData[0] ? roleData[0].user_role : null;
      
      if (authStep === 'signup') {
        if (userExists) {
            setAuthError('An account with this email already exists.');
            setIsLoading(false);
            return;
        }
        if (!fullName || !password) {
            throw new Error('Please fill in all required fields.');
        }
        
        // Sign up
        const { error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            data: {
              full_name: fullName,
              role: expectedRole
            }
          }
        });
        if (error) throw error;
        
        setAuthStep('otp');
      } else if (authStep === 'login') {
        if (!password) throw new Error('Password is required.');
        if (userExists && userRole !== expectedRole) {
          throw new Error(`Member of Parliament can't login as citizen and vice versa. Your registered role is ${userRole}.`);
        }
        
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        
        // Check onboarding status
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: citizenData } = await supabase
            .from('citizens')
            .select('id, phone_number')
            .eq('id', user.id)
            .maybeSingle();

          const { data: mpData } = await supabase
            .from('mps')
            .select('id, official_phone')
            .eq('id', user.id)
            .maybeSingle();

          if (citizenData && citizenData.phone_number) {
            window.location.href = '/dashboard';
          } else if (mpData && mpData.official_phone) {
            window.location.href = '/dashboard';
          } else {
            window.location.href = `/form?type=${activeTab}`;
          }
        } else {
          window.location.href = `/form?type=${activeTab}`;
        }
      } else if (authStep === 'forgot_password') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        setAuthError('Password reset link sent to your email.');
      }
    } catch (err) {
      console.error('Auth Error:', err);
      let errorMessage = '';
      if (err.message && err.message.includes('{}')) {
        errorMessage = 'Server error: Unable to send confirmation email. If you are on the free tier, you may have hit the 3 emails/hour limit. Please try again later or use Google Sign-In.';
      } else if (err.message) {
        errorMessage = err.message;
      } else {
        errorMessage = 'An unexpected authentication error occurred.';
      }
      setAuthError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Submit OTP
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const token = otp.join('');
    if (token.length !== 8) {
      setAuthError('Please enter all 8 digits of the verification code.');
      return;
    }
    
    setIsLoading(true);
    setAuthError('');
    
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'signup'
      });
      if (error) throw error;

      const user = data.user;
      if (user) {
        // Parse name components
        const parts = fullName.trim().split(/\s+/);
        let first_name = '';
        let middle_name = null;
        let last_name = '';

        if (parts.length === 1) {
          first_name = parts[0];
        } else if (parts.length === 2) {
          first_name = parts[0];
          last_name = parts[1];
        } else if (parts.length > 2) {
          first_name = parts[0];
          last_name = parts[parts.length - 1];
          middle_name = parts.slice(1, -1).join(' ');
        }

        const tableName = activeTab === 'citizen' ? 'citizens' : 'mps';
        
        // Upsert baseline record
        const { error: dbError } = await supabase.from(tableName).upsert({
          id: user.id,
          first_name,
          middle_name,
          last_name,
          email: email
        });

        if (dbError) {
          console.error("Baseline DB insert failed:", dbError);
        }
      }
      
      // Success! Redirect to form based on activeTab
      window.location.href = `/form?type=${activeTab}`;
    } catch (err) {
      setAuthError(err.message || 'Invalid verification code.');
    } finally {
      setIsLoading(false);
    }
  };

  // Google OAuth Sign-In
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setAuthError('');
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/onboarding-basic`
        }
      });
      if (error) throw error;
    } catch (err) {
      setAuthError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginScreen}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <div className={styles.loginContainer}>
        {/* Left Pane - Context & Mock UI */}
        <div className={styles.leftPane}>
          
          {activeTab === 'citizen' ? (
            <>
              <div className={styles.topBadge}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                {t('aiCivicCopilot')}
              </div>
              
              <h1>{t('citizenLeftHeadline')}</h1>
              <p>{t('citizenLeftSubtitle')}</p>
              
              <div className={styles.mockUiPanel}>
                <div className={styles.mockHeader}>
                  <div className={styles.mockTitle}>
                    <div className={styles.dot}></div>
                    {t('liveComplaintTracking')}
                  </div>
                  <div className={styles.mockScoreBadge}>
                    <span>{t('resolutionEta')}</span>
                    <strong>{t('twoDays')}</strong>
                  </div>
                </div>

                <div className={styles.mockBody}>
                  <div className={styles.mockLabel}>{t('issueReported')}</div>
                  <div className={styles.mockText}>{t('sampleIssue')}</div>
                </div>

                <div className={styles.mockResponse}>
                  <div className={styles.mockLabel}>{t('aiAssistant')}</div>
                  <div className={styles.mockText}>{t('sampleResponse')}</div>
                  <div className={styles.audioWave}>
                    <span></span><span></span><span></span><span></span><span></span>
                  </div>
                </div>
              </div>

              <div className={styles.featurePills}>
                <div className={styles.pill}>
                  <svg className={styles.pillIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  {t('instantTracking')}
                </div>
                <div className={styles.pill}>
                  <svg className={styles.pillIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                  {t('voiceInteractive')}
                </div>
                <div className={styles.pill}>
                  <svg className={styles.pillIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                  {t('civicLeaderboard')}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={styles.topBadge}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                </svg>
                {t('aiConstituencyPulse')}
              </div>
              
              <h1>{t('mpLeftHeadline')}</h1>
              <p>{t('mpLeftSubtitle')}</p>
              
              <div className={styles.mockUiPanel}>
                <div className={styles.mockHeader}>
                  <div className={styles.mockTitle}>
                    <div className={styles.dot}></div>
                    {t('priorityAreaAnalysis')}
                  </div>
                  <div className={styles.mockScoreBadge}>
                    <span>{t('urgencyLevel')}</span>
                    <strong>{t('ninetyEightPercent')}</strong>
                  </div>
                </div>

                <div className={styles.matchRow}>
                  {t('sampleMpRow1')}
                </div>
                <div className={styles.matchRow}>
                  <span className={styles.greenText}>{t('sampleMpRow2')}</span>
                </div>
                <div className={styles.matchRow}>
                  {t('sampleMpRow3')}
                </div>

                <div className={styles.floatingBadge}>
                  <svg color="#eab308" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                  <div style={{display: 'flex', flexDirection: 'column'}}>
                    <span style={{fontSize: '0.65rem', color: '#64748b', fontWeight: 600}}>{t('aiActionRecommendation')}</span>
                    <span style={{fontSize: '0.85rem', color: '#0f172a', fontWeight: 700}}>{t('dispatchTeam')}</span>
                  </div>
                </div>
              </div>

              <div className={styles.featurePills} style={{marginTop: '32px'}}>
                <div className={styles.pill}>
                  <svg className={styles.pillIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                  {t('grievanceAnalytics')}
                </div>
                <div className={styles.pill}>
                  <svg className={styles.pillIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  {t('publicSentiment')}
                </div>
                <div className={styles.pill}>
                  <svg className={styles.pillIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                  {t('criticalAlerts')}
                </div>
              </div>
            </>
          )}

        </div>

        {/* Right Pane - Form Card */}
        <div className={styles.rightPane}>
          <div className={styles.formCard}>
            
            {authStep !== 'otp' && (
              <>
                <div className={styles.formHeader}>
                  <h2>
                    {language === 'en' ? (
                      <>{authStep === 'signup' ? 'Create an' : (authStep === 'forgot_password' ? 'Reset' : 'Welcome to')} <span>{authStep === 'signup' ? 'Account' : (authStep === 'forgot_password' ? 'Password' : 'LokSetu')}</span></>
                    ) : (
                      <><span>लोकसेतु</span> {authStep === 'signup' ? 'पर खाता बनाएं' : (authStep === 'forgot_password' ? 'पासवर्ड रीसेट करें' : 'में आपका स्वागत है')}</>
                    )}
                  </h2>
                  <p>{activeTab === 'citizen' ? t('citizenFormDesc') : t('mpFormDesc')}</p>
                </div>

                {(authStep === 'login' || authStep === 'signup') && (
                  <div className={styles.tabs}>
                    <button 
                      className={`${styles.tab} ${activeTab === 'citizen' ? styles.active : ''}`}
                      onClick={() => handleTabSwitch('citizen')}
                    >
                      <svg className={styles.tabIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <span>{t('citizenTab')}</span>
                    </button>
                    <button 
                      className={`${styles.tab} ${activeTab === 'mp' ? styles.active : ''}`}
                      onClick={() => handleTabSwitch('mp')}
                    >
                      <svg className={styles.tabIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      <span>{t('mpTab')}</span>
                    </button>
                  </div>
                )}
              </>
            )}

            {authError && (
              <div className={styles.alertBox}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{flexShrink: 0}}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start'}}>
                  <span>{authError}</span>
                  {authError.includes('already exists') && (
                    <button 
                      type="button"
                      onClick={() => { setAuthStep('login'); setPassword(''); setAuthError(''); }}
                      style={{background: 'none', border: 'none', color: 'inherit', textDecoration: 'underline', fontWeight: 'bold', cursor: 'pointer', padding: 0}}
                    >
                      Go to Login
                    </button>
                  )}
                </div>
              </div>
            )}

            {authStep !== 'otp' ? (
              <form onSubmit={handleAuthSubmit} className={styles.fadeIn}>
                {authStep === 'signup' && (
                  <div className={styles.formGroup}>
                    <label>Full Name</label>
                    <div className={styles.inputWrapper}>
                      <svg className={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                      <input 
                        type="text" 
                        className={styles.formInput} 
                        placeholder="Enter your full name" 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}

                <div className={styles.formGroup}>
                  <label>{t('emailAddress') || 'Email Address'}</label>
                  <div className={styles.inputWrapper}>
                    <svg className={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    <input 
                      type="email" 
                      className={`${styles.formInput} ${emailError ? styles.inputError : ''}`} 
                      placeholder={t('emailPlaceholder') || 'Enter your email'} 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  {emailError && <div className={styles.fieldError}>{emailError}</div>}
                  {emailSuggestion && (
                    <div className={styles.emailSuggestion}>
                      Did you mean <button type="button" onClick={() => { setEmail(emailSuggestion); setEmailSuggestion(''); setEmailError(''); }}>{emailSuggestion}</button>?
                    </div>
                  )}
                </div>

                {authStep !== 'forgot_password' && (
                  <div className={styles.formGroup}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                      <label>Password</label>
                      {authStep === 'login' && (
                        <button type="button" onClick={() => setAuthStep('forgot_password')} className={styles.forgotBtn}>
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className={styles.inputWrapper}>
                      <svg className={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                      <input 
                        type="password" 
                        className={styles.formInput} 
                        placeholder="Enter your password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                    </div>
                  </div>
                )}

                <button type="submit" className={styles.submitBtn} disabled={isLoading}>
                  {isLoading ? 
                    (authStep === 'signup' ? 'Signing Up...' : (authStep === 'login' ? 'Signing In...' : 'Sending...')) : 
                    (authStep === 'signup' ? 'Sign Up' : (authStep === 'login' ? (t('continueBtn') || 'Sign In') : 'Send Reset Link'))
                  }
                </button>
                
                {authStep === 'forgot_password' ? (
                  <div className={styles.switchAuthText}>
                    Remember your password?
                    <button type="button" className={styles.switchAuthBtn} onClick={() => setAuthStep('login')} disabled={isLoading}>
                      Back to Login
                    </button>
                  </div>
                ) : (
                  <div className={styles.switchAuthText}>
                    {authStep === 'signup' ? 'Already have an account?' : "Don't have an account?"}
                    <button type="button" className={styles.switchAuthBtn} onClick={toggleAuthMode} disabled={isLoading}>
                      {authStep === 'signup' ? 'Sign In' : 'Sign Up'}
                    </button>
                  </div>
                )}
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit} className={styles.fadeIn}>
                <div className={styles.otpHeader}>
                  <div className={styles.otpEnvelope}>✉️</div>
                  <h3>Verify Your Account</h3>
                  <p>We sent an 8-digit code to <strong>{email}</strong></p>
                </div>
                
                <div className={styles.otpContainer}>
                  {otp.map((data, index) => (
                    <input
                      className={styles.otpField}
                      type="text"
                      name="otp"
                      maxLength="1"
                      key={index}
                      value={data}
                      onChange={e => handleOtpChange(e.target, index)}
                      onKeyDown={e => handleOtpKeyDown(e, index)}
                      onFocus={e => e.target.select()}
                      required
                      autoComplete="off"
                    />
                  ))}
                </div>

                <button type="submit" className={styles.submitBtn} disabled={isLoading}>
                  {isLoading ? 'Verifying...' : 'Verify & Sign In'}
                </button>
                <button 
                  type="button" 
                  className={styles.secondaryBtn} 
                  onClick={() => { setAuthStep('login'); setOtp(['','','','','','','','']); }}
                  disabled={isLoading}
                >
                  Back to Login
                </button>
              </form>
            )}

            {authStep === 'login' && (
              <>
                <div className={styles.divider}>{t('orText') || 'or'}</div>

                <button 
                  type="button" 
                  className={styles.googleBtn} 
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  {t('googleBtnText') || 'Continue with Google'}
                </button>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
