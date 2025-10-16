import React from 'react';

const SlimeSVG = ({ color = '#00FA9A', size = 60, className = '' }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      width={size} 
      height={size} 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id={`shadow-${color}`}>
          <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
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
      
      <g filter={`url(#shadow-${color})`}>
        {/* Main slime body */}
        <ellipse 
          cx="50" 
          cy="55" 
          rx="38" 
          ry="35" 
          fill={color}
          opacity="0.95"
        />
        
        {/* Shine highlight */}
        <ellipse 
          cx="38" 
          cy="42" 
          rx="15" 
          ry="18" 
          fill="rgba(255,255,255,0.4)"
        />
        
        {/* Left eye */}
        <g>
          <ellipse cx="38" cy="50" rx="6" ry="10" fill="#2C3E50"/>
          <ellipse cx="39" cy="47" rx="2.5" ry="4" fill="white"/>
        </g>
        
        {/* Right eye */}
        <g>
          <ellipse cx="60" cy="50" rx="6" ry="10" fill="#2C3E50"/>
          <ellipse cx="61" cy="47" rx="2.5" ry="4" fill="white"/>
        </g>
        
        {/* Happy smile */}
        <path 
          d="M 40 62 Q 49 68 58 62" 
          stroke="#2C3E50" 
          strokeWidth="2.5" 
          fill="none" 
          strokeLinecap="round"
        />
        
        {/* Blush left */}
        <ellipse 
          cx="30" 
          cy="58" 
          rx="5" 
          ry="4" 
          fill="#FF9AA2" 
          opacity="0.6"
        />
        
        {/* Blush right */}
        <ellipse 
          cx="68" 
          cy="58" 
          rx="5" 
          ry="4" 
          fill="#FF9AA2" 
          opacity="0.6"
        />
      </g>
    </svg>
  );
};

export default SlimeSVG;
