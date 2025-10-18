import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import io from 'socket.io-client';
import Icon from '../components/Icon';
import './TeacherDashboard.css';

function TeacherDashboard({ user }) {
  const [questionSets, setQuestionSets] = useState([]);
  const [maps, setMaps] = useState([]);
  const [showCreateGame, setShowCreateGame] = useState(false);
  const [selectedSet, setSelectedSet] = useState(null);
  const [gameMode, setGameMode] = useState('classic');
  const [selectedMap, setSelectedMap] = useState(null);
  const socketRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Create socket connection
    const socket = io();
    socketRef.current = socket;

    fetchQuestionSets();

    socket.on('connect', () => {
      console.log('TeacherDashboard socket connected:', socket.id);
    });

    socket.on('game-created', (data) => {
      console.log('Teacher: Game created with code:', data.gameCode);
      // Give a tiny delay for the socket to finish setup before navigating
      setTimeout(() => {
        navigate(`/lobby/${data.gameCode}`);
      }, 100);
    });

    return () => {
      socket.off('connect');
      socket.off('game-created');
      socket.disconnect();
    };
  }, [navigate]);

  useEffect(() => {
    if (gameMode && gameMode !== 'classic') {
      fetchMaps();
    }
  }, [gameMode]);

  const fetchQuestionSets = async () => {
    try {
      const response = await axios.get('/api/question-sets');
      setQuestionSets(response.data);
    } catch (error) {
      console.error('Error fetching question sets:', error);
    }
  };

  const fetchMaps = async () => {
    try {
      const response = await axios.get(`/api/maps?gameMode=${gameMode}`);
      setMaps(response.data);
      if (response.data.length > 0) {
        setSelectedMap(response.data[0].id);
      }
    } catch (error) {
      console.error('Error fetching maps:', error);
    }
  };

  const handleCreateGame = () => {
    if (!selectedSet) {
      alert('Please select a question set');
      return;
    }

    if (!socketRef.current) {
      alert('Connection not ready. Please try again.');
      return;
    }

    const socket = socketRef.current;
    
    const createGameData = {
      questionSetId: selectedSet,
      gameMode: gameMode,
      mapId: selectedMap,
      hostUserId: user.id,
      hostUsername: user.username,
      hostSlime: 'mint',
      settings: {}
    };
    
    if (socket.connected) {
      socket.emit('create-game', createGameData);
    } else {
      socket.once('connect', () => {
        socket.emit('create-game', createGameData);
      });
    }
  };

  const gameModes = [
    { id: 'classic', name: 'Classic Quiz', icon: 'book', description: 'Traditional quiz format' },
    { id: 'racing', name: 'Slime Racing', icon: 'lightning', description: 'Race to the finish line!' },
    { id: 'battle', name: 'Slime Battle', icon: 'gamepad', description: 'Battle other slimes!' },
    { id: 'gold-quest', name: 'Gold Quest', icon: 'coin', description: 'Collect the most gold!' },
    { id: 'tower', name: 'Tower Climb', icon: 'trophy', description: 'Climb to the top!' },
    { id: 'survival', name: 'Survival Mode', icon: 'sparkles', description: 'Last slime standing!' },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <motion.div
          className="dashboard-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1>Teacher Dashboard</h1>
            <p>Welcome back, {user.username}!</p>
          </div>
          <div className="header-actions">
            <button 
              className="button button-success"
              onClick={() => navigate('/create-set')}
            >
              + Create Question Set
            </button>
            <button 
              className="button button-primary"
              onClick={() => setShowCreateGame(true)}
            >
              <Icon name="gamepad" size={18} /> Host Game
            </button>
          </div>
        </motion.div>

        {showCreateGame && (
          <motion.div
            className="create-game-panel"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="panel-header">
              <h2>Host a Game</h2>
              <button 
                className="close-btn"
                onClick={() => setShowCreateGame(false)}
              >
                ✕
              </button>
            </div>

            <div className="game-setup">
              <div className="setup-section">
                <h3>Select Question Set</h3>
                <div className="question-sets-grid">
                  {questionSets.map(set => (
                    <div
                      key={set.id}
                      className={`question-set-card ${selectedSet === set.id ? 'selected' : ''}`}
                      onClick={() => setSelectedSet(set.id)}
                    >
                      <div className="set-subject">{set.subject}</div>
                      <div className="set-title">{set.title}</div>
                      <div className="set-info">{set.questions.length} questions</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="setup-section">
                <h3>Select Game Mode</h3>
                <div className="game-modes-grid">
                  {gameModes.map(mode => (
                    <div
                      key={mode.id}
                      className={`game-mode-card ${gameMode === mode.id ? 'selected' : ''}`}
                      onClick={() => setGameMode(mode.id)}
                    >
                      <div className="mode-icon"><Icon name={mode.icon} size={40} color={gameMode === mode.id ? '#00C878' : '#666'} /></div>
                      <div className="mode-name">{mode.name}</div>
                      <div className="mode-description">{mode.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {gameMode && gameMode !== 'classic' && (
                <div className="setup-section">
                  <div className="section-header">
                    <h3>Select Map</h3>
                    <button 
                      className="button button-secondary btn-small"
                      onClick={() => navigate('/maps/create')}
                    >
                      + Create Map
                    </button>
                  </div>
                  {maps.length > 0 ? (
                    <div className="maps-selector">
                      {maps.map(map => (
                        <div
                          key={map.id}
                          className={`map-selector-card ${selectedMap === map.id ? 'selected' : ''}`}
                          onClick={() => setSelectedMap(map.id)}
                        >
                          <div className="map-name">{map.name}</div>
                          <div className="map-description">{map.description}</div>
                          {map.isDefault && <span className="default-badge">Default</span>}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="no-maps-message">
                      <p>No maps available for this game mode.</p>
                      <button 
                        className="button button-primary"
                        onClick={() => navigate('/maps/create')}
                      >
                        Create a Map
                      </button>
                    </div>
                  )}
                </div>
              )}

              <button
                className="button button-primary launch-btn"
                onClick={handleCreateGame}
                disabled={!selectedSet}
              >
                🚀 Create Game & Get Code
              </button>
              <p className="launch-hint">Students can join immediately once you get the code!</p>
            </div>
          </motion.div>
        )}

        <div className="question-sets-section">
          <h2>Your Question Sets</h2>
          <div className="sets-list">
            {questionSets.map(set => (
              <motion.div
                key={set.id}
                className="set-item"
                whileHover={{ scale: 1.02 }}
              >
                <div className="set-badge">{set.subject}</div>
                <div className="set-content">
                  <h3>{set.title}</h3>
                  <p>{set.questions.length} questions</p>
                </div>
                <div className="set-actions">
                  <button className="icon-btn">✏️</button>
                  <button className="icon-btn">🗑️</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;

