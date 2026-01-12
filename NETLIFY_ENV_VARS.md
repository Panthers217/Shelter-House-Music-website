# 🎨 Environment Variables for Netlify Frontend

Copy these to Netlify Dashboard → Site settings → Environment variables

## Required Variables:

# API Configuration - UPDATE THIS AFTER BACKEND DEPLOYS!
VITE_API_URL=https://your-backend-name.onrender.com

# Firebase Client Configuration
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:xxxxx

# Stripe Public Key
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxx (or pk_live_xxxxx for production)

# Site Configuration - UPDATE AFTER DEPLOYMENT!
VITE_SITE_URL=https://your-site-name.netlify.app
VITE_SITE_NAME=Soul Felt Music

# Optional
VITE_UNSPLASH_ACCESS_KEY=your-unsplash-key (if you use it)

---

## 📝 How to Find Your Firebase Config:

1. Go to Firebase Console: https://console.firebase.google.com
2. Select your project
3. Click the gear icon → Project settings
4. Scroll down to "Your apps"
5. Find your web app or create one
6. Copy the config values

---

## 🔑 How to Get Stripe Public Key:

1. Go to Stripe Dashboard: https://dashboard.stripe.com
2. Click "Developers" → "API keys"
3. Copy the "Publishable key" (starts with pk_)
4. Use TEST key initially (pk_test_), switch to LIVE (pk_live_) when ready

---

## ⚠️ Important:

- VITE_API_URL: Use the Render backend URL (you'll get this after backend deploys)
- VITE_SITE_URL: Use the Netlify URL (you'll get this after frontend deploys)
- All VITE_ variables are exposed to the browser (don't put secrets here!)
