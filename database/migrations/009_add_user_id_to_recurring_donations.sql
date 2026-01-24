-- Migration: Add user_id to recurring_donations table
-- Created: 2026-01-24
-- Purpose: Link recurring donations to authenticated users for security

-- Add user_id column with foreign key constraint
ALTER TABLE recurring_donations 
ADD COLUMN user_id BIGINT NULL AFTER id,
ADD INDEX idx_user_id (user_id),
ADD CONSTRAINT fk_recurring_donations_user 
    FOREIGN KEY (user_id) REFERENCES user(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE;

-- Note: user_id is nullable to allow existing donations without users,
-- but new subscriptions should require authentication
