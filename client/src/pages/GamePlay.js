import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { motion } from 'framer-motion';
import { getSlimeSprite } from '../utils/slimeSprites';
import RacingGame from './games/RacingGame';
import BattleGame from './games/BattleGame';
import GoldQuestGame from './games/GoldQuestGame';
import './GamePlay.css';

const socket = io('http://localhost:5001');

function GamePlay({ user }) {
  const { gameCode } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [players, setPlayers] = useState([]);
  const [gameFinished, setGameFinished] = useState(false);
  const [gameMode, setGameMode] = useState('classic');
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('game-started', (data) => {
      setCurrentQuestion(data.question);
      setQuestionNumber(data.questionNumber);
      setTotalQuestions(data.totalQuestions);
      setGameMode(data.gameMode || 'classic');
      setTimeLeft(20);
      setTimeElapsed(0);
      setAnswered(false);
      setSelectedAnswer(null);
    });

    socket.on('next-question', (data) => {
      setCurrentQuestion(data.question);
      setQuestionNumber(data.questionNumber);
      setTotalQuestions(data.totalQuestions);
      setTimeLeft(20);
      setTimeElapsed(0);
      setAnswered(false);
      setSelectedAnswer(null);
    });

    socket.on('answer-submitted', (data) => {
      setPlayers(data.players);
    });

    socket.on('game-finished', (data) => {
      setPlayers(data.players);
      setGameFinished(true);
    });

    return () => {
      socket.off('game-started');
      socket.off('next-question');
      socket.off('answer-submitted');
      socket.off('game-finished');
    };
  }, []);

  useEffect(() => {
    if (answered || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
      setTimeElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [answered, timeLeft]);

  const handleTimeout = () => {
    if (!answered) {
      setAnswered(true);
      socket.emit('submit-answer', {
        gameCode,
        answer: -1,
        timeElapsed: 20
      });
    }
  };

  const handleAnswerSelect = (answerIndex) => {
    if (answered) return;

    setSelectedAnswer(answerIndex);
    setAnswered(true);
    
    socket.emit('submit-answer', {
      gameCode,
      answer: answerIndex,
      timeElapsed
    });
  };

  // Render game mode visualization
  const renderGameModeView = () => {
    const currentPlayer = players.find(p => p.id === user.id);
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

    switch (gameMode) {
      case 'racing':
        return <RacingGame players={sortedPlayers} currentPlayer={currentPlayer} questionNumber={questionNumber} totalQuestions={totalQuestions} />;
      case 'battle':
        return <BattleGame players={sortedPlayers} currentPlayer={currentPlayer} questionNumber={questionNumber} totalQuestions={totalQuestions} />;
      case 'gold-quest':
        return <GoldQuestGame players={sortedPlayers} currentPlayer={currentPlayer} questionNumber={questionNumber} totalQuestions={totalQuestions} />;
      case 'tower':
      case 'survival':
      default:
        // Classic mode or fallback
        return (
          <div className="classic-scoreboard">
            <h3>Current Standings</h3>
            <div className="score-list">
              {sortedPlayers.map((player, index) => (
                <div key={player.id} className="score-item">
                  <span className="score-rank">#{index + 1}</span>
                  <img src={getSlimeSprite(player.slime)} alt={player.username} className="score-slime slime-sprite-tiny" />
                  <span className="score-name">{player.username}</span>
                  <span className="score-points">{player.score}</span>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  if (gameFinished) {
    return (
      <div className="game-page">
        <div className="game-container">
          <motion.div
            className="results-screen"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h1 className="results-title">🎉 Game Complete! 🎉</h1>
            <div className="leaderboard">
              <h2>Final Scores</h2>
              {players.map((player, index) => (
                <motion.div
                  key={player.id}
                  className={`leaderboard-item rank-${index + 1}`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="rank-badge">#{index + 1}</div>
                  <div className="player-avatar">
                    <img 
                      src={getSlimeSprite(player.slime)} 
                      alt={player.slime}
                      className="slime-sprite-small"
                    />
                  </div>
                  <div className="player-details">
                    <div className="player-username">{player.username}</div>
                    <div className="player-score">{player.score} points</div>
                  </div>
                  {index === 0 && <div className="trophy">👑</div>}
                </motion.div>
              ))}
            </div>
            <button
              className="button button-primary back-home-btn"
              onClick={() => navigate(user.role === 'teacher' ? '/teacher' : '/student')}
            >
              Back to Dashboard
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="game-page">
        <div className="game-container">
          <div className="loading-screen">
            <div className="loading-slime">
              <img 
                src={getSlimeSprite('mint')} 
                alt="loading"
                className="slime-sprite"
              />
            </div>
            <p>Loading game...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-page">
      <div className="game-container">
        <div className="game-header">
          <div className="question-progress">
            Question {questionNumber} of {totalQuestions}
          </div>
          <div className={`timer ${timeLeft <= 5 ? 'urgent' : ''}`}>
            <span className="timer-icon">⏱️</span>
            <span className="timer-value">{timeLeft}s</span>
          </div>
        </div>

        <motion.div
          className="question-card"
          key={questionNumber}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="question-text">{currentQuestion.question}</h2>
          <div className="answers-grid">
            {currentQuestion.answers.map((answer, index) => (
              <motion.button
                key={index}
                className={`answer-button ${
                  answered && index === selectedAnswer
                    ? index === currentQuestion.correct
                      ? 'correct'
                      : 'incorrect'
                    : ''
                } ${answered && index === currentQuestion.correct ? 'show-correct' : ''}`}
                onClick={() => handleAnswerSelect(index)}
                disabled={answered}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={!answered ? { scale: 1.05 } : {}}
                whileTap={!answered ? { scale: 0.95 } : {}}
              >
                <span className="answer-letter">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="answer-text">{answer}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Game mode visualization */}
        <div className="game-mode-container">
          {renderGameModeView()}
        </div>
      </div>
    </div>
  );
}

export default GamePlay;

