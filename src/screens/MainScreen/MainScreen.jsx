import React from 'react';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import Features from '../../components/Features/Features';
import Impact from '../../components/Impact/Impact';
import Testimonials from '../../components/Testimonials/Testimonials';
import Faq from '../../components/Faq/Faq';
import Footer from '../../components/Footer/Footer';

const MainScreen = ({ isDarkMode, toggleTheme }) => {
  return (
    <>
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <Impact />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
    </>
  );
};

export default MainScreen;
