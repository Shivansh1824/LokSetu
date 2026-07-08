import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';

const Header = ({ isDarkMode, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);

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
          <svg className={styles.logoIcon} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 22v-4a9 9 0 0 1 18 0v4" stroke="var(--primary-color)"/>
            <path d="M8 11v6" stroke="currentColor"/>
            <path d="M16 11v6" stroke="currentColor"/>
            <circle cx="12" cy="7" r="3" stroke="var(--accent-green)" fill="var(--accent-green-bg)"/>
          </svg>
          LokSetu
        </a>
        
        <nav className={styles.nav}>
          <a href="#how-it-works" className={styles.navLink}>How it Works</a>
          <a href="#features" className={styles.navLink}>Features</a>
          <a href="#impact" className={styles.navLink}>Public Grievances</a>
          <a href="#faq" className={styles.navLink}>FAQ</a>
        </nav>

        <div className={styles.actions}>
          <a href="/mp/login" className="btn btn-secondary btn-sm">MP Login</a>
          <a href="/citizen/report" className="btn btn-citizen btn-sm">Report an Issue</a>
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
