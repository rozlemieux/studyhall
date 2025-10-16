import React from 'react';

function Logo({ size = 'medium' }) {
  const sizes = {
    small: { width: 160, height: 45 },
    medium: { width: 240, height: 68 },
    large: { width: 320, height: 90 }
  };

  const { width, height } = sizes[size];

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 320 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradients */}
        <linearGradient id="slimeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7FD957" />
          <stop offset="50%" stopColor="#00FA9A" />
          <stop offset="100%" stopColor="#00E088" />
        </linearGradient>
        
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00C878" />
          <stop offset="50%" stopColor="#00FA9A" />
          <stop offset="100%" stopColor="#00C878" />
        </linearGradient>

        <radialGradient id="shineGradient">
          <stop offset="0%" stopColor="white" stopOpacity="0.8" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>

        {/* Shadow filter */}
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
          <feOffset dx="0" dy="2" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Cute Slime Character */}
      <g filter="url(#shadow)">
        {/* Slime Body - Rounded blob shape */}
        <ellipse cx="45" cy="50" rx="35" ry="32" fill="url(#slimeGradient)" />
        
        {/* Bottom blob details */}
        <ellipse cx="30" cy="65" rx="18" ry="15" fill="url(#slimeGradient)" />
        <ellipse cx="60" cy="68" rx="15" ry="12" fill="url(#slimeGradient)" />
        <ellipse cx="45" cy="70" rx="20" ry="10" fill="url(#slimeGradient)" opacity="0.8" />
        
        {/* Main shine highlight */}
        <ellipse cx="35" cy="35" rx="20" ry="15" fill="url(#shineGradient)" />
        <ellipse cx="30" cy="32" rx="12" ry="9" fill="white" opacity="0.6" />
        <ellipse cx="28" cy="30" rx="6" ry="5" fill="white" opacity="0.9" />
        
        {/* Secondary shine */}
        <ellipse cx="55" cy="42" rx="8" ry="6" fill="white" opacity="0.4" />
        <circle cx="52" cy="40" r="3" fill="white" opacity="0.7" />
        
        {/* Cute Eyes */}
        <g>
          {/* Left Eye */}
          <ellipse cx="35" cy="45" rx="6" ry="8" fill="#2C3E50" />
          <ellipse cx="36" cy="43" rx="2.5" ry="3" fill="white" />
          <circle cx="36.5" cy="44" r="1" fill="white" />
          
          {/* Right Eye */}
          <ellipse cx="52" cy="45" rx="6" ry="8" fill="#2C3E50" />
          <ellipse cx="53" cy="43" rx="2.5" ry="3" fill="white" />
          <circle cx="53.5" cy="44" r="1" fill="white" />
        </g>
        
        {/* Happy Smile */}
        <path
          d="M35 55 Q43.5 60, 52 55"
          stroke="#2C3E50"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Rosy Cheeks */}
        <ellipse cx="25" cy="52" rx="5" ry="3" fill="#FF9AA2" opacity="0.5" />
        <ellipse cx="65" cy="52" rx="5" ry="3" fill="#FF9AA2" opacity="0.5" />
      </g>

      {/* Small floating slime drops */}
      <g opacity="0.6">
        <ellipse cx="15" cy="30" rx="6" ry="7" fill="url(#slimeGradient)" />
        <ellipse cx="14" cy="28" rx="3" ry="3" fill="white" opacity="0.5" />
        
        <ellipse cx="75" cy="25" rx="5" ry="6" fill="url(#slimeGradient)" />
        <ellipse cx="74" cy="23" rx="2" ry="2" fill="white" opacity="0.5" />
        
        <ellipse cx="8" cy="55" rx="4" ry="5" fill="url(#slimeGradient)" />
        <ellipse cx="7" cy="53" rx="2" ry="2" fill="white" opacity="0.5" />
      </g>

      {/* STUDYHALL Text */}
      <g>
        {/* Background shadow text */}
        <text
          x="95"
          y="50"
          fontFamily="'Arial Black', 'Arial', sans-serif"
          fontSize="38"
          fontWeight="900"
          fill="#0A5F47"
          opacity="0.3"
        >
          STUDYHALL
        </text>
        
        {/* Main text with stroke */}
        <text
          x="95"
          y="48"
          fontFamily="'Arial Black', 'Arial', sans-serif"
          fontSize="38"
          fontWeight="900"
          fill="url(#textGradient)"
          stroke="#0F7A5C"
          strokeWidth="3"
          strokeLinejoin="round"
          paintOrder="stroke"
        >
          STUDYHALL
        </text>
        
        {/* Top shine highlight */}
        <text
          x="95"
          y="48"
          fontFamily="'Arial Black', 'Arial', sans-serif"
          fontSize="38"
          fontWeight="900"
          fill="white"
          opacity="0.3"
          style={{ clipPath: 'inset(0 0 50% 0)' }}
        >
          STUDYHALL
        </text>
      </g>

      {/* Decorative sparkles */}
      <g fill="#FFD700" opacity="0.7">
        <circle cx="280" cy="25" r="2.5" />
        <circle cx="285" cy="30" r="1.5" />
        <circle cx="290" cy="22" r="2" />
        
        <path d="M275 35 L276 37 L278 38 L276 39 L275 41 L274 39 L272 38 L274 37 Z" />
        <path d="M295 40 L296 42 L298 43 L296 44 L295 46 L294 44 L292 43 L294 42 Z" />
      </g>

      {/* Bottom tagline - smaller text */}
      <text
        x="100"
        y="68"
        fontFamily="Arial, sans-serif"
        fontSize="12"
        fontWeight="600"
        fill="#00C878"
        letterSpacing="2"
      >
        LEARN • PLAY • GROW
      </text>
    </svg>
  );
}

export default Logo;

