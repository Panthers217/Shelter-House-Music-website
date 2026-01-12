-- Add email service provider selection to website_settings table
-- This allows switching between SMTP and API-based email services

ALTER TABLE website_settings 
ADD COLUMN email_provider VARCHAR(50) DEFAULT 'smtp' COMMENT 'Email service provider: smtp, resend, sendgrid, mailgun, ses-api, postmark';

-- Add API key field for API-based email services
ALTER TABLE website_settings 
ADD COLUMN email_api_key VARCHAR(500) DEFAULT NULL COMMENT 'API key for email service providers like Resend, SendGrid, etc.';

-- Add sender name field
ALTER TABLE website_settings 
ADD COLUMN email_from_name VARCHAR(255) DEFAULT 'Soul Felt Music' COMMENT 'Sender name shown in email from field';

-- Add reply-to email field
ALTER TABLE website_settings 
ADD COLUMN email_reply_to VARCHAR(255) DEFAULT NULL COMMENT 'Reply-to email address';

-- Notes:
-- email_provider options:
--   'smtp'      - Use SMTP settings (smtp_host, smtp_port, smtp_user, smtp_password)
--   'resend'    - Use Resend API (requires email_api_key)
--   'sendgrid'  - Use SendGrid API (requires email_api_key)
--   'mailgun'   - Use Mailgun API (requires email_api_key)
--   'ses-api'   - Use AWS SES API (requires email_api_key + AWS credentials)
--   'postmark'  - Use Postmark API (requires email_api_key)
