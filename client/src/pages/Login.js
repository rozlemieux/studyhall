import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Icon from '../components/Icon';
import { getSlimeSprite } from '../utils/slimeSprites';
import './Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');
  const [isRegister, setIsRegister] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isRegister && password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (isRegister && password.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }
    
    try {
      const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
      const data = isRegister ? { username, password, role } : { username, password };
      const response = await axios.post(endpoint, data);
      onLogin(response.data);
      
      if (response.data.role === 'teacher') {
        navigate('/teacher');
      } else {
        navigate('/student');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      alert(error.response?.data?.error || 'Authentication failed');
    }
  };

  return (
    <div className="login-page">
      <motion.div
        className="login-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="login-header">
          <div className="login-slimes">
            <img src={getSlimeSprite('purple')} alt="slime" className="login-slime" />
            <img src={getSlimeSprite('pink')} alt="slime" className="login-slime" />
            <img src={getSlimeSprite('skyblue')} alt="slime" className="login-slime" />
          </div>
          <h1>{isRegister ? 'Join StudyHall' : 'Welcome Back'}</h1>
          <p>Start your learning adventure with slimes!</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isRegister ? "Create a password (min. 6 characters)" : "Enter your password"}
              required
              minLength={isRegister ? 6 : undefined}
              className="input-field"
            />
          </div>

          {isRegister && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                className="input-field"
              />
            </div>
          )}

          {isRegister && (
            <div className="form-group">
              <label>I am a...</label>
              <div className="role-selector">
                <button
                  type="button"
                  className={`role-button ${role === 'student' ? 'active' : ''}`}
                  onClick={() => setRole('student')}
                >
                  <span className="role-icon">
                    <Icon name="student" size={32} />
                  </span>
                  <span>Student</span>
                </button>
                <button
                  type="button"
                  className={`role-button ${role === 'teacher' ? 'active' : ''}`}
                  onClick={() => setRole('teacher')}
                >
                  <span className="role-icon">
                    <Icon name="teacher" size={32} />
                  </span>
                  <span>Teacher</span>
                </button>
              </div>
            </div>
          )}

          <button type="submit" className="submit-button">
            {isRegister ? 'Create Account' : 'Login'}
          </button>
        </form>

        <div className="login-footer">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="toggle-auth"
          >
            {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;

