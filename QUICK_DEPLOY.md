# 🚀 Quick Start: Deploy to Netlify & Render

This is the **fast track** guide. For detailed instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md).

---

## ⚡ Step 1: Deploy Backend to Render (10 mins)

1. **Go to** https://render.com and sign up with GitHub

2. **New Web Service**:
   - Connect repository: `Soul-Felt-Music-site`
   - Name: `soul-felt-music-backend`
   - Root Directory: `backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Instance Type: Free (or paid)

3. **Add Environment Variables** (from `backend/.env.example`):
   ```
   NODE_ENV=production
   PORT=3001
   DB_HOST=your-aiven-mysql-host.aivencloud.com
   DB_PORT=your-port
   DB_USER=avnadmin
   DB_PASSWORD=your-password
   DB_NAME=defaultdb
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_PRIVATE_KEY="your-private-key"
   FIREBASE_CLIENT_EMAIL=your-email
   STRIPE_SECRET_KEY=sk_live_xxxxx
   CLOUDINARY_CLOUD_NAME=your-cloud
   CLOUDINARY_API_KEY=your-key
   CLOUDINARY_API_SECRET=your-secret
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email
   SMTP_PASS=your-app-password
   JWT_SECRET=your-secret
   SESSION_SECRET=your-secret
   ```

4. **Click "Create Web Service"** and wait 5-10 minutes

5. **Copy your backend URL**: `https://soul-felt-music-backend.onrender.com`

6. **Test it**: Visit `https://your-backend.onrender.com/health`

---

## ⚡ Step 2: Update Backend CORS (2 mins)

Add your Netlify URL to backend CORS configuration:

**File**: `backend/server.js`

Find the `allowedOrigins` array and update it:

```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  process.env.FRONTEND_URL,
  'https://your-site.netlify.app',  // ← Add this (you'll get the URL in step 3)
  // 'https://soulfeltmusic.com',   // ← Add custom domain later
].filter(Boolean);
```

Commit and push - Render will auto-redeploy.

---

## ⚡ Step 3: Deploy Frontend to Netlify (10 mins)

1. **Go to** https://netlify.com and sign up with GitHub

2. **Add New Site** → **Import from Git**:
   - Select repository: `Soul-Felt-Music-site`
   - Configure:
     - Base directory: `frontend`
     - Build command: `npm run build`
     - Publish directory: `frontend/dist`

3. **Add Environment Variables** (Site settings → Environment variables):
   ```
   VITE_API_URL=https://soul-felt-music-backend.onrender.com
   VITE_FIREBASE_API_KEY=your-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=your-app-id
   VITE_STRIPE_PUBLIC_KEY=pk_live_xxxxx
   VITE_SITE_URL=https://your-site.netlify.app
   VITE_SITE_NAME=Soul Felt Music
   ```

4. **Click "Deploy Site"** and wait 5-10 minutes

5. **Your site is live!** 🎉

---

## ⚡ Step 4: Test Everything (5 mins)

Visit your Netlify URL and test:

- [ ] Site loads ✅
- [ ] Can browse music/artists
- [ ] Can sign up/login
- [ ] Can view artist pages
- [ ] Contact form works
- [ ] Check browser console for errors

---

## 🎯 Quick Fixes

### Frontend can't connect to backend?
1. Check CORS settings in `backend/server.js`
2. Verify `VITE_API_URL` in Netlify env vars
3. Check Render logs for errors

### Database connection error?
1. Verify database credentials in Render env vars
2. Check Aiven allows connections from anywhere
3. Test connection locally first

### Build fails on Netlify?
1. Check all env variables are set
2. Review build logs in Netlify dashboard
3. Test `npm run build` locally first

---

## 📝 Next Steps

After successful deployment:

1. ✅ **Update backend CORS** with actual Netlify URL
2. ✅ **Add custom domain** (optional) in Netlify settings
3. ✅ **Update Firebase authorized domains** with production URLs
4. ✅ **Update Stripe webhook URLs** with production backend
5. ✅ **Set up monitoring** (error tracking, uptime monitoring)
6. ✅ **Submit sitemap** to Google Search Console

---

## 💰 Cost Summary

**Free Tier Usage**:
- ✅ **Netlify**: Free (100GB bandwidth/month, 300 build minutes)
- ✅ **Render**: Free (sleeps after 15 min inactivity, 750 hrs/month)
- ✅ **Aiven MySQL**: Your current free plan

**Recommended Upgrades** (for production with traffic):
- 💵 **Render**: $7-25/month (no cold starts, better performance)
- 💵 **Netlify**: $19/month (more bandwidth, analytics)

---

## 🆘 Need Help?

- **Netlify Docs**: https://docs.netlify.com
- **Render Docs**: https://render.com/docs
- **Full Guide**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **Checklist**: [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

---

**Estimated Total Time**: 30 minutes ⏱️

**Good luck with your deployment! 🚀**
