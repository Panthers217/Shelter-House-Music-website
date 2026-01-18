-- ============================================================================
-- Migration: Add church_partner field to artists table
-- ============================================================================
-- Purpose: Add a boolean field to track church partnership status
-- Date: January 2026
-- ============================================================================

USE shelterhouse_dev;

-- Add church_partner column to artists table
-- Using TINYINT(1) for boolean values in MySQL (0 = false, 1 = true)
ALTER TABLE `artists` 
ADD COLUMN `church_partner` TINYINT(1) DEFAULT 0 AFTER `featured`;

-- Add index for better query performance when filtering by church partners
CREATE INDEX `idx_church_partner` ON `artists` (`church_partner`);

-- ============================================================================
-- Rollback Instructions (if needed):
-- ============================================================================
-- To rollback this migration, run:
-- ALTER TABLE `artists` DROP INDEX `idx_church_partner`;
-- ALTER TABLE `artists` DROP COLUMN `church_partner`;
-- ============================================================================
