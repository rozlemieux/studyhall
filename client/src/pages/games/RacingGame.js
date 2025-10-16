// Racing Game Mode - Race to the finish!
import React from 'react';
import { motion } from 'framer-motion';
import { getSlimeSprite } from '../../utils/slimeSprites';
import './RacingGame.css';

function RacingGame({ players, currentPlayer, questionNumber, totalQuestions }) {
  // Calculate track progress for each player
  const getProgress = (player) => {
    const correctAnswers = player.score / 100; // Assuming 100 points per correct answer
    return (correctAnswers / totalQuestions) * 100;
  };

  return (
    <div className="racing-game">
      <div className="racing-header">
        <h2>🏁 Slime Racing 🏁</h2>
        <p>Question {questionNumber} of {totalQuestions}</p>
      </div>

      <div className="racing-track">
        {/* Finish line */}
        <div className="finish-line">
          <span>🏆 FINISH</span>
        </div>

        {/* Racing lanes */}
        <div className="racing-lanes">
          {players.sort((a, b) => b.score - a.score).map((player, index) => (
            <motion.div
              key={player.id}
              className={`racing-lane ${player.id === currentPlayer?.id ? 'current-player' : ''}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="lane-player-info">
                <span className="lane-position">#{index + 1}</span>
                <span className="lane-player-name">{player.username}</span>
              </div>

              <div className="lane-track">
                {/* Track background */}
                <div className="track-bg"></div>

                {/* Player slime */}
                <motion.div
                  className="racing-slime"
                  animate={{ left: `${getProgress(player)}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <img
                    src={getSlimeSprite(player.slime)}
                    alt={player.username}
                    className="slime-racer"
                  />
                  {player.id === currentPlayer?.id && (
                    <div className="you-indicator">YOU</div>
                  )}
                </motion.div>
              </div>

              <div className="lane-stats">
                <span className="lane-score">{player.score} pts</span>
                <span className="lane-progress">{Math.round(getProgress(player))}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="racing-leaderboard">
        <h3>Current Standings</h3>
        <div className="mini-leaderboard">
          {players.slice(0, 3).map((player, index) => (
            <div key={player.id} className="mini-leaderboard-item">
              <span className="mini-position">{['🥇', '🥈', '🥉'][index]}</span>
              <img
                src={getSlimeSprite(player.slime)}
                alt={player.username}
                className="mini-slime"
              />
              <span className="mini-name">{player.username}</span>
              <span className="mini-score">{player.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RacingGame;

