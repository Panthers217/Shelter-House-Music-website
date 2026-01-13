# Local Database Development Guide

## Overview

For **local development**, we use a Docker Compose MySQL database instead of Aiven. This allows developers to work with a local, fast, and free database that can be easily reset and seeded with demo data.

**Aiven is only used for reference/backup, not active development.**

---

## Quick Start

### 1. Start the Local Database

```bash
./scripts/db-up.sh
```

This will:
- Start a MySQL 8.0 container via Docker Compose
- Create a database named `shelterhouse_dev`
- Expose MySQL on port 3306
- Wait until the database is ready

### 2. Seed the Database

```bash
./scripts/db-seed.sh
```

This will:
- Import all demo data from `database/seed_shelterhouse.sql`
- Create artists, albums, tracks, and other demo content
- Make the database ready for testing

### 3. Configure Your Backend

Update `backend/.env` with these values (or copy from `backend/.env.example`):

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=shelter_dev
DB_PASSWORD=shelter_dev_pass
DB_NAME=shelterhouse_dev
```

### 4. Start the Application

```bash
# Terminal 1: Start backend
cd backend
npm install
npm start

# Terminal 2: Start frontend
cd frontend
npm install
npm run dev
```

---

## Database Management Scripts

### Start Database
```bash
./scripts/db-up.sh
```
Starts the MySQL container and waits for it to be ready.

### Seed Database
```bash
./scripts/db-seed.sh
```
Imports `seed_shelterhouse.sql` into the local database. Safe to run multiple times (uses UPDATE statements).

### Reset Database
```bash
./scripts/db-reset.sh
```
**⚠️ WARNING:** Drops and recreates the entire database, then re-imports seed data. All local changes will be lost.

### Stop Database
```bash
docker-compose down
```
Stops the MySQL container. Data is preserved in a Docker volume.

### Stop & Remove Data
```bash
docker-compose down -v
```
Stops the MySQL container AND removes all data. Use with caution!

---

## Connection Details

| Setting | Value |
|---------|-------|
| **Host** | `localhost` |
| **Port** | `3306` |
| **Database** | `shelterhouse_dev` |
| **User** | `shelter_dev` |
| **Password** | `shelter_dev_pass` |
| **Root Password** | `shelter_root_pass` |

---

## Troubleshooting

### Port 3306 Already in Use

If you have another MySQL instance running on port 3306, you can change the port in `docker-compose.yml`:

```yaml
ports:
  - "3307:3306"  # Change 3306 to 3307 on the left side only
```

Then update your `.env` file:
```env
DB_PORT=3307
```

### Database Won't Start

Check Docker logs:
```bash
docker-compose logs mysql
```

### Seed Script Fails

Make sure the database is running first:
```bash
./scripts/db-up.sh
```

---

## Production Database Workflow

### Current State (Development)
- Use local Docker MySQL for all development work
- Aiven is **reference only** (not actively used)

### Future State (Production Ready)

When ready to deploy to production:

1. **Create a NEW production database** (separate provider, not Aiven)
2. **Run migrations** to create the schema
3. **Seed ONCE** using `seed_shelterhouse.sql`
4. **Production seeding is a ONE-TIME setup**, not part of regular deployments

**Important:** 
- Never run seed scripts on production after initial setup
- Use migrations for schema changes
- Keep production and development databases separate
- Aiven can remain as a backup/reference but won't be used for production

---

## Database Files Reference

| File | Purpose |
|------|---------|
| `database/seed_shelterhouse.sql` | Main seed data for Shelter House Music branding |
| `database/rollback_soulfelt.sql` | Rollback to previous SoulFelt Music branding |
| `docker-compose.yml` | Local MySQL container configuration |
| `scripts/db-up.sh` | Start local database |
| `scripts/db-seed.sh` | Import seed data |
| `scripts/db-reset.sh` | Drop, recreate, and re-seed database |

---

## Tips

- **Reset often:** Use `./scripts/db-reset.sh` to ensure a clean state when testing
- **Check logs:** Use `docker-compose logs -f mysql` to monitor the database
- **Backup local work:** If you add test data locally, export it before resetting
- **Connect with MySQL client:** You can connect with any MySQL client using the credentials above

---

## Need Help?

- Check Docker is running: `docker ps`
- Check database health: `docker-compose ps`
- View logs: `docker-compose logs mysql`
- Restart everything: `docker-compose restart`
