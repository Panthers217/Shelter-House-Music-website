-- Add About page columns to website_settings table

ALTER TABLE website_settings 
ADD COLUMN about_page_title VARCHAR(255) DEFAULT 'About Us';

ALTER TABLE website_settings 
ADD COLUMN about_hero_tagline TEXT;

-- Story paragraphs
ALTER TABLE website_settings 
ADD COLUMN about_story_paragraph1 TEXT;

ALTER TABLE website_settings 
ADD COLUMN about_story_paragraph2 TEXT;

ALTER TABLE website_settings 
ADD COLUMN about_story_paragraph3 TEXT;

-- Mission & Vision
ALTER TABLE website_settings 
ADD COLUMN about_mission TEXT;

ALTER TABLE website_settings 
ADD COLUMN about_vision TEXT;

-- Stats (4 stats with number and label)
ALTER TABLE website_settings 
ADD COLUMN about_stat1_number VARCHAR(50) DEFAULT '10K+';

ALTER TABLE website_settings 
ADD COLUMN about_stat1_label VARCHAR(100) DEFAULT 'Active Listeners';

ALTER TABLE website_settings 
ADD COLUMN about_stat2_number VARCHAR(50) DEFAULT '500+';

ALTER TABLE website_settings 
ADD COLUMN about_stat2_label VARCHAR(100) DEFAULT 'Artists';

ALTER TABLE website_settings 
ADD COLUMN about_stat3_number VARCHAR(50) DEFAULT '5K+';

ALTER TABLE website_settings 
ADD COLUMN about_stat3_label VARCHAR(100) DEFAULT 'Tracks';

ALTER TABLE website_settings 
ADD COLUMN about_stat4_number VARCHAR(50) DEFAULT '100+';

ALTER TABLE website_settings 
ADD COLUMN about_stat4_label VARCHAR(100) DEFAULT 'Albums';

-- Core Values (4 values with title and description)
ALTER TABLE website_settings 
ADD COLUMN about_value1_title VARCHAR(100) DEFAULT 'Quality Music';

ALTER TABLE website_settings 
ADD COLUMN about_value1_desc TEXT;

ALTER TABLE website_settings 
ADD COLUMN about_value2_title VARCHAR(100) DEFAULT 'Artist Support';

ALTER TABLE website_settings 
ADD COLUMN about_value2_desc TEXT;

ALTER TABLE website_settings 
ADD COLUMN about_value3_title VARCHAR(100) DEFAULT 'Community First';

ALTER TABLE website_settings 
ADD COLUMN about_value3_desc TEXT;

ALTER TABLE website_settings 
ADD COLUMN about_value4_title VARCHAR(100) DEFAULT 'Excellence';

ALTER TABLE website_settings 
ADD COLUMN about_value4_desc TEXT;

-- CTA Section
ALTER TABLE website_settings 
ADD COLUMN about_cta_title VARCHAR(255) DEFAULT 'Join Our Community';

ALTER TABLE website_settings 
ADD COLUMN about_cta_description TEXT;

-- Update TEXT columns with default values
UPDATE website_settings 
SET 
  about_hero_tagline = 'Where passion meets melody, and artists connect with souls who truly feel the music.',
  about_story_paragraph1 = 'Soul Felt Music was born from a simple belief: that music has the power to touch souls and transform lives. Founded by passionate music enthusiasts, we set out to create more than just another music platform—we wanted to build a home for artists and listeners who believe in the raw, authentic power of music.',
  about_story_paragraph2 = 'In an industry often dominated by algorithms and mainstream trends, we champion the independent spirit. We provide a space where emerging artists can showcase their talent, where established musicians can connect deeply with their fans, and where music lovers can discover sounds that resonate with their souls.',
  about_story_paragraph3 = 'Today, Soul Felt Music has grown into a thriving community of artists, producers, and fans united by their love for authentic, soulful music. Every track, every album, every artist on our platform represents a story waiting to be heard—and we\'re honored to be part of that journey.',
  about_mission = 'To revolutionize the music industry by providing a platform that connects artists directly with their fans, fostering genuine relationships and supporting creative freedom.',
  about_vision = 'To become the leading independent music platform where artists thrive, fans discover their next favorite sound, and music culture flourishes authentically.',
  about_value1_desc = 'Curated selection of the finest tracks from talented artists worldwide',
  about_value2_desc = 'Dedicated to empowering artists and helping them reach their audience',
  about_value3_desc = 'Building a vibrant community of music lovers and creators',
  about_value4_desc = 'Committed to delivering exceptional music experiences',
  about_cta_description = 'Whether you\'re an artist looking to share your sound or a music lover seeking authentic experiences, Soul Felt Music is your home.'
WHERE id = 1;
