# Database Quick Reference Card

## 🚀 Quick Start

```bash
./scripts/db-up.sh    # Start database
./scripts/db-seed.sh  # Import data
cd backend && npm start
```

## 📋 Commands

| Command | What It Does |
|---------|--------------|
| `./scripts/db-up.sh` | Start MySQL container & wait for ready |
| `./scripts/db-seed.sh` | Import schema + seed data |
| `./scripts/db-reset.sh` | Drop, recreate, re-seed (⚠️ destructive) |
| `docker-compose down` | Stop database (keeps data) |
| `docker-compose down -v` | Stop + delete all data |
| `docker-compose logs mysql` | View database logs |
| `docker-compose ps` | Check container status |

## 🔌 Connection Info

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=shelter_dev
DB_PASSWORD=shelter_dev_pass
DB_NAME=shelterhouse_dev
```

## 🛠️ Common Tasks

### Connect with MySQL CLI
```bash
docker-compose exec mysql mysql -u shelter_dev -pshelter_dev_pass shelterhouse_dev
```

### Run SQL Query
```bash
docker-compose exec -T mysql mysql -u shelter_dev -pshelter_dev_pass shelterhouse_dev -e "SELECT * FROM artists LIMIT 5;"
```

### Backup Database
```bash
docker-compose exec -T mysql mysqldump -u root -pshelter_root_pass shelterhouse_dev > backup_$(date +%Y%m%d).sql
```

### Check Database Size
```bash
docker-compose exec -T mysql mysql -u shelter_dev -pshelter_dev_pass shelterhouse_dev -e "SELECT table_schema AS 'Database', ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS 'Size (MB)' FROM information_schema.tables WHERE table_schema='shelterhouse_dev' GROUP BY table_schema;"
```

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 3306 in use | Edit `docker-compose.yml`: change `3306:3306` to `3307:3306`, update `.env` with `DB_PORT=3307` |
| Container won't start | `docker-compose logs mysql` |
| Connection refused | `docker-compose ps` to check status, then `./scripts/db-up.sh` |
| Seed fails | `./scripts/db-reset.sh` |
| Data corrupted | `./scripts/db-reset.sh` |
| Out of disk space | `docker system prune -a --volumes` (⚠️ removes ALL unused Docker data) |

## 📁 Key Files

| File | Purpose |
|------|---------|
| `docker-compose.yml` | Container configuration |
| `aiven_dump.sql` | Database schema (backup reference) |
| `database/seed_shelterhouse.sql` | Demo/test data |
| `backend/.env` | Database connection config |
| `backend/.env.example` | Configuration template |

## ⚠️ Important Notes

- **Aiven is reference only** - Don't use for active development
- **Reset often** - Use `db-reset.sh` to ensure clean state
- **Don't commit `.env`** - It contains credentials
- **Data is persistent** - Stored in Docker volume `shelterhouse_mysql_data`
- **Production seeding is ONE-TIME** - Never run seed scripts on production after initial setup

## 📚 Full Documentation

- **Complete Guide:** [database/LOCAL_DATABASE_GUIDE.md](database/LOCAL_DATABASE_GUIDE.md)
- **Setup Summary:** [database/LOCAL_DATABASE_SETUP_COMPLETE.md](database/LOCAL_DATABASE_SETUP_COMPLETE.md)
- **Project Overview:** [README.md](README.md)

---

**Status:** ✅ Local database ready for development
