import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Icon from '../components/Icon';
import { getSlimeSprite } from '../utils/slimeSprites';
import './Leaderboard.css';

function Leaderboard({ user }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [sortBy, setSortBy] = useState('totalWins');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, [sortBy]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/leaderboard?sortBy=${sortBy}&limit=20`);
      setLeaderboard(response.data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const sortOptions = [
    { value: 'totalWins', label: 'Most Wins', icon: '🏆' },
    { value: 'totalCorrect', label: 'Most Correct', icon: '✅' },
    { value: 'totalGames', label: 'Most Games', icon: '🎮' },
    { value: 'totalCurrencyEarned', label: 'Richest', icon: '💰' },
    { value: 'bestStreak', label: 'Best Streak', icon: '🔥' },
  ];

  const getMedalIcon = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const getStatValue = (player) => {
    switch (sortBy) {
      case 'totalWins': return player.totalWins;
      case 'totalCorrect': return player.totalCorrect;
      case 'totalGames': return player.totalGames;
      case 'totalCurrencyEarned': return player.totalCurrencyEarned.toLocaleString();
      case 'bestStreak': return player.bestStreak;
      default: return 0;
    }
  };

  return (
    <div className="leaderboard-page">
      <div className="leaderboard-container">
        <motion.div
          className="leaderboard-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="header-title">
            <h1><Icon name="trophy" size={40} /> Leaderboard</h1>
            <p>Top players in StudyHall</p>
          </div>
        </motion.div>

        <div className="sort-options">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              className={`sort-btn ${sortBy === option.value ? 'active' : ''}`}
              onClick={() => setSortBy(option.value)}
            >
              <span className="sort-icon">{option.icon}</span>
              <span className="sort-label">{option.label}</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading leaderboard...</p>
          </div>
        ) : (
          <motion.div
            className="leaderboard-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {leaderboard.length === 0 ? (
              <div className="empty-state">
                <Icon name="trophy" size={80} color="#ccc" />
                <p>No players yet. Be the first!</p>
              </div>
            ) : (
              leaderboard.map((player, index) => {
                const rank = index + 1;
                const isCurrentUser = user && player.userId === parseInt(user.id);
                
                return (
                  <motion.div
                    key={player.userId}
                    className={`leaderboard-item ${isCurrentUser ? 'current-user' : ''} ${rank <= 3 ? 'top-three' : ''}`}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="rank">
                      {rank <= 3 ? (
                        <span className="medal">{getMedalIcon(rank)}</span>
                      ) : (
                        <span className="rank-number">#{rank}</span>
                      )}
                    </div>

                    <div className="player-info">
                      <div className="player-slime">
                        <img 
                          src={getSlimeSprite(player.selectedSlime || 'mint')} 
                          alt="slime"
                          className="slime-sprite"
                        />
                      </div>
                      <div className="player-details">
                        <div className="player-name">
                          {player.username}
                          {isCurrentUser && <span className="you-badge">You</span>}
                        </div>
                        <div className="player-stats-mini">
                          <span>
                            <Icon name="gamepad" size={14} /> {player.totalGames}
                          </span>
                          <span>
                            <Icon name="trophy" size={14} /> {player.totalWins}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="primary-stat">
                      <div className="stat-value">{getStatValue(player)}</div>
                      <div className="stat-label">
                        {sortOptions.find(o => o.value === sortBy)?.label.replace('Most ', '').replace('Best ', '')}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;

