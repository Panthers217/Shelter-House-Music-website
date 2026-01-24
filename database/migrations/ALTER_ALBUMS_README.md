# Albums Table - Album Type ENUM Migration

## Overview
This migration converts the `album_type` column in the `albums` table from a TEXT field to an ENUM field with predefined options.

## Migration File
`alter_albums_album_type_enum.sql`

## ENUM Options
The following album types are now available:
- **Digital Album** - Downloadable digital album
- **Physical Album** - Physical CD, vinyl, or other physical format
- **Limited Edition** - Special limited edition releases
- **EP** - Extended Play (shorter than full album)
- **Single** - Single track release

## Changes Made
1. Creates a temporary column `album_type_new` with ENUM type
2. Migrates existing data using pattern matching:
   - "digital" → Digital Album
   - "physical", "vinyl", "cd" → Physical Album
   - "limited", "edition" → Limited Edition
   - "ep", "extended" → EP
   - "single" → Single
3. Drops the old TEXT column
4. Renames the new column back to `album_type`
5. Creates an index for better query performance

## Default Value
- Default: `'Digital Album'`
- NULL values are allowed

## How to Run
```bash
# Connect to your database
mysql -u [username] -p [database_name]

# Run the migration
source database/migrations/alter_albums_album_type_enum.sql
```

## Rollback
If you need to rollback this migration, run:
```sql
DROP INDEX `idx_albums_type` ON `albums`;
ALTER TABLE `albums` MODIFY COLUMN `album_type` TEXT;
```

## Impact on Application
After running this migration, update your application code to use the new ENUM values:

### Frontend (Album Form)
- Update dropdown menus to show the new options
- Ensure form validation accepts only valid ENUM values

### Backend (Validation)
- Update API validators to check against ENUM values
- Update any album creation/update logic

### Purchase History
- The purchase history already handles album types with wildcards (`LIKE '%Album%'`)
- Limited Edition albums should now properly display

## Testing Checklist
- [ ] Run migration on development database
- [ ] Verify all existing albums have correct album_type values
- [ ] Test album creation with each album type
- [ ] Test album editing/updates
- [ ] Verify purchase history displays correctly for all album types
- [ ] Check that filters and searches work with new ENUM values

## Created
January 24, 2026
