-- Add office hours columns to website_settings table

ALTER TABLE website_settings 
ADD COLUMN office_hours_weekday VARCHAR(100) DEFAULT '9:00 AM - 6:00 PM',
ADD COLUMN office_hours_saturday VARCHAR(100) DEFAULT '10:00 AM - 4:00 PM',
ADD COLUMN office_hours_sunday VARCHAR(100) DEFAULT 'Closed',
ADD COLUMN office_hours_timezone VARCHAR(50) DEFAULT 'EST';

-- Update existing row with default values if exists
UPDATE website_settings 
SET 
  office_hours_weekday = '9:00 AM - 6:00 PM',
  office_hours_saturday = '10:00 AM - 4:00 PM',
  office_hours_sunday = 'Closed',
  office_hours_timezone = 'EST'
WHERE office_hours_weekday IS NULL;
