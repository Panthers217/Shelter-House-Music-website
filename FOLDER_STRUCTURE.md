# 📁 Soul Felt Music - Folder Structure Guide

## 🎯 Project Overview

This document explains the organized folder structure for the Soul Felt Music website project.

---

## 📂 Root Directory Structure

```
Soul-Felt-Music-site/
├── backend/              # Node.js/Express backend server
├── frontend/             # React + Vite frontend application
├── database/             # Database schemas, migrations, and seeds
├── docs/                 # All project documentation
├── .github/              # GitHub workflows and configurations
├── .vscode/              # VS Code workspace settings
├── node_modules/         # Root dependencies
├── package.json          # Root package configuration
└── README.md             # Main project README
```

---

## 🗄️ Database Directory (`/database`)

Organized database-related files for better maintainability.

```
database/
├── schemas/              # Database schema definitions
│   ├── postgres_schema.sql
│   ├── merchandise_schema.sql
│   └── tableSchema/      # CSV exports of table structures
├── migrations/           # Database migration scripts
│   ├── add_artist_stats_columns.sql
│   ├── create_user_artist_follows_table.sql
│   ├── tracks_alter.sql
│   ├── update_artist_countries.sql
│   └── update_artist_details.sql
├── seeds/                # Initial data and seed files
│   └── init.sql/
├── Aiven .session.sql    # Database session files
└── Aiven Mysql.session.sql
```

**Purpose**:
- `schemas/` - Table structures and database design
- `migrations/` - Incremental database changes
- `seeds/` - Initial data for development/testing

---

## 📚 Documentation Directory (`/docs`)

All project documentation organized by category.

```
docs/
├── setup/                # Setup and configuration guides
│   ├── SETUP_CHECKLIST.md
│   ├── STRIPE_SETUP.md
│   ├── EMAIL_PROVIDER_SETUP.md
│   ├── SOCIAL_MEDIA_SETUP.md
│   └── MONTHLY_LISTENERS_SETUP.md
├── features/             # Feature implementation documentation
│   ├── ARTIST_STORE_IMPLEMENTATION.md
│   ├── DOWNLOAD_SYSTEM_IMPLEMENTATION.md
│   ├── EMAIL_INTEGRATION_GUIDE.md
│   ├── GENRE_MANAGEMENT_IMPLEMENTATION.md
│   ├── PURCHASE_EMAIL_IMPLEMENTATION.md
│   ├── PURCHASE_HISTORY_GUIDE.md
│   ├── PURCHASE_TRACKING_SYSTEM.md
│   ├── QUICK_START_EMAIL_TESTING.md
│   ├── SECURE_DOWNLOAD_QUICKREF.md
│   ├── SECURE_DOWNLOAD_SUMMARY.md
│   ├── SECURE_DOWNLOAD_SYSTEM.md
│   ├── SIGNUP_IMPLEMENTATION.md
│   └── TEST_SECURE_DOWNLOAD.md
└── seo/                  # SEO and pre-rendering documentation
    ├── SEO_IMPLEMENTATION.md
    ├── SEO_QUICK_REFERENCE.md
    └── PRERENDER_SSR_COMPLETE.md
```

**Quick Access**:
- New developer? Start with `docs/setup/SETUP_CHECKLIST.md`
- Implementing a feature? Check `docs/features/`
- SEO questions? See `docs/seo/SEO_QUICK_REFERENCE.md`

---

## 🔧 Backend Directory (`/backend`)

Node.js/Express server with organized structure.

```
backend/
├── config/               # Configuration files
│   ├── db.js            # Database connection
│   ├── firebaseAdmin.js # Firebase admin setup
│   ├── statsSchedule.json
│   └── Cloudinary.text  # Cloudinary configuration
├── controllers/          # Route controllers
│   ├── albumController.js
│   ├── artistController.js
│   ├── authController.js
│   ├── contactController.js
│   ├── eventController.js
│   ├── paymentController.js
│   ├── trackController.js
│   ├── cloudinaryAsyncUploadController.js
│   └── admin/           # Admin-specific controllers
├── models/               # Database models
├── routes/               # API route definitions
│   ├── admin.js
│   ├── album.js
│   ├── artist.js
│   ├── auth.js
│   ├── contact.js
│   └── ...
├── services/             # Business logic services
├── scripts/              # Utility scripts and migrations
│   ├── data/            # JSON data files
│   │   ├── artistJsonInfo.json
│   │   ├── artistSqldemo.json
│   │   ├── topTracks.json
│   │   ├── testTable2.csv
│   │   └── testTableValues.csv
│   ├── addMissingAboutColumns.js
│   ├── albumInputHandler.cjs
│   ├── checkUserTable.js
│   ├── createFollowsTable.js
│   ├── importArtistsFromJson.js
│   ├── runAboutPageMigration.js
│   ├── runMigration.js
│   ├── uploadArtistImagesToCloudinary.cjs
│   └── uploadToSql.js
├── tests/                # Test files
│   ├── test-download-proxy.js
│   ├── test-guest-download.js
│   ├── test-payment-endpoint.js
│   ├── testAlbumDbFields.cjs
│   ├── testAlbumInputHandler.cjs
│   ├── testDbConnection.js
│   └── testPurchaseSystem.js
├── temp/                 # Temporary files
├── .env                  # Environment variables (DO NOT COMMIT)
├── .gitignore
├── server.js             # Main server entry point
├── package.json
└── soul-felt-music-website-firebase-adminsdk-fbsvc-bf9a8e6d04.json
```

**Key Files**:
- `server.js` - Application entry point
- `config/db.js` - Database connection setup
- `routes/` - API endpoint definitions
- `controllers/` - Request handling logic

---

## ⚛️ Frontend Directory (`/frontend`)

React application built with Vite.

```
frontend/
├── public/               # Static assets
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/              # Build scripts
│   └── generate-sitemap.js
├── src/
│   ├── assets/          # Images, fonts, static files
│   ├── components/      # React components
│   ├── context/         # React Context providers
│   │   ├── ApiDataContext.jsx
│   │   ├── CartContext.jsx
│   │   ├── NavbarContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── FeaturesContext.jsx
│   ├── hooks/           # Custom React hooks
│   │   └── useUserLogin.js
│   ├── modals/          # Modal components
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── ArtistPage.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── OrderConfirmation.jsx
│   │   ├── SecureDownload.jsx
│   │   ├── Faq.jsx
│   │   ├── Terms.jsx
│   │   └── NotFound.jsx
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Application entry point
│   ├── firebase.js      # Firebase configuration
│   ├── index.css        # Global styles
│   └── .env             # Environment variables (DO NOT COMMIT)
├── eslint.config.js     # ESLint configuration
├── index.html           # HTML template
├── package.json
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── vite.config.js       # Vite build configuration
└── README.md
```

**Key Directories**:
- `src/components/` - Reusable UI components
- `src/pages/` - Page-level components
- `src/context/` - Global state management
- `src/hooks/` - Custom React hooks

---

## 🚀 Common Tasks

### Running the Application

```bash
# Start backend server
cd backend
npm run dev

# Start frontend dev server
cd frontend
npm run dev
```

### Building for Production

```bash
# Build frontend (includes SEO pre-rendering)
cd frontend
npm run build

# Preview production build
npm run preview
```

### Database Operations

```bash
# Run migrations
cd backend
node scripts/runMigration.js

# Import data
node scripts/importArtistsFromJson.js
```

### Running Tests

```bash
# Backend tests
cd backend/tests
node testDbConnection.js
node testPurchaseSystem.js

# Frontend (if test suite is set up)
cd frontend
npm test
```

---

## 📝 Best Practices

### Adding New Files

1. **Documentation**: Add to appropriate `docs/` subfolder
2. **Database Changes**: Add migration to `database/migrations/`
3. **Backend Scripts**: Add to `backend/scripts/`
4. **Backend Tests**: Add to `backend/tests/`
5. **Frontend Components**: Add to `frontend/src/components/`
6. **Frontend Pages**: Add to `frontend/src/pages/`

### File Naming Conventions

- **Components**: PascalCase (e.g., `MusicPlayer.jsx`)
- **Utilities**: camelCase (e.g., `formatDate.js`)
- **Configs**: lowercase with hyphens (e.g., `vite.config.js`)
- **Documentation**: UPPERCASE with underscores (e.g., `SETUP_GUIDE.md`)

### Git Ignore

Ensure these are in `.gitignore`:
- `node_modules/`
- `.env` files
- `dist/` build folders
- `temp/` temporary files
- Firebase service account JSON files

---

## 🔍 Finding Files Quickly

### Documentation
```bash
# All docs
ls docs/

# Setup guides
ls docs/setup/

# Feature docs
ls docs/features/

# SEO docs
ls docs/seo/
```

### Database
```bash
# All database files
ls database/

# Schemas
ls database/schemas/

# Migrations
ls database/migrations/
```

### Backend
```bash
# Scripts
ls backend/scripts/

# Tests
ls backend/tests/

# Controllers
ls backend/controllers/
```

---

## 🎉 Benefits of This Structure

✅ **Clear organization** - Easy to find files by purpose
✅ **Scalability** - Structure grows naturally with project
✅ **Onboarding** - New developers can navigate easily
✅ **Maintenance** - Logical grouping reduces confusion
✅ **Documentation** - Everything has a clear home
✅ **Git history** - Cleaner diffs and commits

---

## 📞 Need Help?

- Check `docs/setup/SETUP_CHECKLIST.md` for initial setup
- See `docs/seo/SEO_QUICK_REFERENCE.md` for SEO commands
- Review `README.md` for project overview
- Contact project maintainer for questions

---

**Last Updated**: November 10, 2025
**Organized By**: GitHub Copilot Assistant
