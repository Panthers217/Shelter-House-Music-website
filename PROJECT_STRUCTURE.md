# 📁 Soul Felt Music - Project Structure

## 📊 Complete Folder Structure Diagram

```
Soul-Felt-Music-site/
│
├── 📂 backend/                          # Node.js/Express Backend
│   ├── 📂 config/                       # Configuration files
│   │   ├── db.js                        # MySQL database connection
│   │   ├── firebaseAdmin.js             # Firebase Admin SDK setup
│   │   ├── Cloudinary.text              # Cloudinary config notes
│   │   └── statsSchedule.json           # Scheduled stats config
│   │
│   ├── 📂 controllers/                  # Business logic layer
│   │   ├── 📂 admin/                    # Admin-specific controllers
│   │   ├── albumController.js           # Album CRUD operations
│   │   ├── artistController.js          # Artist CRUD operations
│   │   ├── authController.js            # Authentication logic
│   │   ├── cloudinaryAsyncUploadController.js  # Media uploads
│   │   ├── contactController.js         # Contact form handling
│   │   ├── eventController.js           # Events management
│   │   ├── paymentController.js         # Stripe payment processing
│   │   └── trackController.js           # Track CRUD operations
│   │
│   ├── 📂 routes/                       # API endpoint definitions
│   │   ├── admin.js                     # Admin dashboard routes
│   │   ├── album.js                     # Album API routes
│   │   ├── artist.js                    # Artist API routes
│   │   ├── auth.js                      # Authentication routes
│   │   ├── contact.js                   # Contact form routes
│   │   ├── downloads.js                 # Secure download routes
│   │   ├── events.js                    # Events routes
│   │   ├── faq.js                       # FAQ routes
│   │   ├── follow.js                    # Artist follow system
│   │   ├── genre.js                     # Genre management
│   │   ├── newsletter.js                # Newsletter subscription
│   │   ├── newsletter-campaigns.js      # Email campaigns
│   │   ├── payments.js                  # Payment processing routes
│   │   ├── purchase-history.js          # Order history routes
│   │   ├── settings.js                  # Website settings API
│   │   ├── statsSchedule.js             # Stats automation routes
│   │   └── track.js                     # Track API routes
│   │
│   ├── 📂 models/                       # Database models (if using ORM)
│   │
│   ├── 📂 services/                     # External service integrations
│   │   └── emailService.js              # Nodemailer email service
│   │
│   ├── 📂 scripts/                      # Database migration & utility scripts
│   │   ├── add_about_page_columns.sql   # SQL migrations
│   │   ├── add_email_settings.sql       # Email config migration
│   │   ├── create_faqs_table.sql        # FAQ table creation
│   │   ├── addExternalStatsColumns.js   # Stats schema updates
│   │   ├── backup-database.js           # DB backup script
│   │   └── [50+ migration scripts]      # Various SQL migrations
│   │
│   ├── 📂 tests/                        # Backend unit/integration tests
│   │
│   ├── 📂 temp/                         # Temporary file storage
│   │
│   ├── 📂 docs/                         # Backend documentation
│   │   └── deployment/                  # Deployment guides
│   │
│   ├── .env                             # Environment variables (gitignored)
│   ├── .env.example                     # Environment template
│   ├── .gitignore                       # Git ignore rules
│   ├── server.js                        # Main Express server entry point
│   ├── package.json                     # Node dependencies & scripts
│   ├── Procfile                         # Render deployment config
│   └── soul-felt-music-website-firebase-adminsdk-*.json  # Firebase service account
│
│
├── 📂 frontend/                         # React 19 + Vite Frontend
│   ├── 📂 src/                          # Source code
│   │   │
│   │   ├── 📂 components/               # Reusable React components
│   │   │   ├── 📂 adminComponents/      # Admin dashboard components
│   │   │   │   ├── UploadNewArtist.jsx  # Artist upload form
│   │   │   │   ├── NewsletterCampaigns.jsx  # Email campaign manager
│   │   │   │   ├── FaqManagement.jsx    # FAQ editor
│   │   │   │   └── [Other admin components]
│   │   │   │
│   │   │   ├── AdminDashboard.jsx       # Main admin panel
│   │   │   ├── AdminLogin.jsx           # Admin authentication
│   │   │   ├── AdminSqlViewer.jsx       # Database viewer
│   │   │   ├── NavBar.jsx               # Desktop navigation
│   │   │   ├── ResponsiveNavbar.jsx     # Responsive nav system
│   │   │   ├── Footer.jsx               # Site footer
│   │   │   ├── Contact.jsx              # Contact form
│   │   │   ├── Artist.jsx               # Artist card component
│   │   │   ├── ArtistOverview.jsx       # Artist detail page
│   │   │   ├── ArtistStore.jsx          # Artist-specific store
│   │   │   ├── Music.jsx                # Music library component
│   │   │   ├── Videos.jsx               # Video gallery
│   │   │   ├── Community.jsx            # Community features
│   │   │   ├── Store.jsx                # Main store component
│   │   │   ├── About.jsx                # About page
│   │   │   ├── News.jsx                 # News feed
│   │   │   ├── PurchaseHistory.jsx      # Order history
│   │   │   ├── SignUp.jsx               # User registration
│   │   │   ├── Login.jsx                # User login
│   │   │   ├── SearchBar.jsx            # Search functionality
│   │   │   ├── ScrollToTop.jsx          # Scroll utility
│   │   │   ├── ThemeDemo.jsx            # Theme customization demo
│   │   │   ├── ProjectWalkthroughVideo.jsx  # Video walkthrough modal
│   │   │   └── ZoomFit.jsx              # Responsive zoom utility
│   │   │
│   │   ├── 📂 pages/                    # Full page components
│   │   │   ├── Home.jsx                 # Homepage
│   │   │   ├── ArtistPage.jsx           # Artist listing page
│   │   │   ├── Cart.jsx                 # Shopping cart
│   │   │   ├── Checkout.jsx             # Stripe checkout
│   │   │   ├── OrderConfirmation.jsx    # Order success page
│   │   │   ├── SecureDownload.jsx       # Protected download page
│   │   │   ├── Faq.jsx                  # FAQ page
│   │   │   ├── Terms.jsx                # Terms & conditions
│   │   │   └── NotFound.jsx             # 404 page
│   │   │
│   │   ├── 📂 context/                  # React Context API
│   │   │   ├── ApiDataContext.jsx       # Global data state
│   │   │   ├── CartContext.jsx          # Shopping cart state
│   │   │   ├── FeaturesContext.jsx      # Feature flags
│   │   │   └── NavbarContext.jsx        # Navbar state
│   │   │
│   │   ├── 📂 hooks/                    # Custom React hooks
│   │   │   ├── useUserLogin.js          # Authentication hook
│   │   │   └── [Other custom hooks]
│   │   │
│   │   ├── 📂 modals/                   # Modal components
│   │   │   └── [Modal dialogs]
│   │   │
│   │   ├── 📂 utils/                    # Utility functions
│   │   │   └── [Helper functions]
│   │   │
│   │   ├── 📂 assets/                   # Static assets
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   └── fonts/
│   │   │
│   │   ├── App.jsx                      # Main app component
│   │   ├── App.css                      # App-level styles
│   │   ├── main.jsx                     # React entry point
│   │   ├── index.css                    # Global styles
│   │   └── firebase.js                  # Firebase client config
│   │
│   ├── 📂 public/                       # Public static files
│   │   ├── favicon.ico
│   │   └── [Other public assets]
│   │
│   ├── 📂 scripts/                      # Build/utility scripts
│   │   └── generate-sitemap.js          # SEO sitemap generator
│   │
│   ├── 📂 dist/                         # Production build output (gitignored)
│   │
│   ├── .env                             # Frontend env variables (gitignored)
│   ├── .env.example                     # Environment template
│   ├── .env.production                  # Production env config
│   ├── .gitignore                       # Git ignore rules
│   ├── .npmrc                           # NPM configuration
│   ├── index.html                       # HTML entry point
│   ├── package.json                     # Frontend dependencies
│   ├── vite.config.js                   # Vite bundler config
│   ├── tailwind.config.js               # Tailwind CSS config
│   ├── postcss.config.js                # PostCSS config
│   ├── eslint.config.js                 # ESLint rules
│   ├── DEMO_BANNER_GUIDE.md             # Demo banner docs
│   └── README.md                        # Frontend documentation
│
│
├── 📂 database/                         # Database management
│   ├── 📂 schemas/                      # Database schema definitions
│   │   ├── users.sql                    # Users table schema
│   │   ├── artists.sql                  # Artists table
│   │   ├── albums.sql                   # Albums table
│   │   ├── tracks.sql                   # Tracks table
│   │   ├── purchases.sql                # Purchases/orders table
│   │   └── [Other table schemas]
│   │
│   ├── 📂 migrations/                   # Database migrations
│   │   ├── 001_initial_setup.sql
│   │   ├── 002_add_newsletter.sql
│   │   └── [Numbered migrations]
│   │
│   ├── 📂 seeds/                        # Sample/test data
│   │   ├── artists_seed.sql
│   │   ├── albums_seed.sql
│   │   └── [Other seed files]
│   │
│   ├── 📂 backups/                      # Database backups (gitignored)
│   │   └── [Automated backups]
│   │
│   ├── Aiven Mysql.session.sql          # Aiven connection session
│   └── BACKUP_RESTORE_GUIDE.md          # Backup documentation
│
│
├── 📂 docs/                             # Project documentation
│   ├── 📂 features/                     # Feature documentation
│   ├── 📂 seo/                          # SEO guides
│   └── 📂 setup/                        # Setup instructions
│
│
├── 📂 .github/                          # GitHub configuration
│   └── workflows/                       # GitHub Actions CI/CD
│       └── [Deployment workflows]
│
│
├── 📂 .vscode/                          # VS Code workspace settings
│   ├── settings.json                    # Editor settings
│   └── extensions.json                  # Recommended extensions
│
│
├── 📄 Root Configuration Files
│   ├── .gitignore                       # Global git ignore
│   ├── package.json                     # Root package (workspace)
│   ├── netlify.toml                     # Netlify deployment config
│   ├── render.yaml                      # Render backend deployment
│   ├── README.md                        # Main project documentation
│   │
│   ├── 📄 Deployment Guides
│   ├── DEPLOYMENT_GUIDE.md              # Comprehensive deployment guide
│   ├── DEPLOYMENT_CHECKLIST.md          # Pre-deployment checklist
│   ├── DEPLOYMENT_WALKTHROUGH.md        # Step-by-step walkthrough
│   ├── DEPLOYMENT_QUICK_REFERENCE.md    # Quick reference
│   ├── DEPLOYMENT_README.md             # Deployment overview
│   ├── QUICK_DEPLOY.md                  # Fast deployment guide
│   ├── DEPLOYMENT_FILES.md              # File configuration guide
│   ├── NETLIFY_ENV_VARS.md              # Netlify environment variables
│   ├── RENDER_ENV_VARS.md               # Render environment variables
│   │
│   ├── 📄 Project Documentation
│   ├── FOLDER_STRUCTURE.md              # Old structure documentation
│   ├── PROJECT_STRUCTURE.md             # This file (new)
│   ├── CLEANUP_COMPLETE.md              # Code cleanup log
│   │
│   └── 📄 Video Tutorial Guides
│       ├── VIDEO_TUTORIAL_SCRIPT.md     # Full video script
│       ├── VIDEO_RECORDING_ACTIONS.md   # Step-by-step action list
│       ├── VIDEO_PRESENTATION_SLIDES.md # Presentation outline
│       └── PROJECT_WALKTHROUGH_VIDEO_SETUP.md  # Video setup guide
│
└── 📂 node_modules/                     # Dependencies (gitignored)
```

---

## 🏗️ Architecture Overview

### **Backend Architecture (MVC Pattern)**
```
Request Flow:
Client → Routes → Controllers → Services → Database
                    ↓
                 Response
```

### **Frontend Architecture (Component-Based)**
```
User Interaction → Components → Context API → API Calls → Backend
                                    ↓
                               Local State
```

---

## 🔑 Key Directories Explained

### **Backend (`/backend`)**
| Directory | Purpose | Key Files |
|-----------|---------|-----------|
| `config/` | Database & service configuration | `db.js`, `firebaseAdmin.js` |
| `controllers/` | Business logic for each feature | `*Controller.js` files |
| `routes/` | API endpoint definitions | `*.js` route files |
| `services/` | External integrations | `emailService.js` |
| `scripts/` | Database migrations & utilities | SQL & JS migration files |

### **Frontend (`/frontend/src`)**
| Directory | Purpose | Key Files |
|-----------|---------|-----------|
| `components/` | Reusable UI components | `NavBar.jsx`, `Footer.jsx`, etc. |
| `pages/` | Full page layouts | `Home.jsx`, `Cart.jsx`, etc. |
| `context/` | Global state management | `ApiDataContext.jsx`, `CartContext.jsx` |
| `hooks/` | Custom React hooks | `useUserLogin.js` |
| `utils/` | Helper functions | Utility functions |

### **Database (`/database`)**
| Directory | Purpose | Contents |
|-----------|---------|----------|
| `schemas/` | Table structure definitions | SQL CREATE TABLE statements |
| `migrations/` | Database version control | Numbered SQL migration files |
| `seeds/` | Test/sample data | SQL INSERT statements |
| `backups/` | Automated backups | Database dump files |

---

## 🛠️ Technology Stack by Directory

### **Backend Stack**
```
backend/
├── Node.js (Runtime)
├── Express.js (Server framework)
├── MySQL (Database - Aiven hosted)
├── Firebase Admin SDK (Authentication)
├── Stripe API (Payments)
├── Cloudinary SDK (Media storage)
├── Nodemailer (Email service)
└── Node-cron (Scheduled tasks)
```

### **Frontend Stack**
```
frontend/
├── React 19 (UI framework)
├── Vite (Build tool)
├── Tailwind CSS (Styling)
├── React Router (Navigation)
├── Context API (State management)
├── Firebase Auth (User authentication)
├── Stripe Elements (Payment UI)
└── Axios (HTTP client)
```

---

## 📊 File Count Summary

| Category | Count | Description |
|----------|-------|-------------|
| **Backend Routes** | 18 | API endpoint files |
| **Backend Controllers** | 8+ | Business logic files |
| **Frontend Components** | 30+ | React components |
| **Frontend Pages** | 10+ | Full page layouts |
| **Context Providers** | 4 | Global state managers |
| **Database Schemas** | 15+ | Table definitions |
| **Migration Scripts** | 50+ | Database migrations |
| **Documentation Files** | 15+ | Guides & READMEs |

---

## 🚀 Entry Points

### **Development**
```bash
# Backend entry point
backend/server.js         # Port 5001

# Frontend entry point
frontend/src/main.jsx     # Port 5173
```

### **Production**
```bash
# Backend (Render)
backend/server.js         # Deployed on Render

# Frontend (Netlify)
frontend/dist/            # Built static files
```

---

## 🔐 Environment Files

### **Backend `.env`**
```
Database credentials (Aiven)
Firebase Admin SDK credentials
Stripe secret key
Cloudinary credentials
Email service (Gmail/SendGrid)
JWT secret
```

### **Frontend `.env`**
```
VITE_API_URL
VITE_FIREBASE_* (Firebase client config)
VITE_STRIPE_PUBLISHABLE_KEY
VITE_UNSPLASH_ACCESS_KEY
```

---

## 📈 Scalability Structure

### **Current Structure Supports:**
✅ Modular component architecture  
✅ Separation of concerns (MVC)  
✅ Easy feature additions  
✅ Environment-based configuration  
✅ Database versioning with migrations  
✅ Multiple deployment environments  

### **Easy to Add:**
- New API endpoints → Add route + controller
- New pages → Add component in `/pages`
- New features → Add context provider
- Database changes → Create migration script
- New admin features → Add to `/adminComponents`

---

## 🎯 Navigation Cheat Sheet

### **Finding Specific Code:**
| Looking for... | Navigate to... |
|----------------|----------------|
| API endpoints | `backend/routes/*.js` |
| Business logic | `backend/controllers/*Controller.js` |
| Database queries | Controllers or `backend/models/` |
| React components | `frontend/src/components/*.jsx` |
| Full pages | `frontend/src/pages/*.jsx` |
| Global state | `frontend/src/context/*Context.jsx` |
| Database schema | `database/schemas/*.sql` |
| Configuration | `backend/config/*.js` |
| Authentication | `backend/routes/auth.js` or `authController.js` |
| Admin panel | `frontend/src/components/adminComponents/` |

---

## 📝 Notes

- **All sensitive files** (`.env`, `node_modules`, `dist`, `backups`) are gitignored
- **Firebase service account key** should be kept secure and never committed
- **Database migrations** are numbered sequentially for version control
- **Frontend uses absolute imports** for cleaner import statements
- **Backend uses CommonJS** (`require`) or ES Modules (`import`)

---

## 🎓 For Employers

This structure demonstrates:

✅ **Professional Organization**: Clear separation of concerns  
✅ **Scalability**: Easy to extend and maintain  
✅ **Best Practices**: MVC pattern, component-based architecture  
✅ **Production-Ready**: Environment configs, deployment files  
✅ **Documentation**: Comprehensive guides and READMEs  
✅ **Version Control**: Database migrations, Git workflow  
✅ **Security**: Environment variables, authentication middleware  

---

**Last Updated**: November 24, 2025  
**Project**: Soul Felt Music - Full-Stack Music Platform  
**Developer**: [Your Name]
