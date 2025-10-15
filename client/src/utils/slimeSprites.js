// Slime sprite data for StudyHall
// 37 unique slimes: 30 regular + 7 secret

export const slimeSprites = {
  // COMMON - Basic flavors (6 slimes)
  mint: { emoji: '🟢', name: 'Mint Slime', color: '#7bed9f' },
  cherry: { emoji: '🍒', name: 'Cherry Slime', color: '#ff6b6b' },
  blueberry: { emoji: '🫐', name: 'Blueberry Slime', color: '#4834df' },
  orange: { emoji: '🍊', name: 'Orange Slime', color: '#ff9f43' },
  chocolate: { emoji: '🍫', name: 'Chocolate Slime', color: '#8B4513' },
  watermelon: { emoji: '🍉', name: 'Watermelon Slime', color: '#ff6b81' },
  
  // UNCOMMON - Elements (6 slimes)
  fire: { emoji: '🔥', name: 'Fire Slime', color: '#ff4757' },
  water: { emoji: '💧', name: 'Water Slime', color: '#1e90ff' },
  ice: { emoji: '🧊', name: 'Ice Slime', color: '#70a1ff' },
  lightning: { emoji: '⚡', name: 'Lightning Slime', color: '#ffd700' },
  forest: { emoji: '🌲', name: 'Forest Slime', color: '#2ed573' },
  ocean: { emoji: '🌊', name: 'Ocean Slime', color: '#3742fa' },
  
  // RARE - Special patterns (6 slimes)
  rainbow: { emoji: '🌈', name: 'Rainbow Slime', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  midnight: { emoji: '🌙', name: 'Midnight Slime', color: '#2c3e50' },
  sakura: { emoji: '🌸', name: 'Sakura Slime', color: '#ffb7b2' },
  pumpkin: { emoji: '🎃', name: 'Pumpkin Slime', color: '#ff7f50' },
  honey: { emoji: '🍯', name: 'Honey Slime', color: '#f39c12' },
  coral: { emoji: '🪸', name: 'Coral Slime', color: '#ff6b9d' },
  
  // EPIC - Gems (5 slimes)
  ruby: { emoji: '💎', name: 'Ruby Slime', color: '#e74c3c' },
  sapphire: { emoji: '💠', name: 'Sapphire Slime', color: '#3498db' },
  emerald: { emoji: '✨', name: 'Emerald Slime', color: '#2ecc71' },
  amethyst: { emoji: '💜', name: 'Amethyst Slime', color: '#9b59b6' },
  opal: { emoji: '🔮', name: 'Opal Slime', color: '#e8daef' },
  
  // LEGENDARY - Cosmic (4 slimes)
  galaxy: { emoji: '🌌', name: 'Galaxy Slime', color: 'linear-gradient(135deg, #4a00e0 0%, #8e2de2 100%)' },
  nebula: { emoji: '☄️', name: 'Nebula Slime', color: 'linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)' },
  aurora: { emoji: '🌅', name: 'Aurora Slime', color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
  golden: { emoji: '🌟', name: 'Golden Slime', color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)' },
  
  // MYTHIC - Legendary creatures (3 slimes)
  phoenix: { emoji: '🔥', name: 'Phoenix Slime', color: 'linear-gradient(135deg, #ff0844 0%, #ffb199 100%)' },
  dragon: { emoji: '🐉', name: 'Dragon Slime', color: 'linear-gradient(135deg, #ff0000 0%, #8b0000 100%)' },
  ghost: { emoji: '👻', name: 'Ghost Slime', color: '#ecf0f1' },
  
  // SECRET - Ultimate rares (7 slimes)
  unicorn: { emoji: '🦄', name: 'Unicorn Slime', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  king: { emoji: '👑', name: 'King Slime', color: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)' },
  queen: { emoji: '👸', name: 'Queen Slime', color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' },
  wizard: { emoji: '🧙', name: 'Wizard Slime', color: 'linear-gradient(135deg, #5f2c82 0%, #49a09d 100%)' },
  knight: { emoji: '⚔️', name: 'Knight Slime', color: 'linear-gradient(135deg, #8e9eab 0%, #eef2f3 100%)' },
  ninja: { emoji: '🥷', name: 'Ninja Slime', color: '#2c3e50' },
  tako: { emoji: '🌮', name: 'Tako Slime', color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }
};

export const getSlimeDisplay = (slimeId) => {
  const slime = slimeSprites[slimeId] || slimeSprites.mint;
  return slime.emoji;
};

export const getSlimeName = (slimeId) => {
  const slime = slimeSprites[slimeId] || slimeSprites.mint;
  return slime.name;
};

export const getSlimeColor = (slimeId) => {
  const slime = slimeSprites[slimeId] || slimeSprites.mint;
  return slime.color;
};
