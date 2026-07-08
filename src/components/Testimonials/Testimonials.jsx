import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import styles from './Testimonials.module.css';

const Testimonials = () => {
  const { t } = useLanguage();

  return (
    <section id="testimonials" className={`section ${styles.testimonials}`}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t('testimonialsTitle')}</h2>
          <p className="section-desc">
            {t('testimonialsDesc')}
          </p>
        </div>

        <div className={styles.grid}>
          {/* MP Testimonial */}
          <div className={styles.card}>
            <svg className={styles.quoteIcon} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path></svg>
            <p className={styles.quote}>
              {t('mpQuote')}
            </p>
            <div className={styles.author}>
              <img src="/avatar_mp.png" alt="MP Avatar" className={styles.avatarImage} />
              <div className={styles.authorInfo}>
                <h4>{t('mpAuthor')}</h4>
                <p>{t('mpRole')}</p>
              </div>
            </div>
          </div>

          {/* Citizen Testimonial */}
          <div className={styles.card}>
            <svg className={styles.quoteIcon} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path></svg>
            <p className={styles.quote}>
              {t('citizenQuote')}
            </p>
            <div className={styles.author}>
              <img src="/avatar_citizen.png" alt="Citizen Avatar" className={styles.avatarImage} />
              <div className={styles.authorInfo}>
                <h4>{t('citizenAuthor')}</h4>
                <p>{t('citizenRole')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
