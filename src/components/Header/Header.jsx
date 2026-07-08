import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import styles from './Header.module.css';

const Header = ({ isDarkMode, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerContainer}>
        <a href="/" className={styles.logo}>
          <svg className={styles.logoIcon} width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logo-bridge-grad" x1="4" y1="26" x2="28" y2="26" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="var(--primary-color)" />
                <stop offset="50%" stopColor="#00FF87" />
                <stop offset="100%" stopColor="var(--accent-color, #4facfe)" />
              </linearGradient>
              <radialGradient id="logo-glow" cx="16" cy="8" r="6" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#00FF87" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#00FF87" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Inner loop representing dynamic feedback */}
            <path d="M 8,24 C 8,16 12,12 16,12 C 20,12 24,16 24,24" stroke="var(--text-secondary)" strokeWidth="1.5" strokeDasharray="3 3" strokeLinecap="round" opacity="0.45" />

            {/* Primary bridge arch */}
            <path d="M 4,26 C 4,14 10,8 16,8 C 22,8 28,14 28,26" stroke="url(#logo-bridge-grad)" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* AI center glow */}
            <circle cx="16" cy="8" r="6" fill="url(#logo-glow)" />

            {/* Citizen Node */}
            <circle cx="4" cy="26" r="3.5" fill="var(--primary-color)" stroke="var(--bg-glass)" strokeWidth="1" />
            
            {/* MP/Representative Node */}
            <circle cx="28" cy="26" r="3.5" fill="var(--accent-color, #4facfe)" stroke="var(--bg-glass)" strokeWidth="1" />
            
            {/* Central Coordination AI Node */}
            <circle cx="16" cy="8" r="3" fill="#00FF87" stroke="var(--bg-glass)" strokeWidth="1" />
          </svg>
          LokSetu
        </a>
        
        <nav className={styles.nav}>
          <a href="#how-it-works" className={styles.navLink}>{t('howItWorks')}</a>
          <a href="#features" className={styles.navLink}>{t('features')}</a>
          <a href="#impact" className={styles.navLink}>{t('trackComplaints')}</a>
          <a href="#faq" className={styles.navLink}>{t('faq')}</a>
        </nav>

        <div className={styles.actions}>
          <a href="/mp/login" className="btn btn-secondary btn-sm">{t('mpLogin')}</a>
          <a href="/citizen/report" className="btn btn-citizen btn-sm">{t('fileComplaint')}</a>
          
          <button onClick={toggleLanguage} className={styles.langToggle} aria-label="Toggle Language">
            {language === 'en' ? 'हिन्दी' : 'EN'}
          </button>

          <button onClick={toggleTheme} className={styles.themeToggle} aria-label="Toggle Dark Mode">
            {isDarkMode ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
