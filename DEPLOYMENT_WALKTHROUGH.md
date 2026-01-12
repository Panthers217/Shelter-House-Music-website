# 🚀 Deployment Walkthrough - Follow These Steps

## ✅ Pre-Deployment Checklist

- [ ] Backend `.env` file exists with all credentials
- [ ] Frontend builds successfully locally (`npm run build` in frontend folder)
- [ ] Backend starts successfully locally (`npm start` in backend folder)
- [ ] Database backup created (run `node backend/scripts/backup-database.js`)
- [ ] Git changes committed and pushed to GitHub

---

## 🎯 PART 1: Deploy Backend to Render (15 minutes)

### Step 1: Create Render Account
- [ ] Go to https://render.com
- [ ] Click **"Get Started"** or **"Sign Up"**
- [ ] **Sign in with GitHub**
- [ ] Authorize Render to access your repositories

### Step 2: Create Web Service
- [ ] Click **"New +"** button (top right)
- [ ] Select **"Web Service"**
- [ ] Find repository: `Soul-Felt-Music-site`
- [ ] Click **"Connect"**

### Step 3: Configure Service
Fill in these exact values:

```
Name: soul-felt-music-backend
Region: [Choose closest to you]
Branch: Branch-10
Root Directory: backend
Runtime: Node
Build Command: npm install
Start Command: npm start
Instance Type: Free
```

### Step 4: Add Environment Variables
- [ ] Click **"Advanced"**
- [ ] Click **"Add Environment Variable"**
- [ ] Open `RENDER_ENV_VARS.md` (in your project root)
- [ ] Copy your ACTUAL values from `backend/.env`
- [ ] Add each variable one by one (25+ variables)

**Critical ones:**
- NODE_ENV=production
- PORT=3001
- All DB_* variables (from Aiven)
- All FIREBASE_* variables
- STRIPE_SECRET_KEY
- CLOUDINARY_* variables
- SMTP_* variables
- JWT_SECRET and SESSION_SECRET

### Step 5: Deploy Backend
- [ ] Click **"Create Web Service"**
- [ ] Wait 5-10 minutes for deployment
- [ ] Watch the logs for any errors
- [ ] Copy your backend URL: `https://soul-felt-music-backend.onrender.com`

### Step 6: Test Backend
- [ ] Visit: `https://your-backend.onrender.com/health`
- [ ] Should see: `{"status":"ok","timestamp":"...","uptime":...}`
- [ ] If it works, backend is deployed! ✅

**If deployment fails:**
- Check the logs in Render dashboard
- Verify all environment variables are correct
- Make sure FIREBASE_PRIVATE_KEY has quotes and \n characters

---

## 🎨 PART 2: Update CORS in Backend (2 minutes)

Now we need to allow your frontend to call the backend.

### Option A: Update in GitHub (then Render auto-redeploys)

1. Open `backend/server.js` in your editor
2. Find the `allowedOrigins` array (around line 60)
3. Add a placeholder for now:

```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  process.env.FRONTEND_URL,
  'https://soul-felt-music-site.netlify.app', // Replace with YOUR actual Netlify URL
];
```

4. Commit and push to GitHub
5. Render will auto-redeploy (2-3 minutes)

### Option B: Update FRONTEND_URL in Render

1. Go to Render Dashboard → Your Service
2. Environment → Edit
3. Add/Update: `FRONTEND_URL=https://your-site.netlify.app` (you'll get this URL in Part 3)
4. Click **"Save Changes"**
5. Service will redeploy

---

## 🌐 PART 3: Deploy Frontend to Netlify (15 minutes)

### Step 1: Create Netlify Account
- [ ] Go to https://netlify.com
- [ ] Click **"Sign up"**
- [ ] **Sign up with GitHub**
- [ ] Authorize Netlify

### Step 2: Import Project
- [ ] Click **"Add new site"** → **"Import an existing project"**
- [ ] Click **"Deploy with GitHub"**
- [ ] Find repository: `Soul-Felt-Music-site`
- [ ] Click on it

### Step 3: Configure Build Settings
Fill in these exact values:

```
Branch to deploy: Branch-10
Base directory: frontend
Build command: npm install --legacy-peer-deps && npm run build
Publish directory: frontend/dist
```

**Note:** The `--legacy-peer-deps` flag is required because the project uses React 19, but some dependencies only officially support React 18.

### Step 4: Add Environment Variables (IMPORTANT!)
- [ ] Click **"Add environment variables"** or **"Show advanced"**
- [ ] Open `NETLIFY_ENV_VARS.md` (in your project root)
- [ ] Add each variable:

**Required variables:**
```
VITE_API_URL=https://soul-felt-music-backend.onrender.com
VITE_FIREBASE_API_KEY=your-key
VITE_FIREBASE_AUTH_DOMAIN=your-domain
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxx
VITE_SITE_URL=https://soul-felt-music-site.netlify.app
VITE_SITE_NAME=Soul Felt Music
```

**Note:** Replace `soul-felt-music-backend.onrender.com` with YOUR actual Render URL from Part 1!

### Step 5: Deploy Frontend
- [ ] Click **"Deploy site"**
- [ ] Wait 5-10 minutes
- [ ] Netlify will show build logs
- [ ] When done, you'll see: **"Your site is live"**
- [ ] Copy your URL: `https://[random-name].netlify.app`

### Step 6: Update Site URL in Netlify Env Vars
- [ ] Go to Site settings → Environment variables
- [ ] Update `VITE_SITE_URL` with your actual Netlify URL
- [ ] Click **"Save"**
- [ ] Go to Deploys → **"Trigger deploy"** → **"Clear cache and deploy"**

---

## 🔄 PART 4: Connect Frontend & Backend (5 minutes)

### Update CORS in Backend

Now that you have your Netlify URL:

1. Go to Render Dashboard
2. Select your backend service
3. Environment tab
4. Update `FRONTEND_URL` to your Netlify URL
5. Or update `backend/server.js` allowedOrigins array on GitHub

```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  process.env.FRONTEND_URL,
  'https://your-actual-site.netlify.app', // Your actual URL!
];
```

6. Commit, push, and Render will redeploy

---

## 🧪 PART 5: Test Your Live Site (10 minutes)

- [ ] Visit your Netlify URL
- [ ] Check if DemoBanner shows (should show on first visit)
- [ ] Try browsing music/artists (tests database connection)
- [ ] Try searching (tests API calls)
- [ ] Try signing up/logging in (tests Firebase)
- [ ] Open browser console - check for errors
- [ ] Test on mobile device

**If things don't work:**
- Check browser console for errors
- Check Render logs for backend errors
- Verify environment variables are correct
- Check CORS is properly configured

---

## 🎉 SUCCESS CHECKLIST

- [ ] Backend health check works: `https://your-backend.onrender.com/health`
- [ ] Frontend loads: `https://your-site.netlify.app`
- [ ] No console errors in browser
- [ ] Can browse artists/music (API working)
- [ ] Can sign up/login (Firebase working)
- [ ] DemoBanner shows correctly

---

## 📝 Post-Deployment Tasks

- [ ] Update Firebase authorized domains (add Netlify URL)
- [ ] Update Stripe webhook URLs (if using)
- [ ] Custom domain setup (optional)
- [ ] Switch Stripe to LIVE keys when ready
- [ ] Remove DemoBannerReset component from Home.jsx (production)
- [ ] Submit sitemap to Google Search Console

---

## 🆘 Common Issues

### "502 Bad Gateway" on Render
- Check environment variables
- Check database credentials
- Look at Render logs

### "CORS Error" in browser
- Verify FRONTEND_URL is set in Render
- Check allowedOrigins array includes Netlify URL

### "Build Failed" on Netlify
- Check all VITE_* variables are set
- Look at build logs for specific error

### Frontend shows blank page
- Check VITE_API_URL is correct
- Open browser console for errors

---

## 🎯 Ready to Start?

1. **Start with PART 1** (Backend to Render)
2. Get your backend URL
3. **Then do PART 3** (Frontend to Netlify)
4. **Then PART 4** (Connect them)
5. **Finally PART 5** (Test everything)

**Estimated Total Time: 45 minutes**

Good luck! 🚀
