// Loading component with animated slime
import React from 'react';
import { motion } from 'framer-motion';
import { getSlimeSprite } from '../utils/slimeSprites';
import './Loading.css';

export const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="loading-container">
      <motion.div
        className="loading-slime"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <img 
          src={getSlimeSprite('mint')} 
          alt="Loading" 
          className="loading-slime-image"
        />
      </motion.div>
      <motion.p
        className="loading-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {message}
      </motion.p>
    </div>
  );
};

export const LoadingSpinner = ({ size = 'medium' }) => {
  return (
    <div className={`spinner spinner-${size}`}>
      <div className="spinner-circle"></div>
    </div>
  );
};

export default Loading;

