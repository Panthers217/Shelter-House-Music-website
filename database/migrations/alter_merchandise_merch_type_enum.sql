-- Migration: Add ENUM constraint to merchandise.merch_type field
-- This migration changes the merch_type column to use a dropdown with predefined options
-- Options: 'Apparel', 'Accessories', 'Posters & Art', 'Merchandise'
-- Created: January 20, 2026

-- Step 1: Add a temporary column with ENUM type
ALTER TABLE `merchandise` 
ADD COLUMN `merch_type_new` ENUM('Apparel', 'Accessories', 'Posters & Art', 'Merchandise') NOT NULL DEFAULT 'Merchandise';

-- Step 2: Copy data from old column to new column, mapping existing values
UPDATE `merchandise` 
SET `merch_type_new` = CASE 
    WHEN LOWER(`merch_type`) LIKE '%apparel%' OR LOWER(`merch_type`) LIKE '%shirt%' OR LOWER(`merch_type`) LIKE '%hat%' THEN 'Apparel'
    WHEN LOWER(`merch_type`) LIKE '%accessori%' OR LOWER(`merch_type`) LIKE '%keychain%' THEN 'Accessories'
    WHEN LOWER(`merch_type`) LIKE '%poster%' OR LOWER(`merch_type`) LIKE '%art%' THEN 'Posters & Art'
    ELSE 'Merchandise'
END;

-- Step 3: Drop the old column (this will also remove the index)
ALTER TABLE `merchandise` 
DROP COLUMN `merch_type`;

-- Step 4: Rename the new column to the original name
ALTER TABLE `merchandise` 
CHANGE COLUMN `merch_type_new` `merch_type` ENUM('Apparel', 'Accessories', 'Posters & Art', 'Merchandise') NOT NULL DEFAULT 'Merchandise';

-- Step 5: Recreate the index on merch_type
CREATE INDEX `idx_merchandise_type` ON `merchandise`(`merch_type`);

-- ============================================
-- ROLLBACK SCRIPT (if needed)
-- ============================================
-- To rollback this migration, run the following:
-- ALTER TABLE `merchandise` MODIFY COLUMN `merch_type` VARCHAR(50) NOT NULL;
-- CREATE INDEX `idx_merchandise_type` ON `merchandise`(`merch_type`);
