# StudyHall Render Deployment Guide

## ✅ Pre-Deployment Checklist (COMPLETED)

- [x] Synced client/package-lock.json
- [x] Added Node 18.x to engines in root package.json
- [x] Updated server.js to serve static React build
- [x] Built production React bundle (137KB + 11KB CSS)
- [x] Fixed all hardcoded localhost URLs
- [x] Configured backend on port 8001
- [x] Created backend folder structure

## 📋 Render Deployment Steps

### 1. Connect Repository to Render

1. Go to https://render.com and sign in
2. Click "New +" → "Web Service"
3. Connect your GitHub account
4. Select the StudyHall repository

### 2. Configure Build Settings

**Service Name:** studyhall-app (or your choice)

**Environment:** Node

**Region:** Choose closest to your users

**Branch:** main

**Build Command:**
```bash
npm ci && cd client && npm ci && npm run build
```

**Start Command:**
```bash
node server.js
```

### 3. Environment Variables

Add these in Render dashboard:

| Key | Value |
|-----|-------|
| `NODE_VERSION` | `18` |
| `NODE_ENV` | `production` |
| `PORT` | `8001` (Render will override this) |

### 4. SQLite Database Setup (IMPORTANT)

Since the app uses SQLite, you need persistent storage:

**Option A: Render Disk (Recommended)**
1. In Render dashboard, go to your service
2. Click "Disks" tab
3. Add disk:
   - **Name:** studyhall-data
   - **Mount Path:** `/data`
   - **Size:** 1GB (free tier)

4. Update database.js to use `/data` path:
```javascript
const dbPath = process.env.NODE_ENV === 'production' 
  ? '/data/studyhall.db' 
  : './studyhall.db';
```

**Option B: Migrate to MongoDB (For scalability)**
- Render provides free MongoDB
- Would require code changes to replace SQLite

### 5. Advanced Configuration

**Free Tier Limitations:**
- Service spins down after 15 min inactivity
- First request after spin-down takes 30-60 seconds
- 750 hours/month free

**To keep service active (Paid plans):**
- Upgrade to Starter plan ($7/month)
- Service stays always on

### 6. Deploy!

1. Click "Create Web Service"
2. Render will:
   - Clone your repository
   - Run `npm ci && cd client && npm ci && npm run build`
   - Start server with `node server.js`
   - Assign a URL: `https://studyhall-app.onrender.com`

### 7. Post-Deployment

**Test these features:**
- [ ] Home page loads
- [ ] User registration
- [ ] Teacher/Student dashboards
- [ ] Game creation
- [ ] Join game with code
- [ ] Socket.io real-time updates
- [ ] Slime shop
- [ ] Map creator
- [ ] Leaderboard

**Monitor logs:**
```bash
# In Render dashboard
Logs tab → View real-time logs
```

## 🐛 Troubleshooting

### Build Fails
- Check Node version is 18.x
- Verify package-lock.json is committed
- Check build logs for specific errors

### App Crashes on Start
- Check if server.js has correct path imports
- Verify database path is accessible
- Check PORT configuration

### Database Issues
- Confirm Render Disk is mounted at `/data`
- Check file permissions
- Verify database.js uses correct path

### Socket.io Not Working
- Ensure WebSocket support is enabled (Render supports by default)
- Check CORS configuration in server.js
- Verify client connects to correct URL

## 📊 Current App Status

✅ **Ready for Deployment**
- Backend: Configured for port 8001
- Frontend: Production build created (148KB total)
- Static serving: Enabled in production mode
- Node version: 18.x specified
- All dependencies: Installed and locked

## 🔄 Updating After Deployment

When you make changes:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

Render will automatically:
1. Detect the push
2. Rebuild the app
3. Deploy new version
4. Zero-downtime deployment

## 📝 Alternative: Deploy to Other Platforms

### Heroku
```bash
heroku create studyhall-app
git push heroku main
```

### Railway
```bash
railway init
railway up
```

### Vercel (Frontend only)
```bash
cd client
vercel
```

---

**Your app is now ready to deploy to Render!** 🚀

Follow the steps above and your StudyHall app will be live at your custom Render URL.
