-- Migration: Add account deletion fields to user table
-- Date: 2026-01-24
-- Description: Adds fields to support soft deletion with 30-day grace period

ALTER TABLE `user`
ADD COLUMN `account_status` ENUM('active', 'pending_deletion', 'deleted') DEFAULT 'active' COMMENT 'Account status',
ADD COLUMN `deletion_requested_at` DATETIME NULL COMMENT 'When user requested account deletion',
ADD COLUMN `scheduled_deletion_date` DATETIME NULL COMMENT 'Date when account will be permanently deleted (30 days after request)',
ADD COLUMN `deletion_reason` TEXT NULL COMMENT 'Optional reason for deletion',
ADD COLUMN `deletion_ip_address` VARCHAR(45) NULL COMMENT 'IP address from which deletion was requested',
ADD INDEX `idx_account_status` (`account_status`),
ADD INDEX `idx_scheduled_deletion` (`scheduled_deletion_date`);

-- Add comments to existing columns for clarity
ALTER TABLE `user` MODIFY COLUMN `is_active` TINYINT(1) DEFAULT 1 COMMENT 'Legacy active flag - use account_ status instead';
