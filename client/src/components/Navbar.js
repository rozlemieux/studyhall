import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from './Icon';
import Logo from './Logo';
import './Navbar.css';

function Navbar({ user, onLogout, soundEnabled, onToggleSound }) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <Logo size="small" />
        </Link>
        
        {/* Mobile menu toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
        
        <div className={`navbar-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          {user ? (
            <>
              {user.role === 'teacher' && (
                <>
                  <Link to="/teacher" className="nav-link" onClick={closeMobileMenu}>Dashboard</Link>
                  <Link to="/maps" className="nav-link" onClick={closeMobileMenu}>Maps</Link>
                  <Link to="/leaderboard" className="nav-link" onClick={closeMobileMenu}>Leaderboard</Link>
                </>
              )}
              {user.role === 'student' && (
                <>
                  <Link to="/student" className="nav-link" onClick={closeMobileMenu}>Dashboard</Link>
                  <Link to="/shop" className="nav-link" onClick={closeMobileMenu}>Shop</Link>
                  <Link to="/maps" className="nav-link" onClick={closeMobileMenu}>Maps</Link>
                  <Link to="/leaderboard" className="nav-link" onClick={closeMobileMenu}>Leaderboard</Link>
                </>
              )}
              
              <div className="nav-actions">
                <button 
                  onClick={onToggleSound} 
                  className="sound-toggle"
                  title={soundEnabled ? 'Sound On' : 'Sound Off'}
                >
                  {soundEnabled ? '🔊' : '🔇'}
                </button>
                
                <div className="user-info">
                  {user.role === 'student' && (
                    <span className="currency-badge">
                      <Icon name="coin" size={18} /> {user.currency || 0}
                    </span>
                  )}
                  <span className="username">{user.username}</span>
                  <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
              </div>
            </>
          ) : (
            <Link to="/login" className="nav-link-btn" onClick={closeMobileMenu}>Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

