import React from 'react';
import Slime from '../../components/Slime';
import './GoldQuestGame.css';

function GoldQuestGame({ players, currentPlayer, questionNumber, totalQuestions }) {
  const getTreasureChest = (correctPercent) => {
    if (correctPercent >= 80) return '💎'; // Diamond
    if (correctPercent >= 60) return '🏆'; // Gold
    if (correctPercent >= 40) return '👑'; // Silver
    return '📦'; // Bronze
  };

  const getRankBadge = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return '';
  };

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="goldquest-game">
      <h3>💰 Gold Quest</h3>
      <div className="treasure-room">
        {sortedPlayers.map((player, index) => {
          const goldCoins = Math.floor(player.score / 1000);
          const correctPercent = totalQuestions > 0 ? (goldCoins / totalQuestions) * 100 : 0;
          const chest = getTreasureChest(correctPercent);
          const rankBadge = getRankBadge(index);
          
          return (
            <div key={player.id} className="treasure-card">
              {rankBadge && <div className="rank-badge">{rankBadge}</div>}
              <div className="treasure-slime">
                <Slime slimeId={player.slime} size={60} />
              </div>
              <div className="treasure-info">
                <div className="treasure-name">{player.username}</div>
                <div className="treasure-chest">{chest}</div>
                <div className="gold-counter">
                  <span className="gold-icon">🪙</span>
                  <span className="gold-amount">{goldCoins}</span>
                </div>
                <div className="treasure-progress">
                  <div 
                    className="treasure-bar"
                    style={{ width: `${Math.min(correctPercent, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GoldQuestGame;
