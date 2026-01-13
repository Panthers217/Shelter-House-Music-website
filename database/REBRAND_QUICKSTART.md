# 🎵 Database Rebranding - Quick Reference

## Files Created

All files in `/database/` directory:

```
database/
├── REBRAND_INVENTORY.md      # What tables contain what data
├── REBRAND_README.md          # Complete guide (READ THIS FIRST)
├── seed_shelterhouse.sql      # Apply Shelter House Music branding
└── rollback_soulfelt.sql      # Revert to SoulFelt Music branding
```

---

## ⚡ Quick Start

### 1. Backup First! (REQUIRED)
```bash
mysqldump -u username -p defaultdb > backup_$(date +%Y%m%d).sql
```

### 2. Apply Rebranding
```bash
mysql -u username -p defaultdb < database/seed_shelterhouse.sql
```

### 3. Verify Changes
```sql
SELECT name FROM artists WHERE id = 20;
-- Should return: "Sarah Monroe" (not "Whitney Houston")
```

### 4. Rollback (if needed)
```bash
mysql -u username -p defaultdb < database/rollback_soulfelt.sql
```

---

## 🎯 What Changes

| Item | SoulFelt → Shelter House |
|------|--------------------------|
| Artist Names | Whitney Houston → Sarah Monroe, etc. |
| Album Titles | Selected titles updated |
| Track Names | Promo track names updated |
| Cloudinary URLs | `/SoulFeltMusic/` → `/ShelterHouseMusic/` |
| Brand References | "Soul Felt Music" → "Shelter House Music" |
| **Schema** | **NO CHANGES** ✅ |

---

## ⚠️ Critical Reminders

1. ⚠️ **ALWAYS backup before running**
2. ⚠️ **Test on DEV environment first**
3. ⚠️ **Cloudinary assets need separate migration**
4. ⚠️ **Review scripts before executing**
5. ⚠️ **Keep rollback script handy**

---

## 🔍 Verification Queries

After rebranding, run these to check:

```sql
-- Artists rebranded?
SELECT id, name FROM artists WHERE id BETWEEN 20 AND 35;

-- URLs updated?
SELECT image_url FROM artists WHERE id = 20;

-- Albums renamed?
SELECT id, title FROM albums WHERE demos = 1 LIMIT 5;

-- FAQs updated?
SELECT question FROM faqs WHERE question LIKE '%Shelter House%' LIMIT 3;
```

---

## 📚 Full Documentation

- **Complete Guide**: See `REBRAND_README.md`
- **Table Inventory**: See `REBRAND_INVENTORY.md`
- **SQL Scripts**: `seed_shelterhouse.sql` and `rollback_soulfelt.sql`

---

## Artist Rebranding Map

| ID | SoulFelt Artist | → | Shelter House Artist |
|----|----------------|---|---------------------|
| 20 | Whitney Houston | → | Sarah Monroe |
| 21 | Alsou | → | Maya Rivers |
| 22 | Anthony Brown | → | Marcus Faith |
| 23 | BabyFace | → | Devon Smooth |
| 24 | Britney Spears | → | Jade Starlight |
| 25 | Deangelo | → | Phoenix Soul |
| 26 | Alexis FFrench | → | Adrian Keys |
| 27 | Great Soul | → | The Soul Collective |
| 28 | Lionel Richie | → | Cameron Gold |
| 29 | Luther Vandross | → | Isaiah Velvet |
| 30 | Mary J Blige | → | Nia Storm |
| 31 | Michael Jackson | → | Jordan Eclipse |
| 32 | Samantha Mumba | → | Sienna Chase |
| 33 | Spice Girls | → | Harmony Five |
| 34 | Stevie Wonder | → | Marcus Vision |
| 35 | Usher | → | Dante Flow |

---

## Need Help?

1. Read `REBRAND_README.md` for detailed instructions
2. Check `REBRAND_INVENTORY.md` for table analysis
3. Review SQL scripts before executing
4. Test on development database first

**Safe Rebranding! 🎵**
