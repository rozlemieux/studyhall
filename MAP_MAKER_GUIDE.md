# 🗺️ StudyHall Map Maker Guide

## Overview

The Map Maker feature allows teachers and students to create custom game boards for different game modes! Design unique racing tracks, battle arenas, tower layouts, and more to make your games even more engaging!

---

## ✨ Features

### 🎨 Visual Map Editor
- **Grid-based editor** - Click or drag to paint tiles
- **Multiple tile types** - Different tiles for each game mode
- **Live preview** - See your map as you build it
- **Responsive design** - Works on all screen sizes

### 🎮 Game Mode Support

**Racing** 🏎️
- Track (green) - Main racing path
- Grass (light green) - Off-road area
- Water (blue) - Slows players down
- Boost Pad (gold) - Speed boost
- Obstacle (red) - Blocks the path
- **Weak Enemy** (light red) □ - Easy obstacles
- **Medium Enemy** (red) ■ - Moderate challenge
- **Strong Enemy** (dark red) ■ - Hard obstacles

**Battle** ⚔️
- Arena Floor (green) - Main combat area
- Wall (dark gray) - Blocks movement
- Power-Up (gold) - Special abilities
- Spawn Point (blue) - Player start positions
- **Weak Enemy** (light red) □ - Easy opponents
- **Medium Enemy** (red) ■ - Moderate fighters
- **Strong Enemy** (dark red) ■ - Hard enemies
- **Boss Enemy** (very dark red) ■■ - Ultimate challenge

**Tower Defense** 🏰
- Platform (green) - Climbable platforms
- Sky (light blue) - Empty space
- Ladder (brown) - Climbing areas
- Checkpoint (gold) - Progress markers
- **Enemy Path Start** (red) ▶ - Where enemies spawn
- **Enemy Path** (pink) → - Route enemies follow
- **Enemy Path End** (red) ● - Your base to defend
- **Tower Zone** (blue) ⊕ - Where to place towers
- **Weak Enemy** (light red) □ - Easy waves
- **Medium Enemy** (red) ■ - Moderate threats
- **Strong Enemy** (dark red) ■ - Hard challenges

**Gold Quest** 💰
- Path (green) - Main walkable area
- Gold (gold) - Collectible currency
- Wall (dark gray) - Blocks movement
- Trap (red) - Hazards
- **Weak Enemy** (light red) □ - Guards gold
- **Medium Enemy** (red) ■ - Protects treasures
- **Strong Enemy** (dark red) ■ - Elite guardians

**Survival** 💀
- Safe Zone (green) - Safe areas
- Danger Zone (red) - Damage areas
- Moving Platform (orange) - Dynamic elements
- **Weak Enemy** (light red) □ - Common threats
- **Medium Enemy** (red) ■ - Dangerous foes
- **Strong Enemy** (dark red) ■ - Elite enemies
- **Enemy Swarm** (very dark red) ▣ - Multiple attackers

### 🛠️ Map Management
- **Create new maps** - From scratch
- **Edit existing maps** - Modify your creations
- **Delete maps** - Remove maps you don't want
- **Browse maps** - View all available maps
- **Filter by game mode** - Find maps for specific games

---

## 🚀 Getting Started

### Creating Your First Map

1. **Navigate to Maps**
   - Click "Maps" in the navigation bar
   - Or click "+ Create Map" in the game setup panel

2. **Configure Settings**
   - **Map Name** - Give your map a catchy name
   - **Description** - Describe what makes it special
   - **Game Mode** - Choose which game it's for
   - **Grid Size** - Set dimensions (5-30 × 5-30)

3. **Design Your Map**
   - Select a tile type from the palette
   - Click tiles to place them
   - Drag to paint multiple tiles at once
   - Use the "Clear Map" button to start over

4. **Save Your Map**
   - Click "Save Map" when done
   - Your map is now available for games!

---

## 🎯 Map Creator Interface

### Sidebar (Left)
```
┌─────────────────────┐
│  Map Settings       │
│  - Name             │
│  - Description      │
│  - Game Mode        │
│  - Grid Size        │
├─────────────────────┤
│  Tile Palette       │
│  [Track]            │
│  [Grass]            │
│  [Water]            │
│  [Boost]            │
│  [Obstacle]         │
├─────────────────────┤
│  [Clear Map]        │
│  [Save Map]         │
└─────────────────────┘
```

### Canvas (Right)
```
┌─────────────────────────────────────────┐
│  📖 Click or drag to paint tiles        │
│  Selected: Track                    🟩  │
├─────────────────────────────────────────┤
│                                         │
│     [Grid Editor]                       │
│     15 × 10 tile grid                   │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🗺️ Using Maps in Games

### When Creating a Game:

1. **Select a Game Mode**
   - Choose any mode except "Classic"
   - Classic mode doesn't use maps

2. **Select a Map**
   - A map selector appears automatically
   - Browse available maps for that mode
   - Default maps are pre-loaded
   - Click to select your map

3. **Create a New Map (Optional)**
   - Click "+ Create Map" in the selector
   - Design a map specifically for this game
   - Save and return to game setup

4. **Launch the Game**
   - Your selected map will be used!
   - Players will see the custom board

---

## 💡 Map Design Tips

### Racing Tracks 🏎️
- **Create a path** - Use track tiles to make a course
- **Add challenges** - Water and obstacles slow players
- **Strategic boosts** - Place boost pads at key points
- **Balance it** - Not too easy, not too hard

### Battle Arenas ⚔️
- **Open space** - Give room for combat
- **Cover** - Add walls for strategy
- **Power-ups** - Place strategically
- **Multiple spawns** - Spread out start points

### Tower Maps 🏰
- **Vertical design** - Platforms at different heights
- **Ladders** - Connect levels
- **Checkpoints** - Mark progress
- **Challenge** - Make it tough but fair

### Gold Quest 💰
- **Path layout** - Create interesting routes
- **Gold placement** - Spread it out
- **Traps** - Add danger for risk/reward
- **Multiple routes** - Give choices

### Survival Mode 💀
- **Safe zones** - Areas to rest
- **Danger zones** - Increasing difficulty
- **Moving elements** - Dynamic challenges
- **Shrinking space** - Force movement

---

## 📐 Technical Details

### Grid Specifications
- **Minimum size:** 5 × 5
- **Maximum size:** 30 × 30
- **Optimal size:** 10-20 for most game modes
- **Tile aspect ratio:** 1:1 (square)

### Performance
- Maps are stored on the server
- Each user can create unlimited maps
- Maps load instantly in games
- Grid rendering is optimized

### Data Structure
```javascript
{
  id: "uuid",
  name: "My Awesome Track",
  gameMode: "racing",
  description: "A challenging racing course",
  tiles: [
    { x: 0, y: 0, type: "grass", obstacle: null },
    { x: 1, y: 0, type: "track", obstacle: null },
    // ... more tiles
  ],
  createdBy: "username",
  isDefault: false
}
```

---

## 🎨 Default Maps

StudyHall comes with 3 default maps:

### 1. **Classic Track** (Racing)
- Simple 3-lane racing track
- Perfect for beginners
- Straight path with grass on sides

### 2. **Battle Arena** (Battle)
- Circular combat arena
- Walls around the perimeter
- Open center for fighting

### 3. **Tower Heights** (Tower)
- Multi-level platform layout
- Platforms every 3 rows
- Sky in between for climbing

*Default maps cannot be edited or deleted.*

---

## 🔧 API Endpoints

### Maps API

**Get all maps**
```
GET /api/maps
Query: ?gameMode=racing (optional)
```

**Get specific map**
```
GET /api/maps/:id
```

**Create map**
```
POST /api/maps
Body: { name, gameMode, description, tiles, createdBy }
```

**Update map**
```
PUT /api/maps/:id
Body: { name, description, tiles }
```

**Delete map**
```
DELETE /api/maps/:id
```

---

## 🎯 Best Practices

### Do's ✅
- **Test your maps** - Play them before sharing
- **Name clearly** - Descriptive names help others
- **Balance difficulty** - Not too easy or hard
- **Use variety** - Mix different tile types
- **Consider players** - Think about the experience

### Don'ts ❌
- **Don't make impossible maps** - Keep it fair
- **Don't copy defaults** - Be creative!
- **Don't use tiny grids** - Minimum 10×10 recommended
- **Don't forget descriptions** - Help others understand
- **Don't save unfinished maps** - Complete them first

---

## 🔑 Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Save Map | *Coming soon* |
| Clear Map | *Coming soon* |
| Undo | *Coming soon* |
| Redo | *Coming soon* |

---

## 🐛 Troubleshooting

### Map Won't Save
- **Check name** - Name cannot be empty
- **Check tiles** - Grid must have tiles
- **Check connection** - Server must be running

### Can't Edit Map
- **Check ownership** - Only creator can edit
- **Check default** - Default maps are read-only
- **Check permissions** - Must be logged in

### Map Not Showing in Game
- **Check game mode** - Map must match mode
- **Refresh list** - Click back and forward
- **Check filters** - Remove filters

### Grid Not Responding
- **Check browser** - Use modern browser
- **Clear cache** - Refresh the page
- **Check console** - Look for errors

---

## 🌟 Feature Roadmap

### Coming Soon:
- **Copy maps** - Duplicate existing maps
- **Share codes** - Share maps with friends
- **Map ratings** - Vote on favorite maps
- **Templates** - Pre-made patterns
- **Undo/Redo** - Fix mistakes easily
- **Layers** - Add decorations
- **Themes** - Seasonal map styles
- **Multiplayer editing** - Collaborate live

---

## 📊 Statistics

Track your map-making progress:
- **Total maps created**
- **Most popular map**
- **Games played on your maps**
- **Player ratings**

*Statistics feature coming soon!*

---

## 🎉 Success Stories

### Example Maps:

**"Speed Demon Track"** by Teacher123
- 15×10 racing map
- 3 boost pads strategically placed
- Water hazards on curves
- Most played racing map!

**"Chaos Arena"** by StudentPro
- 12×12 battle arena
- Multiple walls for cover
- 4 power-up spawn points
- Tournament-approved!

**"Sky Tower"** by MapMaster
- 10×20 tower map
- 7 platforms to climb
- Checkpoints every 3 levels
- Hardest tower map!

---

## 💬 Community

### Share Your Maps!
- Post in class discussions
- Challenge friends
- Host map-making contests
- Collaborate with classmates

### Get Inspired!
- Browse popular maps
- Try different game modes
- Learn from others
- Experiment with layouts

---

## 📚 Learn More

### Tutorials:
1. **Beginner** - Create your first racing track
2. **Intermediate** - Design a strategic battle arena
3. **Advanced** - Build a complex tower map
4. **Expert** - Multi-path gold quest adventure

### Resources:
- [Game Modes Guide](GAME_MODES.md)
- [Features List](FEATURES.md)
- [Quick Start Guide](QUICK_START.md)
- [What's New](WHATS_NEW.md)

---

## 🎨 Map Gallery

View all maps at: **http://localhost:3001/maps**

---

**Status:** ✅ **FULLY OPERATIONAL!**

**Access:** Both teachers and students can create maps!

**Routes:**
- `/maps` - Browse all maps
- `/maps/create` - Create new map
- `/maps/edit/:id` - Edit existing map

**Enjoy creating amazing game boards!** 🗺️✨🎮

