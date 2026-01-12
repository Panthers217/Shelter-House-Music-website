-- Add user_id foreign key to newsletter table
-- This creates a relationship between newsletter and user tables

-- First, add the column without the foreign key constraint
-- ALTER TABLE newsletter 
-- ADD COLUMN user_id BIGINT UNSIGNED NULL AFTER id;

-- -- Create index for faster lookups
-- CREATE INDEX idx_newsletter_user_id ON newsletter(user_id);

-- -- Now add the foreign key constraint separately
-- ALTER TABLE newsletter
-- ADD CONSTRAINT fk_newsletter_user 
--   FOREIGN KEY (user_id) 
--   REFERENCES user(id) 
--   ON DELETE CASCADE
--   ON UPDATE CASCADE;

-- Optional: Update existing newsletter records to link with user table
UPDATE newsletter n
INNER JOIN user u ON n.email = u.email
SET n.user_id = u.id
WHERE n.user_id IS NULL;
