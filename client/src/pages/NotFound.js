import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Slime from '../components/Slime';
import './NotFound.css';

function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="notfound-content"
        >
          <div className="slime-sad">
            <Slime slimeId="ghost" size={150} />
          </div>
          <h1 className="notfound-title">404</h1>
          <h2 className="notfound-subtitle">Page Not Found</h2>
          <p className="notfound-text">
            Oops! This slime wandered off to the wrong dimension.
          </p>
          <Link to="/" className="button button-primary">
            🏠 Go Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default NotFound;