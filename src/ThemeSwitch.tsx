import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTheme } from './redux/themeSlice';
import './App.css';

interface ThemeSwitchProps {
  currentTheme: string;
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ currentTheme }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme && storedTheme !== currentTheme) {
      dispatch(toggleTheme());
    }
  }, [currentTheme, dispatch]);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    document.body.classList.toggle('dark-theme');
  };

  return (
    <div>
      <button onClick={handleThemeToggle}>
        Toggle Theme ({currentTheme})
      </button>
    </div>
  );
};

export default ThemeSwitch;
