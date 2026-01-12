-- Add email configuration fields to website_settings table

ALTER TABLE website_settings 
ADD COLUMN smtp_host VARCHAR(255) DEFAULT 'smtp.gmail.com',
ADD COLUMN smtp_port INT DEFAULT 587,
ADD COLUMN smtp_secure BOOLEAN DEFAULT false,
ADD COLUMN smtp_user VARCHAR(255),
ADD COLUMN smtp_password VARCHAR(255),
ADD COLUMN contact_form_recipient VARCHAR(255),
ADD COLUMN artist_submission_recipient VARCHAR(255),
ADD COLUMN press_media_recipient VARCHAR(255),
ADD COLUMN contact_form_auto_reply BOOLEAN DEFAULT true,
ADD COLUMN contact_form_subject_prefix VARCHAR(100) DEFAULT '[Soul Felt Music]',
ADD COLUMN auto_reply_message TEXT;

-- Update existing row with default values if exists
UPDATE website_settings 
SET 
  smtp_host = 'smtp.gmail.com',
  smtp_port = 587,
  smtp_secure = false,
  contact_form_auto_reply = true,
  contact_form_subject_prefix = '[Soul Felt Music]'
WHERE smtp_host IS NULL;

-- Create contact_submissions table for logging
CREATE TABLE  contact_submissions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  inquiry_type ENUM('general', 'artist', 'press') NOT NULL,
  subject VARCHAR(500) NOT NULL,
  message TEXT NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  status ENUM('pending', 'sent', 'failed') DEFAULT 'pending',
  error_message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_inquiry_type (inquiry_type),
  INDEX idx_created_at (created_at)
);
