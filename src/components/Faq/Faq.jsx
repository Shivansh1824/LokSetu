import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
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
  const { t } = useLanguage();

  const faqs = [
    {
      question: t('q1'),
      answer: t('a1')
    },
    {
      question: t('q2'),
      answer: t('a2')
    },
    {
      question: t('q3'),
      answer: t('a3')
    },
    {
      question: t('q4'),
      answer: t('a4')
    }
  ];

  return (
    <section id="faq" className={`section ${styles.faq}`}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t('faqTitle')}</h2>
          <p className="section-desc">
            {t('faqDesc')}
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
