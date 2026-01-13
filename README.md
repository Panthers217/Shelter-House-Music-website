# Shelter House Music Website

A full-stack music label website built with React (frontend) and Node.js/Express (backend), featuring artist profiles, music streaming, events, and e-commerce capabilities.

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 16+ and npm
- Docker and Docker Compose
- Git

### 1. Clone and Install

```bash
git clone <repository-url>
cd Shelter-House-Music-website
```

### 2. Start Local Database

```bash
# Start MySQL container
./scripts/db-up.sh

# Import seed data
./scripts/db-seed.sh
```

See [database/LOCAL_DATABASE_GUIDE.md](database/LOCAL_DATABASE_GUIDE.md) for complete database documentation.

### 3. Configure Backend

```bash
cd backend
cp .env.example .env
# Edit .env with your credentials (database defaults are already configured)
npm install
```

### 4. Configure Frontend

```bash
cd frontend
cp .env.example .env
# Edit .env with your backend URL
npm install
```

### 5. Run the Application

```bash
# Terminal 1: Backend (from /backend)
npm start

# Terminal 2: Frontend (from /frontend)
npm run dev
```

Frontend will be available at `http://localhost:5173`  
Backend API at `http://localhost:3001`

---

## 📁 Project Structure

```
Shelter-House-Music-website/
├── backend/           # Express.js API server
├── frontend/          # React + Vite frontend
├── database/          # SQL schemas, seeds, and migrations
├── scripts/           # Database and deployment scripts
├── docs/              # Additional documentation
└── docker-compose.yml # Local MySQL database
```

---

## 🗄️ Database Management

| Command | Description |
|---------|-------------|
| `./scripts/db-up.sh` | Start local MySQL database |
| `./scripts/db-seed.sh` | Import seed data |
| `./scripts/db-reset.sh` | Reset database to clean state |
| `docker-compose down` | Stop database (keeps data) |

**Full guide:** [database/LOCAL_DATABASE_GUIDE.md](database/LOCAL_DATABASE_GUIDE.md)

---

## 📚 Documentation

- **Database Setup:** [database/LOCAL_DATABASE_GUIDE.md](database/LOCAL_DATABASE_GUIDE.md)
- **Deployment:** [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- **Project Structure:** [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)
- **Environment Variables:**
  - Backend: [RENDER_ENV_VARS.md](RENDER_ENV_VARS.md)
  - Frontend: [NETLIFY_ENV_VARS.md](NETLIFY_ENV_VARS.md)

---

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite
- TailwindCSS
- React Router

**Backend:**
- Node.js + Express
- MySQL 8.0
- Firebase Admin (Authentication)
- Stripe (Payments)
- Cloudinary (Media Storage)

**Development:**
- Docker Compose (Local Database)
- ESLint + Prettier

---

## 🚢 Deployment

**Backend:** Render.com  
**Frontend:** Netlify  
**Database:** Local (dev) → Production provider (TBD)

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for complete deployment instructions.

---

## 🔐 Environment Variables

### Backend (.env)
Required variables are documented in [backend/.env.example](backend/.env.example)

Key variables:
- `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` - Database connection
- Firebase credentials
- Stripe keys
- Cloudinary credentials

### Frontend (.env)
Required variables are documented in [frontend/.env.example](frontend/.env.example)

---

## 🧪 Development Notes

- **Local development uses Docker MySQL** - Aiven is reference only
- **Seed data is idempotent** - Safe to run multiple times
- **Use `db-reset.sh` often** - Keep a clean database state
- **Never commit `.env` files** - Use `.env.example` templates

---

## 📞 Support

For questions or issues:
1. Check documentation in `/docs` and `/database` folders
2. Review deployment guides
3. Check Docker logs: `docker-compose logs mysql`

---

## License

[Add your license here]
