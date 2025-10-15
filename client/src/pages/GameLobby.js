import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { motion } from 'framer-motion';
import { getSlimeDisplay } from '../utils/slimeSprites';
import './GameLobby.css';

let socket;

function GameLobby({ user }) {
  const { gameCode } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState('');
  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    // Fetch player data for slime
    fetch(`/api/player/${user.id}`)
      .then(res => res.json())
      .then(data => setPlayerData(data))
      .catch(err => console.error('Error fetching player data:', err));

    // Connect to socket
    socket = io('http://localhost:5001');

    // Join or get game
    if (user.role === 'student') {
      socket.emit('join-game', {
        gameCode: gameCode,
        userId: user.id,
        username: user.username,
        slime: playerData?.selectedSlime || 'mint'
      });
    } else {
      socket.emit('get-game-state', { gameCode });
    }

    socket.on('join-success', (data) => {
      setGame(data.game);
      setPlayers(data.game.players);
    });

    socket.on('game-state', (data) => {
      setGame(data.game);
      setPlayers(data.game.players);
    });

    socket.on('player-joined', (data) => {
      setPlayers(data.players);
    });

    socket.on('player-left', (data) => {
      setPlayers(data.players);
    });

    socket.on('join-error', (data) => {
      setError(data.message);
    });

    socket.on('game-started', () => {
      navigate(`/game/${gameCode}`);
    });

    return () => {
      socket.disconnect();
    };
  }, [gameCode, user, navigate, playerData]);

  const handleStartGame = () => {
    if (players.length === 0) {
      alert('Wait for at least one player to join!');
      return;
    }
    socket.emit('start-game', { gameCode });
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(gameCode);
    alert('Game code copied to clipboard!');
  };

  if (error) {
    return (
      <div className="lobby-page">
        <div className="container">
          <div className="error-box">
            <h2>❌ Error</h2>
            <p>{error}</p>
            <button onClick={() => navigate(-1)} className="button button-primary">
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="lobby-page">
        <div className="loading">
          <div className="spinner"></div>
          <p>Connecting to game...</p>
        </div>
      </div>
    );
  }

  const isHost = user.id === game.hostId || user.role === 'teacher';

  return (
    <div className="lobby-page">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lobby-header"
        >
          <h1>Game Lobby 🎮</h1>
          <div className="game-code-display">
            <span className="code-label">Game Code:</span>
            <span className="code-value">{gameCode}</span>
            <button onClick={handleCopyCode} className="copy-button">📋</button>
          </div>
        </motion.div>

        <div className="lobby-content">
          <div className="players-section">
            <h2>Players ({players.length})</h2>
            <div className="players-grid">
              {players.map((player, index) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="player-card"
                >
                  <div className="player-slime">{getSlimeDisplay(player.slime)}</div>
                  <div className="player-name">{player.username}</div>
                </motion.div>
              ))}
              {players.length === 0 && (
                <div className="waiting-message">
                  <p>🕒 Waiting for players to join...</p>
                </div>
              )}
            </div>
          </div>

          {isHost && (
            <div className="host-controls">
              <button
                onClick={handleStartGame}
                disabled={players.length === 0}
                className="button button-success button-large"
              >
                🚀 Start Game
              </button>
            </div>
          )}

          {!isHost && (
            <div className="waiting-host">
              <p>🕒 Waiting for host to start the game...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GameLobby;
