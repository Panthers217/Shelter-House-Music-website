-- Randomly populate recommended, popular, new_release, and featured fields for albums
UPDATE albums 
SET 
  recommended = FLOOR(RAND() * 2),
  popular = FLOOR(RAND() * 2),
  new_release = FLOOR(RAND() * 2),
  featured = FLOOR(RAND() * 2);

-- Randomly populate recommended, popular, new_release, and featured fields for tracks
UPDATE tracks 
SET 
  recommended = FLOOR(RAND() * 2),
  popular = FLOOR(RAND() * 2),
  new_release = FLOOR(RAND() * 2),
  featured = FLOOR(RAND() * 2);

-- Randomly populate recommended, popular, new_release, and featured fields for promotional_tracks
UPDATE promotional_tracks 
SET 
  recommended = FLOOR(RAND() * 2),
  popular = FLOOR(RAND() * 2),
  new_release = FLOOR(RAND() * 2),
  featured = FLOOR(RAND() * 2);

-- Randomly populate recommended, popular, new_release, and featured fields for videos
UPDATE videos 
SET 
  recommended = FLOOR(RAND() * 2),
  popular = FLOOR(RAND() * 2),
  new_release = FLOOR(RAND() * 2),
  featured = FLOOR(RAND() * 2);

-- Randomly populate recommended, popular, new_release, and featured fields for promotional_videos
UPDATE promotional_videos 
SET 
  recommended = FLOOR(RAND() * 2),
  popular = FLOOR(RAND() * 2),
  new_release = FLOOR(RAND() * 2),
  featured = FLOOR(RAND() * 2);