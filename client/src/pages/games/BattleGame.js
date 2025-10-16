import React from 'react';
import Slime from '../../components/Slime';
import './BattleGame.css';

function BattleGame({ players, currentPlayer, questionNumber, totalQuestions }) {
  return (
    <div className="battle-game">
      <h3>⚔️ Slime Battle</h3>
      <div className="battle-arena">
        {players.map((player) => {
          const maxHP = 100;
          const correctAnswers = Math.floor((player.score / 1000) * totalQuestions);
          const hp = Math.max(0, maxHP - ((totalQuestions - correctAnswers) * (maxHP / totalQuestions)));
          const hpPercent = (hp / maxHP) * 100;
          
          const isKO = hp <= 0;
          
          return (
            <div key={player.id} className={`battle-card ${isKO ? 'ko' : ''}`}>
              <div className="battle-slime">
                <Slime slimeId={player.slime} size={60} />
                {!isKO && player.score > 0 && <span className="attack-effect">⚡</span>}
              </div>
              <div className="battle-info">
                <div className="battle-name">{player.username}</div>
                <div className="hp-bar">
                  <div 
                    className={`hp-fill ${
                      hpPercent > 60 ? 'hp-high' : 
                      hpPercent > 30 ? 'hp-medium' : 
                      'hp-low'
                    }`}
                    style={{ width: `${hpPercent}%` }}
                  >
                    <span className="hp-text">{Math.round(hp)} HP</span>
                  </div>
                </div>
              </div>
              {isKO && <div className="ko-overlay">K.O.</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BattleGame;
