import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { getSlimeDisplay, getSlimeName } from '../utils/slimeSprites';
import './SlimeShop.css';

function SlimeShop({ user }) {
  const [packs, setPacks] = useState([]);
  const [slimes, setSlimes] = useState([]);
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [easterEggCode, setEasterEggCode] = useState('');
  const [rewardSlime, setRewardSlime] = useState(null);

  useEffect(() => {
    fetchData();
  }, [user.id]);

  // Easter egg listener
  useEffect(() => {
    let sequence = '';
    const handleKeyPress = (e) => {
      sequence += e.key.toLowerCase();
      if (sequence.includes('takotime!!!')) {
        setShowEasterEgg(true);
        sequence = '';
      }
      // Keep only last 15 characters
      if (sequence.length > 15) {
        sequence = sequence.slice(-15);
      }
    };
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, []);

  const fetchData = async () => {
    try {
      const [packsRes, slimesRes, playerRes] = await Promise.all([
        axios.get('/api/packs'),
        axios.get('/api/slimes'),
        axios.get(`/api/player/${user.id}`)
      ]);
      setPacks(packsRes.data);
      setSlimes(slimesRes.data);
      setPlayerData(playerRes.data);
    } catch (error) {
      console.error('Error fetching shop data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyPack = async (packId) => {
    try {
      const response = await axios.post(`/api/player/${user.id}/buy-pack`, { packId });
      setPlayerData(response.data.player);
      setRewardSlime(response.data.receivedSlime);
      setTimeout(() => setRewardSlime(null), 3000);
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to purchase pack');
    }
  };

  const handleSelectSlime = async (slimeId) => {
    try {
      const response = await axios.post(`/api/player/${user.id}/select-slime`, { slimeId });
      setPlayerData(response.data);
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to select slime');
    }
  };

  const handleSellSlime = async (slimeId) => {
    if (!window.confirm('Are you sure you want to sell this slime?')) return;
    
    try {
      const response = await axios.post(`/api/player/${user.id}/sell-slime`, { slimeId });
      setPlayerData(response.data.player);
      alert(`Sold slime for ${response.data.earnedCurrency} coins!`);
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to sell slime');
    }
  };

  const handleRedeemCode = async () => {
    try {
      const response = await axios.post(`/api/player/${user.id}/redeem-code`, { 
        code: easterEggCode.toUpperCase() 
      });
      setPlayerData(response.data.player);
      alert(`Unlocked ${response.data.receivedSlime.name}! 🎉`);
      setShowEasterEgg(false);
      setEasterEggCode('');
    } catch (error) {
      alert(error.response?.data?.error || 'Invalid code');
    }
  };

  if (loading) {
    return (
      <div className="shop-page">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="shop-page">
      <div className="container">
        <div className="shop-header">
          <h1>🛒 Slime Shop</h1>
          <div className="player-currency">
            💰 {playerData.currency} Coins
          </div>
        </div>

        {rewardSlime && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="reward-popup"
          >
            <h2>🎉 You got:</h2>
            <div className="reward-slime">{getSlimeDisplay(rewardSlime.id)}</div>
            <p>{rewardSlime.name}</p>
          </motion.div>
        )}

        <section className="packs-section">
          <h2>📦 Slime Packs</h2>
          <div className="packs-grid">
            {packs.map((pack) => (
              <motion.div
                key={pack.id}
                whileHover={{ scale: 1.02 }}
                className={`pack-card rarity-${pack.rarity}`}
              >
                <h3>{pack.name}</h3>
                <p className="pack-desc">{pack.description}</p>
                <div className="pack-price">💰 {pack.price}</div>
                <button
                  onClick={() => handleBuyPack(pack.id)}
                  disabled={playerData.currency < pack.price}
                  className="button button-primary"
                >
                  Buy Pack
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="collection-section">
          <h2>🎨 Your Collection ({playerData.ownedSlimes.length}/{slimes.length})</h2>
          <div className="slimes-grid">
            {slimes.map((slime) => {
              const owned = playerData.ownedSlimes.includes(slime.id);
              const selected = playerData.selectedSlime === slime.id;
              
              return (
                <motion.div
                  key={slime.id}
                  whileHover={owned ? { scale: 1.05 } : {}}
                  className={`slime-card ${owned ? 'owned' : 'locked'} ${selected ? 'selected' : ''} rarity-${slime.rarity}`}
                >
                  <div className="slime-display">
                    {owned ? getSlimeDisplay(slime.id) : '🔒'}
                  </div>
                  <div className="slime-name">{slime.name}</div>
                  <div className="slime-rarity">{slime.rarity}</div>
                  {owned && !selected && (
                    <div className="slime-actions">
                      <button
                        onClick={() => handleSelectSlime(slime.id)}
                        className="action-btn select-btn"
                      >
                        Equip
                      </button>
                      <button
                        onClick={() => handleSellSlime(slime.id)}
                        className="action-btn sell-btn"
                      >
                        Sell
                      </button>
                    </div>
                  )}
                  {selected && <div className="selected-badge">✓ Equipped</div>}
                </motion.div>
              );
            })}
          </div>
        </section>

        <button
          onClick={() => setShowEasterEgg(!showEasterEgg)}
          className="easter-egg-button"
        >
          🥚 Enter Code
        </button>

        {showEasterEgg && (
          <div className="easter-egg-modal">
            <div className="modal-content">
              <h3>🔐 Secret Code</h3>
              <p>Enter a secret code to unlock special slimes!</p>
              <input
                type="text"
                value={easterEggCode}
                onChange={(e) => setEasterEggCode(e.target.value)}
                placeholder="Enter code..."
                className="code-input"
              />
              <div className="modal-actions">
                <button onClick={handleRedeemCode} className="button button-success">
                  Redeem
                </button>
                <button onClick={() => setShowEasterEgg(false)} className="button button-secondary">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SlimeShop;
