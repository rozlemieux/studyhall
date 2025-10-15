import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import io from 'socket.io-client';
import './Dashboard.css';

function TeacherDashboard({ user }) {
  const navigate = useNavigate();
  const [questionSets, setQuestionSets] = useState([]);
  const [selectedSet, setSelectedSet] = useState('');
  const [selectedMode, setSelectedMode] = useState('classic');
  const [loading, setLoading] = useState(true);
  const [creatingGame, setCreatingGame] = useState(false);

  const gameModes = [
    { id: 'classic', name: 'Classic Quiz', icon: '📚', description: 'Traditional quiz format' },
    { id: 'racing', name: 'Slime Racing', icon: '🏁', description: 'Race to the finish!' },
    { id: 'battle', name: 'Slime Battle', icon: '⚔️', description: 'Battle arena' },
    { id: 'gold-quest', name: 'Gold Quest', icon: '💰', description: 'Collect gold coins' },
    { id: 'tower', name: 'Tower Climb', icon: '🏰', description: 'Climb the tower' },
    { id: 'survival', name: 'Survival Mode', icon: '💀', description: 'Last one standing' }
  ];

  useEffect(() => {
    fetchQuestionSets();
  }, []);

  const fetchQuestionSets = async () => {
    try {
      const response = await axios.get('/api/question-sets');
      setQuestionSets(response.data);
      if (response.data.length > 0) {
        setSelectedSet(response.data[0].id);
      }
    } catch (error) {
      console.error('Error fetching question sets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleHostGame = () => {
    if (!selectedSet) {
      alert('Please select a question set');
      return;
    }

    // Connect to Socket.io - use current host for preview compatibility
    // In dev: proxies to backend, In preview: needs full URL
    const socketUrl = process.env.NODE_ENV === 'production' 
      ? window.location.origin 
      : undefined; // undefined means same origin (uses proxy)
    
    const socket = io(socketUrl, {
      path: '/socket.io',
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 3,
      timeout: 10000
    });
    
    // Set timeout for connection
    const connectionTimeout = setTimeout(() => {
      socket.disconnect();
      alert('Connection timeout. Please check your internet connection and try again.');
    }, 15000);

    socket.on('connect', () => {
      console.log('✅ Socket connected:', socket.id);
      clearTimeout(connectionTimeout);
      
      socket.emit('create-game', {
        questionSetId: selectedSet,
        gameMode: selectedMode,
        settings: {}
      });
      
      console.log('📤 Sent create-game event');
    });

    socket.on('game-created', (data) => {
      console.log('✅ Game created:', data.gameCode);
      socket.disconnect();
      navigate(`/lobby/${data.gameCode}`);
    });

    socket.on('connect_error', (error) => {
      clearTimeout(connectionTimeout);
      console.error('❌ Socket connection error:', error);
      alert('Failed to connect to game server: ' + error.message + '\n\nPlease try again.');
      socket.disconnect();
    });

    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
      if (reason === 'io server disconnect' || reason === 'io client disconnect') {
        // Expected disconnect
      } else {
        clearTimeout(connectionTimeout);
      }
    });
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
          <h1>Teacher Dashboard 👨‍🏫</h1>
          <p>Create and host engaging learning games</p>
        </motion.div>

        <div className="dashboard-grid">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="dashboard-card"
          >
            <h2>📝 Question Sets</h2>
            {questionSets.length === 0 ? (
              <p>No question sets available. Create one to get started!</p>
            ) : (
              <select
                value={selectedSet}
                onChange={(e) => setSelectedSet(e.target.value)}
                className="select"
              >
                {questionSets.map((set) => (
                  <option key={set.id} value={set.id}>
                    {set.title} ({set.questions.length} questions)
                  </option>
                ))}
              </select>
            )}
            <button
              onClick={() => navigate('/create-questions')}
              className="button button-secondary"
              style={{ marginTop: '15px' }}
            >
              Create New Set ➕
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="dashboard-card"
          >
            <h2>🎮 Game Mode</h2>
            <div className="game-modes-grid">
              {gameModes.map((mode) => (
                <div
                  key={mode.id}
                  className={`game-mode-card ${selectedMode === mode.id ? 'selected' : ''}`}
                  onClick={() => setSelectedMode(mode.id)}
                >
                  <div className="mode-icon">{mode.icon}</div>
                  <div className="mode-name">{mode.name}</div>
                  <div className="mode-desc">{mode.description}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="host-section"
        >
          <button
            onClick={handleHostGame}
            disabled={!selectedSet}
            className="button button-primary button-large"
          >
            🚀 Host Game Now
          </button>
        </motion.div>

        <div className="quick-actions">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/maps')}
            className="action-button"
          >
            <span className="action-icon">🗺️</span>
            <span className="action-label">Browse Maps</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/map-creator')}
            className="action-button"
          >
            <span className="action-icon">🎨</span>
            <span className="action-label">Create Map</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/leaderboard')}
            className="action-button"
          >
            <span className="action-icon">📊</span>
            <span className="action-label">Leaderboard</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
