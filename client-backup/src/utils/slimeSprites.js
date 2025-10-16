// Slime sprite data for StudyHall
// 37 unique slimes: 30 regular + 7 secret
// Now with SVG colors instead of emojis!

export const slimeSprites = {
  // COMMON - Basic flavors (6 slimes)
  mint: { color: '#7FD957', name: 'Mint Slime', rarity: 'common' },
  cherry: { color: '#FF6B6B', name: 'Cherry Slime', rarity: 'common' },
  blueberry: { color: '#4834DF', name: 'Blueberry Slime', rarity: 'common' },
  orange: { color: '#FF9F43', name: 'Orange Slime', rarity: 'common' },
  chocolate: { color: '#8B4513', name: 'Chocolate Slime', rarity: 'common' },
  watermelon: { color: '#FF6B81', name: 'Watermelon Slime', rarity: 'common' },
  
  // UNCOMMON - Elements (6 slimes)
  fire: { color: '#FF4757', name: 'Fire Slime', rarity: 'uncommon' },
  water: { color: '#1E90FF', name: 'Water Slime', rarity: 'uncommon' },
  ice: { color: '#70A1FF', name: 'Ice Slime', rarity: 'uncommon' },
  lightning: { color: '#FFD700', name: 'Lightning Slime', rarity: 'uncommon' },
  forest: { color: '#2ED573', name: 'Forest Slime', rarity: 'uncommon' },
  ocean: { color: '#3742FA', name: 'Ocean Slime', rarity: 'uncommon' },
  
  // RARE - Special patterns (6 slimes)
  rainbow: { color: 'url(#rainbow-gradient)', name: 'Rainbow Slime', rarity: 'rare', isGradient: true },
  midnight: { color: '#2C3E50', name: 'Midnight Slime', rarity: 'rare' },
  sakura: { color: '#FFB7B2', name: 'Sakura Slime', rarity: 'rare' },
  pumpkin: { color: '#FF7F50', name: 'Pumpkin Slime', rarity: 'rare' },
  honey: { color: '#F39C12', name: 'Honey Slime', rarity: 'rare' },
  coral: { color: '#FF6B9D', name: 'Coral Slime', rarity: 'rare' },
  
  // EPIC - Gems (5 slimes)
  ruby: { color: '#E74C3C', name: 'Ruby Slime', rarity: 'epic' },
  sapphire: { color: '#3498DB', name: 'Sapphire Slime', rarity: 'epic' },
  emerald: { color: '#2ECC71', name: 'Emerald Slime', rarity: 'epic' },
  amethyst: { color: '#9B59B6', name: 'Amethyst Slime', rarity: 'epic' },
  opal: { color: '#E8DAEF', name: 'Opal Slime', rarity: 'epic' },
  
  // LEGENDARY - Cosmic (4 slimes)
  galaxy: { color: 'url(#galaxy-gradient)', name: 'Galaxy Slime', rarity: 'legendary', isGradient: true },
  nebula: { color: 'url(#nebula-gradient)', name: 'Nebula Slime', rarity: 'legendary', isGradient: true },
  aurora: { color: 'url(#aurora-gradient)', name: 'Aurora Slime', rarity: 'legendary', isGradient: true },
  golden: { color: 'url(#golden-gradient)', name: 'Golden Slime', rarity: 'legendary', isGradient: true },
  
  // MYTHIC - Legendary creatures (3 slimes)
  phoenix: { color: 'url(#phoenix-gradient)', name: 'Phoenix Slime', rarity: 'mythic', isGradient: true },
  dragon: { color: '#8B0000', name: 'Dragon Slime', rarity: 'mythic' },
  ghost: { color: '#ECF0F1', name: 'Ghost Slime', rarity: 'mythic' },
  
  // SECRET - Ultimate rares (7 slimes)
  unicorn: { color: 'url(#unicorn-gradient)', name: 'Unicorn Slime', rarity: 'secret', isGradient: true },
  king: { color: '#FFD700', name: 'King Slime', rarity: 'secret' },
  queen: { color: '#FFC0CB', name: 'Queen Slime', rarity: 'secret' },
  wizard: { color: '#5F2C82', name: 'Wizard Slime', rarity: 'secret' },
  knight: { color: '#8E9EAB', name: 'Knight Slime', rarity: 'secret' },
  ninja: { color: '#2C3E50', name: 'Ninja Slime', rarity: 'secret' },
  tako: { color: 'url(#tako-gradient)', name: 'Tako Slime', rarity: 'secret', isGradient: true }
};

export const getSlimeColor = (slimeId) => {
  const slime = slimeSprites[slimeId] || slimeSprites.mint;
  return slime.color;
};

export const getSlimeName = (slimeId) => {
  const slime = slimeSprites[slimeId] || slimeSprites.mint;
  return slime.name;
};

export const getSlimeRarity = (slimeId) => {
  const slime = slimeSprites[slimeId] || slimeSprites.mint;
  return slime.rarity;
};

// Get emoji fallback for backwards compatibility
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

// Legacy function - now returns emoji
export const getSlimeDisplay = getSlimeEmoji;

