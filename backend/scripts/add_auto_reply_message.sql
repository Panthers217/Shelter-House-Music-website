-- Add auto_reply_message column to website_settings table

ALTER TABLE website_settings 
ADD COLUMN auto_reply_message TEXT;

-- Set a default message for existing row
UPDATE website_settings 
SET auto_reply_message = 'We have received your {inquiry_type} and will get back to you as soon as possible.'
WHERE auto_reply_message IS NULL;
