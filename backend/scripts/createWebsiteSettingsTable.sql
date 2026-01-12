-- Create website_settings table for dynamic configuration
CREATE TABLE IF NOT EXISTS website_settings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  
  -- Branding
  business_name VARCHAR(255) DEFAULT 'Soul Felt Music',
  logo_url VARCHAR(500),
  favicon_url VARCHAR(500),
  
  -- Color Scheme (store as hex values)
  primary_color VARCHAR(7) DEFAULT '#aa2a46',
  secondary_color VARCHAR(7) DEFAULT '#d63c65',
  accent_color VARCHAR(7) DEFAULT '#fffced',
  background_color VARCHAR(7) DEFAULT '#1a1b22',
  card_background VARCHAR(7) DEFAULT '#21212b',
  text_primary VARCHAR(7) DEFAULT '#fffced',
  text_secondary VARCHAR(7) DEFAULT '#ffffff',
  
  -- Contact Info
  contact_email VARCHAR(255),
  contact_phone VARCHAR(50),
  contact_address TEXT,
  office_hours_weekday VARCHAR(100) DEFAULT '9:00 AM - 6:00 PM',
  office_hours_saturday VARCHAR(100) DEFAULT '10:00 AM - 4:00 PM',
  office_hours_sunday VARCHAR(100) DEFAULT 'Closed',
  office_hours_timezone VARCHAR(50) DEFAULT 'EST',
  social_media_links JSON, -- {"twitter": "", "instagram": "", "facebook": "", "youtube": ""}
  
  -- Cloudinary Configuration
  cloudinary_cloud_name VARCHAR(255),
  cloudinary_audio_folder VARCHAR(255) DEFAULT 'SoulFeltMusic/SoulFeltMusicAudio',
  cloudinary_image_folder VARCHAR(255) DEFAULT 'SoulFeltMusic/SoulFeltMusicImages',
  cloudinary_video_folder VARCHAR(255) DEFAULT 'SoulFeltMusic/SoulFeltMusicVideos',
  cloudinary_merch_folder VARCHAR(255) DEFAULT 'SoulFeltMusic/SoulFeltMusicMerch',
  
  -- Feature Toggles
  enable_merchandise BOOLEAN DEFAULT true,
  enable_videos BOOLEAN DEFAULT true,
  enable_artist_profiles BOOLEAN DEFAULT true,
  enable_newsletter BOOLEAN DEFAULT true,
  enable_cart BOOLEAN DEFAULT true,
  enable_user_accounts BOOLEAN DEFAULT true,
  enable_promotional_tracks BOOLEAN DEFAULT true,
  enable_promotional_videos BOOLEAN DEFAULT true,
  
  -- Homepage Settings
  hero_title VARCHAR(255) DEFAULT 'Stream & Discover Soul Felt Music',
  hero_subtitle TEXT,
  featured_section_title VARCHAR(255) DEFAULT 'Featured Artists',
  about_us_text TEXT,
  
  -- Payment Settings (for future use)
  payment_currency VARCHAR(3) DEFAULT 'USD',
  tax_rate DECIMAL(5,2) DEFAULT 0.00,
  
  -- SEO Settings
  site_title VARCHAR(255) DEFAULT 'Soul Felt Music',
  site_description TEXT,
  site_keywords TEXT,
  
  -- Additional Settings
  items_per_page INT DEFAULT 20,
  max_upload_size_mb INT DEFAULT 50,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default settings
INSERT INTO website_settings (
  business_name,
  primary_color,
  secondary_color,
  accent_color,
  background_color,
  card_background,
  text_primary,
  text_secondary,
  hero_title,
  hero_subtitle,
  featured_section_title,
  cloudinary_cloud_name,
  social_media_links
) VALUES (
  'Soul Felt Music',
  '#aa2a46',
  '#d63c65',
  '#fffced',
  '#1a1b22',
  '#21212b',
  '#fffced',
  '#ffffff',
  'Stream & Discover Soul Felt Music',
  'Play samples, discover new artists, and purchase your favorite tracks and albums.',
  'Featured Artists',
  'webprojectimages',
  JSON_OBJECT(
    'twitter', '',
    'instagram', '',
    'facebook', '',
    'youtube', ''
  )
);
