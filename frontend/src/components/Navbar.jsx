import React from 'react';
import { Utensils, LogOut, User } from 'lucide-react';

const Navbar = ({ currentUser, onLogout }) => {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <Utensils size={24} style={{ stroke: 'url(#brand-grad)' || '#6366f1' }} />
        {/* SVG Gradient definition for lucide icon gradient stroke */}
        <svg width="0" height="0">
          <linearGradient id="brand-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </svg>
        <span>GastroReviews</span>
      </div>

      {currentUser && (
        <div className="navbar-user-section">
          <div className="user-badge">
            <User size={16} />
            <span>Usuario: <strong>{currentUser}</strong></span>
          </div>
          <button className="btn-logout" onClick={onLogout} title="Cerrar sesión">
            <LogOut size={16} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
