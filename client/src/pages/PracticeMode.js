import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Icon from '../components/Icon';
import './PracticeMode.css';

function PracticeMode({ user }) {
  const [questionSets, setQuestionSets] = useState([]);
  const [selectedSet, setSelectedSet] = useState(null);
  const [difficulty, setDifficulty] = useState('medium');
  const [gameMode, setGameMode] = useState('classic');
  const [practiceHistory, setPracticeHistory] = useState([]);
  const [practiceStats, setPracticeStats] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestionSets();
    fetchPracticeHistory();
    fetchPracticeStats();
  }, []);

  const fetchQuestionSets = async () => {
    try {
      const response = await axios.get('/api/question-sets');
      setQuestionSets(response.data);
    } catch (error) {
      console.error('Error fetching question sets:', error);
    }
  };

  const fetchPracticeHistory = async () => {
    try {
      const response = await axios.get(`/api/practice/${user.id}/history`);
      setPracticeHistory(response.data);
    } catch (error) {
      console.error('Error fetching practice history:', error);
    }
  };

  const fetchPracticeStats = async () => {
    try {
      const response = await axios.get(`/api/practice/${user.id}/stats`);
      setPracticeStats(response.data);
    } catch (error) {
      console.error('Error fetching practice stats:', error);
    }
  };

  const handleStartPractice = () => {
    if (!selectedSet) {
      alert('Please select a question set');
      return;
    }

    // Navigate to practice gameplay
    navigate(`/practice-play`, {
      state: {
        questionSetId: selectedSet,
        difficulty,
        gameMode,
        userId: user.id
      }
    });
  };

  const difficultyInfo = {
    easy: { color: '#27ae60', description: 'AI responds in 4-6 seconds, 60% accuracy', icon: '😊' },
    medium: { color: '#f39c12', description: 'AI responds in 2-4 seconds, 75% accuracy', icon: '😐' },
    hard: { color: '#e74c3c', description: 'AI responds in 1-2 seconds, 85% accuracy', icon: '😤' }
  };

  return (
    <div className="practice-mode-page">
      <div className="practice-container">
        <motion.div
          className="practice-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button className="back-button" onClick={() => navigate(-1)}>
            <Icon name="arrow-left" size={20} /> Back
          </button>
          <h1><Icon name="target" size={32} /> Practice Mode</h1>
          <p>Practice solo and improve your skills! Earn 50% coins.</p>
        </motion.div>

        {/* Stats Overview */}
        {practiceStats && (
          <motion.div
            className="practice-stats-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h3>Your Practice Stats</h3>
            <div className="stats-grid-practice">
              <div className="stat-box">
                <div className="stat-value">{practiceStats.total_practice_games || 0}</div>
                <div className="stat-label">Practice Games</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">
                  {practiceStats.total_questions > 0
                    ? Math.round((practiceStats.total_correct / practiceStats.total_questions) * 100)
                    : 0}%
                </div>
                <div className="stat-label">Accuracy</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">{practiceStats.total_earned || 0}</div>
                <div className="stat-label">Coins Earned</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">{Math.round(practiceStats.avg_score) || 0}</div>
                <div className="stat-label">Avg Score</div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="practice-setup">
          {/* Question Set Selection */}
          <motion.div
            className="setup-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3>Select Question Set</h3>
            <div className="question-sets-list">
              {questionSets.map(set => (
                <div
                  key={set.id}
                  className={`question-set-card ${selectedSet === set.id ? 'selected' : ''}`}
                  onClick={() => setSelectedSet(set.id)}
                >
                  <h4>{set.title}</h4>
                  <p>{set.subject} • {set.questions.length} questions</p>
                </div>
              ))}
              {questionSets.length === 0 && (
                <p className="no-sets-msg">No question sets available. Create one first!</p>
              )}
            </div>
          </motion.div>

          {/* Difficulty Selection */}
          <motion.div
            className="setup-section"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3>Select Difficulty</h3>
            <div className="difficulty-selector">
              {Object.entries(difficultyInfo).map(([level, info]) => (
                <div
                  key={level}
                  className={`difficulty-card ${difficulty === level ? 'selected' : ''}`}
                  onClick={() => setDifficulty(level)}
                  style={{ borderColor: difficulty === level ? info.color : '#ddd' }}
                >
                  <div className="difficulty-icon" style={{ fontSize: '2rem' }}>{info.icon}</div>
                  <h4>{level.charAt(0).toUpperCase() + level.slice(1)}</h4>
                  <p className="difficulty-desc">{info.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Game Mode Selection */}
          <motion.div
            className="setup-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3>Select Game Mode</h3>
            <div className="game-modes-practice">
              {[
                { id: 'classic', name: 'Classic Quiz', icon: 'book' },
                { id: 'racing', name: 'Slime Racing', icon: 'lightning' },
                { id: 'battle', name: 'Slime Battle', icon: 'gamepad' },
              ].map(mode => (
                <div
                  key={mode.id}
                  className={`mode-card ${gameMode === mode.id ? 'selected' : ''}`}
                  onClick={() => setGameMode(mode.id)}
                >
                  <Icon name={mode.icon} size={28} />
                  <span>{mode.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Start Button */}
        <motion.button
          className="button button-primary button-large start-practice-btn"
          onClick={handleStartPractice}
          disabled={!selectedSet}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Practice <Icon name="play" size={20} />
        </motion.button>

        {/* Practice History */}
        <motion.div
          className="practice-history-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="section-header">
            <h3>Recent Practice Sessions</h3>
            <button 
              className="button button-secondary"
              onClick={() => setShowHistory(!showHistory)}
            >
              {showHistory ? 'Hide' : 'Show'} History
            </button>
          </div>

          {showHistory && (
            <div className="history-list">
              {practiceHistory.slice(0, 10).map(game => (
                <div key={game.id} className="history-item">
                  <div className="history-info">
                    <span className="history-mode">{game.game_mode}</span>
                    <span className="history-difficulty" style={{
                      color: difficultyInfo[game.difficulty]?.color
                    }}>
                      {game.difficulty}
                    </span>
                  </div>
                  <div className="history-stats">
                    <span>Score: {game.score}</span>
                    <span>{game.questions_correct}/{game.questions_total} correct</span>
                    <span>+{game.currency_earned} coins</span>
                  </div>
                  <div className="history-date">
                    {new Date(game.played_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
              {practiceHistory.length === 0 && (
                <p className="no-history">No practice history yet. Start your first practice session!</p>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default PracticeMode;
