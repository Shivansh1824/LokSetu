import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainScreen from './screens/MainScreen/MainScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import { LanguageProvider } from './context/LanguageContext';
import './index.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check local storage. Default to light mode unless 'dark' is explicitly saved.
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark-theme');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark-theme');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <LanguageProvider>
      <div className="app-wrapper">
        {/* Immersive Background */}
        <div className="ambient-bg"></div>
        <div className="ambient-blur"></div>

        <Router>
          <Routes>
            <Route path="/" element={<MainScreen isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
            <Route path="/login" element={<LoginScreen isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
          </Routes>
        </Router>
      </div>
    </LanguageProvider>
  );
}

export default App;
