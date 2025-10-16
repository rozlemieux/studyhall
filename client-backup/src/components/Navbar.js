import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">📚 StudyHall</span>
        </Link>
        
        <div className="navbar-menu">
          {user.role === 'student' && (
            <>
              <Link to="/student-dashboard" className="nav-link">Dashboard</Link>
              <Link to="/shop" className="nav-link">Shop 🛍️</Link>
              <Link to="/achievements" className="nav-link">Achievements 🏆</Link>
              <Link to="/leaderboard" className="nav-link">Leaderboard 📊</Link>
            </>
          )}
          
          {user.role === 'teacher' && (
            <>
              <Link to="/teacher-dashboard" className="nav-link">Dashboard</Link>
              <Link to="/create-questions" className="nav-link">Create Questions ➕</Link>
              <Link to="/maps" className="nav-link">Maps 🗺️</Link>
              <Link to="/leaderboard" className="nav-link">Leaderboard 📊</Link>
            </>
          )}
          
          <div className="nav-user">
            <span className="nav-username">{user.username}</span>
            <span className="nav-role">{user.role}</span>
          </div>
          
          <button onClick={handleLogout} className="nav-logout">Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
