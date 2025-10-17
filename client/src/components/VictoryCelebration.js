import React from 'react';
import { motion } from 'framer-motion';
import './VictoryCelebration.css';

const VictoryCelebration = ({ rank, playerName, score }) => {
  const celebrations = {
    1: { emoji: '🥇', title: 'VICTORY!', color: '#FFD700', subtitle: 'You\'re #1!' },
    2: { emoji: '🥈', title: 'Great Job!', color: '#C0C0C0', subtitle: 'Second Place!' },
    3: { emoji: '🥉', title: 'Well Done!', color: '#CD7F32', subtitle: 'Third Place!' },
  };

  const celebration = celebrations[rank] || { 
    emoji: '🎉', 
    title: 'Game Complete!', 
    color: '#00C878', 
    subtitle: `You finished ${rank}th!` 
  };

  return (
    <motion.div
      className="victory-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="victory-content"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.2
        }}
      >
        <motion.div
          className="victory-emoji"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 0.5
          }}
        >
          {celebration.emoji}
        </motion.div>
        
        <h1 className="victory-title" style={{ color: celebration.color }}>
          {celebration.title}
        </h1>
        
        <p className="victory-subtitle">{celebration.subtitle}</p>
        
        <div className="victory-stats">
          <div className="stat-item">
            <span className="stat-label">Score</span>
            <span className="stat-value">{score}</span>
          </div>
        </div>

        <div className="confetti">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="confetti-piece"
              initial={{ 
                x: 0, 
                y: -20, 
                rotate: 0,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{ 
                x: (Math.random() - 0.5) * 400,
                y: 800,
                rotate: Math.random() * 720,
                opacity: 0
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                delay: i * 0.05,
                ease: "easeOut"
              }}
              style={{
                backgroundColor: ['#FF6B6B', '#4ECDC4', '#FFD93D', '#6BCB77', '#FF9A8B'][i % 5]
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VictoryCelebration;
