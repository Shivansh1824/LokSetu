import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import Header from '../../components/Header/Header';
import styles from './LoginScreen.module.css';

const LoginScreen = ({ isDarkMode, toggleTheme }) => {
  const location = useLocation();
  const { t, language } = useLanguage();
  
  // Parse URL to see if it's citizen or mp
  const searchParams = new URLSearchParams(location.search);
  const initialType = searchParams.get('type') === 'mp' ? 'mp' : 'citizen';
  
  const [activeTab, setActiveTab] = useState(initialType);

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
            
            <div className={styles.formHeader}>
              <h2>
                {language === 'en' ? (
                  <>Welcome to <span>LokSetu</span></>
                ) : (
                  <><span>लोकसेतु</span> में आपका स्वागत है</>
                )}
              </h2>
              <p>{activeTab === 'citizen' ? t('citizenFormDesc') : t('mpFormDesc')}</p>
            </div>

            <div className={styles.tabs}>
              <button 
                className={`${styles.tab} ${activeTab === 'citizen' ? styles.active : ''}`}
                onClick={() => setActiveTab('citizen')}
              >
                <svg className={styles.tabIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>{t('citizenTab')}</span>
              </button>
              <button 
                className={`${styles.tab} ${activeTab === 'mp' ? styles.active : ''}`}
                onClick={() => setActiveTab('mp')}
              >
                <svg className={styles.tabIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>{t('mpTab')}</span>
              </button>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
              
              <div className={styles.formGroup}>
                <label>{t('emailAddress')}</label>
                <div className={styles.inputWrapper}>
                  <svg className={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  <input type="email" className={styles.formInput} placeholder={t('emailPlaceholder')} />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>{t('password')}</label>
                <div className={styles.inputWrapper}>
                  <svg className={styles.inputIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  <input type="password" className={styles.formInput} placeholder={t('passwordPlaceholder')} />
                </div>
              </div>

              <button type="submit" className={styles.submitBtn}>
                {t('continueBtn')}
              </button>
            </form>

            <div className={styles.divider}>{t('orText')}</div>

            <button className={styles.googleBtn}>
              <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {t('googleBtnText')}
            </button>

            <div className={styles.footerText}>
              {t('dontHaveAccount')} <a href="#">{t('signUp')}</a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
