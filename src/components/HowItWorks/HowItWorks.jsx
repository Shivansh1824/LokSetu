import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import styles from './HowItWorks.module.css';

const HowItWorks = () => {
  const { t } = useLanguage();

  return (
    <section id="how-it-works" className={`section ${styles.howItWorks}`}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t('howItWorksTitle')}</h2>
          <p className="section-desc">
            {t('howItWorksDesc')}
          </p>
        </div>

        <div className={styles.grid}>
          {/* Citizen Pipeline */}
          <div className={styles.column}>
            <div className={styles.colHeader}>
              <div className={`${styles.icon} ${styles.iconCitizen}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
              <h3>{t('forCitizensLabel')}</h3>
            </div>
            
            <div className={styles.steps}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepContent}>
                  <h4>{t('cStep1Title')}</h4>
                  <p>{t('cStep1Desc')}</p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepContent}>
                  <h4>{t('cStep2Title')}</h4>
                  <p>{t('cStep2Desc')}</p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepContent}>
                  <h4>{t('cStep3Title')}</h4>
                  <p>{t('cStep3Desc')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* MP Pipeline */}
          <div className={styles.column}>
            <div className={styles.colHeader}>
              <div className={`${styles.icon} ${styles.iconMp}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <h3>{t('forMpsLabel')}</h3>
            </div>
            
            <div className={styles.steps}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepContent}>
                  <h4>{t('mStep1Title')}</h4>
                  <p>{t('mStep1Desc')}</p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepContent}>
                  <h4>{t('mStep2Title')}</h4>
                  <p>{t('mStep2Desc')}</p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepContent}>
                  <h4>{t('mStep3Title')}</h4>
                  <p>{t('mStep3Desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
