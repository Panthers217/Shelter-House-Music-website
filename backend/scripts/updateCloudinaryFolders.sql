-- Migration script to update Cloudinary folder paths from SoulFelt to ShelterHouseMusic
-- Run this script to update existing database records

UPDATE website_settings 
SET 
  cloudinary_audio_folder = 'ShelterHouseMusic/ShelterHouseMusicAudio',
  cloudinary_image_folder = 'ShelterHouseMusic/ShelterHouseMusicImages',
  cloudinary_video_folder = 'ShelterHouseMusic/ShelterHouseMusicVideos',
  cloudinary_merch_folder = 'ShelterHouseMusic/ShelterHouseMusicMerch'
WHERE 
  cloudinary_audio_folder LIKE '%SoulFelt%' 
  OR cloudinary_image_folder LIKE '%SoulFelt%'
  OR cloudinary_video_folder LIKE '%SoulFelt%'
  OR cloudinary_merch_folder LIKE '%SoulFelt%';

-- Verify the update
SELECT 
  id,
  cloudinary_audio_folder,
  cloudinary_image_folder,
  cloudinary_video_folder,
  cloudinary_merch_folder
FROM website_settings;
