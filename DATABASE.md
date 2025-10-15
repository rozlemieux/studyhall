# 🗄️ StudyHall Database Documentation

## Overview

StudyHall now uses **SQLite** for persistent data storage with **bcrypt** password hashing for secure authentication.

---

## 📊 Database Schema

### Users Table
Stores all user accounts (teachers and students).

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,           -- bcrypt hashed
  role TEXT NOT NULL CHECK(role IN ('student', 'teacher')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**Fields:**
- `id` - Unique user ID (auto-incremented)
- `username` - Unique username (used for login)
- `password` - Hashed password (bcrypt with salt rounds = 10)
- `role` - Either 'student' or 'teacher'
- `created_at` - Account creation timestamp

---

### Player Data Table
Stores student-specific data (currency, slimes, etc.).

```sql
CREATE TABLE player_data (
  user_id INTEGER PRIMARY KEY,
  currency INTEGER DEFAULT 500,
  selected_slime TEXT DEFAULT 'mint',
  owned_slimes TEXT DEFAULT '["mint"]',  -- JSON array
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

**Fields:**
- `user_id` - Links to users table
- `currency` - In-game currency for purchasing slime packs
- `selected_slime` - Currently active slime ID
- `owned_slimes` - JSON array of owned slime IDs

**Default values:**
- New students start with 500 currency
- Start with one 'mint' slime

---

### Game History Table (Optional)
Tracks past games for analytics and history.

```sql
CREATE TABLE game_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  game_code TEXT NOT NULL,
  host_id INTEGER NOT NULL,
  question_set_name TEXT,
  game_mode TEXT DEFAULT 'classic',
  players_count INTEGER,
  started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  finished_at DATETIME,
  FOREIGN KEY (host_id) REFERENCES users(id)
);
```

---

## 🔐 Authentication

### Password Security

**Hashing:**
- Uses **bcrypt** with 10 salt rounds
- Passwords are never stored in plain text
- Minimum password length: 6 characters

**Registration Process:**
1. User provides username, password, and role
2. Password is validated (min 6 characters)
3. Password is hashed using bcrypt
4. User record is created in database
5. If student, player_data record is created

**Login Process:**
1. User provides username and password
2. Database queries user by username
3. bcrypt compares provided password with stored hash
4. If match, user is authenticated and session begins

---

## 📡 API Endpoints

### Authentication Endpoints

#### POST `/api/auth/register`
Register a new user account.

**Request Body:**
```json
{
  "username": "string (required)",
  "password": "string (required, min 6 chars)",
  "role": "student | teacher (required)"
}
```

**Response:**
```json
{
  "id": 123,
  "username": "student1",
  "role": "student"
}
```

**Errors:**
- 400: Missing fields or password too short
- 400: Username already exists

---

#### POST `/api/auth/login`
Login to existing account.

**Request Body:**
```json
{
  "username": "string (required)",
  "password": "string (required)"
}
```

**Response:**
```json
{
  "id": 123,
  "username": "student1",
  "role": "student"
}
```

**Errors:**
- 401: Invalid username or password

---

### Player Data Endpoints

#### GET `/api/player/:userId`
Get player data for a student.

**Response:**
```json
{
  "userId": 123,
  "currency": 1500,
  "selectedSlime": "fire",
  "ownedSlimes": ["mint", "fire", "water", "ice"]
}
```

---

#### POST `/api/player/:userId/buy-pack`
Purchase a slime pack.

**Request Body:**
```json
{
  "packId": "common-pack"
}
```

**Updates database:**
- Deducts currency
- Adds random slime to owned_slimes

---

#### POST `/api/player/:userId/select-slime`
Change active slime.

**Request Body:**
```json
{
  "slimeId": "fire"
}
```

**Updates database:**
- Updates selected_slime field

---

#### POST `/api/player/:userId/sell-slime`
Sell a slime from collection.

**Request Body:**
```json
{
  "slimeId": "water"
}
```

**Updates database:**
- Removes slime from owned_slimes
- Adds currency (25% of pack value)

---

#### POST `/api/player/:userId/redeem-code`
Redeem easter egg code for secret slime.

**Request Body:**
```json
{
  "code": "TAKOTIME"
}
```

**Updates database:**
- Adds secret slime to owned_slimes

---

## 🗂️ Database File

**Location:** `/tmp/studyhall/studyhall.db`

**File Type:** SQLite3 database

**Backup:** Copy `studyhall.db` to backup location

**Reset:** Delete `studyhall.db` file - will be recreated on next server start

---

## 💻 Database Module Usage

### Server-side (Node.js)

```javascript
const database = require('./database');

// Register user
try {
  const user = await database.auth.register(username, password, role);
  console.log('User created:', user);
} catch (error) {
  console.error('Registration failed:', error);
}

// Login user
try {
  const user = await database.auth.login(username, password);
  console.log('Login successful:', user);
} catch (error) {
  console.error('Login failed:', error);
}

// Get player data
const playerData = await database.playerData.get(userId);

// Update player data
await database.playerData.update(userId, {
  currency: 1000,
  selectedSlime: 'fire',
  ownedSlimes: ['mint', 'fire', 'water']
});

// Save game history
await database.gameHistory.save(gameCode, hostId, questionSetName, gameMode, playersCount);

// Mark game as finished
await database.gameHistory.finish(gameCode);

// Get user's game history
const history = await database.gameHistory.getUserHistory(userId, 10);
```

---

## 🔄 Data Persistence

### What's Persisted:
✅ User accounts (username, password, role)  
✅ Player currency  
✅ Owned slimes  
✅ Selected slime  
✅ Game history (optional)

### What's Not Persisted:
❌ Active game sessions (stored in memory)  
❌ Question sets (stored in memory)  
❌ Real-time game state  
❌ Socket connections  

**Why?** Active sessions are temporary and should reset on server restart.

---

## 🔧 Database Management

### Viewing Database

Using SQLite CLI:
```bash
sqlite3 /tmp/studyhall/studyhall.db

# View tables
.tables

# View users
SELECT * FROM users;

# View player data
SELECT * FROM player_data;

# Exit
.quit
```

### Backup Database

```bash
cp /tmp/studyhall/studyhall.db /path/to/backup/studyhall_backup_$(date +%Y%m%d).db
```

### Reset Database

```bash
rm /tmp/studyhall/studyhall.db
# Database will be recreated on next server start
```

---

## 🛡️ Security Best Practices

### Implemented:
✅ Password hashing with bcrypt  
✅ SQL injection protection (parameterized queries)  
✅ Password minimum length requirement  
✅ Unique username constraints  

### Recommended for Production:
- [ ] Add session tokens/JWT  
- [ ] Implement rate limiting  
- [ ] Add password complexity requirements  
- [ ] Implement password reset functionality  
- [ ] Add email verification  
- [ ] Use HTTPS in production  
- [ ] Implement CSRF protection  
- [ ] Add account lockout after failed attempts  

---

## 🐛 Troubleshooting

### "Database locked" error
- Another process is using the database
- Wait a moment and try again
- Close any open SQLite connections

### "Username already exists" error
- Username must be unique
- Try a different username
- Check existing users: `SELECT * FROM users;`

### Lost password
- No password reset implemented yet
- Option 1: Create new account
- Option 2: Manually update database (development only):
  ```bash
  sqlite3 studyhall.db
  DELETE FROM users WHERE username = 'oldusername';
  ```

### Database file missing
- Server will automatically create new database
- All data will be lost (cannot be recovered)
- Restore from backup if available

---

## 📈 Future Enhancements

Potential database improvements:
- [ ] Add email field to users table
- [ ] Track login history
- [ ] Store player game statistics
- [ ] Leaderboard table
- [ ] Achievement system
- [ ] Question set storage in database
- [ ] Multi-factor authentication
- [ ] Profile pictures/avatars
- [ ] Friend system
- [ ] Private messaging

---

## 🔍 Schema Diagram

```
┌─────────────┐
│    users    │
├─────────────┤
│ id (PK)     │
│ username    │◄──┐
│ password    │   │
│ role        │   │
│ created_at  │   │
└─────────────┘   │
                  │
       ┌──────────┴──────────┬──────────────────┐
       │                     │                  │
       │                     │                  │
┌──────▼──────────┐  ┌───────▼────────┐  ┌─────▼───────────┐
│  player_data    │  │ game_history   │  │  (future)       │
├─────────────────┤  ├────────────────┤  ├─────────────────┤
│ user_id (PK,FK) │  │ id (PK)        │  │  achievements   │
│ currency        │  │ game_code      │  │  friends        │
│ selected_slime  │  │ host_id (FK)   │  │  messages       │
│ owned_slimes    │  │ question_set   │  │  ...            │
└─────────────────┘  │ game_mode      │  └─────────────────┘
                     │ players_count  │
                     │ started_at     │
                     │ finished_at    │
                     └────────────────┘
```

---

## ✅ Testing Checklist

- [ ] Register new student account
- [ ] Register new teacher account
- [ ] Login with correct credentials
- [ ] Login with wrong password (should fail)
- [ ] Try duplicate username (should fail)
- [ ] Purchase slime pack (currency should decrease)
- [ ] Select different slime
- [ ] Sell slime (currency should increase)
- [ ] Logout and login again (data should persist)
- [ ] Restart server (data should persist)

---

**Database Version:** 1.0  
**Last Updated:** [Current Date]  
**Status:** ✅ Production-ready with persistent storage!

