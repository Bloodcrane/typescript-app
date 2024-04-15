import React from 'react';

interface HeaderProps {
  changeLanguage: (language: string) => void;
}

const Header: React.FC<HeaderProps> = ({ changeLanguage }) => {
  return (
    <div className="header">
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('ge')}>Georgian</button>
    </div>
  );
}

export default Header;
