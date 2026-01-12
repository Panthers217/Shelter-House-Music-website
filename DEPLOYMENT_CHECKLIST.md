# ✅ Pre-Deployment Checklist

## 🔐 Security & Credentials

- [ ] **Backup database** - Run `node backend/scripts/backup-database.js`
- [ ] **Test database restore** - Verify backup works
- [ ] **Review .env files** - Ensure no sensitive data in repository
- [ ] **Update production keys** - Use live keys for Stripe, Firebase, etc.
- [ ] **Generate secure secrets** - New JWT_SECRET and SESSION_SECRET for production
- [ ] **Test Firebase** - Verify auth works with production config

## 🎯 Backend (Render)

- [ ] **Create Render account** - Sign up at https://render.com
- [ ] **Create Web Service** - New → Web Service
- [ ] **Configure service**:
  - Name: `soul-felt-music-backend`
  - Root Directory: `backend`
  - Build Command: `npm install`
  - Start Command: `npm start`
- [ ] **Set environment variables** - Copy from backend/.env.example
  - NODE_ENV=production
  - PORT=3001
  - Database credentials (Aiven MySQL)
  - Firebase Admin SDK credentials
  - Stripe secret key (use live key)
  - Cloudinary credentials
  - SMTP email credentials
  - JWT_SECRET and SESSION_SECRET
  - FRONTEND_URL (will be Netlify URL)
- [ ] **Deploy backend** - Click "Create Web Service"
- [ ] **Test health endpoint** - Visit `https://your-backend.onrender.com/health`
- [ ] **Test API endpoints** - Test `/api/artists`, `/api/albums`, etc.
- [ ] **Note backend URL** - Copy for frontend configuration

## 🎨 Frontend (Netlify)

- [ ] **Create Netlify account** - Sign up at https://netlify.com
- [ ] **Update CORS in backend** - Add Netlify URL to allowedOrigins in server.js
- [ ] **Create .env.production** - Set production environment variables:
  - VITE_API_URL=https://your-backend.onrender.com
  - VITE_FIREBASE_API_KEY=your-key
  - VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
  - VITE_FIREBASE_PROJECT_ID=your-project-id
  - VITE_FIREBASE_STORAGE_BUCKET=your-bucket
  - VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
  - VITE_FIREBASE_APP_ID=your-app-id
  - VITE_STRIPE_PUBLIC_KEY=pk_live_xxxxx (use live key)
  - VITE_SITE_URL=https://your-site.netlify.app
  - VITE_SITE_NAME=Soul Felt Music
- [ ] **Test build locally** - Run `npm run build` in frontend folder
- [ ] **Test preview locally** - Run `npm run preview` and test site
- [ ] **Import project to Netlify** - Add new site → Import from Git
- [ ] **Configure build settings**:
  - Base directory: `frontend`
  - Build command: `npm run build`
  - Publish directory: `frontend/dist`
- [ ] **Add environment variables** - In Netlify dashboard → Site settings → Environment variables
- [ ] **Deploy site** - Click "Deploy site"
- [ ] **Test frontend** - Visit your-site.netlify.app
- [ ] **Verify API calls work** - Check if frontend can call backend

## 🔄 Cross-Platform Testing

- [ ] **CORS working** - Frontend can call backend APIs
- [ ] **Authentication working** - Test signup/login
- [ ] **Database connection** - Data loads properly
- [ ] **File uploads** - Test Cloudinary integration
- [ ] **Email sending** - Test contact form
- [ ] **Stripe payments** - Test checkout flow (use test mode first!)
- [ ] **SEO meta tags** - View source, check meta tags present
- [ ] **Pre-rendering** - Check if initial HTML has content
- [ ] **Mobile responsive** - Test on various devices
- [ ] **Performance** - Run Lighthouse audit

## 🌐 Domain & DNS (Optional)

- [ ] **Purchase domain** - If using custom domain
- [ ] **Configure Netlify DNS** - Add custom domain in Netlify
- [ ] **Update DNS records** - Point domain to Netlify
- [ ] **Enable HTTPS** - Automatic with Netlify
- [ ] **Update environment variables** - Change VITE_SITE_URL to custom domain
- [ ] **Update CORS** - Add custom domain to backend allowedOrigins
- [ ] **Update Firebase** - Add custom domain to authorized domains
- [ ] **Update Stripe** - Update webhook URLs and authorized domains

## 📊 Monitoring & Analytics

- [ ] **Set up error monitoring** - Sentry, LogRocket, or similar
- [ ] **Enable Netlify Analytics** - If using paid plan
- [ ] **Monitor Render logs** - Check for errors
- [ ] **Set up uptime monitoring** - UptimeRobot, Pingdom, etc.
- [ ] **Google Analytics** - Add tracking code if desired
- [ ] **Google Search Console** - Submit sitemap

## 🛡️ Security Hardening

- [ ] **Rate limiting** - Consider adding rate limiting middleware
- [ ] **Input validation** - Verify all inputs are validated
- [ ] **SQL injection protection** - Using parameterized queries
- [ ] **XSS protection** - Headers configured
- [ ] **HTTPS enforced** - Redirect HTTP to HTTPS
- [ ] **Security headers** - CSP, X-Frame-Options, etc.
- [ ] **Dependency audit** - Run `npm audit` and fix vulnerabilities

## 📝 Documentation

- [ ] **Update README** - Add deployment info
- [ ] **Document environment variables** - List all required vars
- [ ] **API documentation** - Document endpoints if needed
- [ ] **Backup procedures** - Document how to backup/restore
- [ ] **Troubleshooting guide** - Common issues and solutions

## 🚀 Final Steps

- [ ] **Create backup before launch** - Final database backup
- [ ] **Announce maintenance** - If replacing existing site
- [ ] **Switch DNS** - Point domain to new site
- [ ] **Monitor for 24 hours** - Watch for errors
- [ ] **Test all features** - Comprehensive testing
- [ ] **Celebrate! 🎉** - You've deployed successfully!

---

## 📞 Support Resources

- **Netlify Status**: https://www.netlifystatus.com/
- **Render Status**: https://status.render.com/
- **Aiven Status**: https://status.aiven.io/

## 🔧 Useful Commands

```bash
# Test backend locally
cd backend
npm start

# Test frontend locally
cd frontend
npm run dev

# Build frontend for production
cd frontend
npm run build
npm run preview

# Backup database
cd backend
node scripts/backup-database.js

# Check for vulnerabilities
npm audit
npm audit fix
```

---

**Remember**: Test everything in a staging environment before going live!
