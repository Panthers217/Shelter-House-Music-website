# Soul Felt Music 🎵

A modern music streaming platform built with React and Node.js, featuring artist management, music streaming, merchandise store, and community features.

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Backend
cd backend
npm install
npm start

# Frontend (in new terminal)
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` to see the app.

## 📦 Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Firebase Auth** - Authentication
- **Stripe** - Payments
- **React Helmet Async** - SEO
- **react-snap** - Pre-rendering

### Backend
- **Node.js & Express** - Server
- **MySQL** (Aiven) - Database
- **Firebase Admin** - Auth management
- **Cloudinary** - Media storage
- **Stripe** - Payment processing
- **Nodemailer** - Email services

## 🌐 Deployment

This project is configured for deployment to:
- **Frontend**: Netlify
- **Backend**: Render
- **Database**: Aiven MySQL

### Quick Deploy (30 minutes)

1. **Read**: `DEPLOYMENT_README.md` for overview
2. **Follow**: `QUICK_DEPLOY.md` for step-by-step guide
3. **Use**: `DEPLOYMENT_QUICK_REFERENCE.md` for copying values
4. **Track**: `DEPLOYMENT_CHECKLIST.md` for progress

### Deployment Files
- `netlify.toml` - Netlify configuration
- `render.yaml` - Render configuration
- `backend/.env.example` - Backend environment variables template
- `frontend/.env.production` - Production environment template

For detailed instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md).

## 📚 Documentation

### Setup Guides
- `docs/setup/` - Initial setup documentation
- `docs/features/` - Feature implementation guides
- `docs/seo/` - SEO optimization documentation

### Deployment
- `DEPLOYMENT_README.md` - Deployment overview
- `DEPLOYMENT_GUIDE.md` - Comprehensive deployment guide
- `DEPLOYMENT_CHECKLIST.md` - Interactive checklist
- `QUICK_DEPLOY.md` - 30-minute quick start
- `DEPLOYMENT_QUICK_REFERENCE.md` - Quick reference card

## 🎯 Features

- 🎵 Music streaming with audio player
- 👤 Artist profiles and management
- 💿 Album and track browsing
- 🛍️ Merchandise store
- 💳 Stripe payment integration
- 👥 User authentication (Firebase)
- 📧 Newsletter system
- 📅 Community events
- 🎥 Video content
- 📱 Mobile responsive design
- 🔍 SEO optimized with pre-rendering
- 📊 Admin dashboard
- 💾 Database backup system

## 🔐 Environment Variables

### Backend
See `backend/.env.example` for all required variables:
- Database credentials (Aiven MySQL)
- Firebase Admin SDK
- Stripe keys
- Cloudinary credentials
- SMTP configuration

### Frontend
See `frontend/.env.example` for all required variables:
- API URL
- Firebase client config
- Stripe public key
- Site configuration

## 📂 Project Structure

```
Soul-Felt-Music-site/
├── backend/              # Node.js/Express backend
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── scripts/         # Utility scripts
│   ├── services/        # Business logic
│   └── tests/           # Test files
├── frontend/            # React frontend
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # Page components
│   │   └── contexts/   # React contexts
│   ├── public/         # Static assets
│   └── scripts/        # Build scripts
├── database/           # Database files
│   ├── schemas/       # Table schemas
│   ├── migrations/    # Migration scripts
│   └── backups/       # Database backups
└── docs/              # Documentation
    ├── setup/         # Setup guides
    ├── features/      # Feature docs
    └── seo/          # SEO documentation
```

## 🛠️ Development

### Backend
```bash
cd backend
npm run dev  # Runs with nodemon
```

### Frontend
```bash
cd frontend
npm run dev           # Development server
npm run build         # Production build
npm run preview       # Preview production build
npm run generate-sitemap  # Generate sitemap
```

### Database Backup
```bash
cd backend
node scripts/backup-database.js
```

## 🧪 Testing

```bash
# Run health check
curl http://localhost:3001/health

# Test API endpoint
curl http://localhost:3001/api/artists
```

## 📝 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. Contact the repository owner for contribution guidelines.

---

**Built with ❤️ by the Soul Felt Music team**