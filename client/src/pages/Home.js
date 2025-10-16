import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Home.css';
import Slime from '../components/Slime';

function Home() {
  const slimes = ['mint', 'cherry', 'fire', 'water', 'rainbow', 'galaxy', 'golden', 'dragon'];

  return (
    <div className="home-page">
      <div className="hero-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-content"
        >
          <h1 className="hero-title">
            Welcome to <span className="gradient-text">StudyHall</span>
          </h1>
          <p className="hero-subtitle">
            Transform learning into an epic adventure! 🎮
          </p>
          <p className="hero-description">
            Gamified quiz platform with collectible Slimes, multiple game modes,
            achievements, and real-time multiplayer action!
          </p>
          <div className="hero-buttons">
            <Link to="/login" className="hero-button primary">
              Get Started 🚀
            </Link>
          </div>
        </motion.div>

        <div className="floating-slimes">
          {slimes.map((slime, index) => (
            <motion.div
              key={slime}
              className="floating-slime"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              style={{
                left: `${(index % 4) * 25 + 10}%`,
                top: `${Math.floor(index / 4) * 40 + 20}%`,
                animationDelay: `${index * 0.3}s`
              }}
            >
              <span className="slime-emoji">{getSlimeDisplay(slime)}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="features-section">
        <h2 className="section-title">Why StudyHall?</h2>
        <div className="features-grid">
          <motion.div
            className="feature-card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="feature-icon">🎮</div>
            <h3>6 Game Modes</h3>
            <p>Racing, Battle, Gold Quest, Tower, Survival & Classic</p>
          </motion.div>

          <motion.div
            className="feature-card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="feature-icon">🌮</div>
            <h3>37 Slimes</h3>
            <p>Collect unique characters from Common to Secret rarity</p>
          </motion.div>

          <motion.div
            className="feature-card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="feature-icon">🏆</div>
            <h3>Achievements</h3>
            <p>Unlock 20 achievements across 7 categories</p>
          </motion.div>

          <motion.div
            className="feature-card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="feature-icon">🗺️</div>
            <h3>Custom Maps</h3>
            <p>Create and share your own game maps</p>
          </motion.div>

          <motion.div
            className="feature-card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="feature-icon">⚡</div>
            <h3>Real-time</h3>
            <p>Live multiplayer with instant updates</p>
          </motion.div>

          <motion.div
            className="feature-card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="feature-icon">📊</div>
            <h3>Leaderboards</h3>
            <p>Compete globally and track your progress</p>
          </motion.div>
        </div>
      </div>

      <div className="cta-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="cta-content"
        >
          <h2>Ready to Start Learning?</h2>
          <p>Join thousands of students making education fun!</p>
          <Link to="/login" className="cta-button">
            Create Account Now 🎉
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;
