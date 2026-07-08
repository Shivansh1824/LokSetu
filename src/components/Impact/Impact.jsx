import React, { useEffect, useState } from 'react';
import styles from './Impact.module.css';

const Impact = () => {
  const [isVisible, setIsVisible] = useState(false);

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
            <h3>The Real-World Impact</h3>
            <p>
              LokSetu replaces bureaucratic black holes with transparent, AI-driven action. By automating duplicate detection and mapping complaints geospatially, we eliminate months of manual processing.
            </p>
            
            <div className={styles.statGrid}>
              <div className={styles.statItem}>
                <div className={styles.statValue}>10k+</div>
                <div className={styles.statLabel}>Complaints Auto-Categorized</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue}>85%</div>
                <div className={styles.statLabel}>Reduction in Duplicates</div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Chart */}
          <div className={styles.chartContent}>
            
            <div className={styles.chartRow}>
              <div className={styles.chartLabel}>
                <h4>Without LokSetu</h4>
                <span>120+ Days</span>
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
                <h4>With LokSetu</h4>
                <span>14 Days</span>
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
