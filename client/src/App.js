import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import { ToastProvider, useToast } from './components/Toast';
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
import NotFound from './pages/NotFound';

function AppContent() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    // Check for stored user
    const storedUser = localStorage.getItem('studyhall_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('studyhall_user');
      }
    }
    setLoading(false);

    // Easter egg listener
    let sequence = '';
    const handleKeyPress = (e) => {
      sequence += e.key.toLowerCase();
      if (sequence.includes('takotime')) {
        toast.success('🐙 TAKOTIME!!! You found the secret code!');
        sequence = '';
      }
      if (sequence.length > 20) {
        sequence = sequence.slice(-20);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [toast]);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('studyhall_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('studyhall_user');
  };

  if (loading) {
    return (
      <div className="app-loading">
        <div className="spinner"></div>
        <p>Loading StudyHall...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route 
            path="/teacher" 
            element={user?.role === 'teacher' ? <TeacherDashboard user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/student" 
            element={user?.role === 'student' ? <StudentDashboard user={user} /> : <Navigate to="/login" />} 
          />
          <Route path="/create-set" element={<CreateQuestionSet user={user} />} />
          <Route path="/lobby/:gameCode" element={<GameLobby user={user} />} />
          <Route path="/play/:gameCode" element={<GamePlay user={user} />} />
          <Route path="/shop" element={<SlimeShop user={user} />} />
          <Route 
            path="/maps" 
            element={user ? <MapsBrowser user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/maps/create" 
            element={user ? <MapCreator user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/maps/edit/:mapId" 
            element={user ? <MapCreator user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/leaderboard" 
            element={<Leaderboard user={user} />} 
          />
          <Route 
            path="/achievements" 
            element={user && user.role === 'student' ? <Achievements user={user} /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

export default App;

