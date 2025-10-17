// Slime sprite utility - generates unique visual representations for each slime
// Each slime has unique colors, shapes, patterns, and accessories

const slimeColors = {
  // COMMON - Basic fruit/food colors (6)
  'mint': { primary: '#98FB98', secondary: '#7CFC00', accent: '#00FF7F' },
  'cherry': { primary: '#DC143C', secondary: '#B22222', accent: '#8B0000' },
  'blueberry': { primary: '#6495ED', secondary: '#4169E1', accent: '#1E90FF' },
  'orange': { primary: '#FFA500', secondary: '#FF8C00', accent: '#FF4500' },
  'chocolate': { primary: '#7B3F00', secondary: '#3D2B1F', accent: '#61481C' },
  'watermelon': { primary: '#FF6B6B', secondary: '#4ECDC4', accent: '#45B7AF' },
  
  // UNCOMMON - Elements (6)
  'fire': { primary: '#FF4500', secondary: '#FF6347', accent: '#FFD700' },
  'water': { primary: '#1E90FF', secondary: '#00BFFF', accent: '#87CEEB' },
  'ice': { primary: '#00CED1', secondary: '#20B2AA', accent: '#48D1CC' },
  'lightning': { primary: '#FFFF00', secondary: '#F0E68C', accent: '#FFFACD' },
  'forest': { primary: '#228B22', secondary: '#2E8B57', accent: '#3CB371' },
  'ocean': { primary: '#006994', secondary: '#0077BE', accent: '#4682B4' },
  
  // RARE - Special patterns (6)
  'rainbow': { primary: '#FF69B4', secondary: '#FFD700', accent: '#00CED1' },
  'midnight': { primary: '#191970', secondary: '#000080', accent: '#4B0082' },
  'sakura': { primary: '#FFB7C5', secondary: '#FFC0CB', accent: '#FF69B4' },
  'pumpkin': { primary: '#FF7518', secondary: '#FF8C00', accent: '#FFA500' },
  'honey': { primary: '#FFC30B', secondary: '#FFD700', accent: '#FFDB58' },
  'coral': { primary: '#FF7F50', secondary: '#F08080', accent: '#FA8072' },
  
  // EPIC - Gems (5)
  'ruby': { primary: '#E0115F', secondary: '#FF0040', accent: '#F62217' },
  'sapphire': { primary: '#0F52BA', secondary: '#0067A5', accent: '#082567' },
  'emerald': { primary: '#50C878', secondary: '#00A86B', accent: '#009B7D' },
  'amethyst': { primary: '#9966CC', secondary: '#9370DB', accent: '#8F00FF' },
  'opal': { primary: '#A8C3BC', secondary: '#B0E0E6', accent: '#E0FFFF' },
  
  // LEGENDARY - Cosmic (4)
  'galaxy': { primary: '#191970', secondary: '#4B0082', accent: '#9370DB' },
  'nebula': { primary: '#8B008B', secondary: '#9932CC', accent: '#BA55D3' },
  'aurora': { primary: '#00FA9A', secondary: '#00CED1', accent: '#9370DB' },
  'golden': { primary: '#FFD700', secondary: '#DAA520', accent: '#B8860B' },
  
  // MYTHIC - Legendary creatures (3)
  'phoenix': { primary: '#FF4500', secondary: '#FFD700', accent: '#FF8C00' },
  'dragon': { primary: '#DC143C', secondary: '#8B0000', accent: '#B22222' },
  'ghost': { primary: '#E6E6FA', secondary: '#D8BFD8', accent: '#F0F8FF' },
  
  // SECRET - Ultimate rares (7)
  'unicorn': { primary: '#FFB6C1', secondary: '#DDA0DD', accent: '#E0FFFF' },
  'king': { primary: '#FFD700', secondary: '#DAA520', accent: '#B8860B' },
  'queen': { primary: '#DDA0DD', secondary: '#DA70D6', accent: '#EE82EE' },
  'wizard': { primary: '#9370DB', secondary: '#8A2BE2', accent: '#9400D3' },
  'knight': { primary: '#C0C0C0', secondary: '#A9A9A9', accent: '#D3D3D3' },
  'ninja': { primary: '#000000', secondary: '#2F4F4F', accent: '#696969' },
  'tako': { primary: '#FF1493', secondary: '#8B008B', accent: '#FFD700' }
};

// Generate unique features for each slime type
const getSlimeFeatures = (slimeId) => {
  const features = {
    // SECRET - Ultimate rares
    tako: {
      body: 'taco-shell',
      eyes: 'cute',
      mouth: 'happy',
      accessory: 'tentacles',
      pattern: 'food'
    },
    unicorn: {
      body: 'round',
      eyes: 'sparkle',
      mouth: 'smile',
      accessory: 'horn',
      pattern: 'sparkles'
    },
    king: {
      body: 'round',
      eyes: 'regal',
      mouth: 'proud',
      accessory: 'crown',
      pattern: 'royal'
    },
    queen: {
      body: 'elegant',
      eyes: 'beautiful',
      mouth: 'smile',
      accessory: 'tiara',
      pattern: 'jewels'
    },
    wizard: {
      body: 'round',
      eyes: 'wise',
      mouth: 'mysterious',
      accessory: 'hat',
      pattern: 'stars'
    },
    knight: {
      body: 'strong',
      eyes: 'determined',
      mouth: 'brave',
      accessory: 'helmet',
      pattern: 'armor'
    },
    ninja: {
      body: 'stealthy',
      eyes: 'focused',
      mouth: 'hidden',
      accessory: 'mask',
      pattern: 'shadows'
    },
    
    // MYTHIC - Legendary creatures
    dragon: {
      body: 'spiky',
      eyes: 'fierce',
      mouth: 'smirk',
      accessory: 'wings',
      pattern: 'scales'
    },
    phoenix: {
      body: 'tall',
      eyes: 'wise',
      mouth: 'smile',
      accessory: 'flames',
      pattern: 'feathers'
    },
    ghost: {
      body: 'ethereal',
      eyes: 'hollow',
      mouth: 'wavy',
      pattern: 'transparent'
    },
    
    // LEGENDARY - Cosmic
    galaxy: { body: 'cosmic', eyes: 'stars', mouth: 'wonder', pattern: 'nebula' },
    nebula: { body: 'cloudy', eyes: 'cosmic', mouth: 'mystical', pattern: 'clouds' },
    aurora: { body: 'flowing', eyes: 'bright', mouth: 'serene', pattern: 'lights' },
    golden: { body: 'shiny', eyes: 'gleaming', mouth: 'proud', pattern: 'sparkles' },
    
    // EPIC - Gems
    ruby: { body: 'faceted', eyes: 'bright', mouth: 'happy', pattern: 'gems' },
    sapphire: { body: 'faceted', eyes: 'deep', mouth: 'serene', pattern: 'gems' },
    emerald: { body: 'faceted', eyes: 'vibrant', mouth: 'smile', pattern: 'gems' },
    amethyst: { body: 'faceted', eyes: 'mystical', mouth: 'calm', pattern: 'gems' },
    opal: { body: 'faceted', eyes: 'shimmer', mouth: 'smile', pattern: 'iridescent' },
    
    // RARE - Special patterns
    rainbow: { body: 'round', eyes: 'colorful', mouth: 'happy', pattern: 'rainbow' },
    midnight: { body: 'dark', eyes: 'starry', mouth: 'mysterious', pattern: 'stars' },
    sakura: { body: 'soft', eyes: 'peaceful', mouth: 'serene', pattern: 'petals' },
    pumpkin: { body: 'round', eyes: 'carved', mouth: 'jack-o', pattern: 'ridges' },
    honey: { body: 'sticky', eyes: 'sweet', mouth: 'happy', pattern: 'honeycomb' },
    coral: { body: 'branched', eyes: 'ocean', mouth: 'smile', pattern: 'coral' },
    
    // UNCOMMON - Elements
    fire: { body: 'flickering', eyes: 'fierce', mouth: 'smirk', pattern: 'flames' },
    water: { body: 'wavy', eyes: 'calm', mouth: 'smile', pattern: 'waves' },
    ice: { body: 'crystalline', eyes: 'cool', mouth: 'calm', pattern: 'snowflakes' },
    lightning: { body: 'electric', eyes: 'intense', mouth: 'excited', pattern: 'bolts' },
    forest: { body: 'leafy', eyes: 'natural', mouth: 'peaceful', pattern: 'leaves' },
    ocean: { body: 'deep', eyes: 'mysterious', mouth: 'calm', pattern: 'waves' },
    
    // COMMON - Basic flavors
    mint: { body: 'round', eyes: 'fresh', mouth: 'smile', pattern: 'none' },
    cherry: { body: 'round', eyes: 'sweet', mouth: 'happy', pattern: 'seeds' },
    blueberry: { body: 'round', eyes: 'cute', mouth: 'smile', pattern: 'specks' },
    orange: { body: 'round', eyes: 'bright', mouth: 'cheerful', pattern: 'segments' },
    chocolate: { body: 'melty', eyes: 'sweet', mouth: 'yum', pattern: 'drips' },
    watermelon: { body: 'round', eyes: 'cute', mouth: 'happy', pattern: 'stripes' },
  };
  
  // Default features for slimes not specified
  return features[slimeId] || {
    body: 'round',
    eyes: 'cute',
    mouth: 'smile',
    pattern: 'none'
  };
};

// Generate a slime sprite with unique features
export const getSlimeSprite = (slimeId) => {
  const colors = slimeColors[slimeId] || { primary: '#98FB98', secondary: '#7CFC00', accent: '#00FF7F' };
  const features = getSlimeFeatures(slimeId);
  
  // Pattern SVG fragments
  const patterns = {
    none: '',
    flames: `<path d="M 35 70 Q 40 65 45 70 Q 50 65 55 70" fill="${colors.accent}" opacity="0.6"/>
             <path d="M 40 75 Q 45 70 50 75" fill="${colors.accent}" opacity="0.5"/>`,
    waves: `<path d="M 30 70 Q 35 68 40 70 Q 45 72 50 70 Q 55 68 60 70" stroke="${colors.accent}" fill="none" stroke-width="2"/>
            <path d="M 30 75 Q 35 73 40 75 Q 45 77 50 75 Q 55 73 60 75" stroke="${colors.accent}" fill="none" stroke-width="2"/>`,
    snowflakes: `<text x="35" y="65" font-size="10" fill="white" opacity="0.8">❄</text>
                 <text x="55" y="70" font-size="8" fill="white" opacity="0.7">❄</text>`,
    bolts: `<path d="M 45 50 L 48 60 L 46 60 L 49 70" stroke="${colors.accent}" stroke-width="2" fill="none"/>`,
    gems: `<polygon points="40,60 43,65 40,70 37,65" fill="white" opacity="0.7"/>
           <polygon points="55,65 58,70 55,75 52,70" fill="white" opacity="0.6"/>`,
    hearts: `<text x="35" y="65" font-size="12" fill="${colors.accent}" opacity="0.7">♥</text>
             <text x="55" y="68" font-size="10" fill="${colors.accent}" opacity="0.6">♥</text>`,
    stars: `<text x="35" y="62" font-size="12" fill="${colors.accent}">⭐</text>
            <text x="55" y="68" font-size="10" fill="${colors.accent}">✨</text>`,
    petals: `<ellipse cx="38" cy="60" rx="4" ry="6" fill="${colors.accent}" opacity="0.5" transform="rotate(20 38 60)"/>
             <ellipse cx="58" cy="68" rx="3" ry="5" fill="${colors.accent}" opacity="0.5" transform="rotate(-15 58 68)"/>`,
    stripes: `<path d="M 30 55 Q 50 53 70 55" stroke="${colors.secondary}" stroke-width="3" fill="none"/>
              <path d="M 30 65 Q 50 63 70 65" stroke="${colors.secondary}" stroke-width="3" fill="none"/>`,
    dots: `<circle cx="38" cy="60" r="3" fill="${colors.accent}" opacity="0.6"/>
           <circle cx="55" cy="65" r="2" fill="${colors.accent}" opacity="0.6"/>
           <circle cx="45" cy="72" r="2.5" fill="${colors.accent}" opacity="0.6"/>`,
    sparkles: `<text x="32" y="58" font-size="8" fill="white">✨</text>
               <text x="58" y="65" font-size="10" fill="white">✨</text>
               <text x="45" y="73" font-size="6" fill="white">✨</text>`,
    circuit: `<path d="M 35 60 L 40 60 L 40 65 L 45 65" stroke="${colors.accent}" stroke-width="1.5" fill="none"/>
              <circle cx="40" cy="60" r="2" fill="${colors.accent}"/>
              <circle cx="45" cy="65" r="2" fill="${colors.accent}"/>`,
    rainbow: `<path d="M 35 70 Q 50 65 65 70" stroke="#FF0000" stroke-width="1" fill="none"/>
              <path d="M 35 72 Q 50 67 65 72" stroke="#00FF00" stroke-width="1" fill="none"/>
              <path d="M 35 74 Q 50 69 65 74" stroke="#0000FF" stroke-width="1" fill="none"/>`,
    chips: `<ellipse cx="40" cy="65" rx="3" ry="4" fill="${colors.secondary}"/>
            <ellipse cx="55" cy="70" rx="2" ry="3" fill="${colors.secondary}"/>`,
  };

  // Accessory SVG fragments
  const accessories = {
    horn: `<path d="M 50 30 L 48 42 L 52 42 Z" fill="${colors.accent}" stroke="#FFD700" stroke-width="1"/>
           <circle cx="50" cy="42" r="2" fill="#FFD700"/>`,
    crown: `<path d="M 38 35 L 40 42 L 45 38 L 50 42 L 55 38 L 60 42 L 62 35 L 38 35 Z" 
            fill="#FFD700" stroke="#DAA520" stroke-width="1"/>
            <circle cx="45" cy="37" r="2" fill="#FF0000"/>
            <circle cx="55" cy="37" r="2" fill="#FF0000"/>`,
    tiara: `<path d="M 40 38 L 42 32 L 48 36 L 50 28 L 52 36 L 58 32 L 60 38" 
            fill="none" stroke="#FFB6C1" stroke-width="2"/>
            <circle cx="50" cy="28" r="2" fill="#FFD700"/>`,
    hat: `<path d="M 35 40 Q 50 25 65 40 L 62 42 L 38 42 Z" fill="#9370DB" stroke="#4B0082" stroke-width="1"/>
          <ellipse cx="50" cy="42" rx="14" ry="3" fill="#9370DB"/>
          <text x="45" y="38" font-size="12">✨</text>`,
    helmet: `<ellipse cx="50" cy="38" rx="16" ry="12" fill="${colors.primary}" stroke="#696969" stroke-width="2"/>
             <rect x="42" y="40" width="16" height="6" fill="#333" opacity="0.5"/>`,
    wings: `<path d="M 25 50 Q 20 45 25 40 Q 28 45 25 50" fill="${colors.accent}" opacity="0.6"/>
            <path d="M 75 50 Q 80 45 75 40 Q 72 45 75 50" fill="${colors.accent}" opacity="0.6"/>`,
    flames: `<path d="M 35 45 Q 38 38 35 35" fill="#FF6347" opacity="0.7"/>
             <path d="M 45 40 Q 48 33 45 28" fill="#FF4500" opacity="0.7"/>
             <path d="M 55 40 Q 58 33 55 28" fill="#FF4500" opacity="0.7"/>
             <path d="M 65 45 Q 62 38 65 35" fill="#FF6347" opacity="0.7"/>`,
    tentacles: `<path d="M 35 75 Q 30 80 28 85" stroke="${colors.primary}" stroke-width="3" fill="none" stroke-linecap="round"/>
                <path d="M 42 78 Q 38 85 36 90" stroke="${colors.primary}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                <path d="M 58 78 Q 62 85 64 90" stroke="${colors.primary}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                <path d="M 65 75 Q 70 80 72 85" stroke="${colors.primary}" stroke-width="3" fill="none" stroke-linecap="round"/>
                <circle cx="28" cy="85" r="2" fill="${colors.accent}"/>
                <circle cx="36" cy="90" r="1.5" fill="${colors.accent}"/>
                <circle cx="64" cy="90" r="1.5" fill="${colors.accent}"/>
                <circle cx="72" cy="85" r="2" fill="${colors.accent}"/>`,
  };

  // Special body shapes
  let bodyPath = '';
  if (slimeId === 'tako') {
    // Taco shell shape
    bodyPath = `<path d="M 50 40 Q 35 45 30 60 Q 30 70 35 75 L 65 75 Q 70 70 70 60 Q 65 45 50 40 Z" 
                fill="url(#grad-${slimeId})" filter="url(#goo-${slimeId})"/>
                <path d="M 35 60 Q 40 58 45 60 Q 50 58 55 60 Q 60 58 65 60" 
                stroke="${colors.secondary}" stroke-width="2" fill="none"/>`;
  } else if (features.body === 'heart') {
    bodyPath = `<path d="M 50 70 Q 40 80 30 70 Q 25 60 30 55 Q 35 50 50 60 Q 65 50 70 55 Q 75 60 70 70 Q 60 80 50 70 Z" 
                fill="url(#grad-${slimeId})" filter="url(#goo-${slimeId})"/>`;
  } else if (features.body === 'spiky') {
    bodyPath = `<ellipse cx="50" cy="62" rx="32" ry="28" fill="url(#grad-${slimeId})" filter="url(#goo-${slimeId})"/>
                <polygon points="40,45 42,50 38,52" fill="${colors.secondary}"/>
                <polygon points="50,42 52,48 48,48" fill="${colors.secondary}"/>
                <polygon points="60,45 58,50 62,52" fill="${colors.secondary}"/>`;
  } else {
    // Default round body
    bodyPath = `<ellipse cx="50" cy="60" rx="35" ry="30" fill="url(#grad-${slimeId})" filter="url(#goo-${slimeId})"/>`;
  }
  
  const svg = `
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="grad-${slimeId}" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:${colors.accent};stop-opacity:1" />
          <stop offset="50%" style="stop-color:${colors.primary};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${colors.secondary};stop-opacity:1" />
        </radialGradient>
        <filter id="goo-${slimeId}">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
        </filter>
      </defs>
      
      <!-- Body -->
      ${bodyPath}
      
      <!-- Pattern -->
      ${patterns[features.pattern] || ''}
      
      <!-- Shine effect -->
      <ellipse cx="35" cy="45" rx="12" ry="15" fill="white" opacity="0.6"/>
      <ellipse cx="28" cy="40" rx="6" ry="8" fill="white" opacity="0.8"/>
      
      <!-- Eyes -->
      <circle cx="40" cy="55" r="5" fill="white"/>
      <circle cx="60" cy="55" r="5" fill="white"/>
      <circle cx="42" cy="55" r="3" fill="black"/>
      <circle cx="62" cy="55" r="3" fill="black"/>
      
      <!-- Eye sparkles -->
      <circle cx="41" cy="53" r="1" fill="white"/>
      <circle cx="61" cy="53" r="1" fill="white"/>
      
      <!-- Mouth -->
      ${features.mouth === 'happy' ? '<path d="M 45 65 Q 50 69 55 65" stroke="black" stroke-width="2" fill="none" stroke-linecap="round"/>' : ''}
      ${features.mouth === 'smile' ? '<path d="M 45 65 Q 50 68 55 65" stroke="black" stroke-width="2" fill="none" stroke-linecap="round"/>' : ''}
      ${features.mouth === 'grin' ? '<path d="M 43 65 Q 50 70 57 65" stroke="black" stroke-width="2.5" fill="none" stroke-linecap="round"/>' : ''}
      ${features.mouth === 'smirk' ? '<path d="M 45 65 L 50 67 L 55 65" stroke="black" stroke-width="2" fill="none" stroke-linecap="round"/>' : ''}
      ${features.mouth === 'jack-o' ? '<path d="M 42 63 L 45 66 L 48 63 L 50 66 L 52 63 L 55 66 L 58 63" stroke="black" stroke-width="2" fill="none"/>' : ''}
      
      <!-- Accessories -->
      ${accessories[features.accessory] || ''}
    </svg>
  `;
  
  // Convert SVG to data URL using encodeURIComponent (Unicode-safe)
  const dataUrl = `data:image/svg+xml,${encodeURIComponent(svg)}`;
  return dataUrl;
};

// Get slime color for backgrounds/borders
export const getSlimeColor = (slimeId) => {
  const colors = slimeColors[slimeId] || { primary: '#98FB98', secondary: '#7CFC00', accent: '#00FF7F' };
  return colors.primary;
};

// Get slime gradient
export const getSlimeGradient = (slimeId) => {
  const colors = slimeColors[slimeId] || { primary: '#98FB98', secondary: '#7CFC00', accent: '#00FF7F' };
  return `linear-gradient(135deg, ${colors.primary}, ${colors.secondary}, ${colors.accent})`;
};

/* 
 * ============================================
 * HOW TO CUSTOMIZE SLIMES:
 * ============================================
 * 
 * 1. To change colors, edit the slimeColors object above
 * 2. To add patterns, add to the patterns object (line ~180)
 * 3. To add accessories, add to the accessories object (line ~200)
 * 4. To customize a specific slime, add it to getSlimeFeatures() (line ~80)
 * 
 * Available body types: round, heart, spiky, taco-shell, etc.
 * Available patterns: flames, waves, snowflakes, bolts, gems, hearts, stars, etc.
 * Available accessories: horn, crown, tiara, hat, helmet, wings, flames, tentacles
 * Available mouth types: happy, smile, grin, smirk, jack-o
 * 
 * Example: To make a new custom slime called 'myslime':
 * 
 * 1. Add color in slimeColors:
 *    'myslime': { primary: '#FF0000', secondary: '#00FF00', accent: '#0000FF' }
 * 
 * 2. Add features in getSlimeFeatures:
 *    myslime: {
 *      body: 'round',
 *      eyes: 'cute',
 *      mouth: 'happy',
 *      accessory: 'crown',
 *      pattern: 'stars'
 *    }
 * 
 * That's it! The slime will automatically be generated with these features.
 */

// Emoji fallback map for backwards compatibility
export const getSlimeEmoji = (slimeId) => {
  const emojiMap = {
    mint: '🟢', cherry: '🍒', blueberry: '🫐', orange: '🍊',
    chocolate: '🍫', watermelon: '🍉', fire: '🔥', water: '💧',
    ice: '🧊', lightning: '⚡', forest: '🌲', ocean: '🌊',
    rainbow: '🌈', midnight: '🌙', sakura: '🌸', pumpkin: '🎃',
    honey: '🍯', coral: '🪸', ruby: '💎', sapphire: '💠',
    emerald: '✨', amethyst: '💜', opal: '🔮', galaxy: '🌌',
    nebula: '☄️', aurora: '🌅', golden: '🌟', phoenix: '🔥',
    dragon: '🐉', ghost: '👻', unicorn: '🦄', king: '👑',
    queen: '👸', wizard: '🧙', knight: '⚔️', ninja: '🥷',
    tako: '🌮'
  };
  return emojiMap[slimeId] || '🟢';
};
