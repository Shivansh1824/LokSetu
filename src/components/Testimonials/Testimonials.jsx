import React from 'react';
import styles from './Testimonials.module.css';

const Testimonials = () => {
  return (
    <section id="testimonials" className={`section ${styles.testimonials}`}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Trusted by Both Sides</h2>
          <p className="section-desc">
            A platform only works if it serves the people using it. LokSetu delivers value to both the citizens who report issues and the officials who solve them.
          </p>
        </div>

        <div className={styles.grid}>
          {/* MP Testimonial */}
          <div className={styles.card}>
            <svg className={styles.quoteIcon} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path></svg>
            <p className={styles.quote}>
              "Before LokSetu, we had thousands of WhatsApp messages and paper forms. Now, the AI groups duplicate complaints and highlights critical hotspots on a map. We cleared a 6-month grievance backlog in two weeks."
            </p>
            <div className={styles.author}>
              <img src="/avatar_mp.png" alt="MP Avatar" className={styles.avatarImage} />
              <div className={styles.authorInfo}>
                <h4>Hon. Amit S.</h4>
                <p>Member of Parliament</p>
              </div>
            </div>
          </div>

          {/* Citizen Testimonial */}
          <div className={styles.card}>
            <svg className={styles.quoteIcon} width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path></svg>
            <p className={styles.quote}>
              "I reported a massive pothole in our ward that had been ignored for months. I took a photo on the LokSetu app, and two days later I got a notification that the budget was sanctioned. The transparency is incredible."
            </p>
            <div className={styles.author}>
              <img src="/avatar_citizen.png" alt="Citizen Avatar" className={styles.avatarImage} />
              <div className={styles.authorInfo}>
                <h4>Priya M.</h4>
                <p>Citizen, Ward 3</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
