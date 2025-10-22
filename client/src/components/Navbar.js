import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import Icon from './Icon';
import Logo from './Logo';
import './Navbar.css';

function Navbar({ user, onLogout, soundEnabled, onToggleSound }) {
  const navigate = useNavigate();
  const { openCollectionModal } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const handleLogout = () => {
    onLogout();
    navigate('/');
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
                
                <div className="user-info" ref={userMenuRef}>
                  {user.role === 'student' && (
                    <span className="currency-badge">
                      <Icon name="coin" size={18} /> {user.currency || 0}
                    </span>
                  )}
                  
                  <div className="user-menu-wrapper">
                    <button 
                      className="username-button"
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                    >
                      {user.username}
                      <span className="dropdown-arrow">{userMenuOpen ? '▲' : '▼'}</span>
                    </button>
                    
                    {userMenuOpen && (
                      <div className="user-dropdown">
                        {user.role === 'student' && (
                          <button 
                            className="dropdown-item"
                            onClick={() => {
                              openCollectionModal();
                              setUserMenuOpen(false);
                              closeMobileMenu();
                            }}
                          >
                            <Icon name="sparkles" size={16} /> My Collection
                          </button>
                        )}
                        <button 
                          onClick={handleLogout} 
                          className="dropdown-item logout-item"
                        >
                          <Icon name="log-out" size={16} /> Logout
                        </button>
                      </div>
                    )}
                  </div>
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

