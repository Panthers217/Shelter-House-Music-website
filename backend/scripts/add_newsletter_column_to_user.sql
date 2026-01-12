-- Add newsletter subscription column to user table
ALTER TABLE user 
ADD COLUMN newsletter_subscribed TINYINT(1) DEFAULT 0 AFTER email;

-- Add index for faster queries when sending newsletters
CREATE INDEX idx_newsletter_subscribed ON user(newsletter_subscribed);