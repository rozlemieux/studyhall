const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const database = require('./database');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ['websocket', 'polling']
});

app.use(cors());
app.use(bodyParser.json());

// In-memory data storage for active sessions
const questionSets = new Map();
const activeGames = new Map();
// User and player data now stored in database

// Slime characters - 30 unique slimes + 7 secrets (37 total)
const slimes = [
  // COMMON: Basic flavors - 6 slimes
  { id: 'mint', name: 'Mint Slime', rarity: 'common', emoji: '🟢' },
  { id: 'cherry', name: 'Cherry Slime', rarity: 'common', emoji: '🍒' },
  { id: 'blueberry', name: 'Blueberry Slime', rarity: 'common', emoji: '🫐' },
  { id: 'orange', name: 'Orange Slime', rarity: 'common', emoji: '🍊' },
  { id: 'chocolate', name: 'Chocolate Slime', rarity: 'common', emoji: '🍫' },
  { id: 'watermelon', name: 'Watermelon Slime', rarity: 'common', emoji: '🍉' },
  
  // UNCOMMON: Elements - 6 slimes
  { id: 'fire', name: 'Fire Slime', rarity: 'uncommon', emoji: '🔥' },
  { id: 'water', name: 'Water Slime', rarity: 'uncommon', emoji: '💧' },
  { id: 'ice', name: 'Ice Slime', rarity: 'uncommon', emoji: '🧊' },
  { id: 'lightning', name: 'Lightning Slime', rarity: 'uncommon', emoji: '⚡' },
  { id: 'forest', name: 'Forest Slime', rarity: 'uncommon', emoji: '🌲' },
  { id: 'ocean', name: 'Ocean Slime', rarity: 'uncommon', emoji: '🌊' },
  
  // RARE: Special patterns - 6 slimes
  { id: 'rainbow', name: 'Rainbow Slime', rarity: 'rare', emoji: '🌈' },
  { id: 'midnight', name: 'Midnight Slime', rarity: 'rare', emoji: '🌙' },
  { id: 'sakura', name: 'Sakura Slime', rarity: 'rare', emoji: '🌸' },
  { id: 'pumpkin', name: 'Pumpkin Slime', rarity: 'rare', emoji: '🎃' },
  { id: 'honey', name: 'Honey Slime', rarity: 'rare', emoji: '🍯' },
  { id: 'coral', name: 'Coral Slime', rarity: 'rare', emoji: '🪸' },
  
  // EPIC: Gems - 5 slimes
  { id: 'ruby', name: 'Ruby Slime', rarity: 'epic', emoji: '💎' },
  { id: 'sapphire', name: 'Sapphire Slime', rarity: 'epic', emoji: '💠' },
  { id: 'emerald', name: 'Emerald Slime', rarity: 'epic', emoji: '✨' },
  { id: 'amethyst', name: 'Amethyst Slime', rarity: 'epic', emoji: '💜' },
  { id: 'opal', name: 'Opal Slime', rarity: 'epic', emoji: '🔮' },
  
  // LEGENDARY: Cosmic - 4 slimes
  { id: 'galaxy', name: 'Galaxy Slime', rarity: 'legendary', emoji: '🌌' },
  { id: 'nebula', name: 'Nebula Slime', rarity: 'legendary', emoji: '☄️' },
  { id: 'aurora', name: 'Aurora Slime', rarity: 'legendary', emoji: '🌅' },
  { id: 'golden', name: 'Golden Slime', rarity: 'legendary', emoji: '🌟' },
  
  // MYTHIC: Legendary creatures - 3 slimes
  { id: 'phoenix', name: 'Phoenix Slime', rarity: 'mythic', emoji: '🔥' },
  { id: 'dragon', name: 'Dragon Slime', rarity: 'mythic', emoji: '🐉' },
  { id: 'ghost', name: 'Ghost Slime', rarity: 'mythic', emoji: '👻' },
  
  // SECRET: Ultimate rares (obtained via easter eggs) - 7 slimes
  { id: 'unicorn', name: 'Unicorn Slime', rarity: 'secret', emoji: '🦄' },
  { id: 'king', name: 'King Slime', rarity: 'secret', emoji: '👑' },
  { id: 'queen', name: 'Queen Slime', rarity: 'secret', emoji: '👸' },
  { id: 'wizard', name: 'Wizard Slime', rarity: 'secret', emoji: '🧙' },
  { id: 'knight', name: 'Knight Slime', rarity: 'secret', emoji: '⚔️' },
  { id: 'ninja', name: 'Ninja Slime', rarity: 'secret', emoji: '🥷' },
  { id: 'tako', name: 'Tako Slime', rarity: 'secret', emoji: '🌮' }
];

// Slime packs - players buy packs and get random slimes
const slimePacks = [
  {
    id: 'common-pack',
    name: 'Common Pack',
    description: 'A basic pack containing common slimes',
    price: 100,
    rarity: 'common',
    slimeIds: ['mint', 'cherry', 'blueberry', 'orange', 'chocolate', 'watermelon']
  },
  {
    id: 'uncommon-pack',
    name: 'Uncommon Pack',
    description: 'An elemental pack with uncommon slimes',
    price: 300,
    rarity: 'uncommon',
    slimeIds: ['fire', 'water', 'ice', 'lightning', 'forest', 'ocean']
  },
  {
    id: 'rare-pack',
    name: 'Rare Pack',
    description: 'A special pack with rare patterned slimes',
    price: 800,
    rarity: 'rare',
    slimeIds: ['rainbow', 'midnight', 'sakura', 'pumpkin', 'honey', 'coral']
  },
  {
    id: 'epic-pack',
    name: 'Epic Pack',
    description: 'A precious pack of gem slimes',
    price: 1500,
    rarity: 'epic',
    slimeIds: ['ruby', 'sapphire', 'emerald', 'amethyst', 'opal']
  },
  {
    id: 'legendary-pack',
    name: 'Legendary Pack',
    description: 'A cosmic pack of legendary slimes',
    price: 3000,
    rarity: 'legendary',
    slimeIds: ['galaxy', 'nebula', 'aurora', 'golden']
  },
  {
    id: 'mythic-pack',
    name: 'Mythic Pack',
    description: 'An ultra-rare pack of mythical creatures',
    price: 5000,
    rarity: 'mythic',
    slimeIds: ['phoenix', 'dragon', 'ghost']
  }
];

// Easter egg codes for secret slimes
const easterEggCodes = {
  'MAGIC': 'wizard',
  'ROYALTY': 'king',
  'CROWN': 'queen',
  'HERO': 'knight',
  'STEALTH': 'ninja',
  'MYSTICAL': 'unicorn',
  'TAKOTIME': 'tako'
};

// Seed some question sets
const seedQuestionSets = () => {
  const mathSet = {
    id: uuidv4(),
    title: 'Basic Math',
    subject: 'Math',
    questions: [
      { question: 'What is 5 + 7?', answers: ['10', '11', '12', '13'], correct: 2 },
      { question: 'What is 15 - 8?', answers: ['5', '6', '7', '8'], correct: 2 },
      { question: 'What is 6 × 4?', answers: ['20', '22', '24', '26'], correct: 2 },
      { question: 'What is 36 ÷ 6?', answers: ['4', '5', '6', '7'], correct: 2 }
    ],
    createdBy: 'System'
  };

  const scienceSet = {
    id: uuidv4(),
    title: 'Basic Science',
    subject: 'Science',
    questions: [
      { question: 'What planet is known as the Red Planet?', answers: ['Venus', 'Mars', 'Jupiter', 'Saturn'], correct: 1 },
      { question: 'What is H2O commonly known as?', answers: ['Oxygen', 'Hydrogen', 'Water', 'Carbon'], correct: 2 },
      { question: 'How many bones are in the human body?', answers: ['196', '206', '216', '226'], correct: 1 },
      { question: 'What is the speed of light?', answers: ['300,000 km/s', '150,000 km/s', '450,000 km/s', '600,000 km/s'], correct: 0 }
    ],
    createdBy: 'System'
  };

  const historySet = {
    id: uuidv4(),
    title: 'World History',
    subject: 'History',
    questions: [
      { question: 'In what year did World War II end?', answers: ['1943', '1944', '1945', '1946'], correct: 2 },
      { question: 'Who was the first President of the United States?', answers: ['Thomas Jefferson', 'George Washington', 'John Adams', 'Benjamin Franklin'], correct: 1 },
      { question: 'What ancient wonder was located in Egypt?', answers: ['Hanging Gardens', 'Colossus', 'Pyramids', 'Lighthouse'], correct: 2 },
      { question: 'When did the Renaissance begin?', answers: ['12th century', '13th century', '14th century', '15th century'], correct: 2 }
    ],
    createdBy: 'System'
  };

  questionSets.set(mathSet.id, mathSet);
  questionSets.set(scienceSet.id, scienceSet);
  questionSets.set(historySet.id, historySet);
};

seedQuestionSets();

// API Routes
app.get('/api/question-sets', (req, res) => {
  res.json(Array.from(questionSets.values()));
});

app.post('/api/question-sets', (req, res) => {
  const { title, subject, questions, createdBy } = req.body;
  const newSet = {
    id: uuidv4(),
    title,
    subject,
    questions,
    createdBy
  };
  questionSets.set(newSet.id, newSet);
  res.json(newSet);
});

// Maps storage
const maps = new Map();

// Seed some default maps
const seedMaps = () => {
  const defaultMaps = [
    {
      id: uuidv4(),
      name: 'Classic Track',
      gameMode: 'racing',
      description: 'A simple racing track perfect for beginners',
      tiles: generateRacingTrack(),
      createdBy: 'system',
      isDefault: true
    },
    {
      id: uuidv4(),
      name: 'Battle Arena',
      gameMode: 'battle',
      description: 'Circular arena for intense battles',
      tiles: generateBattleArena(),
      createdBy: 'system',
      isDefault: true
    },
    {
      id: uuidv4(),
      name: 'Tower Heights',
      gameMode: 'tower',
      description: 'Climb to the top of this challenging tower',
      tiles: generateTowerMap(),
      createdBy: 'system',
      isDefault: true
    }
  ];

  defaultMaps.forEach(map => maps.set(map.id, map));
};

function generateRacingTrack() {
  const tiles = [];
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 15; x++) {
      let type = (x >= 6 && x <= 8) ? 'track' : 'grass';
      
      // Add some enemies on the track
      if (type === 'track' && y === 3 && x === 7) type = 'enemy-weak';
      if (type === 'track' && y === 6 && x === 7) type = 'enemy-medium';
      
      tiles.push({
        x, y,
        type: type,
        obstacle: null
      });
    }
  }
  return tiles;
}

function generateBattleArena() {
  const tiles = [];
  const centerX = 7, centerY = 5, radius = 4;
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 15; x++) {
      const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
      let type = dist <= radius ? 'arena' : 'wall';
      
      // Add some enemies in the arena
      if (type === 'arena' && x === 5 && y === 5) type = 'enemy-weak';
      if (type === 'arena' && x === 9 && y === 5) type = 'enemy-weak';
      if (type === 'arena' && x === 7 && y === 3) type = 'enemy-medium';
      if (type === 'arena' && x === 7 && y === 7) type = 'enemy-strong';
      
      tiles.push({
        x, y,
        type: type,
        obstacle: null
      });
    }
  }
  return tiles;
}

function generateTowerMap() {
  const tiles = [];
  for (let y = 0; y < 15; y++) {
    for (let x = 0; x < 10; x++) {
      let type = 'platform';
      
      // Create enemy path (winding path from bottom to top)
      if (x === 2 && y >= 0 && y <= 5) type = 'enemy-path';
      if (x >= 2 && x <= 7 && y === 5) type = 'enemy-path';
      if (x === 7 && y >= 5 && y <= 10) type = 'enemy-path';
      if (x >= 2 && x <= 7 && y === 10) type = 'enemy-path';
      if (x === 2 && y >= 10 && y <= 14) type = 'enemy-path';
      
      // Enemy spawn point
      if (x === 2 && y === 0) type = 'enemy-path-start';
      
      // Base/Goal
      if (x === 2 && y === 14) type = 'enemy-path-end';
      
      // Tower zones (strategic positions around the path)
      if ((x === 0 || x === 4 || x === 9) && (y === 3 || y === 7 || y === 12)) {
        type = 'tower-zone';
      }
      
      // Add some enemy spawners
      if (x === 2 && y === 2) type = 'enemy-weak';
      if (x === 5 && y === 5) type = 'enemy-medium';
      if (x === 7 && y === 8) type = 'enemy-strong';
      
      tiles.push({
        x, y,
        type: type,
        obstacle: null
      });
    }
  }
  return tiles;
}

seedMaps();

// Map API Routes
app.get('/api/maps', (req, res) => {
  const { gameMode } = req.query;
  let mapsArray = Array.from(maps.values());
  
  if (gameMode) {
    mapsArray = mapsArray.filter(map => map.gameMode === gameMode);
  }
  
  res.json(mapsArray);
});

app.get('/api/maps/:id', (req, res) => {
  const map = maps.get(req.params.id);
  if (map) {
    res.json(map);
  } else {
    res.status(404).json({ error: 'Map not found' });
  }
});

app.post('/api/maps', (req, res) => {
  const { name, gameMode, description, tiles, createdBy } = req.body;
  
  if (!name || !gameMode || !tiles) {
    return res.status(400).json({ error: 'Name, game mode, and tiles are required' });
  }
  
  const newMap = {
    id: uuidv4(),
    name,
    gameMode,
    description: description || '',
    tiles,
    createdBy: createdBy || 'anonymous',
    isDefault: false,
    createdAt: new Date().toISOString()
  };
  
  maps.set(newMap.id, newMap);
  res.json(newMap);
});

app.put('/api/maps/:id', (req, res) => {
  const map = maps.get(req.params.id);
  
  if (!map) {
    return res.status(404).json({ error: 'Map not found' });
  }
  
  if (map.isDefault) {
    return res.status(403).json({ error: 'Cannot edit default maps' });
  }
  
  const { name, description, tiles } = req.body;
  
  if (name) map.name = name;
  if (description !== undefined) map.description = description;
  if (tiles) map.tiles = tiles;
  map.updatedAt = new Date().toISOString();
  
  maps.set(map.id, map);
  res.json(map);
});

app.delete('/api/maps/:id', (req, res) => {
  const map = maps.get(req.params.id);
  
  if (!map) {
    return res.status(404).json({ error: 'Map not found' });
  }
  
  if (map.isDefault) {
    return res.status(403).json({ error: 'Cannot delete default maps' });
  }
  
  maps.delete(req.params.id);
  res.json({ message: 'Map deleted successfully' });
});

// Get all slimes (for display purposes)
app.get('/api/slimes', (req, res) => {
  res.json(slimes);
});

// Get all slime packs
app.get('/api/packs', (req, res) => {
  res.json(slimePacks);
});

app.post('/api/auth/register', async (req, res) => {
  const { username, password, role } = req.body;
  
  if (!username || !password || !role) {
    return res.status(400).json({ error: 'Username, password, and role are required' });
  }
  
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }
  
  try {
    const user = await database.auth.register(username, password, role);
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  
  try {
    const user = await database.auth.login(username, password);
    res.json(user);
  } catch (error) {
    res.status(401).json(error);
  }
});

app.get('/api/player/:userId', async (req, res) => {
  try {
    const player = await database.playerData.get(req.params.userId);
    if (player) {
      res.json(player);
    } else {
      res.status(404).json({ error: 'Player not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch player data' });
  }
});

// Purchase a slime pack and get a random slime
app.post('/api/player/:userId/buy-pack', async (req, res) => {
  const { packId } = req.body;
  
  try {
    const player = await database.playerData.get(req.params.userId);
    const pack = slimePacks.find(p => p.id === packId);
    
    if (!player || !pack) {
      return res.status(404).json({ error: 'Player or pack not found' });
    }
    
    if (player.currency < pack.price) {
      return res.status(400).json({ error: 'Insufficient currency' });
    }
    
    // Get slimes from pack that player doesn't own yet
    const availableSlimes = pack.slimeIds.filter(id => !player.ownedSlimes.includes(id));
    
    if (availableSlimes.length === 0) {
      return res.status(400).json({ error: 'You already own all slimes from this pack!' });
    }
    
    // Pick a random slime from available ones
    const randomSlimeId = availableSlimes[Math.floor(Math.random() * availableSlimes.length)];
    const randomSlime = slimes.find(s => s.id === randomSlimeId);
    
    player.currency -= pack.price;
    player.ownedSlimes.push(randomSlimeId);
    
    await database.playerData.update(req.params.userId, {
      currency: player.currency,
      ownedSlimes: player.ownedSlimes
    });
    
    res.json({ 
      player, 
      receivedSlime: randomSlime 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to purchase pack' });
  }
});

// Redeem easter egg code for secret slime
app.post('/api/player/:userId/redeem-code', async (req, res) => {
  const { code } = req.body;
  
  try {
    const player = await database.playerData.get(req.params.userId);
    
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }
    
    const slimeId = easterEggCodes[code.toUpperCase()];
    
    if (!slimeId) {
      return res.status(400).json({ error: 'Invalid code' });
    }
    
    if (player.ownedSlimes.includes(slimeId)) {
      return res.status(400).json({ error: 'You already own this slime!' });
    }
    
    const secretSlime = slimes.find(s => s.id === slimeId);
    player.ownedSlimes.push(slimeId);
    
    await database.playerData.update(req.params.userId, {
      ownedSlimes: player.ownedSlimes
    });
    
    res.json({
      player,
      receivedSlime: secretSlime
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to redeem code' });
  }
});

app.post('/api/player/:userId/select-slime', async (req, res) => {
  const { slimeId } = req.body;
  
  try {
    const player = await database.playerData.get(req.params.userId);
    
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }
    
    if (!player.ownedSlimes.includes(slimeId)) {
      return res.status(400).json({ error: 'Slime not owned' });
    }
    
    player.selectedSlime = slimeId;
    
    await database.playerData.update(req.params.userId, {
      selectedSlime: slimeId
    });
    
    res.json(player);
  } catch (error) {
    res.status(500).json({ error: 'Failed to select slime' });
  }
});

// Sell a slime from collection
app.post('/api/player/:userId/sell-slime', async (req, res) => {
  const { slimeId } = req.body;
  
  try {
    const player = await database.playerData.get(req.params.userId);
    const slime = slimes.find(s => s.id === slimeId);
    
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }
    
    if (!slime) {
      return res.status(404).json({ error: 'Slime not found' });
    }
    
    if (!player.ownedSlimes.includes(slimeId)) {
      return res.status(400).json({ error: 'Slime not owned' });
    }
    
    if (player.selectedSlime === slimeId) {
      return res.status(400).json({ error: 'Cannot sell selected slime! Select a different slime first.' });
    }
    
    if (player.ownedSlimes.length === 1) {
      return res.status(400).json({ error: 'You must keep at least one slime!' });
    }
    
    // Calculate sell price (50% of pack price for that rarity)
    const rarityPrices = {
      'common': 100,
      'uncommon': 300,
      'rare': 800,
      'epic': 1500,
      'legendary': 3000,
      'mythic': 5000,
      'secret': 0 // Secret slimes cannot be sold
    };
    
    if (slime.rarity === 'secret') {
      return res.status(400).json({ error: 'Secret slimes are too precious to sell!' });
    }
    
    const sellPrice = Math.floor(rarityPrices[slime.rarity] * 0.25); // 25% of pack price
    
    // Remove slime from owned list
    player.ownedSlimes = player.ownedSlimes.filter(id => id !== slimeId);
    player.currency += sellPrice;
    
    await database.playerData.update(req.params.userId, {
      currency: player.currency,
      ownedSlimes: player.ownedSlimes
    });
    
    res.json({
      player,
      soldSlime: slime,
      earnedCurrency: sellPrice
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to sell slime' });
  }
});

// Stats & Achievements API
app.get('/api/stats/:userId', async (req, res) => {
  try {
    const stats = await database.playerStats.get(req.params.userId);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

app.get('/api/achievements', async (req, res) => {
  try {
    const achievements = await database.achievements.getAll();
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch achievements' });
  }
});

app.get('/api/achievements/:userId', async (req, res) => {
  try {
    const userAchievements = await database.achievements.getUserAchievements(req.params.userId);
    res.json(userAchievements);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user achievements' });
  }
});

app.post('/api/achievements/:userId/check', async (req, res) => {
  try {
    const newlyUnlocked = await database.achievements.checkAndUnlock(req.params.userId);
    res.json({ newlyUnlocked });
  } catch (error) {
    res.status(500).json({ error: 'Failed to check achievements' });
  }
});

app.get('/api/leaderboard', async (req, res) => {
  try {
    const sortBy = req.query.sortBy || 'totalWins';
    const limit = parseInt(req.query.limit) || 10;
    const leaderboard = await database.playerStats.getLeaderboard(sortBy, limit);
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Practice mode API
app.post('/api/practice/:userId/save', async (req, res) => {
  const { questionSetId, gameMode, difficulty, score, questionsCorrect, questionsTotal, currencyEarned } = req.body;
  
  try {
    const gameId = await database.practiceGames.save(
      req.params.userId,
      questionSetId,
      gameMode,
      difficulty,
      score,
      questionsCorrect,
      questionsTotal,
      currencyEarned
    );

    // Update player currency (50% of normal rate for practice)
    const player = await database.playerData.get(req.params.userId);
    if (player) {
      await database.playerData.update(req.params.userId, {
        currency: player.currency + currencyEarned
      });
    }

    // Update player stats (practice games count separately)
    await database.playerStats.update(req.params.userId, {
      totalCorrect: questionsCorrect,
      totalQuestions: questionsTotal,
      totalCurrencyEarned: currencyEarned
    });

    res.json({ success: true, gameId });
  } catch (error) {
    console.error('Error saving practice game:', error);
    res.status(500).json({ error: 'Failed to save practice game' });
  }
});

app.get('/api/practice/:userId/history', async (req, res) => {
  try {
    const history = await database.practiceGames.getUserHistory(req.params.userId);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch practice history' });
  }
});

app.get('/api/practice/:userId/stats', async (req, res) => {
  try {
    const stats = await database.practiceGames.getStats(req.params.userId);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch practice stats' });
  }
});

// Classes API
app.post('/api/classes', async (req, res) => {
  const { name, description, teacherId } = req.body;
  
  try {
    const newClass = await database.classes.create(name, description, teacherId);
    res.json(newClass);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create class' });
  }
});

app.get('/api/classes/teacher/:teacherId', async (req, res) => {
  try {
    const classes = await database.classes.getTeacherClasses(req.params.teacherId);
    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch classes' });
  }
});

app.get('/api/classes/student/:studentId', async (req, res) => {
  try {
    const classes = await database.classes.getStudentClasses(req.params.studentId);
    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch classes' });
  }
});

app.post('/api/classes/join', async (req, res) => {
  const { classCode, studentId } = req.body;
  
  try {
    const classData = await database.classes.getByCode(classCode);
    if (!classData) {
      return res.status(404).json({ error: 'Class not found' });
    }

    const result = await database.classes.addStudent(classData.id, studentId);
    if (result.added) {
      res.json({ success: true, class: classData });
    } else {
      res.json({ success: false, message: 'Already in this class' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to join class' });
  }
});

app.get('/api/classes/:classId/members', async (req, res) => {
  try {
    const members = await database.classes.getMembers(req.params.classId);
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch class members' });
  }
});

app.delete('/api/classes/:classId/member/:studentId', async (req, res) => {
  try {
    const result = await database.classes.removeStudent(req.params.classId, req.params.studentId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove student' });
  }
});

app.delete('/api/classes/:classId', async (req, res) => {
  const { teacherId } = req.body;
  
  try {
    const result = await database.classes.delete(req.params.classId, teacherId);
    if (result.deleted) {
      res.json({ success: true });
    } else {
      res.status(403).json({ error: 'Not authorized to delete this class' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete class' });
  }
});

// Serve static files from React build in production
const path = require('path');
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));
  
  // Handle React routing - return index.html for all non-API routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

// Socket.io for real-time gameplay
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('create-game', (data) => {
    const gameCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    // Add host as first player
    const hostPlayer = {
      id: socket.id,
      userId: data.hostUserId || data.userId,
      username: data.hostUsername || data.username || 'Host',
      slime: data.hostSlime || data.slime || 'mint',
      score: 0,
      ready: true,
      isHost: true
    };
    
    const game = {
      code: gameCode,
      hostId: socket.id,
      questionSetId: data.questionSetId,
      gameMode: data.gameMode,
      players: [hostPlayer],
      status: 'waiting',
      currentQuestion: 0,
      settings: data.settings || {}
    };
    
    activeGames.set(gameCode, game);
    socket.join(gameCode);
    socket.emit('game-created', { gameCode, game });
    console.log(`Game ${gameCode} created by host ${socket.id}. Host added as player: ${hostPlayer.username}`);
  });

  socket.on('get-game-state', (data) => {
    const game = activeGames.get(data.gameCode);
    if (game) {
      socket.emit('game-state', { game });
      console.log(`Sent game state for ${data.gameCode} to client. Players: ${game.players.length}`);
    }
  });

  socket.on('join-game', (data) => {
    const game = activeGames.get(data.gameCode);
    
    if (!game) {
      console.log(`Join failed: Game ${data.gameCode} not found`);
      socket.emit('join-error', { message: 'Game not found or already started' });
      return;
    }
    
    // Check if player is already in game (by userId) - allow reconnection even if game started
    const existingPlayer = game.players.find(p => p.userId === data.userId);
    
    if (existingPlayer) {
      // Player already in game, update their socket ID and rejoin room
      console.log(`Player ${data.username} rejoining game ${data.gameCode} (status: ${game.status}), updating socket...`);
      existingPlayer.id = socket.id; // Update to new socket ID
      socket.join(data.gameCode);
      socket.emit('join-success', { game });
      
      // If game is in progress, send current game state
      if (game.status === 'playing') {
        const questionSet = questionSets.get(game.questionSetId);
        if (questionSet && game.currentQuestion < questionSet.questions.length) {
          socket.emit('game-started', { 
            game, 
            gameMode: game.gameMode || 'classic',
            question: questionSet.questions[game.currentQuestion],
            questionNumber: game.currentQuestion + 1,
            totalQuestions: questionSet.questions.length
          });
          console.log(`Sent current game state to reconnecting player`);
        }
      }
      return;
    }
    
    // New players can only join waiting games
    if (game.status !== 'waiting') {
      console.log(`Join failed: Game ${data.gameCode} already started (new player)`);
      socket.emit('join-error', { message: 'Game not found or already started' });
      return;
    }
    
    // Add new player
    const player = {
      id: socket.id,
      userId: data.userId,
      username: data.username,
      slime: data.slime || 'mint',
      score: 0,
      ready: false
    };
    
    game.players.push(player);
    socket.join(data.gameCode);
    io.to(data.gameCode).emit('player-joined', { player, players: game.players });
    socket.emit('join-success', { game });
    console.log(`Player ${data.username} joined game ${data.gameCode}. Total players: ${game.players.length}`);
  });

  socket.on('start-game', (data) => {
    const game = activeGames.get(data.gameCode);
    if (!game) {
      console.log(`Start game failed: Game ${data.gameCode} not found`);
      return;
    }
    
    // Check if the player requesting start is the host (by checking isHost flag in players)
    const requestingPlayer = game.players.find(p => p.id === socket.id);
    console.log(`Start game request - Socket: ${socket.id}, Player found: ${!!requestingPlayer}, IsHost: ${requestingPlayer?.isHost}`);
    console.log(`All players:`, game.players.map(p => ({ id: p.id, userId: p.userId, username: p.username, isHost: p.isHost })));
    
    if (!requestingPlayer || !requestingPlayer.isHost) {
      console.log(`Start game denied: Socket ${socket.id} is not the host`);
      return;
    }
    
    console.log(`Starting game ${data.gameCode} with ${game.players.length} players`);
    
    // Log who's in the room
    const room = io.sockets.adapter.rooms.get(data.gameCode);
    console.log(`Sockets in room ${data.gameCode}:`, room ? Array.from(room) : 'none');
    
    game.status = 'playing';
    const questionSet = questionSets.get(game.questionSetId);
    io.to(data.gameCode).emit('game-started', { 
      game, 
      gameMode: game.gameMode || 'classic',
      question: questionSet.questions[0],
      questionNumber: 1,
      totalQuestions: questionSet.questions.length
    });
  });

  socket.on('submit-answer', (data) => {
    console.log(`[submit-answer] Received from socket ${socket.id} for game ${data.gameCode}`);
    const game = activeGames.get(data.gameCode);
    if (!game) {
      console.log(`[submit-answer] Game ${data.gameCode} not found!`);
      return;
    }
    
    const player = game.players.find(p => p.id === socket.id);
    if (!player) return;
    
    const questionSet = questionSets.get(game.questionSetId);
    const currentQ = questionSet.questions[game.currentQuestion];
    
    // Mark player as answered
    player.hasAnswered = true;
    
    // Score the answer
    if (data.answer === currentQ.correct) {
      const points = Math.max(100, 1000 - (data.timeElapsed * 10));
      player.score += points;
      
      // Award currency (async - don't wait for it)
      const currencyReward = Math.floor(points / 10);
      database.playerData.get(player.userId)
        .then(playerUser => {
          if (playerUser) {
            return database.playerData.update(player.userId, {
              currency: playerUser.currency + currencyReward
            });
          }
        })
        .catch(err => console.error('Error awarding currency:', err));
    }
    
    // Emit answer result
    io.to(data.gameCode).emit('answer-submitted', { 
      playerId: socket.id, 
      correct: data.answer === currentQ.correct,
      players: game.players
    });
    
    // Check if all players have answered
    const totalPlayers = game.players.length;
    const answeredCount = game.players.filter(p => p.hasAnswered).length;
    const allAnswered = game.players.every(p => p.hasAnswered);
    
    console.log(`${answeredCount}/${totalPlayers} players answered. All answered: ${allAnswered}`);
    console.log('Players status:', game.players.map(p => ({ username: p.username, hasAnswered: p.hasAnswered })));
    
    if (allAnswered) {
      console.log(`All players answered for question ${game.currentQuestion + 1}, moving to next question in 3 seconds...`);
      
      // Wait 3 seconds then move to next question
      setTimeout(() => {
        // Reset hasAnswered for all players
        game.players.forEach(p => p.hasAnswered = false);
        
        game.currentQuestion++;
        
        if (game.currentQuestion < questionSet.questions.length) {
          console.log(`Sending next question: ${game.currentQuestion + 1} of ${questionSet.questions.length}`);
          io.to(data.gameCode).emit('next-question', { 
            question: questionSet.questions[game.currentQuestion],
            questionNumber: game.currentQuestion + 1,
            totalQuestions: questionSet.questions.length
          });
          console.log(`✓ Sent question ${game.currentQuestion + 1} to room ${data.gameCode}`);
        } else {
          game.status = 'finished';
          console.log(`Game ${data.gameCode} finished, sending results...`);
          
          // Sort players by score
          const sortedPlayers = game.players.sort((a, b) => b.score - a.score);
          const winner = sortedPlayers[0];
          
          // Save game to history and update stats for each player
          sortedPlayers.forEach((player, index) => {
            const isWinner = index === 0;
            const placement = index + 1;
            
            // Save to game history
            database.gameHistory.save(
              player.userId,
              game.questionSetId,
              game.gameMode,
              player.score,
              isWinner ? 1 : 0,
              placement
            ).catch(err => console.error('Error saving game history:', err));
            
            // Update player stats
            database.playerStats.update(player.userId, {
              totalGames: 1,
              totalWins: isWinner ? 1 : 0,
              totalCurrencyEarned: Math.floor(player.score / 10)
            }).catch(err => console.error('Error updating player stats:', err));
          });
          
          io.to(data.gameCode).emit('game-finished', { 
            players: sortedPlayers
          });
          console.log(`✓ Sent game-finished to room ${data.gameCode}. Winner: ${winner.username}`);
        }
      }, 3000);
    }
  });

  socket.on('next-question', (data) => {
    const game = activeGames.get(data.gameCode);
    if (game && socket.id === game.hostId) {
      game.currentQuestion++;
      const questionSet = questionSets.get(game.questionSetId);
      
      if (game.currentQuestion < questionSet.questions.length) {
        io.to(data.gameCode).emit('next-question', { 
          question: questionSet.questions[game.currentQuestion],
          questionNumber: game.currentQuestion + 1,
          totalQuestions: questionSet.questions.length
        });
      } else {
        game.status = 'finished';
        
        // Sort players by score
        const sortedPlayers = game.players.sort((a, b) => b.score - a.score);
        const winner = sortedPlayers[0];
        
        // Save game to history and update stats for each player
        sortedPlayers.forEach((player, index) => {
          const isWinner = index === 0;
          const placement = index + 1;
          
          // Save to game history
          database.gameHistory.save(
            player.userId,
            game.questionSetId,
            game.gameMode,
            player.score,
            isWinner ? 1 : 0,
            placement
          ).catch(err => console.error('Error saving game history:', err));
          
          // Update player stats
          database.playerStats.update(player.userId, {
            totalGames: 1,
            totalWins: isWinner ? 1 : 0,
            totalCurrencyEarned: Math.floor(player.score / 10)
          }).catch(err => console.error('Error updating player stats:', err));
        });
        
        io.to(data.gameCode).emit('game-finished', { 
          players: sortedPlayers
        });
        console.log(`Game ${data.gameCode} finished. Winner: ${winner.username}`);
      }
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    // Handle player disconnect from games
    // Only remove players if game is in progress (not in waiting lobby)
    // This prevents removing players when they navigate between pages
    activeGames.forEach((game, code) => {
      if (game.status === 'in-progress' || game.status === 'finished') {
        const playerIndex = game.players.findIndex(p => p.id === socket.id);
        if (playerIndex !== -1) {
          const playerName = game.players[playerIndex].username;
          game.players.splice(playerIndex, 1);
          io.to(code).emit('player-left', { players: game.players });
          console.log(`Player ${playerName} left game ${code}. Remaining players: ${game.players.length}`);
        }
      }
      // For waiting lobbies, keep players in the list even if socket disconnects
      // They will reconnect with a new socket when they reach the GameLobby
    });
  });
});

const PORT = process.env.PORT || 8001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

