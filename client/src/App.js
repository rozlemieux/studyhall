import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import GameLobby from './pages/GameLobby';
import GamePlay from './pages/GamePlay';
import SlimeShop from './pages/SlimeShop';
import CreateQuestionSet from './pages/CreateQuestionSet';
import MapsBrowser from './pages/MapsBrowser';
import MapCreator from './pages/MapCreator';
import Leaderboard from './pages/Leaderboard';
import Achievements from './pages/Achievements';

// Components
import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for saved user session
    const savedUser = localStorage.getItem('studyhall_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('studyhall_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('studyhall_user');
  };

  return (
    <Router>
      <div className="App">
        {user && <Navbar user={user} onLogout={handleLogout} />}
        <Routes>
          <Route path="/" element={user ? <Navigate to={user.role === 'teacher' ? '/teacher-dashboard' : '/student-dashboard'} /> : <Home />} />
          <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to={user.role === 'teacher' ? '/teacher-dashboard' : '/student-dashboard'} />} />
          <Route path="/teacher-dashboard" element={user && user.role === 'teacher' ? <TeacherDashboard user={user} /> : <Navigate to="/" />} />
          <Route path="/student-dashboard" element={user && user.role === 'student' ? <StudentDashboard user={user} /> : <Navigate to="/" />} />
          <Route path="/shop" element={user && user.role === 'student' ? <SlimeShop user={user} /> : <Navigate to="/" />} />
          <Route path="/create-questions" element={user && user.role === 'teacher' ? <CreateQuestionSet user={user} /> : <Navigate to="/" />} />
          <Route path="/maps" element={user ? <MapsBrowser user={user} /> : <Navigate to="/" />} />
          <Route path="/map-creator" element={user ? <MapCreator user={user} /> : <Navigate to="/" />} />
          <Route path="/lobby/:gameCode" element={user ? <GameLobby user={user} /> : <Navigate to="/" />} />
          <Route path="/game/:gameCode" element={user ? <GamePlay user={user} /> : <Navigate to="/" />} />
          <Route path="/leaderboard" element={user ? <Leaderboard user={user} /> : <Navigate to="/" />} />
          <Route path="/achievements" element={user && user.role === 'student' ? <Achievements user={user} /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
