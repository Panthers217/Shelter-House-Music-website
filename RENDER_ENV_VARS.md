# 🔐 Environment Variables for Render Backend

Copy these to Render Dashboard → Environment Variables

## Required Variables:

NODE_ENV=production
PORT=3001

# Database (Aiven MySQL) - GET FROM YOUR .env FILE
DB_HOST=your-actual-aiven-host.aivencloud.com
DB_PORT=your-port
DB_USER=avnadmin
DB_PASSWORD=your-actual-password
DB_NAME=defaultdb

# Firebase Admin SDK - GET FROM YOUR .env FILE
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=your-actual-project-id
FIREBASE_PRIVATE_KEY_ID=your-actual-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-actual-key\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-actual-email@project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-actual-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=your-actual-cert-url
FIREBASE_UNIVERSE_DOMAIN=googleapis.com

# Stripe - IMPORTANT: Use LIVE keys for production!
STRIPE_SECRET_KEY=sk_live_xxxxx (or sk_test_xxxxx for testing)
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Security - Generate new secrets for production!
JWT_SECRET=your-jwt-secret
SESSION_SECRET=your-session-secret

# CORS - Will add Netlify URL after frontend deployment
FRONTEND_URL=http://localhost:5173

---

## 📝 How to Get Your Current Values:

Run this in your terminal:
```bash
cd /workspaces/Soul-Felt-Music-site/backend
cat .env
```

Then copy the actual values (not the example ones) to Render.

---

## ⚠️ Important Notes:

1. **Copy the EXACT values** from your .env file
2. For FIREBASE_PRIVATE_KEY, make sure to include the quotes and \n characters
3. Keep STRIPE keys as TEST mode initially, switch to LIVE when ready
4. We'll update FRONTEND_URL after deploying to Netlify
