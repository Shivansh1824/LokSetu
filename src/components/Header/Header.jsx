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
          <svg className={styles.logoIcon} width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gov-shield-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="var(--primary-color)" />
                <stop offset="100%" stopColor="#0a4687" /> {/* Deep authoritative blue */}
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Solid Shield Background */}
            <path d="M12 2L3 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-9-4z" fill="url(#gov-shield-grad)" />
            
            {/* Stylized Arch/Bridge inside the shield */}
            <path d="M7 16V12.5C7 9.73858 9.23858 7.5 12 7.5C14.7614 7.5 17 9.73858 17 12.5V16" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            
            {/* Bridge Deck / Connecting Line */}
            <path d="M5.5 14H18.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
            
            {/* Central glowing element representing "Lok" (People/AI Core) */}
            <circle cx="12" cy="11.5" r="2.2" fill="#00FF87" filter="url(#glow)" />
          </svg>
          <span className={styles.logoText}>Lok<span className={styles.logoAccent}>Setu</span></span>
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
