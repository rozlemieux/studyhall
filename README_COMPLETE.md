# 🎮 StudyHall - Gamified Learning Platform

Transform learning into an epic adventure! StudyHall combines educational quizzes with engaging game mechanics, collectible characters, and real-time multiplayer action.

![Version](https://img.shields.io/badge/version-1.2.0-brightgreen)
![Node](https://img.shields.io/badge/node-18.x-green)
![React](https://img.shields.io/badge/react-18.2-blue)
![License](https://img.shields.io/badge/license-MIT-yellow)

## ✨ Features

### 🎯 Core Gameplay
- **6 Unique Game Modes**
  - 📚 Classic Quiz - Traditional format
  - 🏁 Slime Racing - Race to the finish
  - ⚔️ Slime Battle - Arena combat
  - 💰 Gold Quest - Treasure hunting
  - 🏰 Tower Climb - Vertical challenge
  - 💀 Survival Mode - Last one standing

### 🦠 Collectibles
- **37 Unique Slimes** across 7 rarity tiers
  - Common (6) - Basic flavors
  - Uncommon (6) - Elemental powers
  - Rare (6) - Special patterns
  - Epic (5) - Precious gems
  - Legendary (4) - Cosmic entities
  - Mythic (3) - Legendary creatures
  - Secret (7) - Ultimate rarities

### 🗺️ Map System
- **Visual Map Creator**
  - Grid-based tile editor
  - 8+ tile types per game mode
  - Enemy placement system
  - Custom obstacles & power-ups
  - Save & share functionality

### 🏆 Progression
- **Achievement System** - 20+ achievements across 7 categories
- **Leaderboards** - Global rankings with multiple stats
- **Currency System** - Earn coins, buy packs, collect slimes
- **Player Stats** - Track wins, accuracy, streaks
- **Easter Eggs** - 7 secret codes to discover

### 👥 User Roles
- **Teachers**
  - Create custom question sets
  - Host live games
  - Track student progress
  - Create custom maps
  
- **Students**
  - Join games with code
  - Collect and equip slimes
  - Earn achievements
  - Compete on leaderboards

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/studyhall.git
cd studyhall

# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..

# Start development servers
npm run dev
```

### Development
- Backend runs on `http://localhost:8001`
- Frontend runs on `http://localhost:3000`
- Database: SQLite (`studyhall.db`)

## 📦 Project Structure

```
studyhall/
├── backend/              # Node.js + Express backend
│   ├── server.js        # Main server file
│   ├── database.js      # SQLite database setup
│   └── studyhall.db     # Database file
├── client/              # React frontend
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── utils/       # Utility functions
│   │   └── App.js       # Main app component
│   └── package.json
├── docs/                # Documentation
│   ├── FEATURES.md
│   ├── GAME_MODES.md
│   └── MAP_MAKER_GUIDE.md
└── package.json
```

## 🎨 Tech Stack

### Frontend
- **React 18.2** - UI framework
- **React Router 6** - Navigation
- **Framer Motion** - Animations
- **Socket.io Client** - Real-time communication
- **Axios** - HTTP requests
- **Custom SVG** - Slime graphics

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **Socket.io** - WebSocket server
- **SQLite3** - Database
- **bcrypt** - Password hashing
- **UUID** - Unique identifiers

## 🎮 Game Modes Explained

### Classic Quiz
Traditional question-answer format with points based on speed and accuracy.

### Slime Racing 🏁
- Race your slime across the track
- Answer correctly to move forward
- First to finish wins!
- Map obstacles and boosts

### Slime Battle ⚔️
- HP-based combat arena
- Wrong answers damage your slime
- Last slime standing wins
- Enemy encounters on maps

### Gold Quest 💰
- Collect gold coins by answering
- More coins for faster answers
- Compete for treasure chests
- Map layouts with collectibles

### Tower Climb 🏰
- Climb floors by answering
- Each correct answer = 1 floor
- Highest climber wins
- Time bonuses

### Survival Mode 💀
- Limited lives system
- Wrong answers cost lives
- Last one alive wins
- Increasing difficulty

## 🗺️ Creating Custom Maps

1. Navigate to **Map Creator** from dashboard
2. Select game mode
3. Set grid size (up to 20x15)
4. Paint tiles:
   - Tracks, paths, arenas
   - Obstacles and walls
   - Power-ups and boosts
   - Enemy spawns
5. Test your map
6. Save and share!

See [MAP_MAKER_GUIDE.md](docs/MAP_MAKER_GUIDE.md) for detailed instructions.

## 🏆 Achievements

| Category | Achievements | Examples |
|----------|--------------|----------|
| Wins | 5 | First Victory, Win Streak Master |
| Participation | 3 | Dedicated Player, Marathon Runner |
| Accuracy | 3 | Perfect Game, Sharp Shooter |
| Collection | 4 | Slime Collector, Complete Collection |
| Speed | 2 | Lightning Fast, Speed Demon |
| Social | 2 | Team Player, Popular Host |
| Special | 1 | Easter Egg Hunter |

## 🎯 Deployment

### Render (Recommended)

```bash
# Build command
npm ci && cd client && npm ci && npm run build

# Start command
node server.js

# Environment variables
NODE_VERSION=18
NODE_ENV=production
```

See [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md) for complete guide.

### Other Platforms
- **Heroku**: `git push heroku main`
- **Railway**: `railway up`
- **Vercel**: Frontend only

## 🔧 Configuration

### Environment Variables

**Backend** (`.env`):
```env
PORT=8001
NODE_ENV=production
```

**Frontend** (`client/.env`):
```env
PORT=3000
REACT_APP_BACKEND_URL=http://localhost:8001
```

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📝 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file.

## 🎉 Credits

- **Slime Graphics**: Custom SVG designs
- **Color Palette**: Kelly green theme
- **Game Design**: Original concept
- **Icons**: Custom icon system

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/studyhall/issues)
- **Documentation**: See `/docs` folder
- **FAQ**: [FAQ.md](docs/FAQ.md)

## 🗺️ Roadmap

- [ ] Mobile app (React Native)
- [ ] AI-powered question generation
- [ ] Voice chat in games
- [ ] Tournament system
- [ ] Parent dashboard
- [ ] Analytics for teachers
- [ ] More game modes
- [ ] 3D slime animations

---

**Made with 💚 by the StudyHall team**

*Transform learning into an adventure!*
