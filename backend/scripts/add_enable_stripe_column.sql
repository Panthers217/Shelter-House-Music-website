-- Add enable_stripe column to website_settings table
ALTER TABLE website_settings 
ADD COLUMN enable_stripe BOOLEAN DEFAULT true 
AFTER enable_promotional_videos;
