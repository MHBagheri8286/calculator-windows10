import React from 'react';
import './Header.scss';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-title">
        <span className="header-name">Calculator</span>
      </div>
    </header>
  );
};

export default Header;