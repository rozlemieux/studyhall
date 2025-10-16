import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Achievements.css';

function Achievements({ user }) {
  const [achievements, setAchievements] = useState([]);
  const [userAchievements, setUserAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAchievements();
  }, [user.id]);

  const fetchAchievements = async () => {
    try {
      const [allRes, userRes] = await Promise.all([
        axios.get('/api/achievements'),
        axios.get(`/api/achievements/${user.id}`)
      ]);
      setAchievements(allRes.data);
      setUserAchievements(userRes.data);
    } catch (error) {
      console.error('Error fetching achievements:', error);
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
        <h1>🏆 Achievements</h1>
        <p>Unlock achievements by playing games and collecting slimes!</p>
        <div className="achievements-grid">
          {achievements.map((achievement) => {
            const unlocked = userAchievements.find(ua => ua.achievement_id === achievement.id);
            return (
              <div key={achievement.id} className={`achievement-card ${unlocked ? 'unlocked' : 'locked'}`}>
                <div className="achievement-icon">{achievement.icon}</div>
                <h3>{achievement.name}</h3>
                <p>{achievement.description}</p>
                {unlocked && <div className="unlock-date">Unlocked!</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Achievements;
