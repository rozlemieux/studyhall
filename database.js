// Database setup and management for StudyHall
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const path = require('path');

// Create/open database
const dbPath = path.join(__dirname, 'studyhall.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    initializeDatabase();
  }
});

// Initialize database tables
function initializeDatabase() {
  db.serialize(() => {
    // Users table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL CHECK(role IN ('student', 'teacher')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) console.error('Error creating users table:', err);
      else console.log('Users table ready');
    });

    // Player data table (for students)
    db.run(`
      CREATE TABLE IF NOT EXISTS player_data (
        user_id INTEGER PRIMARY KEY,
        currency INTEGER DEFAULT 500,
        selected_slime TEXT DEFAULT 'mint',
        owned_slimes TEXT DEFAULT '["mint"]',
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `, (err) => {
      if (err) console.error('Error creating player_data table:', err);
      else console.log('Player data table ready');
    });

    // Game history table (optional - for tracking past games)
    db.run(`
      CREATE TABLE IF NOT EXISTS game_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        game_code TEXT NOT NULL,
        host_id INTEGER NOT NULL,
        question_set_name TEXT,
        game_mode TEXT DEFAULT 'classic',
        players_count INTEGER,
        started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        finished_at DATETIME,
        FOREIGN KEY (host_id) REFERENCES users(id)
      )
    `, (err) => {
      if (err) console.error('Error creating game_history table:', err);
      else console.log('Game history table ready');
    });

    // Player stats table
    db.run(`
      CREATE TABLE IF NOT EXISTS player_stats (
        user_id INTEGER PRIMARY KEY,
        total_games INTEGER DEFAULT 0,
        total_wins INTEGER DEFAULT 0,
        total_correct INTEGER DEFAULT 0,
        total_questions INTEGER DEFAULT 0,
        best_streak INTEGER DEFAULT 0,
        total_currency_earned INTEGER DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `, (err) => {
      if (err) console.error('Error creating player_stats table:', err);
      else console.log('Player stats table ready');
    });

    // Achievements table
    db.run(`
      CREATE TABLE IF NOT EXISTS achievements (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        icon TEXT NOT NULL,
        requirement INTEGER DEFAULT 1,
        category TEXT NOT NULL,
        rarity TEXT DEFAULT 'common'
      )
    `, (err) => {
      if (err) console.error('Error creating achievements table:', err);
      else console.log('Achievements table ready');
      seedAchievements();
    });

    // User achievements table
    db.run(`
      CREATE TABLE IF NOT EXISTS user_achievements (
        user_id INTEGER NOT NULL,
        achievement_id TEXT NOT NULL,
        unlocked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (user_id, achievement_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (achievement_id) REFERENCES achievements(id)
      )
    `, (err) => {
      if (err) console.error('Error creating user_achievements table:', err);
      else console.log('User achievements table ready');
    });
  });
}

// Seed achievements
function seedAchievements() {
  const achievements = [
    // First Steps
    { id: 'first-game', name: 'First Steps', description: 'Play your first game', icon: '🎮', requirement: 1, category: 'games', rarity: 'common' },
    { id: 'games-10', name: 'Getting Started', description: 'Play 10 games', icon: '🎯', requirement: 10, category: 'games', rarity: 'common' },
    { id: 'games-50', name: 'Dedicated Player', description: 'Play 50 games', icon: '🏆', requirement: 50, category: 'games', rarity: 'rare' },
    { id: 'games-100', name: 'Century Club', description: 'Play 100 games', icon: '💯', requirement: 100, category: 'games', rarity: 'epic' },
    
    // Winning
    { id: 'first-win', name: 'Victory!', description: 'Win your first game', icon: '🥇', requirement: 1, category: 'wins', rarity: 'common' },
    { id: 'wins-10', name: 'Champion', description: 'Win 10 games', icon: '👑', requirement: 10, category: 'wins', rarity: 'rare' },
    { id: 'wins-25', name: 'Legendary', description: 'Win 25 games', icon: '⭐', requirement: 25, category: 'wins', rarity: 'legendary' },
    
    // Accuracy
    { id: 'perfect-game', name: 'Perfect!', description: 'Answer all questions correctly in a game', icon: '💯', requirement: 1, category: 'accuracy', rarity: 'rare' },
    { id: 'streak-5', name: 'Hot Streak', description: 'Get 5 correct answers in a row', icon: '🔥', requirement: 5, category: 'accuracy', rarity: 'common' },
    { id: 'streak-10', name: 'On Fire!', description: 'Get 10 correct answers in a row', icon: '🔥', requirement: 10, category: 'accuracy', rarity: 'rare' },
    
    // Currency
    { id: 'rich-1000', name: 'Getting Rich', description: 'Earn 1,000 total currency', icon: '💰', requirement: 1000, category: 'currency', rarity: 'common' },
    { id: 'rich-5000', name: 'Wealthy', description: 'Earn 5,000 total currency', icon: '💵', requirement: 5000, category: 'currency', rarity: 'rare' },
    { id: 'rich-10000', name: 'Money Maker', description: 'Earn 10,000 total currency', icon: '💎', requirement: 10000, category: 'currency', rarity: 'epic' },
    
    // Slimes
    { id: 'slimes-5', name: 'Collector', description: 'Own 5 different slimes', icon: '🎨', requirement: 5, category: 'slimes', rarity: 'common' },
    { id: 'slimes-15', name: 'Slime Master', description: 'Own 15 different slimes', icon: '🌈', requirement: 15, category: 'slimes', rarity: 'rare' },
    { id: 'slimes-all', name: 'Complete Collection', description: 'Own all 30 regular slimes', icon: '✨', requirement: 30, category: 'slimes', rarity: 'legendary' },
    { id: 'secret-slime', name: 'Secret Finder', description: 'Unlock a secret slime', icon: '🔮', requirement: 1, category: 'slimes', rarity: 'epic' },
    
    // Social
    { id: 'map-creator', name: 'Map Maker', description: 'Create your first custom map', icon: '🗺️', requirement: 1, category: 'social', rarity: 'common' },
    { id: 'question-creator', name: 'Teacher\'s Pet', description: 'Create your first question set', icon: '📚', requirement: 1, category: 'social', rarity: 'common' },
    
    // Easter Eggs
    { id: 'tako-time', name: 'Tako Time!!!', description: 'Discover the taco secret', icon: '🐙', requirement: 1, category: 'secret', rarity: 'secret' },
  ];

  achievements.forEach(ach => {
    db.run(
      'INSERT OR IGNORE INTO achievements (id, name, description, icon, requirement, category, rarity) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [ach.id, ach.name, ach.description, ach.icon, ach.requirement, ach.category, ach.rarity],
      (err) => {
        if (err) console.error(`Error seeding achievement ${ach.id}:`, err);
      }
    );
  });
}

// User authentication functions
const auth = {
  // Register new user
  register: (username, password, role) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        db.run(
          'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
          [username, hashedPassword, role],
          function(err) {
            if (err) {
              if (err.message.includes('UNIQUE')) {
                reject({ error: 'Username already exists' });
              } else {
                reject({ error: 'Registration failed' });
              }
            } else {
              const userId = this.lastID;
              
              // If student, create player data
              if (role === 'student') {
                db.run(
                  'INSERT INTO player_data (user_id) VALUES (?)',
                  [userId],
                  (err) => {
                    if (err) {
                      console.error('Error creating player data:', err);
                    }
                  }
                );
              }
              
              resolve({
                id: userId,
                username: username,
                role: role
              });
            }
          }
        );
      } catch (error) {
        reject({ error: 'Registration failed' });
      }
    });
  },

  // Login user
  login: (username, password) => {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM users WHERE username = ?',
        [username],
        async (err, user) => {
          if (err) {
            reject({ error: 'Login failed' });
          } else if (!user) {
            reject({ error: 'Invalid username or password' });
          } else {
            try {
              const match = await bcrypt.compare(password, user.password);
              if (match) {
                resolve({
                  id: user.id,
                  username: user.username,
                  role: user.role
                });
              } else {
                reject({ error: 'Invalid username or password' });
              }
            } catch (error) {
              reject({ error: 'Login failed' });
            }
          }
        }
      );
    });
  },

  // Get user by ID
  getUserById: (userId) => {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT id, username, role FROM users WHERE id = ?',
        [userId],
        (err, user) => {
          if (err) reject(err);
          else resolve(user);
        }
      );
    });
  }
};

// Player data functions
const playerData = {
  // Get player data
  get: (userId) => {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM player_data WHERE user_id = ?',
        [userId],
        (err, data) => {
          if (err) {
            reject(err);
          } else if (!data) {
            resolve(null);
          } else {
            resolve({
              userId: data.user_id,
              currency: data.currency,
              selectedSlime: data.selected_slime,
              ownedSlimes: JSON.parse(data.owned_slimes)
            });
          }
        }
      );
    });
  },

  // Update player data
  update: (userId, updates) => {
    return new Promise((resolve, reject) => {
      const fields = [];
      const values = [];
      
      if (updates.currency !== undefined) {
        fields.push('currency = ?');
        values.push(updates.currency);
      }
      if (updates.selectedSlime !== undefined) {
        fields.push('selected_slime = ?');
        values.push(updates.selectedSlime);
      }
      if (updates.ownedSlimes !== undefined) {
        fields.push('owned_slimes = ?');
        values.push(JSON.stringify(updates.ownedSlimes));
      }
      
      if (fields.length === 0) {
        resolve();
        return;
      }
      
      values.push(userId);
      
      db.run(
        `UPDATE player_data SET ${fields.join(', ')} WHERE user_id = ?`,
        values,
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }
};

// Game history functions
const gameHistory = {
  // Save game
  save: (gameCode, hostId, questionSetName, gameMode, playersCount) => {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO game_history (game_code, host_id, question_set_name, game_mode, players_count) VALUES (?, ?, ?, ?, ?)',
        [gameCode, hostId, questionSetName, gameMode, playersCount],
        function(err) {
          if (err) reject(err);
          else resolve(this.lastID);
        }
      );
    });
  },

  // Mark game as finished
  finish: (gameCode) => {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE game_history SET finished_at = CURRENT_TIMESTAMP WHERE game_code = ? AND finished_at IS NULL',
        [gameCode],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  },

  // Get user's game history
  getUserHistory: (userId, limit = 10) => {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT * FROM game_history 
         WHERE host_id = ? 
         ORDER BY started_at DESC 
         LIMIT ?`,
        [userId, limit],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }
};

// Close database connection
function closeDatabase() {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('Database connection closed');
    }
  });
}

// Player stats functions
const playerStats = {
  // Get player stats
  get: (userId) => {
    return new Promise((resolve, reject) => {
      db.get(
        'SELECT * FROM player_stats WHERE user_id = ?',
        [userId],
        (err, stats) => {
          if (err) {
            reject(err);
          } else if (!stats) {
            // Create default stats
            db.run(
              'INSERT INTO player_stats (user_id) VALUES (?)',
              [userId],
              function(insertErr) {
                if (insertErr) {
                  reject(insertErr);
                } else {
                  resolve({
                    userId,
                    totalGames: 0,
                    totalWins: 0,
                    totalCorrect: 0,
                    totalQuestions: 0,
                    bestStreak: 0,
                    totalCurrencyEarned: 0
                  });
                }
              }
            );
          } else {
            resolve({
              userId: stats.user_id,
              totalGames: stats.total_games,
              totalWins: stats.total_wins,
              totalCorrect: stats.total_correct,
              totalQuestions: stats.total_questions,
              bestStreak: stats.best_streak,
              totalCurrencyEarned: stats.total_currency_earned
            });
          }
        }
      );
    });
  },

  // Update player stats
  update: (userId, updates) => {
    return new Promise((resolve, reject) => {
      const fields = [];
      const values = [];
      
      if (updates.totalGames !== undefined) {
        fields.push('total_games = total_games + ?');
        values.push(updates.totalGames);
      }
      if (updates.totalWins !== undefined) {
        fields.push('total_wins = total_wins + ?');
        values.push(updates.totalWins);
      }
      if (updates.totalCorrect !== undefined) {
        fields.push('total_correct = total_correct + ?');
        values.push(updates.totalCorrect);
      }
      if (updates.totalQuestions !== undefined) {
        fields.push('total_questions = total_questions + ?');
        values.push(updates.totalQuestions);
      }
      if (updates.bestStreak !== undefined) {
        fields.push('best_streak = MAX(best_streak, ?)');
        values.push(updates.bestStreak);
      }
      if (updates.totalCurrencyEarned !== undefined) {
        fields.push('total_currency_earned = total_currency_earned + ?');
        values.push(updates.totalCurrencyEarned);
      }

      if (fields.length === 0) {
        return resolve();
      }

      values.push(userId);
      db.run(
        `UPDATE player_stats SET ${fields.join(', ')} WHERE user_id = ?`,
        values,
        function(err) {
          if (err) {
            reject(err);
          } else {
            // Get updated stats
            playerStats.get(userId).then(resolve).catch(reject);
          }
        }
      );
    });
  },

  // Get leaderboard
  getLeaderboard: (sortBy = 'totalWins', limit = 10) => {
    return new Promise((resolve, reject) => {
      const sortFields = {
        totalWins: 'total_wins',
        totalCorrect: 'total_correct',
        totalGames: 'total_games',
        totalCurrencyEarned: 'total_currency_earned',
        bestStreak: 'best_streak'
      };

      const sortField = sortFields[sortBy] || 'total_wins';

      db.all(
        `SELECT 
          ps.*,
          u.username,
          u.role,
          pd.selected_slime
        FROM player_stats ps
        JOIN users u ON ps.user_id = u.id
        LEFT JOIN player_data pd ON ps.user_id = pd.user_id
        WHERE u.role = 'student'
        ORDER BY ${sortField} DESC, ps.user_id ASC
        LIMIT ?`,
        [limit],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows.map(row => ({
              userId: row.user_id,
              username: row.username,
              totalGames: row.total_games,
              totalWins: row.total_wins,
              totalCorrect: row.total_correct,
              totalQuestions: row.total_questions,
              bestStreak: row.best_streak,
              totalCurrencyEarned: row.total_currency_earned,
              selectedSlime: row.selected_slime
            })));
          }
        }
      );
    });
  }
};

// Achievements functions
const achievements = {
  // Get all achievements
  getAll: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM achievements ORDER BY category, requirement', [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  // Get user's unlocked achievements
  getUserAchievements: (userId) => {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT a.*, ua.unlocked_at
        FROM achievements a
        JOIN user_achievements ua ON a.id = ua.achievement_id
        WHERE ua.user_id = ?
        ORDER BY ua.unlocked_at DESC`,
        [userId],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  },

  // Unlock achievement for user
  unlock: (userId, achievementId) => {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT OR IGNORE INTO user_achievements (user_id, achievement_id) VALUES (?, ?)',
        [userId, achievementId],
        function(err) {
          if (err) {
            reject(err);
          } else if (this.changes > 0) {
            // Achievement was newly unlocked
            resolve({ unlocked: true, achievementId });
          } else {
            // Already had this achievement
            resolve({ unlocked: false, achievementId });
          }
        }
      );
    });
  },

  // Check and unlock achievements based on stats
  checkAndUnlock: async (userId) => {
    try {
      const stats = await playerStats.get(userId);
      const playerDataObj = await playerData.get(userId);
      const unlockedNew = [];

      // Check games achievements
      if (stats.totalGames >= 1) await checkAndAdd('first-game');
      if (stats.totalGames >= 10) await checkAndAdd('games-10');
      if (stats.totalGames >= 50) await checkAndAdd('games-50');
      if (stats.totalGames >= 100) await checkAndAdd('games-100');

      // Check wins achievements
      if (stats.totalWins >= 1) await checkAndAdd('first-win');
      if (stats.totalWins >= 10) await checkAndAdd('wins-10');
      if (stats.totalWins >= 25) await checkAndAdd('wins-25');

      // Check streak achievements
      if (stats.bestStreak >= 5) await checkAndAdd('streak-5');
      if (stats.bestStreak >= 10) await checkAndAdd('streak-10');

      // Check currency achievements
      if (stats.totalCurrencyEarned >= 1000) await checkAndAdd('rich-1000');
      if (stats.totalCurrencyEarned >= 5000) await checkAndAdd('rich-5000');
      if (stats.totalCurrencyEarned >= 10000) await checkAndAdd('rich-10000');

      // Check slime collection achievements
      const uniqueSlimes = new Set(playerDataObj.ownedSlimes);
      if (uniqueSlimes.size >= 5) await checkAndAdd('slimes-5');
      if (uniqueSlimes.size >= 15) await checkAndAdd('slimes-15');
      if (uniqueSlimes.size >= 30) await checkAndAdd('slimes-all');

      async function checkAndAdd(achievementId) {
        const result = await achievements.unlock(userId, achievementId);
        if (result.unlocked) {
          unlockedNew.push(achievementId);
        }
      }

      return unlockedNew;
    } catch (error) {
      console.error('Error checking achievements:', error);
      return [];
    }
  }
};

module.exports = {
  db,
  auth,
  playerData,
  gameHistory,
  playerStats,
  achievements,
  closeDatabase
};

