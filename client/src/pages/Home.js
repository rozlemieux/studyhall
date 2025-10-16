import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../components/Icon';
import { getSlimeSprite } from '../utils/slimeSprites';
import './Home.css';

function Home({ user }) {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      if (user.role === 'teacher') {
        navigate('/teacher');
      } else {
        navigate('/student');
      }
    } else {
      navigate('/login');
    }
  };

  const slimeIds = ['purple', 'pink', 'brown', 'orange', 'mint', 'skyblue', 'forestgreen', 'violet'];

  return (
    <div className="home">
      <div className="hero-section">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">
            Learn with <span className="gradient-text">Slimes</span>
          </h1>
          <p className="hero-subtitle">
            The most fun way to learn! Turn quizzes into epic adventures with our slime-themed learning platform.
          </p>
          <button className="cta-button" onClick={handleGetStarted}>
            Get Started
          </button>
        </motion.div>

        <motion.div
          className="slime-showcase"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="slime-grid">
            {slimeIds.map((slimeId, index) => (
              <motion.div
                key={index}
                className="slime-item"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                <img src={getSlimeSprite(slimeId)} alt={slimeId} className="slime-sprite" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="features-section">
        <h2 className="section-title">Why Choose StudyHall?</h2>
        <div className="features-grid">
          <motion.div
            className="feature-card"
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="feature-icon">
              <Icon name="gamepad" size={48} color="#00C878" />
            </div>
            <h3>Multiple Game Modes</h3>
            <p>From classic quizzes to tower defense and racing - learning has never been this fun!</p>
          </motion.div>

          <motion.div
            className="feature-card"
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="feature-icon">
              <Icon name="palette" size={48} color="#00C878" />
            </div>
            <h3>Collect Slimes</h3>
            <p>Earn currency and collect adorable slime characters as you learn!</p>
          </motion.div>

          <motion.div
            className="feature-card"
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="feature-icon">
              <Icon name="book" size={48} color="#00C878" />
            </div>
            <h3>Custom Questions</h3>
            <p>Teachers can create custom question sets or use pre-made ones for any subject!</p>
          </motion.div>

          <motion.div
            className="feature-card"
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="feature-icon">
              <Icon name="trophy" size={48} color="#00C878" />
            </div>
            <h3>Real-time Competition</h3>
            <p>Compete with classmates in real-time and climb to the top of the leaderboard!</p>
          </motion.div>
        </div>
      </div>

      <div className="cta-section">
        <motion.div
          className="cta-box"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2>Ready to Start Learning?</h2>
          <p>Join thousands of students and teachers making learning fun!</p>
          <button className="cta-button-secondary" onClick={handleGetStarted}>
            Join StudyHall
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;

