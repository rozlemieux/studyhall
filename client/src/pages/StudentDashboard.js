import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Slime from '../components/Slime';
import './Dashboard.css';

function StudentDashboard({ user }) {
  const navigate = useNavigate();
  const [gameCode, setGameCode] = useState('');
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlayerData();
  }, [user.id]);

  const fetchPlayerData = async () => {
    try {
      const response = await axios.get(`/api/player/${user.id}`);
      setPlayerData(response.data);
    } catch (error) {
      console.error('Error fetching player data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinGame = () => {
    if (gameCode.trim()) {
      navigate(`/lobby/${gameCode.toUpperCase()}`);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="dashboard-header"
        >
          <h1>Welcome back, {user.username}! 🎮</h1>
          <p>Ready to learn and have fun?</p>
        </motion.div>

        <div className="dashboard-grid">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="dashboard-card join-card"
          >
            <h2>Join a Game</h2>
            <p>Enter the game code from your teacher</p>
            <div className="join-form">
              <input
                type="text"
                value={gameCode}
                onChange={(e) => setGameCode(e.target.value.toUpperCase())}
                placeholder="Enter Game Code"
                className="game-code-input"
                maxLength={6}
              />
              <button onClick={handleJoinGame} className="button button-primary">
                Join Game 🚀
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="dashboard-card slime-card"
          >
            <h2>Your Slime</h2>
            {playerData && (
              <div className="current-slime">
                <div className="slime-display-large">
                  <Slime slimeId={playerData.selectedSlime} size={120} />
                </div>
                <div className="slime-info">
                  <h3>{playerData.selectedSlime}</h3>
                  <p className="currency">💰 {playerData.currency} coins</p>
                </div>
              </div>
            )}
            <button 
              onClick={() => navigate('/shop')} 
              className="button button-success"
            >
              Visit Shop 🛒
            </button>
          </motion.div>
        </div>

        <div className="quick-actions">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/achievements')}
            className="action-button"
          >
            <span className="action-icon">🏆</span>
            <span className="action-label">Achievements</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/leaderboard')}
            className="action-button"
          >
            <span className="action-icon">📊</span>
            <span className="action-label">Leaderboard</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/maps')}
            className="action-button"
          >
            <span className="action-icon">🗺️</span>
            <span className="action-label">Maps</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
