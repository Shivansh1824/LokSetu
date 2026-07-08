import React from 'react';
import styles from './HowItWorks.module.css';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className={`section ${styles.howItWorks}`}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Bridging the Gap</h2>
          <p className="section-desc">
            LokSetu simplifies civic engagement by creating a direct, automated pipeline between a citizen's smartphone and an MP's command center.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Citizen Pipeline */}
          <div className={styles.column}>
            <div className={styles.colHeader}>
              <div className={`${styles.icon} ${styles.iconCitizen}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
              <h3>For Citizens</h3>
            </div>
            
            <div className={styles.steps}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepContent}>
                  <h4>Report in Seconds</h4>
                  <p>Snap a photo of a pothole, broken streetlight, or hazard. LokSetu automatically tags the GPS location.</p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepContent}>
                  <h4>AI Categorization</h4>
                  <p>Our NLP engine categorizes the issue (even if reported in regional languages) and assigns an urgency score.</p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepContent}>
                  <h4>Track Progress</h4>
                  <p>Receive real-time updates when your MP reviews the issue, sanctions the budget, and when the work is completed.</p>
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
              <h3>For Representatives</h3>
            </div>
            
            <div className={styles.steps}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepContent}>
                  <h4>Ingest & Analyze</h4>
                  <p>The dashboard ingests thousands of reports, using AI to filter noise, detect duplicates, and verify authenticity.</p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepContent}>
                  <h4>Density Mapping</h4>
                  <p>Visualize complaint hotspots. AI algorithms rank wards by urgency and population density, removing guesswork.</p>
                </div>
              </div>
              <div className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepContent}>
                  <h4>Allocate & Resolve</h4>
                  <p>Sanction development works directly from the dashboard. Funds are allocated, and citizens are automatically notified.</p>
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
