import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { getSlimeSprite } from '../utils/slimeSprites';
import './SlimeShop.css';

function SlimeShop({ user }) {
  const [packs, setPacks] = useState([]);
  const [allSlimes, setAllSlimes] = useState([]);
  const [playerData, setPlayerData] = useState(null);
  const [selectedPack, setSelectedPack] = useState(null);
  const [receivedSlime, setReceivedSlime] = useState(null);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [easterEggCode, setEasterEggCode] = useState('');
  const navigate = useNavigate();

  // Easter egg hints
  const secretHints = [
    { emoji: '🧙', hint: 'Cast spells and brew potions...', keyword: 'MAGIC' },
    { emoji: '👑', hint: 'He who rules the kingdom...', keyword: 'ROYALTY' },
    { emoji: '👸', hint: 'She who wears the CROWN...', keyword: 'hidden in hint' },
    { emoji: '⚔️', hint: 'A HERO in shining armor...', keyword: 'hidden in hint' },
    { emoji: '🥷', hint: 'Silent as shadows, masters of STEALTH...', keyword: 'hidden in hint' },
    { emoji: '🦄', hint: 'MYSTICAL creatures with horns of legend...', keyword: 'hidden in hint' },
    { emoji: '🐙', hint: 'When it\'s time for tacos, shout "___TIME!!!"', keyword: 'TAKO' }
  ];

  useEffect(() => {
    fetchPacks();
    fetchSlimes();
    fetchPlayerData();
  }, []);

  const fetchPacks = async () => {
    try {
      const response = await axios.get('/api/packs');
      setPacks(response.data);
    } catch (error) {
      console.error('Error fetching packs:', error);
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

  const fetchPlayerData = async () => {
    try {
      const response = await axios.get(`/api/player/${user.id}`);
      setPlayerData(response.data);
    } catch (error) {
      console.error('Error fetching player data:', error);
    }
  };

  const handleBuyPack = async (packId, price) => {
    if (!playerData) return;

    if (playerData.currency < price) {
      alert('Not enough currency!');
      return;
    }

    try {
      const response = await axios.post(`/api/player/${user.id}/buy-pack`, { packId });
      setPlayerData(response.data.player);
      setReceivedSlime(response.data.receivedSlime);
      setSelectedPack(null);
      
      // Update user in localStorage
      const updatedUser = { ...user, currency: response.data.player.currency };
      localStorage.setItem('studyhall_user', JSON.stringify(updatedUser));
    } catch (error) {
      alert(error.response?.data?.error || 'Purchase failed');
    }
  };

  const handleRedeemCode = async () => {
    if (!easterEggCode.trim()) {
      alert('Please enter a code!');
      return;
    }

    try {
      const response = await axios.post(`/api/player/${user.id}/redeem-code`, { 
        code: easterEggCode 
      });
      setPlayerData(response.data.player);
      setReceivedSlime(response.data.receivedSlime);
      setEasterEggCode('');
      setShowCodeInput(false);
      alert('Secret code redeemed successfully!');
    } catch (error) {
      alert(error.response?.data?.error || 'Invalid code');
    }
  };

  const rarityColors = {
    common: '#95a5a6',
    uncommon: '#27ae60',
    rare: '#3498db',
    epic: '#8e44ad',
    legendary: '#f39c12',
    mythic: '#c0392b',
    secret: '#e74c3c'
  };

  const rarityGradients = {
    common: 'linear-gradient(135deg, #95a5a6, #7f8c8d)',
    uncommon: 'linear-gradient(135deg, #27ae60, #2ecc71)',
    rare: 'linear-gradient(135deg, #3498db, #2980b9)',
    epic: 'linear-gradient(135deg, #8e44ad, #9b59b6)',
    legendary: 'linear-gradient(135deg, #f39c12, #f1c40f)',
    mythic: 'linear-gradient(135deg, #c0392b, #e74c3c)'
  };

  return (
    <div className="shop-page">
      <div className="shop-container">
        <div className="shop-header">
          <button onClick={() => navigate('/student')} className="back-btn">
            ← Back
          </button>
          <div className="header-content">
            <h1>🎁 Slime Pack Shop</h1>
            <p>Buy packs and discover random slimes!</p>
          </div>
          <div className="header-actions">
            <div className="currency-display">
              <span className="currency-icon">💰</span>
              <span className="currency-amount">{playerData?.currency || 0}</span>
            </div>
            <button 
              className="easter-egg-btn"
              onClick={() => setShowCodeInput(!showCodeInput)}
            >
              🎁 Redeem Code
            </button>
          </div>
        </div>

        {showCodeInput && (
          <motion.div 
            className="code-input-section"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3>🔮 Enter Secret Code</h3>
            <div className="code-input-group">
              <input
                type="text"
                value={easterEggCode}
                onChange={(e) => setEasterEggCode(e.target.value)}
                placeholder="Enter code..."
                className="code-input"
                onKeyPress={(e) => e.key === 'Enter' && handleRedeemCode()}
              />
              <button onClick={handleRedeemCode} className="button button-primary">
                Redeem
              </button>
            </div>
            
            {/* Hints Toggle */}
            <div className="hints-toggle-container">
              <button 
                className="hints-toggle-btn"
                onClick={() => setShowHints(!showHints)}
              >
                {showHints ? '🔒 Hide Hints' : '💡 Show Hints'}
              </button>
            </div>

            {/* Hints Section */}
            <AnimatePresence>
              {showHints && (
                <motion.div
                  className="hints-section"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4>🗺️ Secret Slime Hints</h4>
                  <p className="hints-intro">Decipher these clues to unlock secret slimes!</p>
                  <div className="hints-grid">
                    {secretHints.map((hint, index) => (
                      <motion.div
                        key={index}
                        className="hint-card"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="hint-emoji">{hint.emoji}</div>
                        <div className="hint-text">{hint.hint}</div>
                      </motion.div>
                    ))}
                  </div>
                  <p className="hints-tip">
                    ✨ <strong>Tip:</strong> Look for CAPITAL words in the hints!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        <div className="packs-grid">
          {packs.map((pack, index) => {
            const canAfford = (playerData?.currency || 0) >= pack.price;
            
            // Get preview slimes from pack
            const previewSlimes = pack.slimeIds.slice(0, 3).map(id => 
              allSlimes.find(s => s.id === id)
            ).filter(Boolean);

            return (
              <motion.div
                key={pack.id}
                className="pack-card"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03, y: -5 }}
                onClick={() => setSelectedPack(pack)}
                style={{
                  background: rarityGradients[pack.rarity]
                }}
              >
                <div className="pack-header">
                  <div 
                    className="pack-rarity-badge"
                    style={{ background: rarityColors[pack.rarity] }}
                  >
                    {pack.rarity}
                  </div>
                </div>

                <div className="pack-icon">
                  <div className="pack-box">📦</div>
                </div>

                <h2 className="pack-name">{pack.name}</h2>
                <p className="pack-description">{pack.description}</p>

                <div className="pack-preview">
                  <div className="preview-slimes">
                    {previewSlimes.map((slime, i) => (
                      <div key={i} className="preview-slime">
                        <img 
                          src={getSlimeSprite(slime.id)} 
                          alt={slime.name}
                          className="preview-sprite"
                        />
                      </div>
                    ))}
                    <div className="preview-more">+{pack.slimeIds.length - 3} more</div>
                  </div>
                </div>

                <div className="pack-footer">
                  <div className="pack-price">
                    <span className="price-icon">💰</span>
                    <span className="price-amount">{pack.price}</span>
                  </div>
                  <button 
                    className={`button button-primary pack-buy-btn ${!canAfford ? 'disabled' : ''}`}
                    disabled={!canAfford}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBuyPack(pack.id, pack.price);
                    }}
                  >
                    {canAfford ? 'Open Pack' : 'Not Enough'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Pack Details Modal */}
        <AnimatePresence>
          {selectedPack && (
            <motion.div
              className="pack-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPack(null)}
            >
              <motion.div
                className="pack-modal"
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  className="modal-close"
                  onClick={() => setSelectedPack(null)}
                >
                  ✕
                </button>
                
                <h2>{selectedPack.name}</h2>
                <div 
                  className="modal-rarity"
                  style={{ color: rarityColors[selectedPack.rarity] }}
                >
                  {selectedPack.rarity.toUpperCase()} PACK
                </div>
                <p className="modal-description">{selectedPack.description}</p>

                <div className="pack-contents">
                  <h3>📋 Pack Contents ({selectedPack.slimeIds.length} slimes)</h3>
                  <div className="contents-grid">
                    {selectedPack.slimeIds.map(slimeId => {
                      const slime = allSlimes.find(s => s.id === slimeId);
                      const owned = playerData?.ownedSlimes?.includes(slimeId);
                      
                      return slime ? (
                        <div key={slimeId} className={`content-slime ${owned ? 'owned' : ''}`}>
                          <img 
                            src={getSlimeSprite(slime.id)} 
                            alt={slime.name}
                            className="content-sprite"
                          />
                          <span className="content-name">{slime.name}</span>
                          {owned && <span className="owned-check">✓</span>}
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>

                <div className="modal-actions">
                  <div className="modal-price">
                    <span className="price-icon">💰</span>
                    <span className="price-amount">{selectedPack.price}</span>
                  </div>
                  <button 
                    className={`button button-primary modal-buy-btn ${(playerData?.currency || 0) < selectedPack.price ? 'disabled' : ''}`}
                    disabled={(playerData?.currency || 0) < selectedPack.price}
                    onClick={() => handleBuyPack(selectedPack.id, selectedPack.price)}
                  >
                    Open Pack
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Received Slime Animation */}
        <AnimatePresence>
          {receivedSlime && (
            <motion.div
              className="reveal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="reveal-modal"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: "spring", duration: 0.8 }}
              >
                <h2 className="reveal-title">✨ You Got! ✨</h2>
                <motion.div 
                  className="reveal-slime"
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2 
                  }}
                >
                  <img 
                    src={getSlimeSprite(receivedSlime.id)} 
                    alt={receivedSlime.name}
                    className="reveal-sprite"
                  />
                </motion.div>
                <h3 className="reveal-name">{receivedSlime.name}</h3>
                <div 
                  className="reveal-rarity"
                  style={{ color: rarityColors[receivedSlime.rarity] }}
                >
                  {receivedSlime.rarity.toUpperCase()}
                </div>
                <button 
                  className="button button-success reveal-close-btn"
                  onClick={() => setReceivedSlime(null)}
                >
                  Awesome!
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SlimeShop;
