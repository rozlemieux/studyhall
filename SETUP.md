# 🚀 StudyHall Setup Guide

Complete guide to getting StudyHall up and running on your machine.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

- **Node.js** (v14.0.0 or higher)
  - Download: https://nodejs.org/
  - Verify: `node --version`

- **npm** (v6.0.0 or higher)
  - Usually comes with Node.js
  - Verify: `npm --version`

- **Git** (for cloning the repository)
  - Download: https://git-scm.com/
  - Verify: `git --version`

### Recommended Tools

- **VS Code** (code editor)
  - Download: https://code.visualstudio.com/
  - Extensions: ESLint, Prettier, GitLens

- **Modern Web Browser**
  - Chrome, Firefox, Safari, or Edge
  - Enable JavaScript and cookies

---

## 📥 Installation

### Step 1: Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/yourusername/studyhall.git

# OR using SSH
git clone git@github.com:yourusername/studyhall.git

# Navigate to project directory
cd studyhall
```

### Step 2: Install Backend Dependencies

```bash
# In the root directory
npm install
```

**Expected output:**
```
added X packages from Y contributors
```

### Step 3: Install Frontend Dependencies

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Return to root
cd ..
```

**Expected output:**
```
added X packages from Y contributors
```

---

## 🚀 Running the Application

You'll need **two terminal windows** to run both servers.

### Terminal 1: Backend Server

```bash
# From the root directory
node server.js
```

**Expected output:**
```
Server running on port 5001
Connected to SQLite database
Users table ready
Player data table ready
Player stats table ready
Achievements table ready
User achievements table ready
Game history table ready
```

**Note:** Keep this terminal running!

### Terminal 2: Frontend Server

```bash
# From the client directory
cd client
npm start
```

**Expected output:**
```
Compiled successfully!

You can now view studyhall in the browser.

  Local:            http://localhost:3001
  On Your Network:  http://192.168.x.x:3001
```

Your browser should automatically open to `http://localhost:3001`

---

## ✅ Verification

### 1. Check Backend is Running

Open a web browser and visit:
```
http://localhost:5001/api/achievements
```

You should see a JSON array of achievements.

### 2. Check Frontend is Running

Your browser should show the StudyHall homepage with:
- StudyHall logo
- Welcome message
- Login/Register button

### 3. Create Test Accounts

1. Click "Login" in the navbar
2. Register a teacher account:
   - Username: `teacher1`
   - Password: `password123`
   - Role: Teacher
3. Logout and register a student account:
   - Username: `student1`
   - Password: `password123`
   - Role: Student

### 4. Test Basic Functionality

**As Teacher:**
- ✅ View dashboard
- ✅ See pre-made question sets
- ✅ Click "Host Game"
- ✅ Select a question set and game mode

**As Student:**
- ✅ View dashboard
- ✅ See starting currency (500)
- ✅ Visit Shop
- ✅ View Leaderboard

---

## 🛠️ Troubleshooting

### Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5001
```

**Solution:**
```bash
# Find and kill the process using port 5001
# On macOS/Linux:
lsof -ti:5001 | xargs kill

# On Windows:
netstat -ano | findstr :5001
taskkill /PID <PID> /F

# Or change the port in server.js:
const PORT = process.env.PORT || 5002; // Use a different port
```

### Module Not Found

**Error:**
```
Error: Cannot find module 'express'
```

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# For client
cd client
rm -rf node_modules package-lock.json
npm install
```

### Database Errors

**Error:**
```
Error opening database
```

**Solution:**
```bash
# Delete the database file to start fresh
rm studyhall.db

# Restart the backend server
node server.js
```

### Frontend Won't Connect

**Issue:** Frontend shows "Failed to fetch" errors

**Solution:**
1. Verify backend is running on port 5001
2. Check `client/package.json` has correct proxy:
   ```json
   "proxy": "http://localhost:5001"
   ```
3. Clear browser cache and reload
4. Check browser console for errors

### ESLint Warnings

**Issue:** Many ESLint warnings in console

**Solution:**
- These are warnings, not errors
- App will still run normally
- Can be fixed gradually
- Can be suppressed in code if needed

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory (optional):

```env
# Server Configuration
PORT=5001
NODE_ENV=development

# Database
DB_PATH=./studyhall.db

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3001

# Session Secret (change in production)
SESSION_SECRET=your_secret_key_here
```

### Database Configuration

The SQLite database is created automatically at:
```
/studyhall/studyhall.db
```

To reset the database:
```bash
rm studyhall.db
node server.js  # Will recreate with fresh data
```

---

## 📦 Project Structure

```
studyhall/
├── server.js                # Backend server (Port 5001)
├── database.js             # Database operations
├── package.json            # Backend dependencies
├── studyhall.db           # SQLite database (auto-generated)
│
├── client/                # Frontend application
│   ├── public/
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── utils/        # Utility functions
│   │   ├── App.js
│   │   └── index.js
│   └── package.json      # Frontend dependencies (Port 3001)
│
├── .gitignore
├── README.md
└── [Documentation files]
```

---

## 🎓 First Steps After Setup

### 1. Explore as Teacher

1. Login as teacher
2. Browse pre-made question sets
3. Create a custom question set
4. Host a game
5. Explore different game modes
6. Create a custom map

### 2. Explore as Student

1. Login as student
2. Join a game (use code from teacher)
3. Play and earn currency
4. Visit the shop
5. Buy slime packs
6. Try easter egg codes
7. View leaderboard
8. Check achievements

### 3. Try Advanced Features

- Create custom maps
- Place enemies on maps
- Unlock secret slimes
- Compare stats on leaderboard
- Create your own question sets (students can too!)

---

## 🔄 Updating the Application

### Pull Latest Changes

```bash
# Pull from Git
git pull origin main

# Update backend dependencies
npm install

# Update frontend dependencies
cd client
npm install
cd ..

# Restart both servers
```

### Database Migrations

If the database schema changes:
- Backup your current database
- Restart the server (auto-creates new tables)
- Existing data is preserved

---

## 🐳 Docker Setup (Optional)

Coming soon! We're working on Docker support for easier deployment.

---

## 🌐 Network Access

### Access from Other Devices

1. Find your local IP address:
   ```bash
   # macOS/Linux
   ifconfig | grep "inet "
   
   # Windows
   ipconfig
   ```

2. Other devices on the same network can access at:
   ```
   http://YOUR_IP:3001
   ```

3. Make sure your firewall allows connections on ports 3001 and 5001

---

## 📱 Mobile Testing

### Local Network
- Use your local IP: `http://192.168.x.x:3001`
- Ensure mobile and computer are on same WiFi

### Responsive Design
- App is mobile-friendly
- Test different screen sizes
- Portrait and landscape supported

---

## 🚨 Common Issues

### Cannot GET /
- **Cause:** Frontend not running
- **Fix:** Start frontend with `npm start` in client folder

### 404 on API calls
- **Cause:** Backend not running
- **Fix:** Start backend with `node server.js` in root

### White screen
- **Cause:** JavaScript error
- **Fix:** Check browser console (F12), fix reported error

### Database locked
- **Cause:** Multiple server instances
- **Fix:** Kill all node processes and restart

---

## 💾 Backup & Reset

### Backup Your Data

```bash
# Backup database
cp studyhall.db studyhall.db.backup

# Backup with timestamp
cp studyhall.db studyhall.db.$(date +%Y%m%d)
```

### Reset Everything

```bash
# Delete database
rm studyhall.db

# Clear node modules
rm -rf node_modules client/node_modules

# Reinstall
npm install
cd client && npm install && cd ..

# Restart servers
```

---

## 📚 Next Steps

- Read the [README](README.md) for feature overview
- Check [FEATURES.md](FEATURES.md) for detailed features
- See [CONTRIBUTING.md](CONTRIBUTING.md) to contribute
- Join our community for support

---

## 🆘 Getting Help

If you're stuck:

1. **Check Documentation**
   - README.md
   - This SETUP.md file
   - Other guides in the repo

2. **Search Issues**
   - GitHub Issues
   - Closed issues might have solutions

3. **Ask for Help**
   - Open a GitHub Issue
   - Include error messages
   - Describe what you tried

4. **Community**
   - GitHub Discussions
   - Discord (coming soon)

---

## ✅ Setup Checklist

- [ ] Node.js and npm installed
- [ ] Repository cloned
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Backend server running (port 5001)
- [ ] Frontend server running (port 3001)
- [ ] Can access homepage
- [ ] Can create accounts
- [ ] Can login
- [ ] Backend API responding
- [ ] Database created successfully

---

**🎉 Congratulations! You're ready to use StudyHall!**

Happy learning and gaming! 🎓🎮

