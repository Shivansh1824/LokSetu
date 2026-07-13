import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import Header from '../../components/Header/Header';
import styles from './BasicOnboardingScreen.module.css';
import { supabase } from '../../lib/supabaseClient';

const BasicOnboardingScreen = ({ isDarkMode, toggleTheme }) => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [role, setRole] = useState(''); // 'Citizen' | 'MP'
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) {
        navigate('/login');
        return;
      }
      setUser(authUser);
      
      // Check if user has completed basic onboarding (Form 1) and full onboarding (Form 2)
      const { data: citizenData } = await supabase
        .from('citizens')
        .select('id, phone_number')
        .eq('id', authUser.id)
        .maybeSingle();

      const { data: mpData } = await supabase
        .from('mps')
        .select('id, official_phone')
        .eq('id', authUser.id)
        .maybeSingle();
      
      if (citizenData) {
        if (citizenData.phone_number) {
          navigate('/dashboard'); // Fully onboarded, go to dashboard
        } else {
          navigate('/form?type=citizen'); // Basic onboarded but needs to fill Form 2
        }
        return;
      }

      if (mpData) {
        if (mpData.official_phone) {
          navigate('/dashboard'); // Fully onboarded, go to dashboard
        } else {
          navigate('/form?type=mp'); // Basic onboarded but needs to fill Form 2
        }
        return;
      }

      // Pre-fill name from Google metadata
      const googleName = authUser.user_metadata?.full_name || '';
      if (googleName) {
        setFullName(googleName);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleContinue = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!role) {
      setErrorMsg(language === 'en' ? 'Please select your role.' : 'कृपया अपनी भूमिका चुनें।');
      return;
    }

    if (!fullName || !age) {
      setErrorMsg(language === 'en' ? 'Please fill in all details.' : 'कृपया सभी विवरण भरें।');
      return;
    }

    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum) || ageNum <= 0) {
      setErrorMsg(language === 'en' ? 'Please enter a valid age.' : 'कृपया एक मान्य आयु दर्ज करें।');
      return;
    }

    if (role === 'MP' && ageNum < 25) {
      setErrorMsg(language === 'en' ? 'MPs must be at least 25 years old.' : 'सांसदों की आयु कम से कम 25 वर्ष होनी चाहिए।');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Update Profile role
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ role, full_name: fullName })
        .eq('id', user.id);

      if (profileError) throw profileError;

      // 2. Parse name components
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

      const tableName = role === 'Citizen' ? 'citizens' : 'mps';
      
      // 3. Upsert baseline record
      const { error: dbError } = await supabase.from(tableName).upsert({
        id: user.id,
        first_name,
        middle_name,
        last_name,
        email: user.email,
        age: ageNum
      });

      if (dbError) throw dbError;

      // 4. Navigate to FormScreen, passing the basic data in state
      navigate(`/form?type=${role.toLowerCase()}`, { 
        state: { 
          fullName, 
          age: ageNum 
        } 
      });

    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to process. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.screen}>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <div className={styles.container}>
        <div className={styles.card}>
          
          <div className={styles.header}>
            <h2>
              {language === 'en' ? <>Welcome to <span>LokSetu</span></> : <><span>लोकसेतु</span> में आपका स्वागत है</>}
            </h2>
            <p>
              {language === 'en' 
                ? 'Lets get started by setting up your basic profile.' 
                : 'आइए अपना बुनियादी प्रोफ़ाइल सेट करके शुरुआत करें।'}
            </p>
          </div>

          <form onSubmit={handleContinue}>
            
            {/* Role Selection */}
            <div className={styles.formGroup}>
              <label>{language === 'en' ? 'Select your role' : 'अपनी भूमिका चुनें'}</label>
              <div className={styles.roleGrid}>
                
                <div 
                  className={`${styles.roleCard} ${role === 'Citizen' ? styles.active : ''}`}
                  onClick={() => setRole('Citizen')}
                >
                  <div className={styles.roleIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  </div>
                  <span className={styles.roleTitle}>{language === 'en' ? 'Citizen' : 'नागरिक'}</span>
                </div>

                <div 
                  className={`${styles.roleCard} ${role === 'MP' ? styles.active : ''}`}
                  onClick={() => setRole('MP')}
                >
                  <div className={styles.roleIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  </div>
                  <span className={styles.roleTitle}>{language === 'en' ? 'Member of Parliament' : 'संसद सदस्य (MP)'}</span>
                </div>

              </div>
            </div>

            {errorMsg && (
              <div className={styles.formGroup} style={{ color: 'var(--accent-red)', fontSize: '0.9rem', textAlign: 'center' }}>
                {errorMsg}
              </div>
            )}

            {/* Full Name */}
            <div className={styles.formGroup}>
              <label>{language === 'en' ? 'Full Name' : 'पूरा नाम'}</label>
              <div className={styles.inputWrapper}>
                <svg className={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <input 
                  type="text" 
                  className={styles.formInput} 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={language === 'en' ? 'Enter your full name' : 'अपना पूरा नाम दर्ज करें'}
                  required
                />
              </div>
            </div>

            {/* Age */}
            <div className={styles.formGroup}>
              <label>{language === 'en' ? 'Age' : 'आयु'}</label>
              <div className={styles.inputWrapper}>
                <svg className={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                <input 
                  type="number" 
                  className={styles.formInput} 
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder={language === 'en' ? 'Enter your age' : 'अपनी आयु दर्ज करें'}
                  min="1"
                  max="120"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className={styles.btnSubmit}
              disabled={isLoading}
            >
              <span>
                {isLoading 
                  ? (language === 'en' ? 'Processing...' : 'प्रसंस्करण...') 
                  : (language === 'en' ? 'Continue' : 'जारी रखें')}
              </span>
              {!isLoading && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default BasicOnboardingScreen;
