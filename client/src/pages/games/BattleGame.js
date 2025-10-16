// Battle Game Mode - Battle other slimes!
import React from 'react';
import { motion } from 'framer-motion';
import { getSlimeSprite } from '../../utils/slimeSprites';
import Icon from '../../components/Icon';
import './BattleGame.css';

function BattleGame({ players, currentPlayer, questionNumber, totalQuestions }) {
  // Calculate HP based on correct answers
  const getHP = (player) => {
    const maxHP = 100;
    const correctAnswers = player.score / 100;
    const hp = Math.min((correctAnswers / totalQuestions) * maxHP, maxHP);
    return Math.max(hp, 0);
  };

  // Determine HP bar color
  const getHPColor = (hp) => {
    if (hp > 60) return '#00C878';
    if (hp > 30) return '#FFA500';
    return '#FF4444';
  };

  return (
    <div className="battle-game">
      <div className="battle-header">
        <h2>⚔️ Slime Battle Arena ⚔️</h2>
        <p>Question {questionNumber} of {totalQuestions}</p>
      </div>

      <div className="battle-arena">
        <div className="battle-grid">
          {players.map((player, index) => {
            const hp = getHP(player);
            const isKO = hp <= 0;

            return (
              <motion.div
                key={player.id}
                className={`battle-slime ${player.id === currentPlayer?.id ? 'current-player' : ''} ${isKO ? 'ko' : ''}`}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: index * 0.1, type: "spring" }}
              >
                {/* KO overlay */}
                {isKO && (
                  <div className="ko-overlay">
                    <span className="ko-text">K.O.</span>
                  </div>
                )}

                {/* Player avatar */}
                <div className="battle-avatar">
                  <motion.img
                    src={getSlimeSprite(player.slime)}
                    alt={player.username}
                    className="battle-slime-img"
                    animate={!isKO ? {
                      y: [0, -10, 0],
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  {player.id === currentPlayer?.id && (
                    <div className="you-badge">
                      <Icon name="star" size={12} color="#FFD700" />
                      YOU
                    </div>
                  )}
                </div>

                {/* Player info */}
                <div className="battle-info">
                  <h3 className="battle-username">{player.username}</h3>

                  {/* HP Bar */}
                  <div className="hp-container">
                    <div className="hp-label">
                      <span>HP</span>
                      <span className="hp-value">{Math.round(hp)}/100</span>
                    </div>
                    <div className="hp-bar-bg">
                      <motion.div
                        className="hp-bar-fill"
                        style={{ backgroundColor: getHPColor(hp) }}
                        initial={{ width: 0 }}
                        animate={{ width: `${hp}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="battle-stats">
                    <div className="stat-item">
                      <Icon name="trophy" size={16} color="#FFD700" />
                      <span>{player.score} pts</span>
                    </div>
                    <div className="stat-item">
                      <Icon name="lightning" size={16} color="#00C878" />
                      <span>{Math.round((player.score / 100) / totalQuestions * 100)}% accuracy</span>
                    </div>
                  </div>
                </div>

                {/* Attack animation (when answering correctly) */}
                {!isKO && player.lastAnswerCorrect && (
                  <motion.div
                    className="attack-effect"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    ⚡
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Battle log */}
      <div className="battle-log">
        <h3>⚔️ Battle Rankings</h3>
        <div className="battle-rankings">
          {players.sort((a, b) => b.score - a.score).map((player, index) => (
            <div key={player.id} className="ranking-item">
              <span className="ranking-position">#{index + 1}</span>
              <img
                src={getSlimeSprite(player.slime)}
                alt={player.username}
                className="ranking-slime"
              />
              <span className="ranking-name">{player.username}</span>
              <div className="ranking-hp-mini">
                <div 
                  className="ranking-hp-fill" 
                  style={{ 
                    width: `${getHP(player)}%`,
                    backgroundColor: getHPColor(getHP(player))
                  }}
                />
              </div>
              <span className="ranking-score">{player.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BattleGame;

