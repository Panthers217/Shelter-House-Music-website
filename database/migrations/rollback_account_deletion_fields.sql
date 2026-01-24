-- Rollback Migration: Remove account deletion fields from user table
-- Date: 2026-01-24
-- Description: Rolls back the addition of account deletion fields

ALTER TABLE `user`
DROP COLUMN `account_status`,
DROP COLUMN `deletion_requested_at`,
DROP COLUMN `scheduled_deletion_date`,
DROP COLUMN `deletion_reason`,
DROP COLUMN `deletion_ip_address`,
DROP INDEX `idx_account_status`,
DROP INDEX `idx_scheduled_deletion`;
