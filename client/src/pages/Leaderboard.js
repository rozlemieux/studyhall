import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Leaderboard.css';

function Leaderboard({ user }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [sortBy, setSortBy] = useState('totalWins');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, [sortBy]);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get(`/api/leaderboard?sortBy=${sortBy}&limit=20`);
      setLeaderboard(response.data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="page"><div className="loading"><div className="spinner"></div></div></div>;
  }

  return (
    <div className="page">
      <div className="container">
        <h1>📊 Leaderboard</h1>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="select">
          <option value="totalWins">Total Wins</option>
          <option value="totalGames">Games Played</option>
          <option value="totalCorrect">Correct Answers</option>
          <option value="bestStreak">Best Streak</option>
          <option value="totalCurrencyEarned">Currency Earned</option>
        </select>
        <div className="leaderboard-table">
          {leaderboard.map((player, index) => (
            <div key={player.user_id} className="leaderboard-row">
              <div className="rank">{index + 1}</div>
              <div className="username">{player.username}</div>
              <div className="stat">{player[sortBy]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
