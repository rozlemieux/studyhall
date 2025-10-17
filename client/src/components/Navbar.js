import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from './Icon';
import Logo from './Logo';
import './Navbar.css';

function Navbar({ user, onLogout, soundEnabled, onToggleSound }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <Logo size="small" />
        </Link>
        
        <div className="navbar-menu">
          {user ? (
            <>
              {user.role === 'teacher' && (
                <>
                  <Link to="/teacher" className="nav-link">Dashboard</Link>
                  <Link to="/maps" className="nav-link">Maps</Link>
                  <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
                </>
              )}
              {user.role === 'student' && (
                <>
                  <Link to="/student" className="nav-link">Dashboard</Link>
                  <Link to="/shop" className="nav-link">Shop</Link>
                  <Link to="/maps" className="nav-link">Maps</Link>
                  <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
                </>
              )}
              <div className="user-info">
                {user.role === 'student' && (
                  <span className="currency-badge">
                    <Icon name="coin" size={18} /> {user.currency || 0}
                  </span>
                )}
                <span className="username">{user.username}</span>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </div>
            </>
          ) : (
            <Link to="/login" className="nav-link-btn">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

