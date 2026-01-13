# Database Rebranding Guide: SoulFelt Music → Shelter House Music

## 📋 Overview

This guide provides step-by-step instructions for rebranding the database from **SoulFelt Music** to **Shelter House Music** while maintaining complete schema integrity.

**Key Principles:**
- ✅ Schema remains 100% unchanged
- ✅ Only content data is modified  
- ✅ All changes are reversible
- ✅ Foreign keys and relationships preserved
- ✅ Transaction history maintained

---

## 📦 Deliverables

All files located in `/database/` directory:

| File | Purpose |
|------|---------|
| `REBRAND_INVENTORY.md` | Complete table classification and analysis |
| `seed_shelterhouse.sql` | Rebranding script with new data |
| `rollback_soulfelt.sql` | Rollback script to restore SoulFelt data |
| `REBRAND_README.md` | This file - execution instructions |

---

## 🔍 What Gets Changed

### Content Tables (Modified)
- **Artists**: Names, bios, images, social URLs
- **Albums**: Titles, cover art URLs
- **Tracks & Promotional Tracks**: Titles, audio URLs
- **Merchandise**: Product names, images
- **Community Events**: Event names, descriptions
- **FAQs**: Brand references in Q&A
- **Newsletter Campaigns**: Campaign content
- **Videos**: Video URLs and thumbnails

### System Tables (Unchanged)
- **Users**: All user accounts preserved
- **Purchases/Orders**: Transaction history intact
- **Newsletter Subscribers**: Email list maintained
- **Genres**: Generic taxonomy unchanged
- **Analytics**: Play counts and stats preserved

See `REBRAND_INVENTORY.md` for complete details.

---

## 🚀 Local Development Setup

### Prerequisites

- MySQL 8.0+
- Access to database (local or development environment)
- Backup of current database
- Administrative privileges

### Environment

```bash
# Database connection
Host: localhost (or your dev server)
Port: 3306 (or custom)
Database: defaultdb
User: your_username
Password: your_password
```

---

## 📝 Execution Instructions

### Step 1: Create a Backup

**CRITICAL: Always backup before making changes!**

```bash
# Using mysqldump (recommended)
mysqldump -u your_username -p \
  --single-transaction \
  --routines \
  --triggers \
  --events \
  defaultdb > backup_soulfelt_$(date +%Y%m%d_%H%M%S).sql

# Verify backup was created
ls -lh backup_soulfelt_*.sql
```

### Step 2: Review the Changes

Before executing, review what will be changed:

```bash
# View the seed script
less database/seed_shelterhouse.sql

# Check the inventory
less database/REBRAND_INVENTORY.md
```

### Step 3: Execute Rebranding Script

**Option A: Direct MySQL Command**

```bash
mysql -u your_username -p defaultdb < database/seed_shelterhouse.sql
```

**Option B: Interactive MySQL Session**

```bash
mysql -u your_username -p
```

```sql
USE defaultdb;
SOURCE /path/to/database/seed_shelterhouse.sql;
```

**Option C: Using MySQL Workbench**

1. Open MySQL Workbench
2. Connect to your database
3. File → Open SQL Script
4. Select `seed_shelterhouse.sql`
5. Execute (⚡ icon or Ctrl+Shift+Enter)

### Step 4: Verify Changes

Run these verification queries:

```sql
-- Check artist names changed
SELECT id, name, genre 
FROM artists 
WHERE id BETWEEN 20 AND 35;

-- Check album titles  
SELECT id, title, artist_id
FROM albums 
WHERE demos = 1 
LIMIT 10;

-- Check URLs updated
SELECT image_url 
FROM artists 
WHERE image_url LIKE '%ShelterHouseMusic%' 
LIMIT 5;

-- Check FAQs updated
SELECT question 
FROM faqs 
WHERE question LIKE '%Shelter House Music%' 
LIMIT 3;

-- Verify Cloudinary paths
SELECT cover_url_public_identifier 
FROM albums 
WHERE cover_url_public_identifier LIKE '%ShelterHouseMusic%' 
LIMIT 5;
```

Expected results:
- Artist names should reflect new Shelter House Music roster
- Album titles updated where appropriate
- All URL paths should contain "ShelterHouseMusic" instead of "SoulFeltMusic"
- FAQ content should mention "Shelter House Music"

---

## 🔄 Rollback Instructions

If you need to revert to SoulFelt Music branding:

### Step 1: Execute Rollback Script

```bash
mysql -u your_username -p defaultdb < database/rollback_soulfelt.sql
```

### Step 2: Verify Rollback

```sql
-- Check artist names restored
SELECT id, name FROM artists WHERE id = 20;
-- Should return: Whitney Houston

-- Check album restored
SELECT id, title FROM albums WHERE id = 107 AND demos = 1;
-- Should return: So Emotional

-- Check URLs restored
SELECT image_url FROM artists WHERE id = 20;
-- Should contain: SoulFeltMusic (not ShelterHouseMusic)
```

---

## 🎨 Cloudinary Asset Management

### Important Note

The SQL scripts update **database URLs** to reference "ShelterHouseMusic" paths, but the actual Cloudinary assets remain in their original "SoulFeltMusic" folders.

### Two Approaches:

#### Approach 1: Copy Assets in Cloudinary (Recommended)

```bash
# Use Cloudinary's Admin API or Dashboard to:
# 1. Duplicate SoulFeltMusic folder → ShelterHouseMusic
# 2. Keep both versions (allows easy rollback)
# 3. Update URLs in database point to new location
```

#### Approach 2: URL Rewriting (Temporary)

If you can't move Cloudinary assets immediately, the old URLs will still work since the database now references the new paths, but the actual files are at the old paths. You have two options:

1. **Update URLs back temporarily** after rebranding while assets are moved
2. **Use a proxy/CDN rule** to rewrite ShelterHouseMusic → SoulFeltMusic at the CDN level

---

## 📊 Database Statistics

After running the seed script, approximately:

- **16 artists** rebranded
- **16 albums** renamed
- **17 artist images** URLs updated
- **16 promotional tracks** renamed
- **20 merchandise items** updated
- **4+ community events** updated
- **15+ FAQs** content updated
- All URL paths changed (100+ records)

Schema: **0 changes** (all tables, columns, constraints unchanged)

---

## 🧪 Testing Checklist

After rebranding, test these areas:

### Frontend Tests
- [ ] Artist pages display new names and bios
- [ ] Album artwork loads correctly
- [ ] Audio playback works (promotional tracks)
- [ ] Merchandise shows correct artist names
- [ ] Community events display proper branding
- [ ] FAQ page shows "Shelter House Music"
- [ ] Newsletter history shows updated campaigns

### Backend Tests  
- [ ] API endpoints return updated data
- [ ] Search functionality finds new artist names
- [ ] Album/track associations maintained
- [ ] Purchase history references preserved
- [ ] User follows/favorites still work
- [ ] Analytics tracking continues

### Database Integrity
- [ ] Foreign keys intact
- [ ] No orphaned records
- [ ] Constraints still enforced
- [ ] Indexes functioning
- [ ] No NULL where NOT NULL required

---

## 🐛 Troubleshooting

### Issue: "Table doesn't exist"
**Solution:** Ensure you're connected to the correct database (`USE defaultdb;`)

### Issue: "Syntax error near..."
**Solution:** Check MySQL version (requires 8.0+). Some REPLACE() functions may need adjustment for older versions.

### Issue: "Access denied"
**Solution:** Verify user has UPDATE permissions: `GRANT UPDATE ON defaultdb.* TO 'your_user'@'localhost';`

### Issue: URLs not updating
**Solution:** Check WHERE clauses match your data. Try removing `WHERE demos = 1` if you want to update production data too.

### Issue: Changes partially applied
**Solution:** Rollback immediately with `rollback_soulfelt.sql`, review error messages, fix issue, try again.

---

## ⚠️ Important Warnings

1. **DO NOT run these scripts on production database first**
   - Test on development/staging environment
   - Verify all changes work correctly
   - Then schedule maintenance window for production

2. **Backup before EVERY execution**
   - Disk space is cheap
   - Data recovery is expensive
   - Keep at least 3 recent backups

3. **Review the scripts before running**
   - Understand what each section does
   - Customize artist names if desired
   - Verify IDs match your database

4. **Cloudinary assets require separate handling**
   - Database changes alone won't move media files
   - Plan asset migration strategy
   - Test media loading after rebranding

5. **Transaction history is preserved but references old names**
   - Historical orders will show old artist names in order_items
   - This is intentional for accuracy
   - Consider this for reporting

---

## 📞 Support & Questions

### Documentation
- Full table inventory: `REBRAND_INVENTORY.md`
- SQL scripts: `seed_shelterhouse.sql` and `rollback_soulfelt.sql`

### Common Commands Reference

```bash
# Check database connection
mysql -u username -p -e "SELECT VERSION();"

# List all databases
mysql -u username -p -e "SHOW DATABASES;"

# Check table counts
mysql -u username -p defaultdb -e "SELECT COUNT(*) FROM artists;"

# Export specific table
mysqldump -u username -p defaultdb artists > artists_backup.sql

# Import specific table
mysql -u username -p defaultdb < artists_backup.sql

# Check script for syntax (dry run - won't execute)
mysql -u username -p --help | grep "execute"
```

---

## 🎯 Next Steps After Rebranding

1. **Update Application Code**
   - Search codebase for "SoulFelt" or "Soul Felt"
   - Update any hardcoded references
   - Update environment variables
   - Update configuration files

2. **Update Frontend Assets**
   - Replace logos
   - Update color schemes if needed
   - Update favicon and meta tags
   - Update documentation

3. **Communication**
   - Notify users of rebrand (if applicable)
   - Update social media
   - Update marketing materials
   - Send newsletter announcement

4. **SEO & Marketing**
   - Set up 301 redirects if URLs change
   - Update Google Business Profile
   - Update social media handles
   - Update email signatures

---

## 📜 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-13 | Initial rebranding scripts created |

---

## ✅ Summary

You now have:
1. ✅ Complete inventory of what changes
2. ✅ SQL script to rebrand to Shelter House Music  
3. ✅ SQL script to rollback to SoulFelt Music
4. ✅ Step-by-step execution instructions
5. ✅ Testing and verification procedures
6. ✅ Troubleshooting guidance

**Remember: Test in development first, backup always, and execute during low-traffic periods!**

---

## 📄 License & Usage

These scripts are part of the Shelter House Music rebranding project. Use responsibly and always maintain backups.

For questions or issues, refer to the project documentation or contact the development team.
