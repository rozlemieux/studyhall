import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Icon from '../components/Icon';
import './Achievements.css';

function Achievements({ user }) {
  const [achievements, setAchievements] = useState([]);
  const [userAchievements, setUserAchievements] = useState([]);
  const [stats, setStats] = useState(null);
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [user.id]);

  const fetchData = async () => {
    try {
      const [allRes, userRes, statsRes, playerRes] = await Promise.all([
        axios.get('/api/achievements'),
        axios.get(`/api/achievements/${user.id}`),
        axios.get(`/api/stats/${user.id}`),
        axios.get(`/api/player/${user.id}`)
      ]);
      setAchievements(allRes.data);
      setUserAchievements(userRes.data);
      setStats(statsRes.data);
      setPlayerData(playerRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProgress = (achievement) => {
    if (!stats || !playerData) return 0;
    
    switch (achievement.id) {
      case 'first-game':
      case 'games-10':
      case 'games-50':
      case 'games-100':
        return Math.min(stats.totalGames, achievement.requirement);
      case 'first-win':
      case 'wins-10':
      case 'wins-25':
        return Math.min(stats.totalWins, achievement.requirement);
      case 'streak-5':
      case 'streak-10':
        return Math.min(stats.bestStreak, achievement.requirement);
      case 'rich-1000':
      case 'rich-5000':
      case 'rich-10000':
        return Math.min(stats.totalCurrencyEarned, achievement.requirement);
      case 'slimes-5':
      case 'slimes-15':
      case 'slimes-all':
        return Math.min(playerData.ownedSlimes.length, achievement.requirement);
      default:
        return 0;
    }
  };

  const categories = {
    all: 'All',
    games: 'Games',
    wins: 'Wins',
    accuracy: 'Accuracy',
    currency: 'Currency',
    slimes: 'Slimes',
    social: 'Social',
    secret: 'Secret'
  };

  const filteredAchievements = filter === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === filter);

  const unlockedCount = userAchievements.length;
  const totalCount = achievements.length;
  const completionPercent = Math.round((unlockedCount / totalCount) * 100);

  if (loading) {
    return (
      <div className="achievements-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading achievements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="achievements-page">
      <div className="achievements-container">
        <motion.div
          className="achievements-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button className="back-button" onClick={() => navigate(-1)}>
            <Icon name="arrow-left" size={20} /> Back
          </button>
          <h1>🏆 Achievements</h1>
          <p>Unlock achievements by playing games and collecting slimes!</p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          className="progress-overview"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="progress-stats">
            <div className="progress-circle">
              <svg width="120" height="120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="#e0e0e0" strokeWidth="12" />
                <circle 
                  cx="60" 
                  cy="60" 
                  r="54" 
                  fill="none" 
                  stroke="#00C878" 
                  strokeWidth="12"
                  strokeDasharray={`${2 * Math.PI * 54}`}
                  strokeDashoffset={`${2 * Math.PI * 54 * (1 - completionPercent / 100)}`}
                  transform="rotate(-90 60 60)"
                  style={{ transition: 'stroke-dashoffset 1s ease' }}
                />
                <text x="60" y="60" textAnchor="middle" dy=".3em" fontSize="24" fontWeight="bold" fill="#00C878">
                  {completionPercent}%
                </text>
              </svg>
            </div>
            <div className="progress-info">
              <h3>Achievement Progress</h3>
              <p className="unlocked-count">{unlockedCount} / {totalCount} Unlocked</p>
              <p className="remaining">{totalCount - unlockedCount} remaining</p>
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <div className="category-filter">
          {Object.entries(categories).map(([key, label]) => (
            <button
              key={key}
              className={`category-btn ${filter === key ? 'active' : ''}`}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="achievements-grid">
          {filteredAchievements.map((achievement, index) => {
            const unlocked = userAchievements.find(ua => ua.achievement_id === achievement.id);
            const progress = getProgress(achievement);
            const progressPercent = (progress / achievement.requirement) * 100;

            return (
              <motion.div
                key={achievement.id}
                className={`achievement-card ${unlocked ? 'unlocked' : 'locked'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="achievement-rarity" style={{
                  borderColor: {
                    common: '#95a5a6',
                    rare: '#3498db',
                    epic: '#8e44ad',
                    legendary: '#f39c12',
                    secret: '#e74c3c'
                  }[achievement.rarity]
                }}>
                  {achievement.rarity.toUpperCase()}
                </div>
                <div className={`achievement-icon ${!unlocked ? 'grayscale' : ''}`}>
                  {achievement.icon}
                </div>
                <h3>{achievement.name}</h3>
                <p>{achievement.description}</p>
                
                {!unlocked && (
                  <div className="achievement-progress">
                    <div className="progress-bar-small">
                      <div 
                        className="progress-bar-fill" 
                        style={{ width: `${Math.min(progressPercent, 100)}%` }}
                      ></div>
                    </div>
                    <div className="progress-text">
                      {progress} / {achievement.requirement}
                    </div>
                  </div>
                )}
                
                {unlocked && (
                  <div className="unlock-badge">
                    <Icon name="check-circle" size={20} /> Unlocked!
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {filteredAchievements.length === 0 && (
          <div className="no-achievements">
            <p>No achievements in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Achievements;
