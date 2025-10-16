import React from 'react';
import SlimeSVG from './SlimeSVG';
import { getSlimeColor, getSlimeEmoji } from '../utils/slimeSprites';

// SVG Gradients for special slimes
const GradientDefs = () => (
  <svg style={{ position: 'absolute', width: 0, height: 0 }}>
    <defs>
      <linearGradient id="rainbow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#FF0080', stopOpacity: 1 }} />
        <stop offset="25%" style={{ stopColor: '#FF8C00', stopOpacity: 1 }} />
        <stop offset="50%" style={{ stopColor: '#40E0D0', stopOpacity: 1 }} />
        <stop offset="75%" style={{ stopColor: '#9370DB', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#FF1493', stopOpacity: 1 }} />
      </linearGradient>
      
      <linearGradient id="galaxy-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#4a00e0', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#8e2de2', stopOpacity: 1 }} />
      </linearGradient>
      
      <linearGradient id="nebula-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ee0979', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#ff6a00', stopOpacity: 1 }} />
      </linearGradient>
      
      <linearGradient id="aurora-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#a8edea', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#fed6e3', stopOpacity: 1 }} />
      </linearGradient>
      
      <linearGradient id="golden-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f7971e', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#ffd200', stopOpacity: 1 }} />
      </linearGradient>
      
      <linearGradient id="phoenix-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ff0844', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#ffb199', stopOpacity: 1 }} />
      </linearGradient>
      
      <linearGradient id="unicorn-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#fa709a', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#fee140', stopOpacity: 1 }} />
      </linearGradient>
      
      <linearGradient id="tako-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f093fb', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#f5576c', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
  </svg>
);

const Slime = ({ slimeId, size = 60, useSVG = true, className = '' }) => {
  if (!useSVG) {
    // Fallback to emoji
    return <span style={{ fontSize: size }} className={className}>{getSlimeEmoji(slimeId)}</span>;
  }

  const color = getSlimeColor(slimeId);
  
  return (
    <>
      <GradientDefs />
      <SlimeSVG color={color} size={size} className={className} />
    </>
  );
};

export default Slime;
