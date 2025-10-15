import React from 'react';
import { getSlimeDisplay } from '../../utils/slimeSprites';
import './RacingGame.css';

function RacingGame({ players, currentPlayer, questionNumber, totalQuestions }) {
  return (
    <div className="racing-game">
      <h3>🏁 Slime Racing</h3>
      <div className="race-track">
        {players.map((player, index) => {
          const progress = totalQuestions > 0 ? (player.score / (totalQuestions * 1000)) * 100 : 0;
          const cappedProgress = Math.min(progress, 100);
          
          return (
            <div key={player.id} className="race-lane">
              <div className="lane-player">{player.username}</div>
              <div className="lane-track">
                <div className="track-progress" style={{ width: `${cappedProgress}%` }}>
                  <div className="racer-slime" style={{ left: '100%' }}>
                    {getSlimeDisplay(player.slime)}
                  </div>
                </div>
                <div className="finish-line">🏁</div>
              </div>
              <div className="lane-score">{Math.round(cappedProgress)}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RacingGame;
