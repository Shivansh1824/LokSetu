import React from 'react';
import styles from './Features.module.css';

const Features = () => {
  return (
    <section id="features" className={`section ${styles.features}`}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Constituency OS Capabilities</h2>
          <p className="section-desc">
            Built for scale. LokSetu uses state-of-the-art AI to transform unstructured data into a precise administrative roadmap.
          </p>
        </div>

        <div className={styles.bentoGrid}>
          {/* Multilingual NLP - Large */}
          <div className={`${styles.bentoItem} ${styles.large}`}>
            <div className={styles.icon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path><polyline points="10 2 10 22"></polyline></svg>
            </div>
            <svg className={styles.bentoGraphic} width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <h3>Multilingual NLP Extraction</h3>
            <p>Citizens can report issues in Hindi, Marathi, English, or any regional language. The NLP engine translates, extracts key entities, and categorizes the complaint automatically.</p>
          </div>

          {/* Priority Scoring */}
          <div className={styles.bentoItem}>
            <div className={styles.icon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            </div>
            <h3>Dynamic Priority Scoring</h3>
            <p>Issues aren't just listed; they are ranked. The algorithm calculates priority based on urgency, affected population, and frequency.</p>
          </div>

          {/* Fraud Prevention */}
          <div className={styles.bentoItem}>
            <div className={styles.icon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            <h3>Fraud & Duplicate Detection</h3>
            <p>Prevents budget drain by automatically flagging duplicate reports and verifying image EXIF data for authenticity.</p>
          </div>

          {/* Density Mapping - Large */}
          <div className={`${styles.bentoItem} ${styles.large}`}>
            <div className={styles.icon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>
            </div>
            <svg className={styles.bentoGraphic} width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
            <h3>Geospatial Heatmaps</h3>
            <p>Visualizing constituency health in real-time. MPs can see exactly where water shortages, power outages, or road damages are clustering, allowing for targeted resource deployment.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
