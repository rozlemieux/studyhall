// Global app context for notifications, sounds, and settings
import React, { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('studyhall_sound_enabled');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [showCollectionModal, setShowCollectionModal] = useState(false);

  // Toast notification system
  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now();
    const toast = { id, message, type, duration };
    setToasts(prev => [...prev, toast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const showSuccess = useCallback((message) => showToast(message, 'success'), [showToast]);
  const showError = useCallback((message) => showToast(message, 'error'), [showToast]);
  const showInfo = useCallback((message) => showToast(message, 'info'), [showToast]);
  const showWarning = useCallback((message) => showToast(message, 'warning'), [showToast]);

  // Sound effects
  const playSound = useCallback((soundType) => {
    if (!soundEnabled) return;
    
    // Using Web Audio API for simple sounds
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    const sounds = {
      success: { freq: 523.25, duration: 0.2 }, // C5
      error: { freq: 293.66, duration: 0.3 }, // D4
      click: { freq: 440, duration: 0.05 }, // A4
      join: { freq: 659.25, duration: 0.15 }, // E5
      start: { freq: 783.99, duration: 0.2 } // G5
    };
    
    const sound = sounds[soundType] || sounds.click;
    oscillator.frequency.value = sound.freq;
    gainNode.gain.value = 0.1;
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + sound.duration);
  }, [soundEnabled]);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => {
      const newValue = !prev;
      localStorage.setItem('studyhall_sound_enabled', JSON.stringify(newValue));
      return newValue;
    });
  }, []);

  // Copy to clipboard utility
  const copyToClipboard = useCallback(async (text, successMessage = 'Copied to clipboard!') => {
    try {
      await navigator.clipboard.writeText(text);
      showSuccess(successMessage);
      playSound('success');
      return true;
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      
      try {
        document.execCommand('copy');
        showSuccess(successMessage);
        playSound('success');
        document.body.removeChild(textArea);
        return true;
      } catch (err) {
        showError('Failed to copy');
        document.body.removeChild(textArea);
        return false;
      }
    }
  }, [showSuccess, showError, playSound]);

  const value = {
    // Toast notifications
    toasts,
    showToast,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    
    // Sound system
    soundEnabled,
    toggleSound,
    playSound,
    
    // Utilities
    copyToClipboard,
    
    // Collection modal
    showCollectionModal,
    openCollectionModal: () => setShowCollectionModal(true),
    closeCollectionModal: () => setShowCollectionModal(false)
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
