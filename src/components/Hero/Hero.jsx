import React from 'react';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <div className={styles.badgeGroup}>
            <span className={`${styles.badge} ${styles.badgePrimary}`}>Constituency OS</span>
            <span className={`${styles.badge} ${styles.badgeCitizen}`}>Citizen Portal</span>
          </div>
          
          <h1 className={styles.title}>
            Turn Constituency Chaos into Actionable Intelligence.
          </h1>
          
          <p className={styles.description}>
            LokSetu bridges the gap between citizens and representatives. Citizens report grievances directly, while the AI-powered MP Dashboard maps demand hotspots and prioritizes development works instantly.
          </p>
          
          <div className={styles.actions}>
            <a href="/citizen/report" className="btn btn-citizen">Report an Issue</a>
            <a href="/mp/dashboard" className="btn btn-primary">Open MP Dashboard</a>
          </div>

          <div className={styles.features}>
            <div className={styles.featureItem}>
              <h4>For Citizens</h4>
              <p>Transparent grievance tracking and direct communication.</p>
            </div>
            <div className={styles.featureItem}>
              <h4>For MPs</h4>
              <p>AI-driven priority scoring and automated budget allocation.</p>
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
              <h4>Ward 3 Issue Resolved</h4>
              <p>Water Supply Fixed • Just now</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
