import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { getSlimeSprite } from '../utils/slimeSprites';
import Icon from '../components/Icon';
import VictoryCelebration from '../components/VictoryCelebration';
import './PracticeGamePlay.css';

function PracticeGamePlay() {
  const location = useLocation();
  const navigate = useNavigate();
  const { questionSetId, difficulty, gameMode, userId } = location.state || {};

  const [questionSet, setQuestionSet] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [playerCorrect, setPlayerCorrect] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [aiAnswered, setAiAnswered] = useState(false);
  const [aiCorrect, setAiCorrect] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [showVictory, setShowVictory] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  useEffect(() => {
    if (!questionSetId) {
      navigate('/practice');
      return;
    }
    fetchQuestionSet();
  }, []);

  useEffect(() => {
    if (questionSet && !gameFinished && !showResult) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // AI response logic
      const aiResponseTime = getAiResponseTime();
      const aiTimer = setTimeout(() => {
        simulateAiAnswer();
      }, aiResponseTime);

      return () => {
        clearInterval(timer);
        clearTimeout(aiTimer);
      };
    }
  }, [currentQuestionIndex, showResult, questionSet]);

  const getAiResponseTime = () => {
    // AI responds based on difficulty
    switch (difficulty) {
      case 'easy':
        return (4 + Math.random() * 2) * 1000; // 4-6 seconds
      case 'medium':
        return (2 + Math.random() * 2) * 1000; // 2-4 seconds
      case 'hard':
        return (1 + Math.random()) * 1000; // 1-2 seconds
      default:
        return 3000;
    }
  };

  const getAiAccuracy = () => {
    switch (difficulty) {
      case 'easy':
        return 0.6; // 60% accuracy
      case 'medium':
        return 0.75; // 75% accuracy
      case 'hard':
        return 0.85; // 85% accuracy
      default:
        return 0.7;
    }
  };

  const simulateAiAnswer = () => {
    if (aiAnswered || showResult) return;

    const accuracy = getAiAccuracy();
    const willBeCorrect = Math.random() < accuracy;
    
    setAiAnswered(true);
    setAiCorrect(willBeCorrect);

    if (willBeCorrect) {
      const points = Math.max(100, 1000 - ((Date.now() - questionStartTime) / 100));
      setAiScore(prev => prev + Math.floor(points));
    }
  };

  const fetchQuestionSet = async () => {
    try {
      const response = await axios.get('/api/question-sets');
      const set = response.data.find(s => s.id === questionSetId);
      if (set) {
        setQuestionSet(set);
        setQuestionStartTime(Date.now());
      } else {
        alert('Question set not found');
        navigate('/practice');
      }
    } catch (error) {
      console.error('Error fetching question set:', error);
      alert('Failed to load questions');
      navigate('/practice');
    }
  };

  const handleTimeout = () => {
    if (!selectedAnswer && !showResult) {
      setSelectedAnswer(-1);
      setIsCorrect(false);
      setShowResult(true);
    }
  };

  const handleAnswerClick = (answerIndex) => {
    if (showResult || selectedAnswer !== null) return;

    const currentQuestion = questionSet.questions[currentQuestionIndex];
    const correct = answerIndex === currentQuestion.correct;
    const timeTaken = (Date.now() - questionStartTime) / 1000;
    
    setSelectedAnswer(answerIndex);
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      const points = Math.max(100, 1000 - (timeTaken * 100));
      setPlayerScore(prev => prev + Math.floor(points));
      setPlayerCorrect(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionSet.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsCorrect(false);
      setAiAnswered(false);
      setAiCorrect(false);
      setTimeLeft(15);
      setQuestionStartTime(Date.now());
    } else {
      finishGame();
    }
  };

  const finishGame = async () => {
    setGameFinished(true);

    // Calculate currency earned (50% of normal rate)
    const currencyEarned = Math.floor(playerScore / 20);

    // Save practice game
    try {
      await axios.post(`/api/practice/${userId}/save`, {
        questionSetId,
        gameMode,
        difficulty,
        score: playerScore,
        questionsCorrect: playerCorrect,
        questionsTotal: questionSet.questions.length,
        currencyEarned
      });
    } catch (error) {
      console.error('Error saving practice game:', error);
    }

    // Show victory celebration if player won
    if (playerScore > aiScore) {
      setShowVictory(true);
      setTimeout(() => setShowVictory(false), 3000);
    }
  };

  if (!questionSet) {
    return (
      <div className="practice-gameplay-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading questions...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questionSet.questions[currentQuestionIndex];

  if (gameFinished) {
    const playerWon = playerScore > aiScore;
    const currencyEarned = Math.floor(playerScore / 20);

    return (
      <div className="practice-gameplay-page">
        {showVictory && <VictoryCelebration />}
        <motion.div
          className="game-over-card"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h1>{playerWon ? '🎉 Victory!' : '😔 Try Again!'}</h1>
          <p className="result-message">
            {playerWon ? 'You beat the AI!' : 'The AI won this time!'}
          </p>

          <div className="final-scores">
            <div className={`score-box ${playerWon ? 'winner' : ''}`}>
              <h3>You</h3>
              <div className="final-score">{playerScore}</div>
              <p>{playerCorrect}/{questionSet.questions.length} correct</p>
            </div>
            <div className={`score-box ${!playerWon ? 'winner' : ''}`}>
              <h3>AI ({difficulty})</h3>
              <div className="final-score">{aiScore}</div>
            </div>
          </div>

          <div className="rewards-section">
            <h3>Rewards</h3>
            <div className="reward-item">
              <Icon name="coin" size={32} color="#FFD700" />
              <span>+{currencyEarned} coins (50% for practice)</span>
            </div>
          </div>

          <div className="game-over-actions">
            <button 
              className="button button-primary"
              onClick={() => navigate('/practice')}
            >
              Practice Again
            </button>
            <button 
              className="button button-secondary"
              onClick={() => navigate('/dashboard')}
            >
              Back to Dashboard
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="practice-gameplay-page">
      <div className="game-header">
        <div className="player-info">
          <div className="player-avatar">
            <img src={getSlimeSprite('mint')} alt="player" className="slime-sprite" />
          </div>
          <div className="player-details">
            <h3>You</h3>
            <div className="player-score">{playerScore}</div>
          </div>
        </div>

        <div className="game-progress">
          <div className="progress-text">
            Question {currentQuestionIndex + 1} of {questionSet.questions.length}
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${((currentQuestionIndex + 1) / questionSet.questions.length) * 100}%` }}
            ></div>
          </div>
          <div className="timer">
            <Icon name="clock" size={20} />
            <span>{timeLeft}s</span>
          </div>
        </div>

        <div className="player-info ai-info">
          <div className="player-details">
            <h3>AI ({difficulty})</h3>
            <div className="player-score">{aiScore}</div>
          </div>
          <div className="player-avatar">
            <img src={getSlimeSprite('dragon')} alt="ai" className="slime-sprite" />
          </div>
        </div>
      </div>

      <motion.div
        className="question-section"
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h2 className="question-text">{currentQuestion.question}</h2>

        <div className="answers-grid">
          {currentQuestion.answers.map((answer, index) => {
            let answerClass = 'answer-btn';
            if (showResult) {
              if (index === currentQuestion.correct) {
                answerClass += ' correct';
              } else if (index === selectedAnswer) {
                answerClass += ' incorrect';
              }
            } else if (selectedAnswer === index) {
              answerClass += ' selected';
            }

            return (
              <motion.button
                key={index}
                className={answerClass}
                onClick={() => handleAnswerClick(index)}
                disabled={showResult || selectedAnswer !== null}
                whileHover={{ scale: showResult ? 1 : 1.02 }}
                whileTap={{ scale: showResult ? 1 : 0.98 }}
              >
                <span className="answer-letter">{String.fromCharCode(65 + index)}</span>
                <span className="answer-text">{answer}</span>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {showResult && (
            <motion.div
              className="result-feedback"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className={`feedback-message ${isCorrect ? 'correct' : 'incorrect'}`}>
                {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
              </div>
              <div className="ai-status">
                AI: {aiAnswered ? (aiCorrect ? '✓ Correct' : '✗ Incorrect') : 'Thinking...'}
              </div>
              <button 
                className="button button-primary next-btn"
                onClick={handleNextQuestion}
              >
                {currentQuestionIndex < questionSet.questions.length - 1 ? 'Next Question' : 'Finish'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default PracticeGamePlay;
