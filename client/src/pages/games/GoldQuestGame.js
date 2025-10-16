// Gold Quest Game Mode - Collect the most gold!
import React from 'react';
import { motion } from 'framer-motion';
import { getSlimeSprite } from '../../utils/slimeSprites';
import Icon from '../../components/Icon';
import './GoldQuestGame.css';

function GoldQuestGame({ players, currentPlayer, questionNumber, totalQuestions }) {
  // Calculate gold coins collected
  const getGoldCoins = (player) => {
    return Math.floor(player.score / 100); // 1 coin per correct answer
  };

  const getTreasureChest = (coins) => {
    if (coins >= totalQuestions * 0.8) return '💎'; // Diamond chest
    if (coins >= totalQuestions * 0.6) return '🏆'; // Gold chest
    if (coins >= totalQuestions * 0.4) return '👑'; // Silver chest
    return '📦'; // Bronze chest
  };

  return (
    <div className="gold-quest-game">
      <div className="gold-quest-header">
        <h2>💰 Gold Quest 💰</h2>
        <p>Question {questionNumber} of {totalQuestions} • Collect all the gold!</p>
      </div>

      <div className="treasure-room">
        <div className="treasure-grid">
          {players.sort((a, b) => b.score - a.score).map((player, index) => {
            const goldCoins = getGoldCoins(player);
            const treasureChest = getTreasureChest(goldCoins);

            return (
              <motion.div
                key={player.id}
                className={`treasure-card ${player.id === currentPlayer?.id ? 'current-player' : ''}`}
                initial={{ scale: 0, rotateY: 180 }}
                animate={{ scale: 1, rotateY: 0 }}
                transition={{ delay: index * 0.1, type: "spring" }}
              >
                {/* Rank badge */}
                <div className="rank-badge">
                  {index === 0 && <span className="rank-gold">👑</span>}
                  {index === 1 && <span className="rank-silver">🥈</span>}
                  {index === 2 && <span className="rank-bronze">🥉</span>}
                  {index > 2 && <span className="rank-number">#{index + 1}</span>}
                </div>

                {/* Player slime */}
                <div className="treasure-slime-container">
                  <motion.img
                    src={getSlimeSprite(player.slime)}
                    alt={player.username}
                    className="treasure-slime"
                    animate={{
                      y: [0, -15, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2
                    }}
                  />
                  {player.id === currentPlayer?.id && (
                    <div className="current-badge">YOU</div>
                  )}
                </div>

                {/* Player info */}
                <h3 className="treasure-username">{player.username}</h3>

                {/* Treasure chest */}
                <div className="treasure-chest">
                  <motion.span
                    className="chest-icon"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  >
                    {treasureChest}
                  </motion.span>
                </div>

                {/* Gold coins display */}
                <div className="gold-display">
                  <Icon name="coin" size={32} color="#FFD700" />
                  <motion.span
                    className="gold-count"
                    key={goldCoins}
                    initial={{ scale: 1.5, color: "#FFD700" }}
                    animate={{ scale: 1, color: "#FFA500" }}
                    transition={{ duration: 0.3 }}
                  >
                    {goldCoins}
                  </motion.span>
                </div>

                {/* Coin progress bar */}
                <div className="coin-progress-container">
                  <div className="coin-progress-label">
                    <span>{goldCoins}</span>
                    <span> / {totalQuestions}</span>
                  </div>
                  <div className="coin-progress-bar">
                    <motion.div
                      className="coin-progress-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${(goldCoins / totalQuestions) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Score */}
                <div className="treasure-score">
                  <span>{player.score} points</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="gold-leaderboard">
        <h3>🏆 Top Treasure Hunters</h3>
        <div className="gold-rankings">
          {players.slice(0, 5).map((player, index) => (
            <motion.div
              key={player.id}
              className="gold-rank-item"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="gold-rank-pos">#{index + 1}</span>
              <img
                src={getSlimeSprite(player.slime)}
                alt={player.username}
                className="gold-rank-slime"
              />
              <span className="gold-rank-name">{player.username}</span>
              <div className="gold-rank-coins">
                <Icon name="coin" size={20} color="#FFD700" />
                <span>{getGoldCoins(player)}</span>
              </div>
              <span className="gold-rank-score">{player.score}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GoldQuestGame;

