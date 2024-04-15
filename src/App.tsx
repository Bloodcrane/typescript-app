import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import Header from './components/Header';
import ThemeSwitch from './ThemeSwitch';
import TodoApp from './components/TodoList';
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './redux/themeSlice';
import './App.css';
import { LanguageProvider } from './components/LanguageContext';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [language, setLanguage] = useState<string>('en');
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
  };

  const toggleTheme = () => {
    setTheme((prevTheme: string) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  const store = configureStore({
    reducer: {
      theme: themeReducer,
    },
  });

  return (
    <Provider store={store}>
      <LanguageProvider value={{ language }}>
        <div className={`Header ${theme}`}>
          {/* <ThemeSwitch toggleTheme={toggleTheme} currentTheme={theme} /> */}
          <Header changeLanguage={changeLanguage} />
          <TodoApp language={language} />
        </div>
      </LanguageProvider>
    </Provider>
  );
};

export default App;
