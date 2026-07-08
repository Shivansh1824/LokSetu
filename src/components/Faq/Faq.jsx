import React, { useState } from 'react';
import styles from './Faq.module.css';

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${styles.faqItem} ${isOpen ? styles.open : ''}`}>
      <button 
        className={styles.faqQuestion} 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {question}
        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div className={styles.faqAnswer}>
        <p>{answer}</p>
      </div>
    </div>
  );
};

const Faq = () => {
  const faqs = [
    {
      question: "How does the AI Priority Score work?",
      answer: "The platform calculates priority using a proprietary dynamic algorithm. It evaluates the inherent urgency of the issue (e.g., a broken water pipe is scored higher than cosmetic damage) and cross-references it against the population density of the affected ward. This ensures that life-threatening hazards are addressed immediately, while systemic issues are properly scaled so smaller wards aren't ignored."
    },
    {
      question: "How does the system handle fake or duplicate reports?",
      answer: "LokSetu employs a robust verification engine. It extracts EXIF data (time and GPS location) from uploaded photos to prevent fake submissions. The AI also cross-references new reports with the database, automatically grouping duplicate complaints from the same radius into a single 'High Volume' issue."
    },
    {
      question: "What if a citizen reports an issue in a regional language?",
      answer: "Our built-in Multilingual NLP engine automatically translates complaints submitted in Hindi, Marathi, or any other regional language into English for the central dashboard, while extracting the core entity (e.g., 'pothole', 'power outage')."
    },
    {
      question: "Can citizens track the exact status of their specific complaint?",
      answer: "Yes. The Citizen Portal provides real-time notifications at three key stages: 1) Verified by AI, 2) Reviewed by MP / Budget Sanctioned, and 3) Resolved by Authorities."
    }
  ];

  return (
    <section id="faq" className={`section ${styles.faq}`}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Technical Architecture & FAQ</h2>
          <p className="section-desc">
            Common questions regarding the AI algorithms, verification processes, and system workflows.
          </p>
        </div>

        <div className={styles.accordion}>
          {faqs.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
