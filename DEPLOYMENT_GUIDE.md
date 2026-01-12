# 🚀 Deployment Guide - Shelter House Music

## Overview

- **Frontend**: Netlify (React + Vite)
- **Backend**: Render (Node.js/Express)
- **Database**: Aiven MySQL (already set up)

---

## 📦 Pre-Deployment Checklist

### Frontend Preparation

- [ ] Update API URLs to point to production backend
- [ ] Set up environment variables
- [ ] Test production build locally
- [ ] Enable SEO pre-rendering
- [ ] Update domain URLs in SEO meta tags

### Backend Preparation

- [ ] Set up environment variables on Render
- [ ] Configure CORS for production domains
- [ ] Set up health check endpoint
- [ ] Test database connection
- [ ] Review security settings

---

## 🎯 Part 1: Backend Deployment (Render)

### Step 1: Prepare Backend

1. **Create a start script** (already done in package.json)

2. **Add health check endpoint** (add to `backend/server.js`):

```javascript
// Health check endpoint for Render
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});
```

3. **Update CORS configuration** for production:

```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'https://your-site.netlify.app',  // Update with your Netlify URL
  'https://soulfeltmusic.com'        // Your custom domain if you have one
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

### Step 2: Deploy to Render

1. **Go to**: https://render.com

2. **Sign up/Login** with GitHub

3. **Click "New +"** → **"Web Service"**

4. **Connect your repository**: `Soul-Felt-Music-site`

5. **Configure the service**:
   - **Name**: `soul-felt-music-backend`
   - **Region**: Choose closest to your users
   - **Branch**: `Branch-10` or `main`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or paid for better performance)

6. **Add Environment Variables** (click "Advanced"):

```bash
NODE_ENV=production
PORT=3001

# Database (Aiven MySQL)
DB_HOST=your-aiven-host.aivencloud.com
DB_PORT=12345
DB_USER=avnadmin
DB_PASSWORD=your_password
DB_NAME=defaultdb

# Firebase
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY="your_private_key"
FIREBASE_CLIENT_EMAIL=your_email

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_app_password

# Other
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret
```

7. **Click "Create Web Service"**

8. **Wait for deployment** (5-10 minutes)

9. **Your backend URL**: `https://soul-felt-music-backend.onrender.com`

### Step 3: Test Backend

```bash
# Test health endpoint
curl https://soul-felt-music-backend.onrender.com/health

# Test API endpoint
curl https://soul-felt-music-backend.onrender.com/api/artists
```

---

## 🎨 Part 2: Frontend Deployment (Netlify)

### Step 1: Prepare Frontend

1. **Create environment file** for production (`.env.production`):

```bash
# API Configuration
VITE_API_URL=https://soul-felt-music-backend.onrender.com

# Firebase
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your_app_id

# Stripe
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key

# Other
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_key
```

2. **Update `vite.config.js`** if needed:

```javascript
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          firebase: ['firebase/app', 'firebase/auth'],
        }
      }
    }
  }
});
```

3. **Test production build locally**:

```bash
cd frontend
npm run build
npm run preview
# Visit http://localhost:4173 to test
```

### Step 2: Deploy to Netlify

#### Option A: Using Netlify UI (Recommended)

1. **Go to**: https://netlify.com

2. **Sign up/Login** with GitHub

3. **Click "Add new site"** → **"Import an existing project"**

4. **Connect to GitHub** and select `Soul-Felt-Music-site`

5. **Configure build settings**:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
   - **Branch**: `Branch-10` or `main`

6. **Add Environment Variables** (Site settings → Environment variables):
   - Copy all `VITE_*` variables from your `.env.production`
   - Click "Add" for each variable

7. **Deploy site** (click "Deploy site")

8. **Your site URL**: `https://random-name.netlify.app`

#### Option B: Using Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize Netlify (from project root)
netlify init

# Deploy
cd frontend
npm run build
netlify deploy --prod
```

### Step 3: Configure Custom Domain (Optional)

1. **In Netlify Dashboard** → **Domain settings**
2. **Add custom domain**: `soulfeltmusic.com`
3. **Configure DNS** with your domain provider:
   - Add `A` record pointing to Netlify's load balancer
   - Or add `CNAME` record: `your-site.netlify.app`
4. **Enable HTTPS** (automatic with Netlify)

---

## 🔒 Part 3: Security & Environment Variables

### Backend Environment Variables (Render)

Go to Render Dashboard → Your Service → Environment → Add Environment Variables:

```
NODE_ENV=production
PORT=3001
DB_HOST=your-aiven-mysql-host.aivencloud.com
DB_PORT=your-port
DB_USER=avnadmin
DB_PASSWORD=your-db-password
DB_NAME=defaultdb
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-service-account-email
STRIPE_SECRET_KEY=sk_live_xxxxx
CLOUDINARY_CLOUD_NAME=your-cloud
CLOUDINARY_API_KEY=your-key
CLOUDINARY_API_SECRET=your-secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
JWT_SECRET=your-random-secret
SESSION_SECRET=your-random-secret
```

### Frontend Environment Variables (Netlify)

Go to Netlify Dashboard → Site settings → Environment variables:

```
VITE_API_URL=https://soul-felt-music-backend.onrender.com
VITE_FIREBASE_API_KEY=your-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_STRIPE_PUBLIC_KEY=pk_live_xxxxx
VITE_UNSPLASH_ACCESS_KEY=your-key
```

---

## 🧪 Part 4: Testing Deployment

### Test Checklist

- [ ] **Backend health check**: `https://your-backend.onrender.com/health`
- [ ] **API endpoints work**: Test `/api/artists`, `/api/albums`, etc.
- [ ] **CORS is configured**: Frontend can call backend
- [ ] **Database connection**: Data loads properly
- [ ] **Firebase auth works**: Users can sign up/login
- [ ] **Stripe payments work**: Test checkout flow
- [ ] **File uploads work**: Test Cloudinary integration
- [ ] **Email sends**: Test contact form
- [ ] **SEO meta tags**: Check with view source
- [ ] **Pre-rendered pages**: Check initial HTML content
- [ ] **Mobile responsive**: Test on different devices
- [ ] **Performance**: Run Lighthouse audit

### Testing Commands

```bash
# Test backend API
curl https://your-backend.onrender.com/api/artists

# Test frontend loads
curl https://your-site.netlify.app

# Check if pre-rendering worked (should see HTML content)
curl https://your-site.netlify.app | grep "<title>"
```

---

## 🔧 Part 5: Post-Deployment Configuration

### Update Frontend API URLs

If you hardcoded API URLs, update them:

```javascript
// frontend/src/config/api.js or similar
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
```

### Update SEO URLs

Update all URLs in SEO component and sitemap:

```javascript
// frontend/src/components/SEO.jsx
const SITE_URL = 'https://your-site.netlify.app'; // or custom domain
```

### Configure Webhooks (Optional)

Set up automatic deployments:

**Netlify**: 
- Settings → Build & deploy → Build hooks
- Add webhook for automatic deploys

**Render**:
- Automatically deploys on git push (if connected)

---

## 📊 Part 6: Monitoring & Maintenance

### Netlify Monitoring

- **Analytics**: Enable Netlify Analytics (paid)
- **Build logs**: Check for errors in deploy logs
- **Function logs**: Monitor serverless function usage

### Render Monitoring

- **Logs**: Dashboard → Your service → Logs
- **Metrics**: Monitor CPU, Memory, Response times
- **Alerts**: Set up email alerts for downtime

### Database Backups

```bash
# Run backup script regularly
cd backend
node scripts/backup-database.js

# Schedule with cron or Render Cron Jobs
```

---

## 🚨 Common Issues & Solutions

### Issue: "CORS Error"
**Solution**: Add Netlify URL to backend CORS configuration

### Issue: "502 Bad Gateway on Render"
**Solution**: Check environment variables, especially DB credentials

### Issue: "Build fails on Netlify"
**Solution**: Ensure all env variables are set, check build logs

### Issue: "Database connection timeout"
**Solution**: Verify Aiven MySQL allows connections from Render IPs

### Issue: "Firebase auth not working"
**Solution**: Add production domain to Firebase authorized domains

### Issue: "Stripe checkout fails"
**Solution**: Update Stripe webhook URL to production backend

---

## 💰 Cost Estimates

### Free Tier Limits

**Netlify Free**:
- ✅ 100GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ Unlimited sites
- ✅ HTTPS included

**Render Free**:
- ✅ 750 hours/month
- ⚠️ Spins down after 15 min inactivity
- ⚠️ Cold start delay (10-30 sec)
- ✅ Automatic SSL

**Aiven MySQL Free**:
- ✅ Included in your current plan
- Check plan limits

### Upgrade Recommendations

For production site with traffic:
- **Render**: $7-25/month (Starter/Standard plan)
  - No cold starts
  - Better performance
  - More memory
- **Netlify**: $19/month (Pro plan)
  - More bandwidth
  - Better analytics
  - Password protection

---

## 📞 Support & Resources

- **Netlify Docs**: https://docs.netlify.com
- **Render Docs**: https://render.com/docs
- **Vite Deployment**: https://vitejs.dev/guide/static-deploy.html
- **Aiven Console**: https://console.aiven.io

---

## ✅ Final Checklist

Before going live:

- [ ] All environment variables set on both platforms
- [ ] CORS configured with production URLs
- [ ] Database backup created
- [ ] Firebase authorized domains updated
- [ ] Stripe webhooks updated
- [ ] Custom domain configured (if applicable)
- [ ] SSL/HTTPS enabled
- [ ] SEO meta tags verified
- [ ] Google Analytics added (if desired)
- [ ] Contact form tested
- [ ] Payment flow tested
- [ ] All pages tested
- [ ] Mobile testing complete
- [ ] Performance audit complete

---

**Ready to deploy!** 🚀

Follow the steps above in order, and you'll have your site live on Netlify and Render.
