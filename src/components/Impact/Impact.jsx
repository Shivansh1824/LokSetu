import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import styles from './Impact.module.css';

const Impact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // Simple intersection observer to trigger animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    
    const element = document.getElementById('impact-chart');
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section id="impact" className={`section ${styles.impact}`}>
      <div className="container">
        
        <div id="impact-chart" className={styles.impactGrid}>
          
          {/* Left Column: Text & Stats */}
          <div className={styles.textContent}>
            <h3>{t('impactTitle')}</h3>
            <p>
              {t('impactDesc')}
            </p>
            
            <div className={styles.statGrid}>
              <div className={styles.statItem}>
                <div className={styles.statValue}>{t('stat1Val')}</div>
                <div className={styles.statLabel}>{t('stat1Label')}</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue}>{t('stat2Val')}</div>
                <div className={styles.statLabel}>{t('stat2Label')}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Chart */}
          <div className={styles.chartContent}>
            
            <div className={styles.chartRow}>
              <div className={styles.chartLabel}>
                <h4>{t('withoutLoksetu')}</h4>
                <span>{t('days120')}</span>
              </div>
              <div className={styles.barContainer}>
                <div 
                  className={`${styles.bar} ${styles.barSlow}`} 
                  style={{ width: isVisible ? '100%' : '0%' }}
                ></div>
              </div>
            </div>

            <div className={styles.chartRow}>
              <div className={styles.chartLabel}>
                <h4>{t('withLoksetu')}</h4>
                <span>{t('days14')}</span>
              </div>
              <div className={styles.barContainer}>
                <div 
                  className={`${styles.bar} ${styles.barFast}`} 
                  style={{ width: isVisible ? '12%' : '0%' }}
                ></div>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Impact;
