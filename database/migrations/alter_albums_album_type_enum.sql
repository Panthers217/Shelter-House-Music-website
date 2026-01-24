-- Migration: Add ENUM constraint to albums.album_type field
-- This migration changes the album_type column to use a dropdown with predefined options
-- Options: 'Digital Album', 'Physical Album', 'Limited Edition', 'EP', 'Single'
-- Created: January 24, 2026

-- Step 1: Add a temporary column with ENUM type
ALTER TABLE `albums` 
ADD COLUMN `album_type_new` ENUM('Digital Album', 'Physical Album', 'Limited Edition', 'EP', 'Single') NULL DEFAULT 'Digital Album';

-- Step 2: Copy data from old column to new column, mapping existing values
UPDATE `albums` 
SET `album_type_new` = CASE 
    WHEN LOWER(`album_type`) LIKE '%digital%' THEN 'Digital Album'
    WHEN LOWER(`album_type`) LIKE '%physical%' OR LOWER(`album_type`) LIKE '%vinyl%' OR LOWER(`album_type`) LIKE '%cd%' THEN 'Physical Album'
    WHEN LOWER(`album_type`) LIKE '%limited%' OR LOWER(`album_type`) LIKE '%edition%' THEN 'Limited Edition'
    WHEN LOWER(`album_type`) LIKE '%ep%' OR LOWER(`album_type`) LIKE '%extended%' THEN 'EP'
    WHEN LOWER(`album_type`) LIKE '%single%' THEN 'Single'
    ELSE 'Digital Album'
END;

-- Step 3: Drop the old column
ALTER TABLE `albums` 
DROP COLUMN `album_type`;

-- Step 4: Rename the new column to the original name
ALTER TABLE `albums` 
CHANGE COLUMN `album_type_new` `album_type` ENUM('Digital Album', 'Physical Album', 'Limited Edition', 'EP', 'Single') NULL DEFAULT 'Digital Album';

-- Step 5: Create an index on album_type for better query performance
CREATE INDEX `idx_albums_type` ON `albums`(`album_type`);

-- ============================================
-- ROLLBACK SCRIPT (if needed)
-- ============================================
-- To rollback this migration, run the following:
-- DROP INDEX `idx_albums_type` ON `albums`;
-- ALTER TABLE `albums` MODIFY COLUMN `album_type` TEXT;
