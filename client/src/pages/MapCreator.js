import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Icon from '../components/Icon';
import './MapCreator.css';

function MapCreator({ user }) {
  const { mapId } = useParams();
  const navigate = useNavigate();
  
  const [mapName, setMapName] = useState('');
  const [gameMode, setGameMode] = useState('racing');
  const [description, setDescription] = useState('');
  const [gridWidth, setGridWidth] = useState(15);
  const [gridHeight, setGridHeight] = useState(10);
  const [tiles, setTiles] = useState([]);
  const [selectedTileType, setSelectedTileType] = useState('track');
  const [isDrawing, setIsDrawing] = useState(false);

  const gameModes = [
    { id: 'racing', name: 'Racing', icon: 'lightning' },
    { id: 'battle', name: 'Battle', icon: 'gamepad' },
    { id: 'tower', name: 'Tower', icon: 'trophy' },
    { id: 'gold-quest', name: 'Gold Quest', icon: 'coin' },
    { id: 'survival', name: 'Survival', icon: 'sparkles' }
  ];

  const tileTypes = {
    racing: [
      { type: 'track', color: '#00FA9A', name: 'Track' },
      { type: 'grass', color: '#7FD957', name: 'Grass' },
      { type: 'water', color: '#00BCD4', name: 'Water' },
      { type: 'boost', color: '#FFD700', name: 'Boost Pad' },
      { type: 'obstacle', color: '#E74C3C', name: 'Obstacle' },
      { type: 'enemy-weak', color: '#FF6B6B', name: '□ Weak Enemy' },
      { type: 'enemy-medium', color: '#FF4757', name: '■ Medium Enemy' },
      { type: 'enemy-strong', color: '#C0392B', name: '■ Strong Enemy' }
    ],
    battle: [
      { type: 'arena', color: '#00FA9A', name: 'Arena Floor' },
      { type: 'wall', color: '#2C3E50', name: 'Wall' },
      { type: 'powerup', color: '#FFD700', name: 'Power-Up' },
      { type: 'spawn', color: '#00BCD4', name: 'Spawn Point' },
      { type: 'enemy-weak', color: '#FF6B6B', name: '□ Weak Enemy' },
      { type: 'enemy-medium', color: '#FF4757', name: '■ Medium Enemy' },
      { type: 'enemy-strong', color: '#C0392B', name: '■ Strong Enemy' },
      { type: 'enemy-boss', color: '#8B0000', name: '■ Boss Enemy' }
    ],
    tower: [
      { type: 'platform', color: '#00FA9A', name: 'Platform' },
      { type: 'sky', color: '#E1F5FE', name: 'Sky' },
      { type: 'ladder', color: '#795548', name: 'Ladder' },
      { type: 'checkpoint', color: '#FFD700', name: 'Checkpoint' },
      { type: 'enemy-path-start', color: '#FF6B6B', name: '▶ Enemy Start' },
      { type: 'enemy-path', color: '#FF8C94', name: '→ Enemy Path' },
      { type: 'enemy-path-end', color: '#E74C3C', name: '● Base/Goal' },
      { type: 'tower-zone', color: '#3498DB', name: '⊕ Tower Zone' },
      { type: 'enemy-weak', color: '#FFA07A', name: '□ Weak Enemy' },
      { type: 'enemy-medium', color: '#FF6347', name: '■ Medium Enemy' },
      { type: 'enemy-strong', color: '#DC143C', name: '■ Strong Enemy' }
    ],
    'gold-quest': [
      { type: 'path', color: '#00FA9A', name: 'Path' },
      { type: 'gold', color: '#FFD700', name: 'Gold' },
      { type: 'wall', color: '#2C3E50', name: 'Wall' },
      { type: 'trap', color: '#E74C3C', name: 'Trap' },
      { type: 'enemy-weak', color: '#FF6B6B', name: '□ Weak Enemy' },
      { type: 'enemy-medium', color: '#FF4757', name: '■ Medium Enemy' },
      { type: 'enemy-strong', color: '#C0392B', name: '■ Strong Enemy' }
    ],
    survival: [
      { type: 'safe', color: '#00FA9A', name: 'Safe Zone' },
      { type: 'danger', color: '#E74C3C', name: 'Danger Zone' },
      { type: 'moving', color: '#FFA500', name: 'Moving Platform' },
      { type: 'enemy-weak', color: '#FF6B6B', name: '□ Weak Enemy' },
      { type: 'enemy-medium', color: '#FF4757', name: '■ Medium Enemy' },
      { type: 'enemy-strong', color: '#C0392B', name: '■ Strong Enemy' },
      { type: 'enemy-swarm', color: '#8B0000', name: '▣ Enemy Swarm' }
    ]
  };

  useEffect(() => {
    if (mapId) {
      loadMap();
    } else {
      initializeGrid();
    }
  }, [mapId]);

  useEffect(() => {
    if (!mapId) {
      initializeGrid();
    }
  }, [gridWidth, gridHeight, gameMode]);

  const loadMap = async () => {
    try {
      const response = await axios.get(`/api/maps/${mapId}`);
      const map = response.data;
      setMapName(map.name);
      setGameMode(map.gameMode);
      setDescription(map.description);
      setTiles(map.tiles);
      setGridWidth(Math.max(...map.tiles.map(t => t.x)) + 1);
      setGridHeight(Math.max(...map.tiles.map(t => t.y)) + 1);
    } catch (error) {
      console.error('Error loading map:', error);
      alert('Failed to load map');
      navigate('/maps');
    }
  };

  const initializeGrid = () => {
    const newTiles = [];
    const defaultType = tileTypes[gameMode][0].type;
    
    for (let y = 0; y < gridHeight; y++) {
      for (let x = 0; x < gridWidth; x++) {
        newTiles.push({
          x,
          y,
          type: defaultType,
          obstacle: null
        });
      }
    }
    
    setTiles(newTiles);
    setSelectedTileType(defaultType);
  };

  const handleTileClick = (x, y) => {
    updateTile(x, y);
  };

  const handleTileDrag = (x, y) => {
    if (isDrawing) {
      updateTile(x, y);
    }
  };

  const updateTile = (x, y) => {
    setTiles(prevTiles => {
      const newTiles = [...prevTiles];
      const index = newTiles.findIndex(t => t.x === x && t.y === y);
      if (index !== -1) {
        newTiles[index] = { ...newTiles[index], type: selectedTileType };
      }
      return newTiles;
    });
  };

  const handleSave = async () => {
    if (!mapName.trim()) {
      alert('Please enter a map name');
      return;
    }

    const mapData = {
      name: mapName,
      gameMode,
      description,
      tiles,
      createdBy: user.username
    };

    try {
      if (mapId) {
        await axios.put(`/api/maps/${mapId}`, mapData);
        alert('Map updated successfully!');
      } else {
        await axios.post('/api/maps', mapData);
        alert('Map created successfully!');
      }
      navigate('/maps');
    } catch (error) {
      console.error('Error saving map:', error);
      alert(error.response?.data?.error || 'Failed to save map');
    }
  };

  const handleClear = () => {
    if (window.confirm('Clear the entire map? This cannot be undone.')) {
      initializeGrid();
    }
  };

  const getTileColor = (tileType) => {
    const tileConfig = tileTypes[gameMode].find(t => t.type === tileType);
    return tileConfig ? tileConfig.color : '#CCCCCC';
  };

  const isEnemyTile = (tileType) => {
    return tileType.startsWith('enemy-') || tileType === 'enemy-path-start' || tileType === 'enemy-path-end';
  };

  const getEnemyIcon = (tileType) => {
    if (tileType === 'enemy-path-start') return '▶';
    if (tileType === 'enemy-path-end') return '●';
    if (tileType === 'enemy-path') return '→';
    if (tileType === 'enemy-boss') return '■■';
    if (tileType === 'enemy-swarm') return '▣';
    if (tileType === 'enemy-strong') return '■';
    if (tileType === 'enemy-medium') return '■';
    if (tileType === 'enemy-weak') return '□';
    return '■';
  };

  return (
    <div className="map-creator-page">
      <div className="map-creator-container">
        <div className="creator-header">
          <button onClick={() => navigate('/maps')} className="back-btn">
            ← Back to Maps
          </button>
          <h1>{mapId ? 'Edit Map' : 'Create New Map'}</h1>
        </div>

        <div className="creator-layout">
          {/* Left Sidebar - Map Settings */}
          <div className="creator-sidebar">
            <div className="settings-section">
              <h3>Map Settings</h3>
              
              <div className="form-group">
                <label>Map Name</label>
                <input
                  type="text"
                  value={mapName}
                  onChange={(e) => setMapName(e.target.value)}
                  placeholder="My Awesome Map"
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your map..."
                  className="input-field"
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label>Game Mode</label>
                <select
                  value={gameMode}
                  onChange={(e) => setGameMode(e.target.value)}
                  className="input-field"
                  disabled={!!mapId}
                >
                  {gameModes.map(mode => (
                    <option key={mode.id} value={mode.id}>
                      {mode.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Grid Size</label>
                <div className="grid-size-inputs">
                  <input
                    type="number"
                    value={gridWidth}
                    onChange={(e) => setGridWidth(Math.max(5, Math.min(30, parseInt(e.target.value) || 10)))}
                    min="5"
                    max="30"
                    className="input-field small"
                    disabled={!!mapId}
                  />
                  <span>×</span>
                  <input
                    type="number"
                    value={gridHeight}
                    onChange={(e) => setGridHeight(Math.max(5, Math.min(30, parseInt(e.target.value) || 10)))}
                    min="5"
                    max="30"
                    className="input-field small"
                    disabled={!!mapId}
                  />
                </div>
              </div>
            </div>

            <div className="settings-section">
              <h3>Tile Palette</h3>
              <div className="tile-palette">
                {tileTypes[gameMode].map(tile => (
                  <div
                    key={tile.type}
                    className={`palette-tile ${selectedTileType === tile.type ? 'selected' : ''}`}
                    onClick={() => setSelectedTileType(tile.type)}
                    style={{ backgroundColor: tile.color }}
                  >
                    <span className="tile-name">{tile.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="creator-actions">
              <button onClick={handleClear} className="button button-secondary">
                <Icon name="sparkles" size={18} /> Clear Map
              </button>
              <button onClick={handleSave} className="button button-primary">
                <Icon name="trophy" size={18} /> Save Map
              </button>
            </div>
          </div>

          {/* Main Canvas - Grid Editor */}
          <div className="creator-canvas">
            <div className="canvas-toolbar">
              <div className="toolbar-info">
                <Icon name="book" size={20} />
                <span>Click or drag to paint tiles</span>
              </div>
              <div className="toolbar-info">
                <div
                  className="current-tile-preview"
                  style={{ backgroundColor: getTileColor(selectedTileType) }}
                />
                <span>Selected: {tileTypes[gameMode].find(t => t.type === selectedTileType)?.name}</span>
              </div>
            </div>

            <div className="grid-container">
              <div
                className="map-grid"
                style={{
                  gridTemplateColumns: `repeat(${gridWidth}, 1fr)`,
                  gridTemplateRows: `repeat(${gridHeight}, 1fr)`
                }}
                onMouseDown={() => setIsDrawing(true)}
                onMouseUp={() => setIsDrawing(false)}
                onMouseLeave={() => setIsDrawing(false)}
              >
                {tiles.map((tile, index) => (
                  <motion.div
                    key={`${tile.x}-${tile.y}`}
                    className={`grid-tile ${isEnemyTile(tile.type) ? 'enemy-tile' : ''}`}
                    style={{ backgroundColor: getTileColor(tile.type) }}
                    onClick={() => handleTileClick(tile.x, tile.y)}
                    onMouseEnter={() => handleTileDrag(tile.x, tile.y)}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.1 }}
                  >
                    {isEnemyTile(tile.type) && (
                      <span className="enemy-icon">{getEnemyIcon(tile.type)}</span>
                    )}
                    {tile.type === 'tower-zone' && (
                      <span className="tower-icon">⊕</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapCreator;

