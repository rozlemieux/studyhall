# 🎮 StudyHall - Gamified Learning Platform

<div align="center">

![StudyHall Logo](https://img.shields.io/badge/StudyHall-Learning%20Platform-00FA9A?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgZmlsbD0iIzAwRkE5QSIvPjwvc3ZnPg==)

**A fun, interactive quiz platform with gamification elements**

[Features](#features) • [Quick Start](#quick-start) • [Documentation](#documentation) • [Contributing](#contributing)

</div>

---

## 📖 About

StudyHall is a modern, gamified learning platform inspired by Blooket. It combines educational quiz games with fun game mechanics, collectible characters ("Slimes"), achievements, and competitive leaderboards to make learning engaging and enjoyable.

### 🎯 Key Highlights

- **🎓 Educational Focus**: Teachers can create custom question sets or use pre-made ones
- **🎮 Multiple Game Modes**: 6 different game modes including Racing, Battle, Tower Defense, and more
- **🎨 Collectible Characters**: 37 unique Slime characters to collect and customize
- **🏆 Achievements System**: 20 achievements to unlock across 7 categories
- **📊 Leaderboards**: Compete with other players in 5 different categories
- **🗺️ Custom Maps**: Visual map creator for game modes
- **🔐 User Authentication**: Secure login with bcrypt password hashing
- **💾 Data Persistence**: SQLite database for saving progress

---

## ✨ Features

### 👨‍🏫 For Teachers
- Create and manage question sets
- Host live games with custom settings
- Choose from 6 different game modes
- Create custom maps for advanced gameplay
- Monitor student engagement via leaderboards
- Support for both in-class and remote learning

### 👨‍🎓 For Students
- Join games with simple game codes
- Earn virtual currency for correct answers
- Collect and trade 37 unique Slime characters
- Unlock 20 achievements
- Compete on leaderboards
- Create your own question sets and maps
- Customize your experience

### 🎮 Game Modes

1. **Classic Quiz** 📚 - Traditional quiz format
2. **Slime Racing** 🏎️ - Race to the finish line
3. **Slime Battle** ⚔️ - Battle other slimes
4. **Gold Quest** 💰 - Collect the most gold
5. **Tower Defense** 🏰 - Climb to the top
6. **Survival Mode** 💀 - Last slime standing

### 🎨 Slime Collection

- **30 Regular Slimes** organized by rarity:
  - Common (6 slimes)
  - Uncommon (8 slimes)
  - Rare (7 slimes)
  - Epic (5 slimes)
  - Legendary (4 slimes)
- **7 Secret Slimes** unlocked via easter eggs
- **Pack System** for random drops
- **Trading System** to sell duplicates

### 🏆 Achievement System

20 achievements across 7 categories:
- **Games**: Play milestones (1, 10, 50, 100 games)
- **Wins**: Victory milestones (1, 10, 25 wins)
- **Accuracy**: Perfect games and streaks
- **Currency**: Earning milestones (1K, 5K, 10K)
- **Slimes**: Collection milestones (5, 15, 30 slimes)
- **Social**: Create maps and question sets
- **Secret**: Hidden easter egg achievements

### 📊 Statistics & Leaderboards

Track and compare:
- Total Games Played
- Total Wins
- Correct Answers
- Best Answer Streak
- Total Currency Earned
- Leaderboard Rankings

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/studyhall.git
cd studyhall
```

2. **Install backend dependencies**
```bash
npm install
```

3. **Install frontend dependencies**
```bash
cd client
npm install
cd ..
```

4. **Start the backend server**
```bash
node server.js
```

5. **Start the frontend (in a new terminal)**
```bash
cd client
npm start
```

6. **Open your browser**
```
http://localhost:3001
```

### 🎉 You're Ready!

- Teachers: Create an account with role "Teacher"
- Students: Create an account with role "Student"
- Start playing and learning!

---

## 📚 Documentation

### Comprehensive Guides

- **[Features List](FEATURES.md)** - Complete feature documentation
- **[Database Guide](DATABASE.md)** - Database schema and API
- **[Map Maker Guide](MAP_MAKER_GUIDE.md)** - Create custom maps
- **[Enemy System](ENEMY_SYSTEM.md)** - Enemy placement guide
- **[Easter Eggs](EASTER_EGGS.md)** - Secret codes and hints
- **[Improvements](APP_IMPROVEMENTS.md)** - Latest enhancements

### Quick References

- **[Quick Start](QUICK_START.md)** - Get up and running fast
- **[Database Setup](DATABASE_SETUP.md)** - Database configuration
- **[Map Maker Setup](MAP_MAKER_SETUP.md)** - Map creator guide

---

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.io** - Real-time communication
- **SQLite3** - Database
- **bcrypt** - Password hashing
- **CORS** - Cross-origin support

### Frontend
- **React** - UI framework
- **React Router** - Navigation
- **Framer Motion** - Animations
- **Axios** - HTTP requests
- **Socket.io Client** - Real-time updates

### Development
- **ESLint** - Code quality
- **Create React App** - Frontend tooling

---

## 📁 Project Structure

```
studyhall/
├── server.js                 # Backend server
├── database.js              # Database operations
├── package.json             # Backend dependencies
│
├── client/                  # Frontend application
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── Icon.js
│   │   │   ├── Logo.js
│   │   │   ├── Loading.js
│   │   │   ├── Toast.js
│   │   │   └── Navbar.js
│   │   ├── pages/          # Page components
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── TeacherDashboard.js
│   │   │   ├── StudentDashboard.js
│   │   │   ├── GameLobby.js
│   │   │   ├── GamePlay.js
│   │   │   ├── SlimeShop.js
│   │   │   ├── Leaderboard.js
│   │   │   ├── MapsBrowser.js
│   │   │   ├── MapCreator.js
│   │   │   ├── CreateQuestionSet.js
│   │   │   └── games/      # Game mode components
│   │   │       ├── RacingGame.js
│   │   │       ├── BattleGame.js
│   │   │       └── GoldQuestGame.js
│   │   ├── utils/          # Utility functions
│   │   │   └── slimeSprites.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json        # Frontend dependencies
│
├── .gitignore
├── README.md               # This file
└── [Documentation files]
```

---

## 🎮 How to Play

### For Teachers

1. **Create an Account**
   - Register with role "Teacher"
   - Login to your dashboard

2. **Create Question Sets**
   - Click "Create Question Set"
   - Add questions with 4 answer choices
   - Mark the correct answer
   - Save your set

3. **Host a Game**
   - Click "Host Game"
   - Select a question set
   - Choose a game mode
   - Select a map (for non-classic modes)
   - Share the game code with students

4. **Start the Game**
   - Wait for students to join
   - Click "Start Game"
   - Students play on their devices
   - View results and leaderboard

### For Students

1. **Create an Account**
   - Register with role "Student"
   - Login to your dashboard

2. **Join a Game**
   - Enter the game code from your teacher
   - Click "Join Game"
   - Wait in the lobby

3. **Play and Learn**
   - Answer questions quickly and correctly
   - Earn currency for correct answers
   - Watch your slime compete

4. **Collect Slimes**
   - Visit the Shop
   - Buy slime packs with earned currency
   - Unlock secret slimes with easter egg codes
   - Equip your favorite slime

5. **Track Progress**
   - View your stats
   - Unlock achievements
   - Compete on leaderboards

---

## 🎨 Customization

### Creating Question Sets

1. Navigate to "Create Question Set"
2. Enter title and subject
3. Add questions (minimum 3)
4. Each question needs:
   - Question text
   - 4 answer options
   - Correct answer selection
5. Save and use in games

### Creating Custom Maps

1. Navigate to "Maps" → "Create New Map"
2. Choose a game mode
3. Set grid dimensions (5-30 × 5-30)
4. Select tile types from palette
5. Paint on grid (click or drag)
6. For Tower Defense:
   - Place enemy spawn point ▶
   - Draw enemy path →
   - Place base/goal ●
   - Add tower zones ⊕
   - Position enemies
7. Save and use in games

### Enemy Placement

- **Weak Enemy** □ - Easy challenge
- **Medium Enemy** ■ - Moderate difficulty
- **Strong Enemy** ■ - Hard challenge
- **Boss Enemy** ■■ - Ultimate challenge
- **Enemy Swarm** ▣ - Multiple targets

See [ENEMY_SYSTEM.md](ENEMY_SYSTEM.md) for detailed guide.

---

## 🔐 Security

- **Password Hashing**: bcrypt with salt rounds
- **SQL Injection Protection**: Parameterized queries
- **Session Management**: localStorage for client-side
- **CORS Configuration**: Restricted origins
- **Input Validation**: Client and server-side

---

## 🗄️ Database Schema

### Tables

- **users** - User authentication
- **player_data** - Student currency and slimes
- **player_stats** - Performance statistics
- **achievements** - Available achievements
- **user_achievements** - Unlocked achievements
- **game_history** - Game records

See [DATABASE.md](DATABASE.md) for complete schema.

---

## 🎯 Easter Eggs

Type secret codes to unlock hidden slimes!

**Hints available in-game** - Click "Show Hints" in the shop

Confirmed codes:
- `takotime!!!` - Unlocks a secret slime

See [EASTER_EGGS.md](EASTER_EGGS.md) for more.

---

## 🐛 Troubleshooting

### Server won't start
- Check if port 5001 is available
- Make sure all dependencies are installed
- Delete `node_modules` and reinstall

### Frontend won't connect
- Ensure backend is running on port 5001
- Check proxy setting in `client/package.json`
- Clear browser cache

### Database errors
- Delete `studyhall.db` to reset database
- Restart the server to regenerate

### ESLint warnings
- These are warnings, not errors
- App will still run normally
- Can be suppressed with `// eslint-disable-next-line`

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Use ESLint for JavaScript
- Follow existing code formatting
- Comment complex logic
- Write descriptive commit messages

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👏 Acknowledgments

- Inspired by [Blooket](https://www.blooket.com/)
- Built with love for educators and students
- Special thanks to all contributors

---

## 📞 Support

For questions, issues, or suggestions:

- **GitHub Issues**: [Create an issue](https://github.com/yourusername/studyhall/issues)
- **Email**: support@studyhall.com
- **Discord**: [Join our community](https://discord.gg/studyhall)

---

## 🗺️ Roadmap

### Coming Soon
- [ ] Real-time achievement notifications
- [ ] Friend system
- [ ] Daily challenges
- [ ] Seasonal events
- [ ] Mobile app
- [ ] Custom slime sprites
- [ ] Teacher analytics dashboard
- [ ] Multiplayer co-op modes
- [ ] Voice chat
- [ ] Classroom management tools

### In Progress
- [x] Achievement system
- [x] Leaderboards
- [x] Custom maps
- [x] Enemy system
- [x] Stats tracking

---

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/studyhall?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/studyhall?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/studyhall)
![GitHub license](https://img.shields.io/github/license/yourusername/studyhall)

---

<div align="center">

**Made with ❤️ for education**

[⬆ Back to Top](#-studyhall---gamified-learning-platform)

</div>
