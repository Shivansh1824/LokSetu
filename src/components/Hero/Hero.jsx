import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import styles from './Hero.module.css';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.hero}>
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <div className={styles.badgeGroup}>
            <span className={`${styles.badge} ${styles.badgePrimary}`}>Constituency OS</span>
            <span className={`${styles.badge} ${styles.badgeCitizen}`}>Citizen Portal</span>
          </div>
          
          <h1 className={styles.title}>
            {t('heroTitle')}
          </h1>
          
          <p className={styles.description}>
            {t('heroDesc')}
          </p>
          
          <div className={styles.actions}>
            <a href="/citizen/report" className="btn btn-citizen">{t('fileComplaint')}</a>
            <a href="/mp/dashboard" className="btn btn-primary">{t('openMpDashboard')}</a>
          </div>

          <div className={styles.features}>
            <div className={styles.featureItem}>
              <h4>{t('forCitizens')}</h4>
              <p>{t('forCitizensDesc')}</p>
            </div>
            <div className={styles.featureItem}>
              <h4>{t('forMps')}</h4>
              <p>{t('forMpsDesc')}</p>
            </div>
          </div>
        </div>
        
        <div className={styles.visual}>
          <div className={styles.imageWrapper}>
            <img 
              src="/dashboard_mockup.png" 
              alt="LokSetu MP Dashboard and Citizen App Interface" 
              className={styles.heroImage}
            />
          </div>
          
          <div className={styles.statusCard}>
            <div className={styles.statusIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className={styles.statusInfo}>
              <h4>{t('resolvedText')}</h4>
              <p>{t('resolvedSubtext')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
