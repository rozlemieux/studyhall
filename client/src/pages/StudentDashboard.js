import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import io from 'socket.io-client';
import Icon from '../components/Icon';
import { getSlimeSprite } from '../utils/slimeSprites';
import './StudentDashboard.css';

function StudentDashboard({ user }) {
  const [gameCode, setGameCode] = useState('');
  const [playerData, setPlayerData] = useState(null);
  const [allSlimes, setAllSlimes] = useState([]);
  const [showCollection, setShowCollection] = useState(false);
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

    fetchPlayerData();
    fetchSlimes();
    fetchQuestionSets();

    socket.on('join-success', (data) => {
      navigate(`/lobby/${gameCode}`);
    });

    socket.on('join-error', (data) => {
      alert(data.message);
    });

    socket.on('game-created', (data) => {
      console.log('Student: Game created with code:', data.gameCode);
      setTimeout(() => {
        navigate(`/lobby/${data.gameCode}`);
      }, 100);
    });

    return () => {
      socket.off('join-success');
      socket.off('join-error');
      socket.off('game-created');
      socket.disconnect();
    };
  }, [gameCode, navigate]);

  const fetchPlayerData = async () => {
    try {
      const response = await axios.get(`/api/player/${user.id}`);
      setPlayerData(response.data);
    } catch (error) {
      console.error('Error fetching player data:', error);
    }
  };

  const fetchSlimes = async () => {
    try {
      const response = await axios.get('/api/slimes');
      setAllSlimes(response.data);
    } catch (error) {
      console.error('Error fetching slimes:', error);
    }
  };

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

  useEffect(() => {
    if (gameMode && gameMode !== 'classic') {
      fetchMaps();
    }
  }, [gameMode]);

  const handleCreateGame = () => {
    if (!selectedSet) {
      alert('Please select a question set');
      return;
    }

    socket.emit('create-game', {
      questionSetId: selectedSet,
      gameMode: gameMode,
      mapId: selectedMap,
      hostUserId: user.id,
      hostUsername: user.username,
      hostSlime: playerData?.selectedSlime || 'mint',
      settings: {}
    });
  };

  const handleSelectSlime = async (slimeId) => {
    try {
      const response = await axios.post(`/api/player/${user.id}/select-slime`, { slimeId });
      setPlayerData(response.data);
      // Visual feedback without alert
      console.log('Slime equipped:', slimeId);
    } catch (error) {
      alert(error.response?.data?.error || 'Selection failed');
    }
  };

  const handleSellSlime = async (slimeId) => {
    if (!window.confirm('Are you sure you want to sell this slime?')) {
      return;
    }

    try {
      const response = await axios.post(`/api/player/${user.id}/sell-slime`, { slimeId });
      setPlayerData(response.data.player);
      alert(`Sold for ${response.data.earnedCurrency} currency!`);
    } catch (error) {
      alert(error.response?.data?.error || 'Sale failed');
    }
  };

  const handleJoinGame = (e) => {
    e.preventDefault();
    if (!gameCode) {
      alert('Please enter a game code');
      return;
    }

    socket.emit('join-game', {
      gameCode: gameCode.toUpperCase(),
      username: user.username,
      slime: playerData?.selectedSlime || 'mint',
      userId: user.id
    });
  };

  return (
    <div className="student-dashboard-page">
      <div className="student-dashboard-container">
        <motion.div
          className="welcome-card"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="welcome-header-section">
            <div className="welcome-content">
              <h1>Welcome, {user.username}!</h1>
              <p>Ready to learn and earn slimes?</p>
            </div>
            <div className="header-actions">
              <button 
                className="button button-success"
                onClick={() => navigate('/create-set')}
              >
                + Create Questions
              </button>
              <button 
                className="button button-secondary"
                onClick={() => navigate('/practice')}
              >
                <Icon name="target" size={18} /> Practice Solo
              </button>
              <button 
                className="button button-primary"
                onClick={() => setShowCreateGame(true)}
              >
                <Icon name="gamepad" size={18} /> Host Game
              </button>
            </div>
          </div>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon"><Icon name="coin" size={32} color="#FFD700" /></div>
              <div className="stat-value">{playerData?.currency || 0}</div>
              <div className="stat-label">Currency</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon"><Icon name="slime" size={32} color="#00C878" /></div>
              <div className="stat-value">{playerData?.ownedSlimes?.length || 0}</div>
              <div className="stat-label">Slimes</div>
            </div>
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
              <button onClick={() => setShowCreateGame(false)} className="close-btn">✕</button>
            </div>

            <div className="game-mode-selector">
              <h3>Select Game Mode</h3>
              <div className="game-modes-grid">
                {[
                  { id: 'classic', name: 'Classic Quiz', icon: 'book', description: 'Traditional quiz format' },
                  { id: 'racing', name: 'Slime Racing', icon: 'lightning', description: 'Race to the finish!' },
                  { id: 'battle', name: 'Slime Battle', icon: 'gamepad', description: 'Battle other slimes!' },
                  { id: 'gold-quest', name: 'Gold Quest', icon: 'coin', description: 'Collect gold!' },
                  { id: 'tower', name: 'Tower Climb', icon: 'trophy', description: 'Climb to the top!' },
                  { id: 'survival', name: 'Survival Mode', icon: 'sparkles', description: 'Last standing!' },
                ].map((mode) => (
                  <div
                    key={mode.id}
                    className={`game-mode-card ${gameMode === mode.id ? 'selected' : ''}`}
                    onClick={() => setGameMode(mode.id)}
                  >
                    <Icon name={mode.icon} size={32} />
                    <h4>{mode.name}</h4>
                    <p>{mode.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="question-set-selector">
              <h3>Select Question Set</h3>
              <div className="sets-list">
                {questionSets.map((set) => (
                  <div
                    key={set.id}
                    className={`set-item ${selectedSet === set.id ? 'selected' : ''}`}
                    onClick={() => setSelectedSet(set.id)}
                  >
                    <h4>{set.title}</h4>
                    <p>{set.subject} • {set.questions.length} questions</p>
                  </div>
                ))}
                {questionSets.length === 0 && (
                  <p className="no-sets">No question sets yet. Create one first!</p>
                )}
              </div>
            </div>

            {gameMode && gameMode !== 'classic' && (
              <div className="map-selector-section">
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
                        {map.isDefault && <span className="default-badge-small">Default</span>}
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
              className="button button-primary button-large"
              onClick={handleCreateGame}
              disabled={!selectedSet}
            >
              Create Game
            </button>
          </motion.div>
        )}

        <div className="dashboard-grid">
          <motion.div
            className="join-game-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2>Join a Game</h2>
            <p>Enter the game code from your teacher</p>
            <form onSubmit={handleJoinGame} className="join-form">
              <input
                type="text"
                value={gameCode}
                onChange={(e) => setGameCode(e.target.value.toUpperCase())}
                placeholder="GAME CODE"
                className="game-code-input"
                maxLength={6}
              />
              <button type="submit" className="button button-primary">
                Join Game
              </button>
            </form>
          </motion.div>

          <motion.div
            className="current-slime-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2>Your Current Slime</h2>
            <div className="current-slime-display">
              <div className="slime-avatar">
                <img 
                  src={getSlimeSprite(playerData?.selectedSlime || 'mint')} 
                  alt="current slime"
                  className="slime-sprite-large"
                />
              </div>
              <div className="slime-name">
                {playerData?.selectedSlime?.charAt(0).toUpperCase() + playerData?.selectedSlime?.slice(1)} Slime
              </div>
              <button 
                className="button button-secondary"
                onClick={() => navigate('/shop')}
              >
                Visit Shop
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="collection-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2>Your Slime Collection</h2>
          <div className="slime-collection-grid">
            {playerData?.ownedSlimes?.slice(0, 8).map((slimeId, index) => (
              <motion.div
                key={slimeId}
                className={`collection-slime ${playerData.selectedSlime === slimeId ? 'selected' : ''}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                onClick={() => handleSelectSlime(slimeId)}
                style={{ cursor: 'pointer' }}
              >
                <div className="collection-slime-emoji">
                  <img 
                    src={getSlimeSprite(slimeId)} 
                    alt={slimeId}
                    className="slime-sprite-small"
                  />
                </div>
                <div className="collection-slime-name">
                  {slimeId.charAt(0).toUpperCase() + slimeId.slice(1)}
                </div>
                {playerData.selectedSlime === slimeId && (
                  <div className="equipped-badge">✓</div>
                )}
              </motion.div>
            ))}
            {(!playerData?.ownedSlimes || playerData.ownedSlimes.length < 8) && (
              <div className="collection-empty" onClick={() => navigate('/shop')}>
                <div className="empty-icon">+</div>
                <div className="empty-text">Get More</div>
              </div>
            )}
          </div>
          <button 
            className="button button-primary view-all-btn"
            onClick={() => setShowCollection(true)}
          >
            View Full Collection
          </button>
        </motion.div>

        {/* Collection Modal */}
        <AnimatePresence>
          {showCollection && (
            <motion.div
              className="collection-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCollection(false)}
            >
              <motion.div
                className="collection-modal"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  className="modal-close"
                  onClick={() => setShowCollection(false)}
                >
                  ✕
                </button>
                
                <h2><Icon name="slime" size={24} color="#00C878" /> My Slime Collection</h2>
                <div className="collection-stats">
                  <span>Collected: {playerData?.ownedSlimes?.length || 0} / {allSlimes.length}</span>
                  <span>Currency: <Icon name="coin" size={18} /> {playerData?.currency || 0}</span>
                </div>

                <div className="collection-modal-grid">
                  {playerData?.ownedSlimes?.map(slimeId => {
                    const slime = allSlimes.find(s => s.id === slimeId);
                    const isSelected = playerData.selectedSlime === slimeId;
                    
                    return slime ? (
                      <div 
                        key={slimeId} 
                        className={`collection-modal-slime ${isSelected ? 'active' : ''}`}
                        onClick={() => !isSelected && handleSelectSlime(slime.id)}
                        style={{ cursor: isSelected ? 'default' : 'pointer' }}
                      >
                        <div className="modal-slime-sprite">
                          <img 
                            src={getSlimeSprite(slime.id)} 
                            alt={slime.name}
                            className="sprite-img"
                          />
                          {isSelected && <div className="selected-badge">★ Equipped</div>}
                        </div>
                        <h4>{slime.name}</h4>
                        <div className="slime-rarity" style={{ 
                          color: {
                            common: '#95a5a6',
                            uncommon: '#27ae60',
                            rare: '#3498db',
                            epic: '#8e44ad',
                            legendary: '#f39c12',
                            mythic: '#c0392b',
                            secret: '#e74c3c'
                          }[slime.rarity]
                        }}>
                          {slime.rarity.toUpperCase()}
                        </div>
                        <div className="modal-slime-actions">
                          {slime.rarity !== 'secret' && playerData.ownedSlimes.length > 1 && !isSelected && (
                            <button 
                              className="button button-danger btn-small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSellSlime(slime.id);
                              }}
                            >
                              Sell
                            </button>
                          )}
                          {isSelected && (
                            <div className="equipped-indicator">Currently Equipped</div>
                          )}
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default StudentDashboard;

