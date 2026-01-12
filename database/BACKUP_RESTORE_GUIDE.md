# 🗄️ Database Backup & Restore Scripts

## 📋 Overview

These scripts allow you to backup and restore your Aiven PostgreSQL database with schema and data.

## 🚀 Quick Start

### Backup Database

```bash
cd backend
node scripts/backup-database.js
```

**What it does:**
- ✅ Exports all table structures (CREATE TABLE statements)
- ✅ Exports all data (INSERT statements)
- ✅ Exports sequences with current values
- ✅ Includes primary keys and foreign keys
- ✅ Creates timestamped backup file

**Output:**
- File location: `database/backups/aiven_backup_YYYY-MM-DDTHH-MM-SS.sql`
- Format: Plain SQL file (readable and editable)

### Restore Database

```bash
cd backend
node scripts/restore-database.js ../database/backups/aiven_backup_2025-11-10T14-30-00.sql
```

**What it does:**
- ⚠️ **WARNING:** Drops existing tables
- ✅ Recreates table structures
- ✅ Restores all data
- ✅ Resets sequences
- 5-second delay before execution (gives you time to cancel)

## 📁 Backup File Structure

```sql
-- Header with metadata
SET client_encoding = 'UTF8';

-- Table: users
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id integer NOT NULL,
    email character varying(255),
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- Data for users
INSERT INTO users (id, email, created_at) VALUES (1, 'user@example.com', '2025-01-01 00:00:00');
INSERT INTO users (id, email, created_at) VALUES (2, 'admin@example.com', '2025-01-02 00:00:00');

-- Sequences
SELECT setval('users_id_seq', 2, true);
```

## ⚙️ Configuration

The scripts use your existing database configuration from `config/db.js`. No additional setup required!

## 🔧 Advanced Usage

### Backup Specific Tables

Edit `backup-database.js` and modify the query:

```javascript
const tablesResult = await pool.query(`
  SELECT tablename 
  FROM pg_tables 
  WHERE schemaname = 'public'
    AND tablename IN ('users', 'artists', 'albums')  -- Add this line
  ORDER BY tablename
`);
```

### Scheduled Backups

Add to your crontab (Unix/Linux/Mac):

```bash
# Backup every day at 2 AM
0 2 * * * cd /path/to/project/backend && node scripts/backup-database.js
```

Or use Node's `node-cron` in your server:

```javascript
const cron = require('node-cron');
const { exec } = require('child_process');

// Backup every day at 2 AM
cron.schedule('0 2 * * *', () => {
  exec('node scripts/backup-database.js', (error, stdout) => {
    if (error) {
      console.error('Backup failed:', error);
    } else {
      console.log(stdout);
    }
  });
});
```

## 📊 What Gets Backed Up

| Item | Backed Up | Notes |
|------|-----------|-------|
| Tables | ✅ | All public schema tables |
| Columns | ✅ | With data types and constraints |
| Data | ✅ | All rows from all tables |
| Primary Keys | ✅ | Included in CREATE TABLE |
| Foreign Keys | ✅ | As ALTER TABLE statements |
| Sequences | ✅ | With current values |
| Indexes | ⚠️ | Only PK indexes (can be extended) |
| Views | ❌ | Not included (can be extended) |
| Functions | ❌ | Not included (can be extended) |
| Triggers | ❌ | Not included (can be extended) |

## 🛡️ Best Practices

1. **Regular backups**: Run backup before major changes
2. **Test restores**: Occasionally test restoring to a test database
3. **Keep multiple versions**: Don't delete old backups immediately
4. **Compress large backups**: Use `gzip` for files > 10MB
5. **Secure backups**: Don't commit to git if they contain sensitive data

### Compress Backup

```bash
# After backup
gzip database/backups/aiven_backup_2025-11-10T14-30-00.sql

# Restore from compressed
gunzip -c database/backups/aiven_backup_2025-11-10T14-30-00.sql.gz | \
  node scripts/restore-database.js
```

## ⚠️ Important Notes

### Before Restore:
- ✅ Backup current database first
- ✅ Close all app connections
- ✅ Verify backup file is correct
- ✅ Test on development database first

### During Restore:
- 5-second countdown gives you time to cancel (Ctrl+C)
- Foreign key constraints may cause order issues (script handles this with CASCADE)

### After Restore:
- ✅ Verify data integrity
- ✅ Test application functionality
- ✅ Check sequence values

## 🐛 Troubleshooting

### "Connection refused"
- Check if database is running
- Verify `config/db.js` has correct credentials
- Check firewall/network settings

### "Permission denied"
- Ensure database user has proper permissions
- May need SUPERUSER for some operations

### "Foreign key violation"
- Backup script uses CASCADE to handle this
- If issues persist, adjust table order in script

### "Out of memory"
- For very large databases, consider using `pg_dump` instead
- Or backup tables individually

## 🔄 Alternative: Using pg_dump

For very large databases, the native `pg_dump` tool is faster:

```bash
# Backup
pg_dump -h your-host.aivencloud.com \
        -p 12345 \
        -U avnadmin \
        -d defaultdb \
        --clean \
        --if-exists \
        -f database/backups/pgdump_backup.sql

# Restore
psql -h your-host.aivencloud.com \
     -p 12345 \
     -U avnadmin \
     -d defaultdb \
     -f database/backups/pgdump_backup.sql
```

## 📞 Need Help?

- Check `backend/scripts/backup-database.js` for implementation details
- Refer to PostgreSQL documentation for advanced features
- Test on development database before production

---

**Created:** November 10, 2025
**Last Updated:** November 10, 2025
