import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import styles from './Footer.module.css';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        <div className={styles.footerBrand}>
          <a href="/" className={styles.logo}>
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="footer-gov-shield-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="var(--primary-color)" />
                  <stop offset="100%" stopColor="#0a4687" />
                </linearGradient>
                <filter id="footer-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Solid Shield Background */}
              <path d="M12 2L3 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-9-4z" fill="url(#footer-gov-shield-grad)" />
              
              {/* Stylized Arch/Bridge inside the shield */}
              <path d="M7 16V12.5C7 9.73858 9.23858 7.5 12 7.5C14.7614 7.5 17 9.73858 17 12.5V16" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
              
              {/* Bridge Deck / Connecting Line */}
              <path d="M5.5 14H18.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
              
              {/* Central glowing element representing "Lok" (People/AI Core) */}
              <circle cx="12" cy="11.5" r="2.2" fill="#00FF87" filter="url(#footer-glow)" />
            </svg>
            Lok<span className={styles.logoAccent}>Setu</span>
          </a>
          <p className={styles.brandDesc}>
            {t('tagline')}
          </p>
        </div>
        
        <div className={styles.footerLinks}>
          <h4>{t('platform')}</h4>
          <ul>
            <li><a href="#how-it-works">{t('howItWorks')}</a></li>
            <li><a href="#features">{t('features')}</a></li>
            <li><a href="#impact">{t('trackComplaints')}</a></li>
            <li><a href="#faq">{t('faq')}</a></li>
          </ul>
        </div>
        
        <div className={styles.footerLinks}>
          <h4>Resources</h4>
          <ul>
            <li><a href="#help">Help Center</a></li>
            <li><a href="#docs">Documentation</a></li>
            <li><a href="#api">Open API</a></li>
            <li><a href="#guidelines">Brand Guidelines</a></li>
          </ul>
        </div>
        
        <div className={styles.footerLinks}>
          <h4>Legal</h4>
          <ul>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
            <li><a href="#accessibility">Accessibility</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>
      </div>
      
      <div className={`container ${styles.footerBottom}`}>
        <p>{t('copyright')}</p>
        <div className={styles.socials}>
          <a href="#twitter" className={styles.socialIcon} aria-label="Twitter">
             <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
          </a>
          <a href="#github" className={styles.socialIcon} aria-label="GitHub">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
