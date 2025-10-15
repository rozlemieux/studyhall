import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { motion } from 'framer-motion';
import RacingGame from './games/RacingGame';
import BattleGame from './games/BattleGame';
import GoldQuestGame from './games/GoldQuestGame';
import './GamePlay.css';

let socket;

function GamePlay({ user }) {
  const { gameCode } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [question, setQuestion] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [gameFinished, setGameFinished] = useState(false);
  const [finalResults, setFinalResults] = useState([]);

  useEffect(() => {
    socket = io('http://localhost:8001');

    socket.on('game-started', (data) => {
      setGame(data.game);
      setQuestion(data.question);
      setQuestionNumber(data.questionNumber);
      setTotalQuestions(data.totalQuestions);
      setTimeLeft(20);
      setAnswered(false);
      setSelectedAnswer(null);
      setIsCorrect(null);
    });

    socket.on('next-question', (data) => {
      setQuestion(data.question);
      setQuestionNumber(data.questionNumber);
      setTotalQuestions(data.totalQuestions);
      setTimeLeft(20);
      setAnswered(false);
      setSelectedAnswer(null);
      setIsCorrect(null);
    });

    socket.on('answer-submitted', (data) => {
      if (data.playerId === socket.id) {
        setIsCorrect(data.correct);
      }
      // Update players with new scores
      if (game) {
        setGame({ ...game, players: data.players });
      }
    });

    socket.on('game-finished', (data) => {
      setGameFinished(true);
      setFinalResults(data.players);
    });

    return () => {
      socket.disconnect();
    };
  }, [gameCode]);

  useEffect(() => {
    if (timeLeft > 0 && !answered && question) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, answered, question]);

  const handleAnswer = (answerIndex) => {
    if (answered) return;
    
    setAnswered(true);
    setSelectedAnswer(answerIndex);
    
    const timeElapsed = 20 - timeLeft;
    socket.emit('submit-answer', {
      gameCode,
      answer: answerIndex,
      timeElapsed
    });
  };

  const handleNextQuestion = () => {
    socket.emit('next-question', { gameCode });
  };

  const handlePlayAgain = () => {
    navigate(user.role === 'teacher' ? '/teacher-dashboard' : '/student-dashboard');
  };

  if (gameFinished) {
    return (
      <div className="gameplay-page">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="results-screen"
          >
            <h1>🏆 Game Over!</h1>
            <div className="final-rankings">
              {finalResults.map((player, index) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`rank-card rank-${index + 1}`}
                >
                  <div className="rank-position">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                  </div>
                  <div className="rank-player">{player.username}</div>
                  <div className="rank-score">{player.score} pts</div>
                </motion.div>
              ))}
            </div>
            <button onClick={handlePlayAgain} className="button button-primary button-large">
              Back to Dashboard
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!question || !game) {
    return (
      <div className="gameplay-page">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading game...</p>
        </div>
      </div>
    );
  }

  const currentPlayer = game.players.find(p => p.username === user.username);
  const gameMode = game.gameMode || 'classic';

  return (
    <div className="gameplay-page">
      <div className="game-header">
        <div className="question-info">
          <span>Question {questionNumber}/{totalQuestions}</span>
        </div>
        <div className="timer">
          <span className={timeLeft <= 5 ? 'timer-warning' : ''}>⏱️ {timeLeft}s</span>
        </div>
      </div>

      <div className="game-content">
        <div className="question-section">
          <motion.div
            key={questionNumber}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="question-card"
          >
            <h2 className="question-text">{question.question}</h2>
            <div className="answers-grid">
              {question.answers.map((answer, index) => (
                <motion.button
                  key={index}
                  whileHover={!answered ? { scale: 1.02 } : {}}
                  whileTap={!answered ? { scale: 0.98 } : {}}
                  onClick={() => handleAnswer(index)}
                  disabled={answered}
                  className={`answer-button ${
                    answered && selectedAnswer === index
                      ? isCorrect
                        ? 'correct'
                        : 'incorrect'
                      : ''
                  } ${
                    answered && index === question.correct ? 'show-correct' : ''
                  }`}
                >
                  {answer}
                </motion.button>
              ))}
            </div>
            {answered && (
              <div className={`feedback ${isCorrect ? 'correct-feedback' : 'incorrect-feedback'}`}>
                {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
              </div>
            )}
          </motion.div>
        </div>

        <div className="game-visualization">
          {gameMode === 'racing' && (
            <RacingGame
              players={game.players}
              currentPlayer={currentPlayer}
              questionNumber={questionNumber}
              totalQuestions={totalQuestions}
            />
          )}
          {gameMode === 'battle' && (
            <BattleGame
              players={game.players}
              currentPlayer={currentPlayer}
              questionNumber={questionNumber}
              totalQuestions={totalQuestions}
            />
          )}
          {gameMode === 'gold-quest' && (
            <GoldQuestGame
              players={game.players}
              currentPlayer={currentPlayer}
              questionNumber={questionNumber}
              totalQuestions={totalQuestions}
            />
          )}
          {(gameMode === 'classic' || gameMode === 'tower' || gameMode === 'survival') && (
            <div className="classic-leaderboard">
              <h3>Leaderboard</h3>
              <div className="leaderboard-list">
                {game.players
                  .sort((a, b) => b.score - a.score)
                  .map((player, index) => (
                    <div key={player.id} className="leaderboard-item">
                      <span className="position">#{index + 1}</span>
                      <span className="player-name">{player.username}</span>
                      <span className="score">{player.score}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {user.role === 'teacher' && answered && (
        <div className="teacher-controls">
          <button onClick={handleNextQuestion} className="button button-primary">
            Next Question ➡️
          </button>
        </div>
      )}
    </div>
  );
}

export default GamePlay;
