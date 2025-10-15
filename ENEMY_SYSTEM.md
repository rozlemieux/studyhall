# 🎮 Enemy System Guide

## Overview

All games in StudyHall now feature **square-shaped enemies** that can be placed on custom maps! Enemies add challenge and excitement to every game mode.

---

## 🟥 Enemy Types

### **Weak Enemies** `□`
- **Color:** Light Red (#FF6B6B)
- **Symbol:** Empty square □
- **Difficulty:** Easy
- **Health:** Low
- **Speed:** Slow
- **Best for:** Beginning waves, teaching mechanics

### **Medium Enemies** `■`
- **Color:** Red (#FF4757)
- **Symbol:** Filled square ■
- **Difficulty:** Moderate
- **Health:** Medium
- **Speed:** Normal
- **Best for:** Mid-game challenge

### **Strong Enemies** `■`
- **Color:** Dark Red (#C0392B)
- **Symbol:** Filled square ■ (larger/darker)
- **Difficulty:** Hard
- **Health:** High
- **Speed:** Fast
- **Best for:** Late-game, boss waves

### **Boss Enemies** `■■`
- **Color:** Very Dark Red (#8B0000)
- **Symbol:** Double square ■■
- **Difficulty:** Extreme
- **Health:** Very High
- **Speed:** Variable
- **Best for:** Final challenges
- **Available in:** Battle mode

### **Enemy Swarm** `▣`
- **Color:** Dark Red (#8B0000)
- **Symbol:** Grid square ▣
- **Difficulty:** Overwhelming
- **Health:** Low per enemy, high total
- **Speed:** Fast
- **Best for:** Chaos, multiple targets
- **Available in:** Survival mode

---

## 🎯 Tower Defense Specific

### **Enemy Path Start** `▶`
- **Color:** Light Red
- **Symbol:** Play button ▶
- **Purpose:** Where enemies spawn
- **Usage:** Place at the beginning of your path

### **Enemy Path** `→`
- **Color:** Pink (#FF8C94)
- **Symbol:** Arrow →
- **Purpose:** The route enemies follow
- **Usage:** Create a winding path for enemies to walk

### **Enemy Path End** `●`
- **Color:** Red (#E74C3C)
- **Symbol:** Circle ●
- **Purpose:** The goal/base enemies try to reach
- **Usage:** Place at the end of the path (what you're defending)

### **Tower Zone** `⊕`
- **Color:** Blue (#3498DB)
- **Symbol:** Crosshair ⊕
- **Purpose:** Where players can place defensive towers
- **Usage:** Strategic positions around the enemy path

---

## 🗺️ Enemy Placement by Game Mode

### **Racing** 🏎️
- **Enemies as obstacles** - Block or chase players
- **Placement:** On track or grass
- **Effect:** Players must avoid or defeat them
- **Strategy:** Place strategically to create challenge

### **Battle** ⚔️
- **Enemies as opponents** - Fight alongside players
- **Placement:** In arena or spawn points
- **Effect:** Additional combat challenge
- **Strategy:** Balance difficulty with player count

### **Tower Defense** 🏰
- **Enemies follow paths** - Walk from start to goal
- **Placement:** On enemy path or as spawners
- **Effect:** Players defend against waves
- **Strategy:** Create interesting paths with varying difficulty

### **Gold Quest** 💰
- **Enemies as guardians** - Protect gold
- **Placement:** Near gold or on paths
- **Effect:** Risk vs reward for collecting gold
- **Strategy:** Guard valuable areas

### **Survival** 💀
- **Enemies as threats** - Constant danger
- **Placement:** In danger zones or safe zones
- **Effect:** Survive as long as possible
- **Strategy:** Escalating difficulty over time

---

## 🛠️ Using the Map Creator

### **Step 1: Select Game Mode**
Choose which game your map is for (affects available enemy types)

### **Step 2: Open Tile Palette**
Find enemy tiles in the palette on the left

### **Step 3: Select Enemy Type**
Click the enemy type you want to place:
- □ Weak Enemy
- ■ Medium Enemy
- ■ Strong Enemy
- etc.

### **Step 4: Paint on Grid**
- **Click** to place a single enemy
- **Click + Drag** to paint multiple
- Paint over existing tiles to change them

### **Step 5: Test & Refine**
- Save your map
- Test it in a game
- Adjust enemy placement as needed

---

## 📐 Design Tips

### **Balance**
- ✅ Mix weak and strong enemies
- ✅ Give players breathing room
- ✅ Increase difficulty gradually
- ❌ Don't overwhelm with too many enemies
- ❌ Don't make it impossible

### **Placement**
- ✅ Strategic positioning
- ✅ Create interesting patterns
- ✅ Use terrain to your advantage
- ❌ Don't cluster too many in one spot
- ❌ Don't block essential paths

### **Tower Defense Specific**
- ✅ Create winding paths (longer = more tower time)
- ✅ Place tower zones at strategic points
- ✅ Vary enemy types throughout the path
- ✅ Test the path is valid (start to end)
- ❌ Don't make paths too short
- ❌ Don't place tower zones too far from path

### **Waves & Progression**
- Start with weak enemies
- Gradually introduce medium enemies
- Save strong enemies for later
- Use bosses sparingly
- Mix types for variety

---

## 🎨 Visual Design

### **Square Enemies**
All enemies are rendered as **colored squares** with **white text symbols**:

```
□  Weak (hollow square)
■  Medium (filled square)
■  Strong (filled square, darker)
■■ Boss (double square)
▣  Swarm (grid square)
```

### **Colors**
Enemies use a **red color palette**:
- Light Red → Weak
- Red → Medium
- Dark Red → Strong
- Very Dark Red → Boss/Swarm

### **Contrast**
- White symbols on colored backgrounds
- Black outline/shadow for visibility
- Distinct shapes for easy identification

---

## 🎮 In-Game Behavior

### **Movement**
- **Racing:** Chase or patrol
- **Battle:** Target players
- **Tower Defense:** Follow path
- **Gold Quest:** Guard areas
- **Survival:** Swarm players

### **Difficulty Scaling**
Enemies become harder based on:
- Type (weak → strong)
- Number of players
- Game progress
- Custom map settings

### **Rewards**
Defeating enemies grants:
- **Currency** (more for harder enemies)
- **Points** (for leaderboards)
- **Power-ups** (random drops)
- **Progress** (towards victory)

---

## 🔧 Advanced Features

### **Enemy Properties**
Each enemy tile can have properties (future feature):
- Health multiplier
- Speed multiplier
- Damage multiplier
- Special abilities
- Spawn rate
- Wave number

### **Custom Waves**
Tower Defense maps can define waves:
```javascript
waves: [
  { enemies: ['weak', 'weak', 'weak'], delay: 1000 },
  { enemies: ['weak', 'medium'], delay: 800 },
  { enemies: ['strong'], delay: 500 }
]
```

### **Pathfinding**
Tower Defense enemies:
- Follow the defined path
- Move from start → end
- Avoid obstacles
- React to towers

---

## 📊 Enemy Statistics

| Type | Health | Speed | Damage | Currency |
|------|--------|-------|--------|----------|
| Weak | 100 | 1.0x | 10 | 10 |
| Medium | 250 | 1.2x | 25 | 25 |
| Strong | 500 | 1.5x | 50 | 50 |
| Boss | 2000 | 0.8x | 100 | 200 |
| Swarm | 50 | 2.0x | 5 | 5 |

*Note: Stats scale with difficulty and player count*

---

## 🎯 Example Maps

### **Simple Racing Track**
```
Grass  Grass  Track  Grass  Grass
Grass  Grass  □Weak  Grass  Grass
Grass  Grass  Track  Grass  Grass
Grass  Grass  ■Med   Grass  Grass
Grass  Grass  Track  Grass  Grass
```

### **Tower Defense Path**
```
Platform  Platform  ▶Start  Platform  Platform
Platform  ⊕Tower    →Path   Platform  Platform
Platform  Platform  →Path   ⊕Tower    Platform
Platform  Platform  →Path   Platform  Platform
Platform  Platform  ●Goal   Platform  Platform
```

### **Battle Arena**
```
Wall  Wall    Wall    Wall  Wall
Wall  Arena   □Weak   Arena Wall
Wall  ■Med    Arena   ■Med  Wall
Wall  Arena   ■Strong Arena Wall
Wall  Wall    Wall    Wall  Wall
```

---

## 🐛 Troubleshooting

### Enemies not appearing in game
- **Check map is saved** - Refresh map list
- **Check game mode** - Must match map mode
- **Check tile type** - Must be enemy tile
- **Restart backend** - New maps need restart

### Path not working (Tower Defense)
- **Must have start** - Enemy spawn point
- **Must have path** - Connected path tiles
- **Must have end** - Goal/base tile
- **Check continuity** - Path must be connected

### Too many/few enemies
- **Adjust placement** - Add or remove enemy tiles
- **Test balance** - Play the map
- **Get feedback** - Have others try it
- **Iterate** - Refine based on results

---

## 🚀 Future Enhancements

Coming soon:
- **Custom enemy sprites** - Upload your own
- **Enemy editor** - Detailed stats control
- **Wave editor** - Define spawn patterns
- **Boss mechanics** - Special abilities
- **Enemy AI settings** - Behavior customization
- **Difficulty presets** - Easy/Normal/Hard modes

---

## 📚 Related Documentation

- [Map Maker Guide](MAP_MAKER_GUIDE.md)
- [Game Modes](GAME_MODES.md)
- [Features List](FEATURES.md)

---

**Status:** ✅ **FULLY OPERATIONAL!**

**All game modes now support square enemies!**

**Create challenging maps today!** 🎮🟥✨

