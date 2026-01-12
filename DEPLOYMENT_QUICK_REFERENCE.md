# 🎯 Deployment Quick Reference Card

Copy this and fill in your actual values during deployment.

---

## 🔗 Service URLs

### Backend (Render)
```
Production URL: https://soul-felt-music-backend.onrender.com
Health Check:   https://soul-felt-music-backend.onrender.com/health
API Endpoint:   https://soul-felt-music-backend.onrender.com/api
```

### Frontend (Netlify)
```
Production URL: https://your-site.netlify.app
Custom Domain:  https://soulfeltmusic.com (if configured)
```

### Database (Aiven MySQL)
```
Host: ___________________________.aivencloud.com
Port: _______
Database: defaultdb
User: avnadmin
```

---

## ⚙️ Environment Variables Quick Copy

### Backend (Render Dashboard)

```bash
NODE_ENV=production
PORT=3001

# Database
DB_HOST=___________________________.aivencloud.com
DB_PORT=_______
DB_USER=avnadmin
DB_PASSWORD=___________________________
DB_NAME=defaultdb

# Firebase Admin
FIREBASE_PROJECT_ID=___________________________
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-_____@_____.iam.gserviceaccount.com

# Stripe
STRIPE_SECRET_KEY=sk_live_________________________________
STRIPE_WEBHOOK_SECRET=whsec_________________________________

# Cloudinary
CLOUDINARY_CLOUD_NAME=___________________________
CLOUDINARY_API_KEY=___________________________
CLOUDINARY_API_SECRET=___________________________

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=___________________________@gmail.com
SMTP_PASS=___________________________ (app-specific password)

# Security
JWT_SECRET=___________________________ (generate random string)
SESSION_SECRET=___________________________ (generate random string)

# CORS
FRONTEND_URL=https://your-site.netlify.app
```

### Frontend (Netlify Dashboard)

```bash
# API
VITE_API_URL=https://soul-felt-music-backend.onrender.com

# Firebase Client
VITE_FIREBASE_API_KEY=___________________________
VITE_FIREBASE_AUTH_DOMAIN=_______________.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=___________________________
VITE_FIREBASE_STORAGE_BUCKET=_______________.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=_______________
VITE_FIREBASE_APP_ID=1:_______________:web:_______________

# Stripe
VITE_STRIPE_PUBLIC_KEY=pk_live_________________________________

# Site
VITE_SITE_URL=https://your-site.netlify.app
VITE_SITE_NAME=Soul Felt Music
```

---

## 📋 Deployment Checklist

### Before Deployment
- [ ] Backup database: `node backend/scripts/backup-database.js`
- [ ] Test locally: Frontend & Backend working together
- [ ] Review .env files - no sensitive data committed
- [ ] Update Stripe keys to LIVE keys (when ready)

### Backend Deployment (Render)
- [ ] Create Render account
- [ ] New Web Service from GitHub repo
- [ ] Set Root Directory: `backend`
- [ ] Set Build: `npm install`
- [ ] Set Start: `npm start`
- [ ] Add all environment variables above
- [ ] Deploy and note URL

### Frontend Deployment (Netlify)
- [ ] Create Netlify account
- [ ] Import GitHub repo
- [ ] Set Base: `frontend`
- [ ] Set Build: `npm run build`
- [ ] Set Publish: `frontend/dist`
- [ ] Add all environment variables above
- [ ] Update VITE_API_URL with Render URL
- [ ] Deploy

### Post-Deployment
- [ ] Update backend CORS with Netlify URL
- [ ] Test health: `https://your-backend.onrender.com/health`
- [ ] Test frontend loads
- [ ] Test authentication (signup/login)
- [ ] Test API calls (browse music/artists)
- [ ] Test contact form
- [ ] Check browser console for errors
- [ ] Update Firebase authorized domains
- [ ] Update Stripe webhook URLs

---

## 🔧 Common Tasks

### Generate Secure Secrets
```bash
# JWT Secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Session Secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Test Backend Locally
```bash
cd backend
npm start
# Visit http://localhost:3001/health
```

### Test Frontend Locally
```bash
cd frontend
npm run dev
# Visit http://localhost:5173
```

### Build Frontend for Production
```bash
cd frontend
npm run build
npm run preview
# Visit http://localhost:4173
```

### Backup Database
```bash
cd backend
node scripts/backup-database.js
# Check database/backups/ folder
```

---

## 🆘 Troubleshooting

### CORS Error
```javascript
// In backend/server.js, add your Netlify URL:
const allowedOrigins = [
  'http://localhost:5173',
  'https://your-site.netlify.app',  // ← Add this
];
```

### Frontend Can't Connect to Backend
1. Check VITE_API_URL in Netlify env vars
2. Check CORS settings in backend
3. Check Render logs for errors

### Database Connection Error
1. Verify all DB credentials in Render
2. Check Aiven allows external connections
3. Test connection from local first

### Build Fails
1. Check all environment variables are set
2. Review build logs
3. Test `npm run build` locally

---

## 📞 Support

- Render: https://render.com/docs
- Netlify: https://docs.netlify.com
- Full Guide: See DEPLOYMENT_GUIDE.md

---

**Print this page and fill it out during deployment!** 📝
