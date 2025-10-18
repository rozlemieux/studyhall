import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { motion } from 'framer-motion';
import { getSlimeSprite, getSlimeColor } from '../utils/slimeSprites';
import { useApp } from '../contexts/AppContext';
import './GameLobby.css';

const socket = io();

function GameLobby({ user }) {
  const { gameCode } = useParams();
  const navigate = useNavigate();
  const { copyToClipboard, playSound, showSuccess, showError } = useApp();
  const [players, setPlayers] = useState([]);
  const [isHost, setIsHost] = useState(false);
  const [game, setGame] = useState(null);
  const [error, setError] = useState('');
  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    console.log(`GameLobby mounted for code: ${gameCode}, socket ID: ${socket.id}`);
    
    // Fetch player data for slime
    fetch(`/api/player/${user.id}`)
      .then(res => res.json())
      .then(data => {
        setPlayerData(data);
        
        // Join the game if we're a student
        if (user.role === 'student') {
          console.log('Attempting to join game as student');
          socket.emit('join-game', {
            gameCode: gameCode,
            userId: user.id,
            username: user.username,
            slime: data.selectedSlime || 'mint'
          });
        }
      })
      .catch(err => console.error('Error fetching player data:', err));
    
    // Request current game state when component mounts
    socket.emit('get-game-state', { gameCode });

    socket.on('game-state', (data) => {
      console.log('Received game-state:', data);
      if (data.game) {
        setPlayers(data.game.players || []);
        setGame(data.game);
        const amHost = socket.id === data.game.hostId;
        setIsHost(amHost);
        console.log(`I am ${amHost ? 'HOST' : 'PLAYER'}. Players: ${data.game.players.length}`);
      }
    });

    socket.on('join-success', (data) => {
      console.log('Successfully joined game!', data);
      setGame(data.game);
      setPlayers(data.game.players || []);
      setIsHost(false);
      playSound('join');
      showSuccess(`Joined game ${gameCode}!`);
    });

    socket.on('join-error', (data) => {
      console.error('Failed to join game:', data.message);
      setError(data.message);
      showError(data.message);
    });

    socket.on('player-joined', (data) => {
      console.log('Player joined! New players list:', data.players);
      setPlayers(data.players);
    });

    socket.on('player-left', (data) => {
      console.log('Player left! New players list:', data.players);
      setPlayers(data.players);
    });

    socket.on('game-started', (data) => {
      console.log('Game starting!');
      navigate(`/play/${gameCode}`);
    });

    // Check if user is host  
    socket.on('game-created', (data) => {
      console.log('Game created event:', data);
      if (data.gameCode === gameCode) {
        setIsHost(true);
        console.log('Setting myself as host');
      }
    });

    return () => {
      console.log('GameLobby unmounting');
      socket.off('game-state');
      socket.off('join-success');
      socket.off('join-error');
      socket.off('player-joined');
      socket.off('player-left');
      socket.off('game-started');
      socket.off('game-created');
    };
  }, [gameCode, navigate, user, playSound, showSuccess, showError]);

  const handleStartGame = () => {
    socket.emit('start-game', { gameCode });
  };

  const slimeEmojis = {
    // Row 1
    mint: '🟢', red: '🔴', purple: '🟣', yellow: '🟡', skyblue: '🔵', rainbow1: '🌈', brown: '🟤', lime: '🟢', navy: '🔷', pink: '🩷', golden: '💛',
    // Row 2
    forestgreen: '🟢', chocolate: '🟫', beige: '🟤', orange: '🟠', darkblue: '🔵', violet: '🟣', crimson: '🔴', purpledevil: '😈', sage: '🟢', buttercup: '💛', neongreen: '🟢',
    // Row 3
    cyanpink: '💙', rainbowpurple: '🌈', hotpink: '💗', lavender: '💜', iceblue: '🧊', frostpink: '💗', magenta: '💗', eggplant: '🍆', grape: '🍇', plum: '🟣', midnight: '🌙',
    // Row 4
    aqua: '💧', peach: '🍑', twilight: '🌆', bubblegum: '🩷', seafoam: '🌊', turquoise: '💎', amber: '🟡', jade: '💚', teal: '🔷', sunshine: '☀️',
    // Row 5
    iris: '🌸', galaxy: '🌌', orchid: '🪻', periwinkle: '💙', coral: '🪸', sunrise: '🌅', emerald: '💎', citrus: '🍋', cream: '🍦', amethyst: '💜', sapphire: '💙',
    // Row 6
    poolblue: '🏊', olive: '🫒', mocha: '☕', kitty: '🐱', ribbon: '🎀', shadow: '🌑', ghostly: '👻', poison: '☣️', pearl: '🦪', maroon: '🟥',
    // Row 7
    fireice: '🔥', cosmic: '🌌', ocean: '🌊', bumblebee: '🐝', yoshi: '🦖', void: '🕳️', prismatic: '✨', spectrum: '🌈', holographic: '💿',
    // Row 8+
    cow: '🐄', human: '😊', pride: '🏳️‍🌈', flamingo: '🦩', ninja: '🥷', royal: '👑', tako: '🐙', unicorn: '🦄'
  };

  return (
    <div className="lobby-page">
      <div className="lobby-container">
        <motion.div
          className="lobby-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Game Lobby</h1>
          <div className="game-code-display">
            <span className="code-label">Game Code:</span>
            <span className="code-value">{gameCode}</span>
            <button 
              onClick={() => copyToClipboard(gameCode, `Game code ${gameCode} copied!`)} 
              className="copy-button"
              title="Copy game code"
            >
              📋
            </button>
          </div>
        </motion.div>

        <motion.div
          className="lobby-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="players-section">
            <h2>Players ({players.length})</h2>
            <div className="players-grid">
              {players.map((player, index) => (
                <motion.div
                  key={player.id}
                  className="player-card"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="player-slime">
                    <img 
                      src={getSlimeSprite(player.slime)} 
                      alt={player.slime}
                      className="slime-sprite"
                    />
                  </div>
                  <div className="player-name">{player.username}</div>
                  {player.ready && <div className="ready-badge">✓ Ready</div>}
                </motion.div>
              ))}
              
              {players.length === 0 && (
                <div className="waiting-message">
                  <div className="waiting-icon">⏳</div>
                  <p>Waiting for players to join...</p>
                </div>
              )}
            </div>
          </div>

          <div className="lobby-actions">
            {isHost ? (
              <div className="host-controls">
                <button
                  className="button button-primary start-game-btn"
                  onClick={handleStartGame}
                >
                  {players.length === 0 ? '🚀 Start Solo Practice' : `🎮 Start Game (${players.length} player${players.length > 1 ? 's' : ''})`}
                </button>
                <p className="start-hint">
                  {players.length === 0 
                    ? 'No players yet - start solo or share the game code!' 
                    : 'Ready to begin! Click to start the game.'}
                </p>
              </div>
            ) : (
              <div className="waiting-host">
                <p>Waiting for host to start the game...</p>
              </div>
            )}
          </div>

          <div className="lobby-info">
            <div className="info-card">
              <div className="info-icon">🎯</div>
              <div className="info-text">
                <h3>How to Play</h3>
                <p>Answer questions correctly to earn points and currency!</p>
              </div>
            </div>
            <div className="info-card">
              <div className="info-icon">⚡</div>
              <div className="info-text">
                <h3>Speed Matters</h3>
                <p>Faster answers earn more points!</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default GameLobby;

