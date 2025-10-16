import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Icon from '../components/Icon';
import './MapsBrowser.css';

function MapsBrowser({ user }) {
  const [maps, setMaps] = useState([]);
  const [filteredMaps, setFilteredMaps] = useState([]);
  const [selectedGameMode, setSelectedGameMode] = useState('all');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const gameModes = [
    { id: 'all', name: 'All Maps', icon: 'book' },
    { id: 'racing', name: 'Racing', icon: 'lightning' },
    { id: 'battle', name: 'Battle', icon: 'gamepad' },
    { id: 'tower', name: 'Tower', icon: 'trophy' },
    { id: 'gold-quest', name: 'Gold Quest', icon: 'coin' },
    { id: 'survival', name: 'Survival', icon: 'sparkles' }
  ];

  useEffect(() => {
    fetchMaps();
  }, []);

  useEffect(() => {
    filterMaps();
  }, [selectedGameMode, maps]);

  const fetchMaps = async () => {
    try {
      const response = await axios.get('/api/maps');
      setMaps(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching maps:', error);
      setLoading(false);
    }
  };

  const filterMaps = () => {
    if (selectedGameMode === 'all') {
      setFilteredMaps(maps);
    } else {
      setFilteredMaps(maps.filter(map => map.gameMode === selectedGameMode));
    }
  };

  const handleDeleteMap = async (mapId, mapName) => {
    if (!window.confirm(`Delete "${mapName}"? This cannot be undone.`)) {
      return;
    }

    try {
      await axios.delete(`/api/maps/${mapId}`);
      alert('Map deleted successfully!');
      fetchMaps();
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to delete map');
    }
  };

  const getModeIcon = (gameMode) => {
    const mode = gameModes.find(m => m.id === gameMode);
    return mode ? mode.icon : 'book';
  };

  const getModeName = (gameMode) => {
    const mode = gameModes.find(m => m.id === gameMode);
    return mode ? mode.name : gameMode;
  };

  return (
    <div className="maps-browser-page">
      <div className="maps-container">
        <div className="maps-header">
          <div className="header-content">
            <h1>🗺️ Map Collection</h1>
            <p>Create and manage custom maps for your games</p>
          </div>
          <button
            className="button button-primary"
            onClick={() => navigate('/maps/create')}
          >
            <Icon name="sparkles" size={20} /> Create New Map
          </button>
        </div>

        {/* Game Mode Filter */}
        <div className="mode-filter">
          {gameModes.map(mode => (
            <button
              key={mode.id}
              className={`mode-filter-btn ${selectedGameMode === mode.id ? 'active' : ''}`}
              onClick={() => setSelectedGameMode(mode.id)}
            >
              <Icon name={mode.icon} size={20} />
              <span>{mode.name}</span>
            </button>
          ))}
        </div>

        {/* Maps Grid */}
        {loading ? (
          <div className="loading-state">
            <Icon name="slime" size={48} color="#00FA9A" />
            <p>Loading maps...</p>
          </div>
        ) : filteredMaps.length === 0 ? (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Icon name="book" size={64} color="#ccc" />
            <h3>No Maps Yet</h3>
            <p>
              {selectedGameMode === 'all'
                ? 'Create your first custom map!'
                : `No maps for ${getModeName(selectedGameMode)} mode yet.`}
            </p>
            <button
              className="button button-primary"
              onClick={() => navigate('/maps/create')}
            >
              <Icon name="sparkles" size={18} /> Create Map
            </button>
          </motion.div>
        ) : (
          <div className="maps-grid">
            {filteredMaps.map((map, index) => (
              <motion.div
                key={map.id}
                className="map-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
              >
                {map.isDefault && (
                  <div className="default-badge">
                    <Icon name="star" size={14} /> Default
                  </div>
                )}

                <div className="map-preview">
                  <div className="mini-grid">
                    {map.tiles.slice(0, 100).map((tile, i) => (
                      <div
                        key={i}
                        className="mini-tile"
                        style={{
                          backgroundColor: getTileColor(tile.type, map.gameMode)
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="map-info">
                  <div className="map-header-row">
                    <h3>{map.name}</h3>
                    <div className="map-mode-badge">
                      <Icon name={getModeIcon(map.gameMode)} size={16} />
                    </div>
                  </div>
                  
                  <p className="map-description">
                    {map.description || 'No description provided'}
                  </p>

                  <div className="map-meta">
                    <span className="map-creator">
                      By {map.createdBy}
                    </span>
                    <span className="map-size">
                      {Math.max(...map.tiles.map(t => t.x)) + 1} × {Math.max(...map.tiles.map(t => t.y)) + 1}
                    </span>
                  </div>

                  <div className="map-actions">
                    <button
                      className="button button-secondary btn-small"
                      onClick={() => navigate(`/maps/${map.id}`)}
                    >
                      <Icon name="book" size={16} /> View
                    </button>
                    
                    {!map.isDefault && map.createdBy === user.username && (
                      <>
                        <button
                          className="button button-primary btn-small"
                          onClick={() => navigate(`/maps/edit/${map.id}`)}
                        >
                          <Icon name="sparkles" size={16} /> Edit
                        </button>
                        <button
                          className="button button-danger btn-small"
                          onClick={() => handleDeleteMap(map.id, map.name)}
                        >
                          ✕
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function to get tile colors
function getTileColor(tileType, gameMode) {
  const colorMap = {
    racing: {
      track: '#00FA9A',
      grass: '#7FD957',
      water: '#00BCD4',
      boost: '#FFD700',
      obstacle: '#E74C3C',
      'enemy-weak': '#FF6B6B',
      'enemy-medium': '#FF4757',
      'enemy-strong': '#C0392B'
    },
    battle: {
      arena: '#00FA9A',
      wall: '#2C3E50',
      powerup: '#FFD700',
      spawn: '#00BCD4',
      'enemy-weak': '#FF6B6B',
      'enemy-medium': '#FF4757',
      'enemy-strong': '#C0392B',
      'enemy-boss': '#8B0000'
    },
    tower: {
      platform: '#00FA9A',
      sky: '#E1F5FE',
      ladder: '#795548',
      checkpoint: '#FFD700',
      'enemy-path-start': '#FF6B6B',
      'enemy-path': '#FF8C94',
      'enemy-path-end': '#E74C3C',
      'tower-zone': '#3498DB',
      'enemy-weak': '#FFA07A',
      'enemy-medium': '#FF6347',
      'enemy-strong': '#DC143C'
    },
    'gold-quest': {
      path: '#00FA9A',
      gold: '#FFD700',
      wall: '#2C3E50',
      trap: '#E74C3C',
      'enemy-weak': '#FF6B6B',
      'enemy-medium': '#FF4757',
      'enemy-strong': '#C0392B'
    },
    survival: {
      safe: '#00FA9A',
      danger: '#E74C3C',
      moving: '#FFA500',
      'enemy-weak': '#FF6B6B',
      'enemy-medium': '#FF4757',
      'enemy-strong': '#C0392B',
      'enemy-swarm': '#8B0000'
    }
  };

  return colorMap[gameMode]?.[tileType] || '#CCCCCC';
}

export default MapsBrowser;

