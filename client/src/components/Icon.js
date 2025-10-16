// Custom SVG Icon Component for StudyHall
import React from 'react';

export const Icon = ({ name, size = 24, color = 'currentColor', className = '' }) => {
  const icons = {
    // Currency & Economy
    coin: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <circle cx="12" cy="12" r="10" fill="#FFD700" stroke="#FFA500" />
        <path d="M12 6v12M9 9h6M9 15h6" stroke="#FFA500" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    
    // Slime Logo
    slime: (
      <svg viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="15" rx="10" ry="7" fill={color} opacity="0.9" />
        <ellipse cx="12" cy="14" rx="9" ry="6" fill={color} />
        <circle cx="9" cy="12" r="1.5" fill="#000" />
        <circle cx="15" cy="12" r="1.5" fill="#000" />
        <circle cx="8.5" cy="11.5" r="0.5" fill="#fff" opacity="0.8" />
        <circle cx="14.5" cy="11.5" r="0.5" fill="#fff" opacity="0.8" />
      </svg>
    ),
    
    // Game & Learning
    gamepad: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M6 8h12c2 0 4 2 4 4v4c0 2-2 4-4 4H6c-2 0-4-2-4-4v-4c0-2 2-4 4-4z" fill="none" />
        <path d="M9 13h2m0 0h2m-2 0v-2m0 2v2" strokeLinecap="round" />
        <circle cx="17" cy="13" r="1" fill={color} />
        <circle cx="15" cy="15" r="1" fill={color} />
      </svg>
    ),
    
    book: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" fill="none" />
        <path d="M8 7h8M8 11h8M8 15h5" strokeLinecap="round" />
      </svg>
    ),
    
    trophy: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M8 21h8M12 17v4" strokeLinecap="round" />
        <path d="M5 7H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h2" fill="none" />
        <path d="M19 7h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-2" fill="none" />
        <path d="M7 4h10v7a5 5 0 0 1-10 0V4z" fill={color} opacity="0.2" stroke="none" />
        <path d="M7 4h10v7a5 5 0 0 1-10 0V4z" fill="none" />
      </svg>
    ),
    
    palette: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M12 2a10 10 0 0 1 10 10c0 5-4 6-6 6h-1.5c-1 0-1.5.5-1.5 1.5 0 .5.2 1 .5 1.5.3.5.5 1 .5 1.5a2 2 0 0 1-2 2 10 10 0 1 1 0-20z" fill="none" />
        <circle cx="8" cy="10" r="1.5" fill={color} />
        <circle cx="13" cy="8" r="1.5" fill={color} />
        <circle cx="16" cy="12" r="1.5" fill={color} />
      </svg>
    ),
    
    // User roles
    student: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z" fill={color} opacity="0.2" stroke="none" />
        <path d="M12 2L2 7l10 5 10-5-10-5z" fill="none" />
        <path d="M2 17l10 5 10-5M12 12v10" strokeLinecap="round" />
      </svg>
    ),
    
    teacher: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <rect x="3" y="4" width="18" height="14" rx="2" fill="none" />
        <path d="M3 8h18M7 12h10M7 15h7" strokeLinecap="round" />
        <path d="M8 22l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    
    // Actions & UI
    plus: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <circle cx="12" cy="12" r="10" fill="none" />
        <path d="M12 8v8M8 12h8" strokeLinecap="round" />
      </svg>
    ),
    
    check: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3">
        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    
    star: (
      <svg viewBox="0 0 24 24" fill={color} stroke="none">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    
    sparkles: (
      <svg viewBox="0 0 24 24" fill={color} stroke="none">
        <path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2zM6 16l.75 2.25L9 19l-2.25.75L6 22l-.75-2.25L3 19l2.25-.75L6 16zM18 16l.75 2.25L21 19l-2.25.75L18 22l-.75-2.25L15 19l2.25-.75L18 16z" />
      </svg>
    ),
    
    cart: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <circle cx="9" cy="21" r="1" fill={color} />
        <circle cx="20" cy="21" r="1" fill={color} />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    
    users: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" fill="none" />
        <circle cx="9" cy="7" r="4" fill={color} opacity="0.2" stroke="none" />
        <circle cx="9" cy="7" r="4" fill="none" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" />
      </svg>
    ),
    
    lightning: (
      <svg viewBox="0 0 24 24" fill={color} stroke="none">
        <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
      </svg>
    ),

    lock: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <rect x="5" y="11" width="14" height="10" rx="2" fill="none" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" />
        <circle cx="12" cy="16" r="1" fill={color} />
      </svg>
    ),
    
    gift: (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <rect x="3" y="8" width="18" height="4" rx="1" fill={color} opacity="0.2" stroke="none" />
        <rect x="3" y="8" width="18" height="4" rx="1" fill="none" />
        <rect x="4" y="12" width="16" height="9" rx="1" fill="none" />
        <path d="M12 8v13M8 8h8M10 3a2 2 0 0 1 2 2v3M14 3a2 2 0 0 0-2 2v3" strokeLinecap="round" />
      </svg>
    ),
    
    play: (
      <svg viewBox="0 0 24 24" fill={color} stroke="none">
        <path d="M8 5v14l11-7z" />
      </svg>
    ),
  };

  return (
    <span 
      className={`icon ${className}`} 
      style={{ 
        width: size, 
        height: size, 
        display: 'inline-block',
        lineHeight: 0 
      }}
    >
      {icons[name] || icons.slime}
    </span>
  );
};

export default Icon;

