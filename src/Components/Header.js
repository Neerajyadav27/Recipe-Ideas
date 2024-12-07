import React from 'react';
import { ChefHat } from 'lucide-react';
import './Header.css';

const Header = () => (
  <header className="app-header">
    <h1>
      <ChefHat className="header-icon" size={40} /> Recipe Ideas
    </h1>
  </header>
);

export default Header;
