-- Soul Felt Music Database Backup
-- Generated: 2025-11-10T19:25:19.939Z
-- Source: MySQL defaultdb

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;


-- ============================================
-- Table: albums
-- ============================================

DROP TABLE IF EXISTS `albums`;

CREATE TABLE "albums" (
  "id" bigint unsigned NOT NULL AUTO_INCREMENT,
  "artist_id" int DEFAULT NULL,
  "title" varchar(100) NOT NULL,
  "release_date" date DEFAULT NULL,
  "cover_url" varchar(255) DEFAULT NULL,
  "demos" tinyint(1) DEFAULT NULL,
  "activate" tinyint(1) DEFAULT NULL,
  "cover_url_public_identifier" varchar(255) DEFAULT NULL,
  "image_description" text,
  "album_description" text,
  "genre" text,
  "album_type" text,
  "album_pricing" int DEFAULT NULL,
  "new_release" tinyint(1) DEFAULT '0',
  "recommended" tinyint(1) DEFAULT '0',
  "popular" tinyint(1) DEFAULT '0',
  "featured" tinyint(1) DEFAULT NULL,
  "purchase_link" varchar(255) DEFAULT NULL,
  "stripe_active" tinyint DEFAULT NULL,
  PRIMARY KEY ("id"),
  UNIQUE KEY "id" ("id")
);

-- Data for albums
LOCK TABLES `albums` WRITE;
INSERT INTO `albums` (`id`, `artist_id`, `title`, `release_date`, `cover_url`, `demos`, `activate`, `cover_url_public_identifier`, `image_description`, `album_description`, `genre`, `album_type`, `album_pricing`, `new_release`, `recommended`, `popular`, `featured`, `purchase_link`, `stripe_active`) VALUES
    (107, 20, 'So Emotional', '2025-10-09 00:00:00', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760019826/SoulFeltMusic/SoulFeltMusicImages/DemoImages/AlbumCoversDemos/40f19c3eea7a4320f33bd1fb8df18d81.jpg', 1, 0, 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/AlbumCoversDemos/40f19c3eea7a4320f33bd1fb8df18d81', NULL, NULL, 'Soul', 'digital', 1000, 1, 1, 0, 1, 'https://music.amazon.in/tracks/B002DG247G', NULL),
    (108, 21, 'Also is here  demo', '2025-10-09 00:00:00', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760020040/SoulFeltMusic/SoulFeltMusicImages/DemoImages/AlbumCoversDemos/fae4c5c146798bd359dadc6c9206bd17.jpg', 1, 0, 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/AlbumCoversDemos/fae4c5c146798bd359dadc6c9206bd17', NULL, NULL, 'pop', 'digital', 1000, 1, 0, 1, 1, NULL, NULL),
    (109, 22, 'Everyday', '2025-10-09 00:00:00', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760020101/SoulFeltMusic/SoulFeltMusicImages/DemoImages/AlbumCoversDemos/693adb1b3f0ca9f2f89f7bd943a094ee.jpg', 1, 0, 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/AlbumCoversDemos/693adb1b3f0ca9f2f89f7bd943a094ee', NULL, NULL, 'rnb', 'digital', 1000, 0, 0, 0, 1, NULL, NULL),
    (110, 23, 'Tender Lover', '2025-10-09 00:00:00', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760020158/SoulFeltMusic/SoulFeltMusicImages/DemoImages/AlbumCoversDemos/b8379507b66df82ba7dee2721362f125.jpg', 1, 0, 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/AlbumCoversDemos/b8379507b66df82ba7dee2721362f125', NULL, NULL, 'rnb', 'digital', 1300, 1, 0, 0, 0, NULL, NULL),
    (111, 24, 'Britney I here demo', '2025-10-09 00:00:00', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760020225/SoulFeltMusic/SoulFeltMusicImages/DemoImages/AlbumCoversDemos/3fd6202a168d0447afd1af55ab6469c3.jpg', 1, 0, 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/AlbumCoversDemos/3fd6202a168d0447afd1af55ab6469c3', NULL, NULL, 'pop', 'digital', 1200, 1, 1, 0, 1, NULL, NULL),
    (112, 25, 'Brown Sugar', '2025-10-09 00:00:00', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760020271/SoulFeltMusic/SoulFeltMusicImages/DemoImages/AlbumCoversDemos/235638e3e949d2b899b1fd89e8636cb5.jpg', 1, 0, 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/AlbumCoversDemos/235638e3e949d2b899b1fd89e8636cb5', NULL, NULL, 'rnb soul', 'digital', 1500, 1, 1, 1, 1, NULL, NULL),
    (113, 26, 'Classic Soul of Alexis FFrench', '2025-10-09 00:00:00', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760020374/SoulFeltMusic/SoulFeltMusicImages/DemoImages/AlbumCoversDemos/e58ee18b0191af6b8e336159725d8d4b.jpg', 1, 0, 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/AlbumCoversDemos/e58ee18b0191af6b8e336159725d8d4b', NULL, NULL, 'instrumental soul', 'digital', 1100, 0, 0, 1, 1, NULL, NULL),
    (114, 27, 'Great Soul  Covers', '2025-10-09 00:00:00', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760020443/SoulFeltMusic/SoulFeltMusicImages/DemoImages/AlbumCoversDemos/a5141fe626d3a686b01ea2fb944dddfc.jpg', 1, 0, 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/AlbumCoversDemos/a5141fe626d3a686b01ea2fb944dddfc', NULL, NULL, 'soul', 'digital', 1000, 0, 1, 1, 1, NULL, NULL),
    (115, 28, 'Dancing On The Ceiling ', '2025-10-09 00:00:00', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760020545/SoulFeltMusic/SoulFeltMusicImages/DemoImages/AlbumCoversDemos/a37030b94ae1297317ac3243d794a567.jpg', 1, 0, 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/AlbumCoversDemos/a37030b94ae1297317ac3243d794a567', NULL, NULL, 'pop', 'digital', 1000, 1, 0, 0, 1, NULL, NULL),
    (116, 29, 'Luther Vandross I''m here demo', '2025-10-09 00:00:00', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760020624/SoulFeltMusic/SoulFeltMusicImages/DemoImages/AlbumCoversDemos/0350ea9dc8cf1d0879e8f26bb281fe2e.jpg', 1, 0, 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/AlbumCoversDemos/0350ea9dc8cf1d0879e8f26bb281fe2e', NULL, NULL, 'rnb soul', 'digital', 1300, 1, 1, 1, 0, NULL, NULL),
    (117, 30, 'No More Drama', '2025-10-09 00:00:00', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760020668/SoulFeltMusic/SoulFeltMusicImages/DemoImages/AlbumCoversDemos/c49e9347c83c8b8349a10214fc7c3db7.jpg', 1, 0, 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/AlbumCoversDemos/c49e9347c83c8b8349a10214fc7c3db7', NULL, NULL, 'rnb', 'digital', 1000, 1, 1, 0, 1, NULL, NULL),
    (118, 31, 'Thriller', '2025-10-09 00:00:00', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760020719/SoulFeltMusic/SoulFeltMusicImages/DemoImages/AlbumCoversDemos/33c7fd0175549bebbb147323d2348a9d.jpg', 1, 0, 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/AlbumCoversDemos/33c7fd0175549bebbb147323d2348a9d', NULL, NULL, 'pop', 'digital', 1300, 0, 0, 0, 0, NULL, NULL),
    (119, 32, 'Got To Tell You', '2025-10-09 00:00:00', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760020789/SoulFeltMusic/SoulFeltMusicImages/DemoImages/AlbumCoversDemos/36d274138e43c751f4d834fc30796344.jpg', 1, 0, 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/AlbumCoversDemos/36d274138e43c751f4d834fc30796344', NULL, NULL, 'pop', 'digital', 1200, 0, 0, 0, 1, NULL, NULL),
    (120, 33, 'Forever', '2025-10-09 00:00:00', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760020834/SoulFeltMusic/SoulFeltMusicImages/DemoImages/AlbumCoversDemos/cb8c577a8bea414ba43cb0a730ea125c.jpg', 1, 0, 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/AlbumCoversDemos/cb8c577a8bea414ba43cb0a730ea125c', NULL, NULL, 'pop', 'digtial', 1000, 0, 1, 1, 0, NULL, NULL),
    (121, 34, 'Hotter Than July', '2025-10-09 00:00:00', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760020900/SoulFeltMusic/SoulFeltMusicImages/DemoImages/AlbumCoversDemos/15c9eaa494a602daeef4e7608c9b79ca.jpg', 1, 0, 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/AlbumCoversDemos/15c9eaa494a602daeef4e7608c9b79ca', NULL, NULL, 'rnb soul', 'digital', 1300, 1, 0, 0, 1, NULL, NULL),
    (122, 34, 'Confessions', '2025-10-09 00:00:00', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760020952/SoulFeltMusic/SoulFeltMusicImages/DemoImages/AlbumCoversDemos/5a7521a4c0946461140d933f34e59ce3.jpg', 1, 0, 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/AlbumCoversDemos/5a7521a4c0946461140d933f34e59ce3', NULL, NULL, 'rnb', 'digital', 1200, 1, 0, 0, 0, NULL, NULL);
UNLOCK TABLES;


-- ============================================
-- Table: artist_images
-- ============================================

DROP TABLE IF EXISTS `artist_images`;

CREATE TABLE "artist_images" (
  "id" bigint unsigned NOT NULL AUTO_INCREMENT,
  "artist_id" int DEFAULT NULL,
  "image_url" varchar(255) NOT NULL,
  "description" text,
  "activate" tinyint(1) DEFAULT NULL,
  "demos" tinyint(1) DEFAULT NULL,
  "image_url_public_identifier" varchar(255) DEFAULT NULL,
  "image_description" text,
  "artist_name" varchar(255) DEFAULT NULL,
  "image_name" varchar(255) DEFAULT NULL,
  PRIMARY KEY ("id"),
  UNIQUE KEY "id" ("id")
);

-- Data for artist_images
LOCK TABLES `artist_images` WRITE;
INSERT INTO `artist_images` (`id`, `artist_id`, `image_url`, `description`, `activate`, `demos`, `image_url_public_identifier`, `image_description`, `artist_name`, `image_name`) VALUES
    (1, 20, 'https://res.cloudinary.com/webprojectimages/image/upload/v1762373376/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/eea8002efe919856a3678ee9094003cc.jpg', 'Whitney Houston profile pic', 0, 1, 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/eea8002efe919856a3678ee9094003cc', NULL, 'Whitney Houston', NULL),
    (2, 21, 'https://res.cloudinary.com/webprojectimages/image/upload/v1760021246/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/d3e69b61b912d43a8af70848b8433639.jpg', 'Alsou profile pic', 0, 1, 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/d3e69b61b912d43a8af70848b8433639', NULL, 'Alsou', NULL),
    (3, 22, 'https://res.cloudinary.com/webprojectimages/image/upload/v1760021677/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/bdf5564c49331b1b885ca484c085e917.jpg', 'Anthony Brown profile pic', 0, 1, 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/bdf5564c49331b1b885ca484c085e917', NULL, 'Anthony Brown', NULL),
    (4, 23, 'https://res.cloudinary.com/webprojectimages/image/upload/v1760021719/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/41e0f23871deba9e1305a1d97bef0ab9.jpg', 'BabyFace profile pic', 0, 1, 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/41e0f23871deba9e1305a1d97bef0ab9', NULL, 'BabyFace', NULL),
    (5, 24, 'https://res.cloudinary.com/webprojectimages/image/upload/v1760021790/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/7807bab26f8774fcc25b79adacb7cda0.jpg', 'Britney Spears profile pic', 0, 1, 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/7807bab26f8774fcc25b79adacb7cda0', NULL, 'Britney Spears', NULL),
    (6, 25, 'https://res.cloudinary.com/webprojectimages/image/upload/v1760021834/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/fc9e11c3bc4c6f16db71c0bd3bef0794.jpg', 'Deangelo profile pic', 0, 1, 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/fc9e11c3bc4c6f16db71c0bd3bef0794', NULL, 'Deangelo', NULL),
    (7, 26, 'https://res.cloudinary.com/webprojectimages/image/upload/v1760021870/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/6e27252db98a8182809e101c9d52ca95.jpg', 'Alexis FFrench profile pic', 0, 1, 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/6e27252db98a8182809e101c9d52ca95', NULL, 'Alexis FFrench', NULL),
    (8, 27, 'https://res.cloudinary.com/webprojectimages/image/upload/v1760021943/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/765256f360b03577c4a397586a70b3ff.jpg', 'Great soul profile pic', 0, 1, 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/765256f360b03577c4a397586a70b3ff', NULL, 'Great Soul', NULL),
    (9, 28, 'https://res.cloudinary.com/webprojectimages/image/upload/v1760021982/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/1bcb8042df29f6a9bf7471ac4c3eef52.jpg', 'Lionel Richie profile pic', 0, 1, 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/1bcb8042df29f6a9bf7471ac4c3eef52', NULL, 'Lionel Richie', NULL),
    (10, 29, 'https://res.cloudinary.com/webprojectimages/image/upload/v1760022018/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/f9aa825ded07217a99073edb16a42832.jpg', 'Luther Vandross profile pic', 0, 1, 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/f9aa825ded07217a99073edb16a42832', NULL, 'Luther Vandross', NULL),
    (11, 30, 'https://res.cloudinary.com/webprojectimages/image/upload/v1760022072/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/33396ab521a1e1ac81151a2cc7714752.jpg', 'Mary j blige profile pic', 0, 1, 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/33396ab521a1e1ac81151a2cc7714752', NULL, 'Mary j Blige', NULL),
    (12, 31, 'https://res.cloudinary.com/webprojectimages/image/upload/v1760022115/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/d9553d34d97261cd74c0ff26c9507360.jpg', 'Michael Jacksons profile pic', 0, 1, 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/d9553d34d97261cd74c0ff26c9507360', NULL, 'Michael Jackson', NULL),
    (13, 32, 'https://res.cloudinary.com/webprojectimages/image/upload/v1760022171/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/bad368b6ef8c25add0db89ddb8796a0e.png', 'Samantha Mumba profile pic', 0, 1, 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/bad368b6ef8c25add0db89ddb8796a0e', NULL, 'Samantha Mumba', NULL),
    (14, 33, 'https://res.cloudinary.com/webprojectimages/image/upload/v1760022228/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/cfc61052e2d7daf78d38d6d2fdc98b6d.jpg', 'Spice girls profile pic', 0, 1, 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/cfc61052e2d7daf78d38d6d2fdc98b6d', NULL, 'Spice Girls', NULL),
    (15, 34, 'https://res.cloudinary.com/webprojectimages/image/upload/v1760022267/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/c4e8e3b00caf2da41ab214bbc8377f88.jpg', 'Stevie Wonder profile pic', 0, 1, 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/c4e8e3b00caf2da41ab214bbc8377f88', NULL, 'Stevie Wonder', NULL),
    (16, 35, 'https://res.cloudinary.com/webprojectimages/image/upload/v1760022319/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/f0f99fffe02b760c4c2dd54c2bfeb0ac.jpg', 'ushers profile pic', 0, 1, 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/f0f99fffe02b760c4c2dd54c2bfeb0ac', NULL, 'Usher', NULL),
    (17, 20, 'https://res.cloudinary.com/webprojectimages/image/upload/v1761068208/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/9ebc0dc4f40259bfc0eac3c5f46567d8.jpg', NULL, 1, 1, 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/9ebc0dc4f40259bfc0eac3c5f46567d8', NULL, 'Carlo', 'Carlo image');
UNLOCK TABLES;


-- ============================================
-- Table: artists
-- ============================================

DROP TABLE IF EXISTS `artists`;

CREATE TABLE "artists" (
  "id" bigint unsigned NOT NULL AUTO_INCREMENT,
  "name" varchar(100) NOT NULL,
  "bio" text,
  "image_url" varchar(255) DEFAULT NULL,
  "artist_country" varchar(100) DEFAULT NULL,
  "Career_Highlights" text,
  "Influences" text,
  "demos" tinyint(1) DEFAULT NULL,
  "activate" tinyint(1) DEFAULT NULL,
  "genre" text,
  "image_url_public_identifier" varchar(255) DEFAULT NULL,
  "rating" decimal(2,1) DEFAULT NULL,
  "monthly_listeners" varchar(50) DEFAULT NULL,
  "albums_released" int DEFAULT NULL,
  "spotify_monthly_listeners" int DEFAULT '0',
  "apple_music_monthly_listeners" int DEFAULT '0',
  "youtube_monthly_listeners" int DEFAULT '0',
  "soundcloud_monthly_listeners" int DEFAULT '0',
  "website_monthly_listeners" int DEFAULT '0',
  "total_monthly_listeners" int DEFAULT '0',
  "stats_last_updated" timestamp NULL DEFAULT NULL,
  "spotify_artist_id" varchar(100) DEFAULT NULL,
  "apple_music_artist_id" varchar(100) DEFAULT NULL,
  "youtube_channel_id" varchar(100) DEFAULT NULL,
  "soundcloud_username" varchar(100) DEFAULT NULL,
  "new_artist" tinyint(1) DEFAULT '0',
  "recommended" tinyint(1) DEFAULT '0',
  "popular" tinyint(1) DEFAULT '0',
  "featured" tinyint(1) DEFAULT NULL,
  "spotify_url" varchar(255) DEFAULT NULL,
  "instagram_url" varchar(255) DEFAULT NULL,
  "facebook_url" varchar(255) DEFAULT NULL,
  "youtube_url" varchar(255) DEFAULT NULL,
  "twitter_url" varchar(255) DEFAULT NULL,
  "apple_music_url" varchar(255) DEFAULT NULL,
  "tiktok_url" varchar(255) DEFAULT NULL,
  PRIMARY KEY ("id"),
  UNIQUE KEY "id" ("id"),
  KEY "idx_stats_updated" ("stats_last_updated"),
  KEY "idx_spotify_id" ("spotify_artist_id"),
  KEY "idx_youtube_id" ("youtube_channel_id"),
  KEY "idx_artists_social" ("spotify_url"(100),"instagram_url"(100),"twitter_url"(100))
);

-- Data for artists
LOCK TABLES `artists` WRITE;
INSERT INTO `artists` (`id`, `name`, `bio`, `image_url`, `artist_country`, `Career_Highlights`, `Influences`, `demos`, `activate`, `genre`, `image_url_public_identifier`, `rating`, `monthly_listeners`, `albums_released`, `spotify_monthly_listeners`, `apple_music_monthly_listeners`, `youtube_monthly_listeners`, `soundcloud_monthly_listeners`, `website_monthly_listeners`, `total_monthly_listeners`, `stats_last_updated`, `spotify_artist_id`, `apple_music_artist_id`, `youtube_channel_id`, `soundcloud_username`, `new_artist`, `recommended`, `popular`, `featured`, `spotify_url`, `instagram_url`, `facebook_url`, `youtube_url`, `twitter_url`, `apple_music_url`, `tiktok_url`) VALUES
    (20, 'Whitney Houston ', NULL, 'https://res.cloudinary.com/webprojectimages/image/upload/v1760021193/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/eea8002efe919856a3678ee9094003cc.jpg', 'USA', NULL, NULL, 1, 1, 'Soul', 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/eea8002efe919856a3678ee9094003cc', '4.4', '374K', 49, 0, 0, 0, 0, 0, 0, NULL, '3TVXtAsR1Inumwj472S9r4', NULL, 'UCIwFjwMjI0y7PDBVEO9-bkQ', NULL, 0, 0, 0, NULL, 'https://open.spotify.com/artist/whitneyhouston', 'https://instagram.com/whitneyhouston', 'https://facebook.com/whitneyhouston', 'https://youtube.com/@whitneyhouston', 'https://x.com/whitneyhouston', 'https://music.apple.com/artist/whitney-houston-', 'https://tiktok.com/@whitneyhouston'),
    (21, 'Alsou', 'Alsou is a Russian pop singer who gained international recognition after representing Russia at Eurovision. Known for her melodic voice and captivating performances, she has become one of the most successful pop artists in Russia, blending contemporary pop with traditional influences.', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760021246/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/d3e69b61b912d43a8af70848b8433639.jpg', 'USA', '• Represented Russia at Eurovision Song Contest 2000
• Multiple Russian Music Awards
• Platinum-selling albums in Russia
• Successful acting career in Russian cinema
• International tours across Europe and Asia', 'Russian pop music, Western pop artists, Eurovision performers', 1, 0, 'pop', 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/d3e69b61b912d43a8af70848b8433639', '4.1', '22K', 21, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, NULL, 'https://open.spotify.com/artist/alsou', 'https://instagram.com/alsou', 'https://facebook.com/alsou', 'https://youtube.com/@alsou', 'https://x.com/alsou', 'https://music.apple.com/artist/alsou', 'https://tiktok.com/@alsou'),
    (22, 'Anthony Brown', 'Anthony Brown is a renowned gospel music artist and worship leader, known for his powerful messages and soulful performances. As the leader of group therAPy, he has become a influential figure in contemporary gospel music, inspiring audiences with his authentic worship style.', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760021677/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/bdf5564c49331b1b885ca484c085e917.jpg', 'USA', '• Multiple Stellar Gospel Music Awards
• Dove Award nominations
• Chart-topping gospel albums
• Influential worship leader and pastor
• Inspiring performances at major gospel events', 'Traditional Gospel, Kirk Franklin, Contemporary worship music', 1, 0, 'soul, gospel ', 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/bdf5564c49331b1b885ca484c085e917', '4.0', '583K', 32, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, NULL, 'https://open.spotify.com/artist/anthonybrown', 'https://instagram.com/anthonybrown', 'https://facebook.com/anthonybrown', 'https://youtube.com/@anthonybrown', 'https://x.com/anthonybrown', 'https://music.apple.com/artist/anthony-brown', 'https://tiktok.com/@anthonybrown'),
    (23, 'BabyFace', 'Kenneth "Babyface" Edmonds is a legendary R&B singer, songwriter, and producer who has shaped the sound of modern soul music. With his smooth vocals and masterful production skills, he has written and produced hits for countless artists while maintaining a successful solo career.', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760021719/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/41e0f23871deba9e1305a1d97bef0ab9.jpg', 'USA', '• 12 Grammy Awards as artist and producer
• Written and produced over 26 #1 R&B hits
• Produced for Whitney Houston, Boyz II Men, Toni Braxton
• Co-founder of LaFace Records
• Inducted into Songwriters Hall of Fame', 'Marvin Gaye, Stevie Wonder, The Isley Brothers, Smokey Robinson', 1, 0, 'Rnb soul', 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/41e0f23871deba9e1305a1d97bef0ab9', '4.7', '22K', 5, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, NULL, 'https://open.spotify.com/artist/babyface', 'https://instagram.com/babyface', 'https://facebook.com/babyface', 'https://youtube.com/@babyface', 'https://x.com/babyface', 'https://music.apple.com/artist/babyface', 'https://tiktok.com/@babyface'),
    (24, 'Britney Spears', 'Britney Spears is a pop icon who defined a generation with her catchy songs, innovative music videos, and electrifying performances. Rising to fame in the late 1990s, she became one of the best-selling music artists of all time and a cultural phenomenon that shaped modern pop music.', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760021790/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/7807bab26f8774fcc25b79adacb7cda0.jpg', 'USA', '• "...Baby One More Time" became a global phenomenon
• 6 #1 albums on Billboard 200
• Grammy Award winner
• Over 100 million records sold worldwide
• MTV Video Vanguard Award recipient', 'Madonna, Janet Jackson, Michael Jackson, Prince', 1, 0, 'pop', 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/7807bab26f8774fcc25b79adacb7cda0', '4.1', '6.1M', 59, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, NULL, 'https://open.spotify.com/artist/britneyspears', 'https://instagram.com/britneyspears', 'https://facebook.com/britneyspears', 'https://youtube.com/@britneyspears', 'https://x.com/britneyspears', 'https://music.apple.com/artist/britney-spears', 'https://tiktok.com/@britneyspears'),
    (25, 'Deagngelo', 'D''Angelo is a pioneering neo-soul artist whose innovative approach to R&B has influenced countless musicians. Known for his sultry vocals, complex arrangements, and musical virtuosity, he helped define the neo-soul movement and continues to push creative boundaries.', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760021834/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/fc9e11c3bc4c6f16db71c0bd3bef0794.jpg', 'USA', '• Grammy Award-winning artist
• Critically acclaimed albums "Brown Sugar" and "Voodoo"
• Pioneered the neo-soul movement
• Collaborated with hip-hop and R&B legends
• Known for innovative live performances', 'Marvin Gaye, Prince, Al Green, Curtis Mayfield', 1, 0, 'soul', 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/fc9e11c3bc4c6f16db71c0bd3bef0794', '4.7', '296K', 15, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, NULL, 'https://open.spotify.com/artist/deagngelo', 'https://instagram.com/deagngelo', 'https://facebook.com/deagngelo', 'https://youtube.com/@deagngelo', 'https://x.com/deagngelo', 'https://music.apple.com/artist/deagngelo', 'https://tiktok.com/@deagngelo'),
    (26, 'Alexis FFrench', 'Alexis Ffrench is a British contemporary classical pianist and composer who bridges the gap between classical and popular music. His emotive compositions and virtuoso performances have made him one of the UK''s most successful classical artists, bringing piano music to new audiences.', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760021870/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/6e27252db98a8182809e101c9d52ca95.jpg', 'USA', '• Multiple classical chart-topping albums
• Over 100 million streams worldwide
• Performed at prestigious venues including Royal Albert Hall
• Ambassador for music education
• Blending classical with contemporary sounds', 'Chopin, Debussy, Ludovico Einaudi, Max Richter', 1, 0, 'instrumental', 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/6e27252db98a8182809e101c9d52ca95', '4.5', '93K', 46, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, NULL, 'https://open.spotify.com/artist/alexisffrench', 'https://instagram.com/alexisffrench', 'https://facebook.com/alexisffrench', 'https://youtube.com/@alexisffrench', 'https://x.com/alexisffrench', 'https://music.apple.com/artist/alexis-ffrench', 'https://tiktok.com/@alexisffrench'),
    (27, 'Great Soul ', NULL, 'https://res.cloudinary.com/webprojectimages/image/upload/v1760021943/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/765256f360b03577c4a397586a70b3ff.jpg', NULL, NULL, NULL, 1, 0, 'soul', 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/765256f360b03577c4a397586a70b3ff', '4.5', '179K', 57, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, NULL, 'https://open.spotify.com/artist/greatsoul', 'https://instagram.com/greatsoul', 'https://facebook.com/greatsoul', 'https://youtube.com/@greatsoul', 'https://x.com/greatsoul', 'https://music.apple.com/artist/great-soul-', 'https://tiktok.com/@greatsoul'),
    (28, 'Lionel Richie', 'Lionel Richie is a legendary singer, songwriter, and producer whose smooth voice and timeless ballads have made him one of the most successful artists in music history. From his work with The Commodores to his illustrious solo career, his songs have become anthems of love and celebration.', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760021982/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/1bcb8042df29f6a9bf7471ac4c3eef52.jpg', 'USA', '• 4 Grammy Awards and Academy Award winner
• Over 125 million records sold worldwide
• Inducted into Songwriters Hall of Fame
• Kennedy Center Honors recipient
• Chart-topping hits spanning five decades', 'Nat King Cole, Sam Cooke, Marvin Gaye, Smokey Robinson', 1, 0, 'Pop', 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/1bcb8042df29f6a9bf7471ac4c3eef52', '4.7', '3K', 34, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, NULL, 'https://open.spotify.com/artist/lionelrichie', 'https://instagram.com/lionelrichie', 'https://facebook.com/lionelrichie', 'https://youtube.com/@lionelrichie', 'https://x.com/lionelrichie', 'https://music.apple.com/artist/lionel-richie', 'https://tiktok.com/@lionelrichie'),
    (29, 'Luther Vandross', 'Luther Vandross was a masterful R&B vocalist whose velvety voice and impeccable phrasing set the gold standard for soul music. His romantic ballads and passionate performances earned him multiple Grammy Awards and secured his place as one of the greatest singers of all time.', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760022018/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/f9aa825ded07217a99073edb16a42832.jpg', 'USA', '• 8 Grammy Awards
• Sold over 40 million records worldwide
• 13 platinum albums
• Legendary performances at Apollo Theater
• Influenced generations of R&B vocalists', 'Aretha Franklin, Dionne Warwick, Stevie Wonder, Diana Ross', 1, 0, 'soul', 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/f9aa825ded07217a99073edb16a42832', '4.5', '60K', 43, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, NULL, 'https://open.spotify.com/artist/luthervandross', 'https://instagram.com/luthervandross', 'https://facebook.com/luthervandross', 'https://youtube.com/@luthervandross', 'https://x.com/luthervandross', 'https://music.apple.com/artist/luther-vandross', 'https://tiktok.com/@luthervandross'),
    (30, 'Mary j Blige', 'Mary J. Blige, known as the "Queen of Hip-Hop Soul," revolutionized R&B by blending hip-hop beats with soulful vocals and raw emotional honesty. Her powerful voice and authentic storytelling have made her one of the most influential and successful artists in contemporary music.', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760022072/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/33396ab521a1e1ac81151a2cc7714752.jpg', 'USA', '• 9 Grammy Awards from 32 nominations
• Over 80 million records sold worldwide
• Academy Award nominations for acting and music
• Billboard''s Icon Award recipient
• Pioneered hip-hop soul genre', 'Aretha Franklin, Chaka Khan, Anita Baker, Hip-Hop culture', 1, 0, 'Rnb', 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/33396ab521a1e1ac81151a2cc7714752', '4.1', '2.6M', 20, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, NULL, 'https://open.spotify.com/artist/maryjblige', 'https://instagram.com/maryjblige', 'https://facebook.com/maryjblige', 'https://youtube.com/@maryjblige', 'https://x.com/maryjblige', 'https://music.apple.com/artist/mary-j-blige', 'https://tiktok.com/@maryjblige'),
    (31, 'Michael Jackson', 'Michael Jackson, the "King of Pop," was a global phenomenon who revolutionized music, dance, and entertainment. His groundbreaking albums, innovative music videos, and electrifying performances made him the most successful entertainer of all time, with an influence that transcends generations and genres.', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760022115/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/d9553d34d97261cd74c0ff26c9507360.jpg', 'USA', '• 13 Grammy Awards and Grammy Legend Award
• "Thriller" is best-selling album of all time
• Pioneered modern music video artform
• Inducted into Rock and Roll Hall of Fame twice
• Over 400 million records sold worldwide', 'James Brown, Jackie Wilson, Diana Ross, Fred Astaire', 1, 0, 'Pop', 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/d9553d34d97261cd74c0ff26c9507360', '4.7', '92K', 47, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, NULL, 'https://open.spotify.com/artist/michaeljackson', 'https://instagram.com/michaeljackson', 'https://facebook.com/michaeljackson', 'https://youtube.com/@michaeljackson', 'https://x.com/michaeljackson', 'https://music.apple.com/artist/michael-jackson', 'https://tiktok.com/@michaeljackson'),
    (32, 'Samantha Mumba', 'Samantha Mumba is an Irish singer and actress who gained international success with her blend of R&B, pop, and dance music. Her debut album showcased her versatile vocals and contemporary sound, establishing her as a prominent artist in the early 2000s pop scene.', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760022171/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/bad368b6ef8c25add0db89ddb8796a0e.png', 'USA', '• Debut single "Gotta Tell You" reached Top 5 worldwide
• Platinum-selling debut album
• MTV Europe Music Award nomination
• Successful transition to acting
• International tours across Europe and Asia', 'Whitney Houston, Janet Jackson, Aaliyah, TLC', 1, 0, 'pop', 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/bad368b6ef8c25add0db89ddb8796a0e', '4.4', '58K', 21, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, NULL, 'https://open.spotify.com/artist/samanthamumba', 'https://instagram.com/samanthamumba', 'https://facebook.com/samanthamumba', 'https://youtube.com/@samanthamumba', 'https://x.com/samanthamumba', 'https://music.apple.com/artist/samantha-mumba', 'https://tiktok.com/@samanthamumba'),
    (33, 'Spice Girls', 'The Spice Girls were a British pop phenomenon that defined the 1990s with their message of "Girl Power" and infectious pop anthems. As one of the best-selling girl groups of all time, they became a global cultural force, influencing fashion, music, and popular culture worldwide.', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760022228/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/cfc61052e2d7daf78d38d6d2fdc98b6d.jpg', 'USA', '• Best-selling girl group of all time
• 9 #1 singles in the UK
• "Wannabe" topped charts in 37 countries
• Over 100 million records sold worldwide
• Brit Awards and MTV Awards winners', 'Madonna, Bananarama, Girl groups of the 60s, Pop culture', 1, 0, 'pop', 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/cfc61052e2d7daf78d38d6d2fdc98b6d', '4.5', '729K', 39, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, NULL, 'https://open.spotify.com/artist/spicegirls', 'https://instagram.com/spicegirls', 'https://facebook.com/spicegirls', 'https://youtube.com/@spicegirls', 'https://x.com/spicegirls', 'https://music.apple.com/artist/spice-girls', 'https://tiktok.com/@spicegirls'),
    (34, 'Stevie Wonder', 'Stevie Wonder is a musical genius whose innovative approach to soul, funk, and R&B has made him one of the most celebrated artists in music history. A multi-instrumentalist, singer, and songwriter, his socially conscious lyrics and groundbreaking production techniques have influenced generations of musicians.', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760022267/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/c4e8e3b00caf2da41ab214bbc8377f88.jpg', 'USA', '• 25 Grammy Awards including Lifetime Achievement
• Inducted into Rock and Roll Hall of Fame
• Presidential Medal of Freedom recipient
• Over 100 million records sold worldwide
• Pioneer in use of synthesizers in R&B', 'Ray Charles, Sam Cooke, Aretha Franklin, Jazz legends', 1, 0, 'soul', 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/c4e8e3b00caf2da41ab214bbc8377f88', '4.3', '57K', 20, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, NULL, 'https://open.spotify.com/artist/steviewonder', 'https://instagram.com/steviewonder', 'https://facebook.com/steviewonder', 'https://youtube.com/@steviewonder', 'https://x.com/steviewonder', 'https://music.apple.com/artist/stevie-wonder', 'https://tiktok.com/@steviewonder'),
    (35, 'Usher ', NULL, 'https://res.cloudinary.com/webprojectimages/image/upload/v1760022319/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/f0f99fffe02b760c4c2dd54c2bfeb0ac.jpg', NULL, NULL, NULL, 1, 0, 'rnb pop', 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/f0f99fffe02b760c4c2dd54c2bfeb0ac', '4.4', '51K', 50, 0, 0, 0, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, 0, 0, 0, NULL, 'https://open.spotify.com/artist/usher', 'https://instagram.com/usher', 'https://facebook.com/usher', 'https://youtube.com/@usher', 'https://x.com/usher', 'https://music.apple.com/artist/usher-', 'https://tiktok.com/@usher');
UNLOCK TABLES;


-- ============================================
-- Table: community_events
-- ============================================

DROP TABLE IF EXISTS `community_events`;

CREATE TABLE "community_events" (
  "id" int NOT NULL AUTO_INCREMENT,
  "title" varchar(255) NOT NULL,
  "event_date" date NOT NULL,
  "description" text NOT NULL,
  "link" varchar(500) DEFAULT NULL,
  "is_active" tinyint(1) DEFAULT '1',
  "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  "image_url" varchar(255) DEFAULT NULL,
  "event_image_url" varchar(255) DEFAULT NULL,
  "image_public_identifier" varchar(255) DEFAULT NULL,
  PRIMARY KEY ("id"),
  KEY "idx_event_date" ("event_date"),
  KEY "idx_is_active" ("is_active")
);

-- Data for community_events
LOCK TABLES `community_events` WRITE;
INSERT INTO `community_events` (`id`, `title`, `event_date`, `description`, `link`, `is_active`, `created_at`, `updated_at`, `image_url`, `event_image_url`, `image_public_identifier`) VALUES
    (1, 'Soul Felt Music at Summer Fest 2025', '2025-08-28 00:00:00', 'Join us for live performances and exclusive artist meetups at Summer Fest! Soul Felt Music will be hosting a special showcase featuring our top artists.', '#', 1, '2025-10-27 15:06:14', '2025-10-27 15:06:14', NULL, NULL, NULL),
    (2, 'Community Fundraiser: Music for All', '2025-09-10 00:00:00', 'We are proud to support local music education. Attend our fundraiser and help us bring music to every child in our community.', '#', 1, '2025-10-27 15:06:14', '2025-10-27 15:06:14', NULL, NULL, NULL),
    (3, 'Soul Felt Music Podcast Launch', '2025-09-20 00:00:00', 'Tune in to our new podcast series featuring interviews, behind-the-scenes stories, and more from the Soul Felt Music family.', '#', 1, '2025-10-27 15:06:14', '2025-10-27 15:06:14', NULL, NULL, NULL),
    (5, 'Test for cloudinary image', '2025-10-27 00:00:00', 'Test', 'https://www.amazon.com/gp/cart/view.html?ref_=nav_cart', 1, '2025-10-27 15:42:49', '2025-10-27 16:59:41', 'https://res.cloudinary.com/webprojectimages/image/upload/v1761584023/SoulFeltMusic/CommunityEvents/DemoImages/1c9653bf7b2da3ed0611c16218eb865a.png', NULL, 'SoulFeltMusic/CommunityEvents/DemoImages/1c9653bf7b2da3ed0611c16218eb865a');
UNLOCK TABLES;


-- ============================================
-- Table: contact_submissions
-- ============================================

DROP TABLE IF EXISTS `contact_submissions`;

CREATE TABLE "contact_submissions" (
  "id" int NOT NULL AUTO_INCREMENT,
  "name" varchar(255) NOT NULL,
  "email" varchar(255) NOT NULL,
  "inquiry_type" enum('general','artist','press') NOT NULL,
  "subject" varchar(500) NOT NULL,
  "message" text NOT NULL,
  "ip_address" varchar(45) DEFAULT NULL,
  "user_agent" text,
  "status" enum('pending','sent','failed') DEFAULT 'pending',
  "error_message" text,
  "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id"),
  KEY "idx_email" ("email"),
  KEY "idx_inquiry_type" ("inquiry_type"),
  KEY "idx_created_at" ("created_at")
);

-- Data for contact_submissions
LOCK TABLES `contact_submissions` WRITE;
INSERT INTO `contact_submissions` (`id`, `name`, `email`, `inquiry_type`, `subject`, `message`, `ip_address`, `user_agent`, `status`, `error_message`, `created_at`) VALUES
    (1, 'Marlo Rouse', 'marlorouse109@yahoo.com', 'general', 'T', 'g', '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'sent', NULL, '2025-10-27 19:21:57'),
    (2, 'Marlo Rouse', 'marlorouse109@yahoo.com', 'general', 'tt', 'ee', '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'sent', NULL, '2025-10-27 19:24:47'),
    (3, 'Marlo Rouse', 'marlorouse109@yahoo.com', 'general', 'Artist Submissions test', 'Checking the artis submissions test', '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'sent', NULL, '2025-10-28 12:55:25'),
    (4, 'Marlo Rouse', 'marlorouse109@yahoo.com', 'artist', 'Artsit Submission test 2', 'Check', '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'sent', NULL, '2025-10-28 13:16:50'),
    (5, 'Marlo Rouse', 'marlorouse109@yahoo.com', 'press', 'Press media test', 'Chedck', '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'sent', NULL, '2025-10-28 13:18:04'),
    (6, 'Marlo Rouse', 'marlorouse109@yahoo.com', 'general', 'Auto reply test', 'Checking', '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36', 'sent', NULL, '2025-10-28 13:36:06');
UNLOCK TABLES;


-- ============================================
-- Table: faqs
-- ============================================

DROP TABLE IF EXISTS `faqs`;

CREATE TABLE "faqs" (
  "id" bigint unsigned NOT NULL AUTO_INCREMENT,
  "question" varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  "answer" text COLLATE utf8mb4_unicode_ci NOT NULL,
  "category" varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT 'General',
  "display_order" int DEFAULT '0',
  "is_published" tinyint(1) DEFAULT '1',
  "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY ("id"),
  KEY "idx_category" ("category"),
  KEY "idx_published" ("is_published"),
  KEY "idx_order" ("display_order")
);

-- Data for faqs
LOCK TABLES `faqs` WRITE;
INSERT INTO `faqs` (`id`, `question`, `answer`, `category`, `display_order`, `is_published`, `created_at`, `updated_at`) VALUES
    (2, 'How do I create an account?', 'Click the "Sign Up" button in the navigation bar. You can register using your email address or sign in with Google. After creating an account, you''ll have access to features like following artists, saving music, and subscribing to our newsletter.', 'General', 2, 1, '2025-10-29 11:58:23', '2025-10-29 11:58:23'),
    (3, 'Is Soul Felt Music free to use?', 'Yes! Creating an account and browsing music is completely free. Some premium features and merchandise may require payment, but the core experience is free for all users.', 'General', 3, 1, '2025-10-29 11:58:23', '2025-10-29 11:58:23'),
    (4, 'How do I follow an artist?', 'Visit any artist''s profile page and click the "Follow" button. You''ll receive updates when they release new music or announce events. You can manage your followed artists from your profile page.', 'Music & Artists', 1, 1, '2025-10-29 11:58:23', '2025-10-29 11:58:23'),
    (5, 'Can I submit my music to Soul Felt Music?', 'Yes! We welcome submissions from independent artists. Use the contact form and select "Artist Submission" as your inquiry type. Include links to your music and a brief bio. Our team will review your submission.', 'Music & Artists', 2, 1, '2025-10-29 11:58:23', '2025-10-29 11:58:23'),
    (6, 'How do I download or stream music?', 'You can stream music directly on our platform. For downloads, look for the download button on track pages where available. Some tracks may be stream-only based on artist preferences.', 'Music & Artists', 3, 1, '2025-10-29 11:58:23', '2025-10-29 11:58:23'),
    (7, 'How do I make a purchase from the store?', 'Browse our store, add items to your cart, and proceed to checkout. We accept major credit cards and process payments securely through Stripe. You''ll receive an order confirmation via email.', 'Store & Purchases', 1, 1, '2025-10-29 11:58:23', '2025-10-29 11:58:23'),
    (8, 'What is your shipping policy?', 'We ship worldwide! Shipping times vary by location. Domestic orders typically arrive within 5-7 business days, while international orders may take 10-15 business days. You''ll receive tracking information once your order ships.', 'Store & Purchases', 2, 1, '2025-10-29 11:58:23', '2025-10-29 11:58:23'),
    (9, 'What is your return policy?', 'We offer 30-day returns on merchandise. Items must be unused and in original packaging. Contact our support team to initiate a return. Digital products are non-refundable.', 'Store & Purchases', 3, 1, '2025-10-29 11:58:23', '2025-10-29 11:58:23'),
    (10, 'How do I unsubscribe from the newsletter?', 'You can unsubscribe anytime by clicking the "Unsubscribe" link at the bottom of any newsletter email, or by visiting your account settings and toggling the newsletter preference.', 'Account & Newsletter', 1, 1, '2025-10-29 11:58:23', '2025-10-29 11:58:23'),
    (11, 'Can I change my email address?', 'Yes, you can update your email address in your account settings. You''ll need to verify the new email address before the change takes effect.', 'Account & Newsletter', 2, 1, '2025-10-29 11:58:23', '2025-10-29 11:58:23'),
    (12, 'How do I reset my password?', 'Click "Forgot Password" on the login page. Enter your email address and we''ll send you a password reset link. Follow the instructions in the email to create a new password.', 'Account & Newsletter', 3, 1, '2025-10-29 11:58:23', '2025-10-29 11:58:23'),
    (13, 'I''m having trouble playing music. What should I do?', 'First, try refreshing your browser. Make sure your internet connection is stable and your browser is up to date. If problems persist, try clearing your browser cache or using a different browser. Contact support if issues continue.', 'Technical Support', 1, 1, '2025-10-29 11:58:23', '2025-10-29 11:58:23'),
    (14, 'Is my payment information secure?', 'Absolutely! We use Stripe for payment processing, which is PCI-compliant and uses industry-standard encryption. We never store your full credit card information on our servers.', 'Technical Support', 2, 1, '2025-10-29 11:58:23', '2025-10-29 11:58:23'),
    (15, 'Which browsers are supported?', 'Soul Felt Music works best on the latest versions of Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience.', 'Technical Support', 3, 1, '2025-10-29 11:58:23', '2025-10-29 11:58:23'),
    (16, 'What is Soul Felt Music?', 'Soul Felt Music is a platform dedicated to discovering and supporting independent artists. We provide a space where music lovers can explore new sounds, connect with artists, and support the music community.', 'General', 0, 1, '2025-10-29 12:30:06', '2025-10-29 12:30:06');
UNLOCK TABLES;


-- ============================================
-- Table: genres
-- ============================================

DROP TABLE IF EXISTS `genres`;

CREATE TABLE "genres" (
  "id" int NOT NULL AUTO_INCREMENT,
  "name" varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  "is_active" tinyint(1) DEFAULT '1',
  "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY ("id"),
  UNIQUE KEY "name" ("name"),
  KEY "idx_active" ("is_active"),
  KEY "idx_name" ("name")
);

-- Data for genres
LOCK TABLES `genres` WRITE;
INSERT INTO `genres` (`id`, `name`, `is_active`, `created_at`, `updated_at`) VALUES
    (1, 'Pop', 1, '2025-10-22 22:33:27', '2025-10-22 22:33:27'),
    (2, 'Jazz', 1, '2025-10-22 22:33:27', '2025-10-22 22:33:27'),
    (3, 'Soul', 1, '2025-10-22 22:33:27', '2025-10-22 22:33:27'),
    (4, 'RnB', 1, '2025-10-22 22:33:27', '2025-10-22 22:33:27'),
    (5, 'Easy Listening', 1, '2025-10-22 22:33:27', '2025-10-22 22:33:27'),
    (6, 'Instrumental', 1, '2025-10-22 22:33:28', '2025-10-22 22:33:28'),
    (7, 'Funk', 1, '2025-10-22 22:33:28', '2025-10-22 22:33:28'),
    (8, 'Funk Soul', 1, '2025-10-22 22:33:28', '2025-10-22 22:33:28');
UNLOCK TABLES;


-- ============================================
-- Table: merchandise
-- ============================================

DROP TABLE IF EXISTS `merchandise`;

CREATE TABLE "merchandise" (
  "id" bigint unsigned NOT NULL AUTO_INCREMENT,
  "artist_id" int DEFAULT NULL,
  "title" varchar(150) NOT NULL,
  "merch_type" varchar(50) NOT NULL,
  "description" text,
  "price" decimal(10,2) NOT NULL,
  "image_url" varchar(255) DEFAULT NULL,
  "stock_quantity" int DEFAULT '0',
  "is_available" tinyint(1) DEFAULT '1',
  "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  "demos" tinyint DEFAULT '0',
  "purchase_link" varchar(500) DEFAULT NULL,
  PRIMARY KEY ("id"),
  UNIQUE KEY "id" ("id"),
  KEY "idx_merchandise_artist_id" ("artist_id"),
  KEY "idx_merchandise_type" ("merch_type")
);

-- Data for merchandise
LOCK TABLES `merchandise` WRITE;
INSERT INTO `merchandise` (`id`, `artist_id`, `title`, `merch_type`, `description`, `price`, `image_url`, `stock_quantity`, `is_available`, `created_at`, `updated_at`, `demos`, `purchase_link`) VALUES
    (1, 20, 'Whitney Houston', 'T-Shirt and Hat', NULL, '10.00', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760972691/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/cd4d81c1574740e60bef5a5ee0362196.png', 1, 1, NULL, NULL, 1, 'https://music.amazon.in/tracks/B002DG247G'),
    (2, 21, 'Alsou', 'T-shirt', NULL, '7.00', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760973707/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/59f354c959d77755ffe91ad1bfb74674.png', 1, 1, NULL, NULL, 1, NULL),
    (3, 21, 'Alsou', 'Hat', NULL, '5.00', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760973773/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/54530b38d82883a4ca80cecbc4b5c1c9.png', 2, 1, NULL, NULL, 1, NULL),
    (4, 22, 'Anthony Brown', 'T-Shirt and hat', NULL, '15.00', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760973924/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/6ff2a7b1fba13ce6546459f395b0ce59.png', 3, 1, NULL, NULL, 1, NULL),
    (5, 23, 'BabyFace', 'Shirt and Hats', NULL, '15.00', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760974067/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/323581ac498be056e7c26522ed9ba711.png', 2, 1, NULL, NULL, 1, NULL),
    (6, 24, 'Britney Spears', 'Shirt and Hat', NULL, '10.50', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760974156/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/516a3114fa8b7c60157d72d0bff0cffc.png', 3, 1, NULL, NULL, 1, NULL),
    (7, 25, 'Deangelo', 'Shirt and hat', NULL, '10.00', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760974238/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/f8259b840a1b1c6278b3082fc674595b.png', 3, 1, NULL, NULL, 1, NULL),
    (8, 25, 'Deangelo', 'Hat', NULL, '10.00', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760974292/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/7148d4d14e87029762bf35596ad29985.png', 2, 1, NULL, NULL, 1, NULL),
    (9, 26, 'Alexis FFrench', 'hat', NULL, '10.00', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760974359/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/895c13c0fbb711e89374505eaa9567f3.png', 3, 1, NULL, NULL, 1, NULL),
    (10, 26, 'Alexis FFrench', 'Shirt', NULL, '15.00', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760974421/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/880a06d55d89029bc29b38d09e836366.png', 4, NULL, NULL, NULL, 1, NULL),
    (11, 27, 'Great Soul', 'T-shirts and Hats', NULL, '15.00', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760974494/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/80ae5deabed62ea36fd389fc69c36bd5.png', 1, 1, NULL, NULL, 1, NULL),
    (12, 28, 'Lionel Richie', 'T-shirts and Hat', NULL, '15.00', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760974606/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/5e3840d9df0a7630f4bb661b05abc61a.png', 3, 1, NULL, NULL, 1, NULL),
    (13, 28, 'Lionel Riche', 'hat', NULL, '10.00', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760974681/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/8669f8a2a4381d1677d383221bd220b5.png', 3, 1, NULL, NULL, 1, NULL),
    (14, 29, 'Luther Vandross', 'T-shirt and Hats', NULL, '15.00', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760974494/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/80ae5deabed62ea36fd389fc69c36bd5.png', 3, 1, NULL, NULL, 1, NULL),
    (15, 30, 'Mary j Blidge', 'T-shirt and hat', NULL, '15.00', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760974494/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/80ae5deabed62ea36fd389fc69c36bd5.png', 4, 1, NULL, NULL, 1, NULL),
    (16, 31, 'Michael Jackson', 'T-shirt and Hat', NULL, '15.00', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760974494/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/80ae5deabed62ea36fd389fc69c36bd5.png', 5, 1, NULL, NULL, 1, NULL),
    (17, 32, 'Samantha Mumba', 'T-shirt and hats', NULL, '15.00', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760974494/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/80ae5deabed62ea36fd389fc69c36bd5.png', 3, 1, NULL, NULL, 1, NULL),
    (18, 33, 'Spice Gilrs', 'T-shirts and Hats', NULL, '15.00', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760974494/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/80ae5deabed62ea36fd389fc69c36bd5.png', 4, 1, NULL, NULL, 1, NULL),
    (19, 34, 'Stevie Wonder', 'T-shirts and hats', NULL, '15.00', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760974494/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/80ae5deabed62ea36fd389fc69c36bd5.png', 3, 1, NULL, NULL, 1, NULL),
    (20, 35, 'Usher', 'T- shirt and hats', NULL, '15.00', 'https://res.cloudinary.com/webprojectimages/image/upload/v1760974494/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/80ae5deabed62ea36fd389fc69c36bd5.png', 2, 1, NULL, NULL, 1, NULL);
UNLOCK TABLES;


-- ============================================
-- Table: newsletter
-- ============================================

DROP TABLE IF EXISTS `newsletter`;

CREATE TABLE "newsletter" (
  "id" bigint unsigned NOT NULL AUTO_INCREMENT,
  "user_id" bigint unsigned DEFAULT NULL,
  "email" varchar(100) NOT NULL,
  "phone_number" varchar(20) DEFAULT NULL,
  "subscribed_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  "is_active" tinyint(1) DEFAULT '1',
  "demos" tinyint(1) DEFAULT NULL,
  PRIMARY KEY ("id"),
  UNIQUE KEY "id" ("id"),
  UNIQUE KEY "email" ("email"),
  KEY "idx_newsletter_user_id" ("user_id")
);

-- Data for newsletter
LOCK TABLES `newsletter` WRITE;
INSERT INTO `newsletter` (`id`, `user_id`, `email`, `phone_number`, `subscribed_at`, `is_active`, `demos`) VALUES
    (1, NULL, 'Test123456@yahoo.com', NULL, '2025-10-28 17:27:47', 1, NULL),
    (2, NULL, 'Test1234@yahoo.com', NULL, '2025-10-28 17:37:08', 0, NULL),
    (3, NULL, 'Test321@yahoo.com', NULL, '2025-10-28 18:05:49', 1, NULL),
    (4, NULL, 'marlorouse109@yahoo.com', NULL, '2025-10-28 18:34:49', 1, NULL);
UNLOCK TABLES;


-- ============================================
-- Table: newsletter_campaign_recipients
-- ============================================

DROP TABLE IF EXISTS `newsletter_campaign_recipients`;

CREATE TABLE "newsletter_campaign_recipients" (
  "id" bigint unsigned NOT NULL AUTO_INCREMENT,
  "campaign_id" bigint unsigned NOT NULL,
  "email" varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  "sent_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  "opened_at" timestamp NULL DEFAULT NULL,
  "clicked_at" timestamp NULL DEFAULT NULL,
  "unsubscribed_at" timestamp NULL DEFAULT NULL,
  PRIMARY KEY ("id"),
  KEY "idx_campaign_email" ("campaign_id","email"),
  KEY "idx_opened" ("opened_at"),
  KEY "idx_clicked" ("clicked_at"),
  CONSTRAINT "newsletter_campaign_recipients_ibfk_1" FOREIGN KEY ("campaign_id") REFERENCES "newsletter_campaigns" ("id") ON DELETE CASCADE
);

-- Data for newsletter_campaign_recipients
LOCK TABLES `newsletter_campaign_recipients` WRITE;
INSERT INTO `newsletter_campaign_recipients` (`id`, `campaign_id`, `email`, `sent_at`, `opened_at`, `clicked_at`, `unsubscribed_at`) VALUES
    (1, 1, 'Test16@yahoo.com', '2025-11-04 20:56:15', NULL, NULL, NULL),
    (2, 1, 'Test123456@yahoo.com', '2025-11-04 20:56:16', NULL, NULL, NULL),
    (3, 1, 'Test321@yahoo.com', '2025-11-04 20:56:17', NULL, NULL, NULL),
    (4, 1, 'marlorouse109@yahoo.com', '2025-11-04 20:56:19', NULL, NULL, NULL),
    (5, 1, 'Test16@yahoo.com', '2025-11-04 20:56:15', NULL, NULL, NULL),
    (6, 1, 'Test123456@yahoo.com', '2025-11-04 20:56:16', NULL, NULL, NULL),
    (7, 1, 'Test321@yahoo.com', '2025-11-04 20:56:17', NULL, NULL, NULL),
    (8, 1, 'marlorouse109@yahoo.com', '2025-11-04 20:56:19', NULL, NULL, NULL),
    (9, 1, 'Test16@yahoo.com', '2025-11-04 20:56:15', NULL, NULL, NULL),
    (10, 1, 'Test123456@yahoo.com', '2025-11-04 20:56:16', NULL, NULL, NULL),
    (11, 1, 'Test321@yahoo.com', '2025-11-04 20:56:17', NULL, NULL, NULL),
    (12, 1, 'marlorouse109@yahoo.com', '2025-11-04 20:56:19', NULL, NULL, NULL),
    (13, 1, 'Test16@yahoo.com', '2025-11-04 20:56:15', NULL, NULL, NULL),
    (14, 1, 'Test123456@yahoo.com', '2025-11-04 20:56:16', NULL, NULL, NULL),
    (15, 1, 'Test321@yahoo.com', '2025-11-04 20:56:17', NULL, NULL, NULL),
    (16, 1, 'marlorouse109@yahoo.com', '2025-11-04 20:56:19', NULL, NULL, NULL);
UNLOCK TABLES;


-- ============================================
-- Table: newsletter_campaigns
-- ============================================

DROP TABLE IF EXISTS `newsletter_campaigns`;

CREATE TABLE "newsletter_campaigns" (
  "id" bigint unsigned NOT NULL AUTO_INCREMENT,
  "title" varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  "subject" varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  "content" text COLLATE utf8mb4_unicode_ci NOT NULL,
  "message" text COLLATE utf8mb4_unicode_ci,
  "audio_url" varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  "video_url" varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  "external_links" json DEFAULT NULL,
  "artist_ids" json DEFAULT NULL,
  "featured_image" varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  "status" enum('draft','scheduled','sent') COLLATE utf8mb4_unicode_ci DEFAULT 'draft',
  "scheduled_at" timestamp NULL DEFAULT NULL,
  "sent_at" timestamp NULL DEFAULT NULL,
  "recipient_count" int DEFAULT '0',
  "open_count" int DEFAULT '0',
  "click_count" int DEFAULT '0',
  "created_by" bigint unsigned DEFAULT NULL,
  "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY ("id"),
  KEY "idx_status" ("status"),
  KEY "idx_created_at" ("created_at"),
  KEY "idx_scheduled_at" ("scheduled_at")
);

-- Data for newsletter_campaigns
LOCK TABLES `newsletter_campaigns` WRITE;
INSERT INTO `newsletter_campaigns` (`id`, `title`, `subject`, `content`, `message`, `audio_url`, `video_url`, `external_links`, `artist_ids`, `featured_image`, `status`, `scheduled_at`, `sent_at`, `recipient_count`, `open_count`, `click_count`, `created_by`, `created_at`, `updated_at`) VALUES
    (1, 'Whitney houston Campaign', 'Whitney houston Test Campaign', 'Test for whitneys campaign', 'Addtional Notes test', 'https://res.cloudinary.com/webprojectimages/video/upload/SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/bd94f07f34352e50c45ed58aedf657e6.mp3', NULL, '[]', '[20]', 'https://res.cloudinary.com/webprojectimages/image/upload/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/eea8002efe919856a3678ee9094003cc.jpg', 'sent', NULL, '2025-10-28 18:49:15', 16, 0, 0, NULL, '2025-10-28 18:32:58', '2025-11-04 20:56:19');
UNLOCK TABLES;


-- ============================================
-- Table: order_items
-- ============================================

DROP TABLE IF EXISTS `order_items`;

CREATE TABLE "order_items" (
  "id" bigint unsigned NOT NULL AUTO_INCREMENT,
  "purchase_id" bigint unsigned NOT NULL,
  "item_type" varchar(50) NOT NULL,
  "item_id" bigint unsigned NOT NULL,
  "item_title" varchar(255) DEFAULT NULL,
  "artist_name" varchar(255) DEFAULT NULL,
  "quantity" int DEFAULT '1',
  "price" decimal(10,2) DEFAULT NULL,
  "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id"),
  KEY "idx_order_items_purchase_id" ("purchase_id"),
  KEY "idx_order_items_type_id" ("item_type","item_id"),
  CONSTRAINT "fk_order_items_purchase" FOREIGN KEY ("purchase_id") REFERENCES "purchases" ("id") ON DELETE CASCADE,
  CONSTRAINT "order_items_ibfk_1" FOREIGN KEY ("purchase_id") REFERENCES "purchases" ("id") ON DELETE CASCADE
);

-- Data for order_items
LOCK TABLES `order_items` WRITE;
INSERT INTO `order_items` (`id`, `purchase_id`, `item_type`, `item_id`, `item_title`, `artist_name`, `quantity`, `price`, `created_at`) VALUES
    (1, 5, 'Track', 0, 'Before you love me promo', NULL, 1, '0.00', '2025-11-01 11:43:01'),
    (2, 5, 'T-shirt', 0, 'Alsou', NULL, 1, '7.00', '2025-11-01 11:43:01'),
    (3, 6, 'Digital Album', 0, 'Luther Vandross I''m here demo', NULL, 1, '13.00', '2025-11-01 11:54:52'),
    (4, 6, 'T-shirt and Hats', 0, 'Luther Vandross', NULL, 1, '15.00', '2025-11-01 11:54:52'),
    (5, 6, 'Track', 0, 'Never too much promo', NULL, 1, '0.00', '2025-11-01 11:54:52'),
    (6, 7, 'Digital Album', 0, 'So Emotional', NULL, 1, '10.00', '2025-11-01 12:03:45'),
    (7, 7, 'Digital Album', 0, 'So Emotional', NULL, 1, '10.00', '2025-11-01 12:03:45'),
    (8, 7, 'Track', 0, 'So emotional promo', NULL, 1, '0.00', '2025-11-01 12:03:45'),
    (9, 8, 'Track', 8, 'One in a Milllion promo', 'Great Soul ', 1, '0.00', '2025-11-01 13:01:53'),
    (10, 8, 'T-shirt and Hats', 0, 'Luther Vandross', 'Luther Vandross', 1, '15.00', '2025-11-01 13:01:53'),
    (11, 8, 'Digital Album', 109, 'Everyday', 'Unknown Artist', 1, '10.00', '2025-11-01 13:01:53'),
    (12, 8, 'Digital Album', 110, 'Tender Lover', 'Unknown Artist', 1, '13.00', '2025-11-01 13:01:53'),
    (13, 9, 'Digital Album', 107, 'So Emotional', 'Unknown Artist', 1, '10.00', '2025-11-01 13:32:22'),
    (14, 9, 'Digital Album', 112, 'Brown Sugar', 'Unknown Artist', 1, '15.00', '2025-11-01 13:32:22'),
    (15, 9, 'Track', 2, 'Before you love me promo', 'Unknown Artist', 1, '0.00', '2025-11-01 13:32:22'),
    (16, 9, 'Hat', 0, 'Alsou', 'Alsou', 1, '5.00', '2025-11-01 13:32:22'),
    (17, 9, 'Shirt and Hat', 0, 'Britney Spears', 'Britney Spears', 1, '10.50', '2025-11-01 13:32:22'),
    (18, 9, 'T-shirt and hat', 0, 'Mary j Blidge', 'Mary j Blige', 1, '15.00', '2025-11-01 13:32:22'),
    (19, 9, 'T-shirts and Hats', 0, 'Spice Gilrs', 'Spice Girls', 1, '15.00', '2025-11-01 13:32:22'),
    (20, 10, 'Digital Album', 107, 'So Emotional', 'Unknown Artist', 3, '10.00', '2025-11-01 13:59:02'),
    (21, 10, 'Digital Album', 109, 'Everyday', 'Unknown Artist', 2, '10.00', '2025-11-01 13:59:02'),
    (22, 11, 'Digital Album', 107, 'So Emotional', 'Unknown Artist', 1, '10.00', '2025-11-01 14:55:19'),
    (23, 11, 'Track', 2, 'Before you love me promo', 'Unknown Artist', 1, '0.00', '2025-11-01 14:55:19'),
    (24, 11, 'T-shirt', 0, 'Alsou', 'Alsou', 2, '7.00', '2025-11-01 14:55:19'),
    (25, 12, 'Digital Album', 107, 'So Emotional', 'Whitney Houston ', 1, '10.00', '2025-11-01 16:24:33'),
    (26, 12, 'Digital Album', 109, 'Everyday', 'Anthony Brown', 1, '10.00', '2025-11-01 16:24:33'),
    (27, 12, 'Digital Album', 114, 'Great Soul  Covers', 'Great Soul ', 1, '10.00', '2025-11-01 16:24:33'),
    (28, 12, 'T-shirt', 0, 'Alsou', 'Alsou', 1, '7.00', '2025-11-01 16:24:33'),
    (29, 12, 'Shirt and Hat', 0, 'Britney Spears', 'Britney Spears', 1, '10.50', '2025-11-01 16:24:33'),
    (30, 12, 'T-shirts and Hats', 0, 'Great Soul', 'Great Soul ', 1, '15.00', '2025-11-01 16:24:33'),
    (31, 13, 'Digital Album', 107, 'So Emotional', 'Whitney Houston ', 1, '10.00', '2025-11-02 11:49:56'),
    (32, 14, 'Track', 1, 'So emotional promo', 'Whitney Houston ', 1, '0.00', '2025-11-02 13:46:30'),
    (33, 14, 'Track', 2, 'Before you love me promo', 'Alsou', 1, '0.00', '2025-11-02 13:46:30'),
    (34, 14, 'Digital Album', 107, 'So Emotional', 'Whitney Houston ', 1, '10.00', '2025-11-02 13:46:30'),
    (35, 15, 'Digital Album', 111, 'Britney I here demo', 'Britney Spears', 1, '12.00', '2025-11-02 14:02:56'),
    (36, 15, 'Track', 1, 'So emotional promo', 'Whitney Houston ', 1, '0.00', '2025-11-02 14:02:56'),
    (37, 15, 'T-Shirt and Hat', 0, 'Whitney Houston', 'Whitney Houston ', 1, '10.00', '2025-11-02 14:02:56'),
    (38, 16, 'Digital Album', 107, 'So Emotional', 'Whitney Houston ', 1, '10.00', '2025-11-02 14:16:24'),
    (39, 16, 'Digital Album', 109, 'Everyday', 'Anthony Brown', 1, '10.00', '2025-11-02 14:16:24'),
    (40, 16, 'Track', 6, 'Brown Sugar promo', 'Deagngelo', 1, '0.00', '2025-11-02 14:16:24'),
    (41, 16, 'Track', 10, 'Never too much promo', 'Luther Vandross', 1, '0.00', '2025-11-02 14:16:24'),
    (42, 16, 'T-Shirt and Hat', 0, 'Whitney Houston', 'Whitney Houston ', 1, '10.00', '2025-11-02 14:16:24'),
    (43, 17, 'Digital Album', 107, 'So Emotional', 'Whitney Houston ', 1, '10.00', '2025-11-02 14:26:26'),
    (44, 17, 'Track', 2, 'Before you love me promo', 'Alsou', 1, '0.00', '2025-11-02 14:26:26'),
    (45, 17, 'T-shirt', 0, 'Alsou', 'Alsou', 1, '7.00', '2025-11-02 14:26:26'),
    (46, 18, 'Track', 1, 'So emotional promo', 'Whitney Houston ', 1, '0.00', '2025-11-02 14:41:20'),
    (47, 18, 'Track', 2, 'Before you love me promo', 'Alsou', 1, '0.00', '2025-11-02 14:41:20'),
    (48, 18, 'Track', 6, 'Brown Sugar promo', 'Deagngelo', 1, '0.00', '2025-11-02 14:41:20'),
    (49, 18, 'Digital Album', 110, 'Tender Lover', 'BabyFace', 1, '13.00', '2025-11-02 14:41:20'),
    (50, 19, 'Digital Album', 107, 'So Emotional', 'Whitney Houston ', 1, '10.00', '2025-11-02 14:58:12'),
    (51, 19, 'Track', 2, 'Before you love me promo', 'Alsou', 1, '0.00', '2025-11-02 14:58:12'),
    (52, 20, 'Digital Album', 107, 'So Emotional', 'Whitney Houston ', 1, '10.00', '2025-11-02 15:13:40'),
    (53, 20, 'Track', 2, 'Before you love me promo', 'Alsou', 1, '0.00', '2025-11-02 15:13:40'),
    (54, 21, 'Track', 1, 'Test Track', 'Whitney Houston ', 1, '10.00', '2025-11-02 17:01:46'),
    (55, 22, 'Digital Album', 107, 'So Emotional', 'Whitney Houston ', 1, '10.00', '2025-11-02 17:10:37'),
    (56, 22, 'Track', 2, 'Before you love me promo', 'Alsou', 1, '0.00', '2025-11-02 17:10:37'),
    (57, 23, 'Digital Album', 109, 'Everyday', 'Anthony Brown', 1, '10.00', '2025-11-03 11:05:19'),
    (58, 23, 'Track', 3, 'Everyday Jesus', 'Anthony Brown', 1, '0.00', '2025-11-03 11:05:19'),
    (59, 24, 'Digital Album', 109, 'Everyday', 'Anthony Brown', 1, '10.00', '2025-11-03 11:21:43'),
    (60, 24, 'Track', 5, 'Baby one more time promo', 'Britney Spears', 1, '0.00', '2025-11-03 11:21:43'),
    (61, 24, 'T-shirt', 0, 'Alsou', 'Alsou', 1, '7.00', '2025-11-03 11:21:43'),
    (62, 25, 'Merchandise', 0, 'Alsou', 'Alsou', 1, '7.00', '2025-11-03 11:49:37'),
    (63, 25, 'Digital Album', 107, 'So Emotional', 'Whitney Houston ', 1, '10.00', '2025-11-03 11:49:37'),
    (64, 25, 'Track', 4, 'Whip Appeal', 'BabyFace', 1, '0.00', '2025-11-03 11:49:37'),
    (65, 26, 'Merchandise', 0, 'Alsou', 'Alsou', 1, '7.00', '2025-11-03 11:58:14'),
    (66, 27, 'Merchandise', 3, 'Alsou', 'Alsou', 1, '5.00', '2025-11-03 12:09:14'),
    (67, 28, 'Digital Album', 107, 'So Emotional', 'Whitney Houston ', 1, '10.00', '2025-11-03 12:33:53'),
    (68, 28, 'Track', 6, 'Brown Sugar promo', 'Deagngelo', 1, '0.00', '2025-11-03 12:33:53'),
    (69, 28, 'Merchandise', 1, 'Whitney Houston', 'Whitney Houston ', 1, '10.00', '2025-11-03 12:33:53'),
    (70, 29, 'Digital Album', 107, 'So Emotional', 'Whitney Houston ', 1, '10.00', '2025-11-03 12:54:20'),
    (71, 29, 'Track', 2, 'Before you love me promo', 'Alsou', 1, '0.00', '2025-11-03 12:54:20'),
    (72, 29, 'Merchandise', 5, 'BabyFace', 'BabyFace', 1, '15.00', '2025-11-03 12:54:20'),
    (73, 30, 'Digital Album', 108, 'Also is here  demo', 'Alsou', 1, '10.00', '2025-11-03 13:20:53'),
    (74, 30, 'Merchandise', 7, 'Deangelo', 'Deagngelo', 1, '10.00', '2025-11-03 13:20:53'),
    (75, 30, 'Track', 3, 'Everyday Jesus', 'Anthony Brown', 1, '0.00', '2025-11-03 13:20:53'),
    (76, 31, 'Digital Album', 110, 'Tender Lover', 'BabyFace', 1, '13.00', '2025-11-03 13:31:11'),
    (77, 31, 'Track', 3, 'Everyday Jesus', 'Anthony Brown', 1, '0.00', '2025-11-03 13:31:11'),
    (78, 31, 'Merchandise', 4, 'Anthony Brown', 'Anthony Brown', 1, '15.00', '2025-11-03 13:31:11'),
    (79, 32, 'Digital Album', 116, 'Luther Vandross I''m here demo', 'Luther Vandross', 1, '13.00', '2025-11-03 13:36:45'),
    (80, 32, 'Track', 2, 'Before you love me promo', 'Alsou', 1, '0.00', '2025-11-03 13:36:45'),
    (81, 32, 'Digital Album', 113, 'Classic Soul of Alexis FFrench', 'Alexis FFrench', 1, '11.00', '2025-11-03 13:36:45'),
    (82, 32, 'Merchandise', 6, 'Britney Spears', 'Britney Spears', 1, '10.50', '2025-11-03 13:36:45'),
    (83, 33, 'Digital Album', 107, 'So Emotional', 'Whitney Houston ', 1, '10.00', '2025-11-03 13:44:40'),
    (84, 33, 'Track', 4, 'Whip Appeal', 'BabyFace', 1, '0.00', '2025-11-03 13:44:40'),
    (85, 33, 'Merchandise', 2, 'Alsou', 'Alsou', 1, '7.00', '2025-11-03 13:44:40'),
    (86, 34, 'Digital Album', 107, 'So Emotional', 'Whitney Houston ', 1, '10.00', '2025-11-03 13:49:12'),
    (87, 34, 'Track', 4, 'Whip Appeal', 'BabyFace', 1, '0.00', '2025-11-03 13:49:12'),
    (88, 34, 'Merchandise', 6, 'Britney Spears', 'Britney Spears', 1, '10.50', '2025-11-03 13:49:12'),
    (89, 35, 'Digital Album', 107, 'So Emotional', 'Whitney Houston ', 1, '10.00', '2025-11-03 14:06:07'),
    (90, 35, 'Track', 2, 'Before you love me promo', 'Alsou', 1, '0.00', '2025-11-03 14:06:07'),
    (91, 35, 'Merchandise', 7, 'Deangelo', 'Deagngelo', 1, '10.00', '2025-11-03 14:06:07'),
    (92, 36, 'Digital Album', 107, 'So Emotional', 'Whitney Houston ', 1, '10.00', '2025-11-04 11:21:02'),
    (93, 37, 'Digital Album', 107, 'So Emotional', 'Whitney Houston ', 1, '10.00', '2025-11-04 11:24:17'),
    (94, 37, 'Track', 1, 'So emotional promo', 'Whitney Houston ', 1, '0.00', '2025-11-04 11:24:17'),
    (95, 37, 'Merchandise', 1, 'Whitney Houston', 'Whitney Houston ', 1, '10.00', '2025-11-04 11:24:17'),
    (96, 38, 'Digital Album', 107, 'So Emotional', 'Whitney Houston ', 1, '10.00', '2025-11-04 16:31:32'),
    (97, 39, 'Digital Album', 107, 'So Emotional', 'Whitney Houston ', 1, '10.00', '2025-11-04 17:21:58'),
    (98, 39, 'Track', 1, 'So emotional promo', 'Whitney Houston ', 1, '0.00', '2025-11-04 17:21:58'),
    (99, 39, 'Merchandise', 1, 'Whitney Houston', 'Whitney Houston ', 1, '10.00', '2025-11-04 17:21:58');
UNLOCK TABLES;


-- ============================================
-- Table: promotional_tracks
-- ============================================

DROP TABLE IF EXISTS `promotional_tracks`;

CREATE TABLE "promotional_tracks" (
  "id" bigint unsigned NOT NULL AUTO_INCREMENT,
  "artist_id" int DEFAULT NULL,
  "album_id" int DEFAULT NULL,
  "promote_track" tinyint(1) DEFAULT NULL,
  "title" text,
  "demos" text,
  "top_track" tinyint(1) DEFAULT NULL,
  "promo_audio_url" varchar(255) DEFAULT NULL,
  "activate" tinyint(1) DEFAULT NULL,
  "release_date" date DEFAULT NULL,
  "promo_audio_url_public_identifier" varchar(255) DEFAULT NULL,
  "audio_description" text,
  "tags" text,
  "file_size" text,
  "format" text,
  "genre" text,
  "artist_image_id" bigint DEFAULT NULL,
  "new_release" tinyint(1) DEFAULT '0',
  "recommended" tinyint(1) DEFAULT '0',
  "popular" tinyint(1) DEFAULT '0',
  "featured" tinyint(1) DEFAULT NULL,
  "purchase_link" varchar(255) DEFAULT NULL,
  "track_id" int DEFAULT NULL,
  PRIMARY KEY ("id"),
  UNIQUE KEY "id" ("id")
);

-- Data for promotional_tracks
LOCK TABLES `promotional_tracks` WRITE;
INSERT INTO `promotional_tracks` (`id`, `artist_id`, `album_id`, `promote_track`, `title`, `demos`, `top_track`, `promo_audio_url`, `activate`, `release_date`, `promo_audio_url_public_identifier`, `audio_description`, `tags`, `file_size`, `format`, `genre`, `artist_image_id`, `new_release`, `recommended`, `popular`, `featured`, `purchase_link`, `track_id`) VALUES
    (1, 20, 107, 1, 'So emotional promo', '1', 1, 'https://res.cloudinary.com/webprojectimages/video/upload/v1760302251/SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/a827e5c1d9fce8cbf95da8054fa10f26.mp3', 0, '2025-10-12 00:00:00', 'SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/a827e5c1d9fce8cbf95da8054fa10f26', NULL, NULL, '629467', 'mp3', 'pop soul', 0, 0, 0, 0, 1, 'https://music.amazon.in/tracks/B002DG247G', NULL),
    (2, 21, 108, 1, 'Before you love me promo', '1', 0, 'https://res.cloudinary.com/webprojectimages/video/upload/v1760302319/SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/9b7f41036c995d9f62d9d89e522221ed.mp3', 0, '2025-10-12 00:00:00', 'SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/9b7f41036c995d9f62d9d89e522221ed', NULL, NULL, '599688', 'mp3', 'pop', NULL, 0, 0, 1, 1, NULL, NULL),
    (3, 22, 109, 1, 'Everyday Jesus', '1', 1, 'https://res.cloudinary.com/webprojectimages/video/upload/v1760302423/SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/2bd812cb9c24c60662fd4f5ac94afee6.mp3', 0, '2025-10-12 00:00:00', 'SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/2bd812cb9c24c60662fd4f5ac94afee6', NULL, NULL, '599688', 'mp3', 'gospel', NULL, 0, 0, 0, 0, NULL, NULL),
    (4, 23, 110, 1, 'Whip Appeal', '1', 0, 'https://res.cloudinary.com/webprojectimages/video/upload/v1760302501/SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/7694f07652746dbdd619807e35a5e47d.mp3', 1, '2025-10-12 00:00:00', 'SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/7694f07652746dbdd619807e35a5e47d', NULL, NULL, '599688', 'mp3', 'soul', NULL, 1, 0, 1, 0, NULL, NULL),
    (5, 24, 111, 1, 'Baby one more time promo', '1', 1, 'https://res.cloudinary.com/webprojectimages/video/upload/v1760302572/SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/ff623977920aa9b8d50c1ebbfa3426d4.mp3', 0, '2025-10-12 00:00:00', 'SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/ff623977920aa9b8d50c1ebbfa3426d4', NULL, NULL, '599688', 'mp3', 'pop', NULL, 0, 0, 1, 0, NULL, NULL),
    (6, 25, 112, 1, 'Brown Sugar promo', '1', 0, 'https://res.cloudinary.com/webprojectimages/video/upload/v1760302640/SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/c6f6271c99439ee6da6a36777a1a0cd2.mp3', 0, '2025-10-12 00:00:00', 'SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/c6f6271c99439ee6da6a36777a1a0cd2', NULL, NULL, '569908', 'mp3', 'rnb soul', NULL, 1, 0, 0, 0, NULL, NULL),
    (7, 26, 113, 1, 'Classic soul promo', '1', 1, 'https://res.cloudinary.com/webprojectimages/video/upload/v1760302701/SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/47a4e29b7599c19e048e141fcd728bd2.mp3', 0, '2025-10-12 00:00:00', 'SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/47a4e29b7599c19e048e141fcd728bd2', NULL, NULL, '599688', 'mp3', 'instrumental soul', NULL, 0, 1, 1, 0, NULL, NULL),
    (8, 27, 114, 1, 'One in a Milllion promo', '1', 0, 'https://res.cloudinary.com/webprojectimages/video/upload/v1760302816/SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/0d61c01941ac0eb7642f4750f552ea8a.mp3', 0, '2025-10-12 00:00:00', 'SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/0d61c01941ac0eb7642f4750f552ea8a', NULL, NULL, '569908', 'mp3', 'soul', NULL, 1, 0, 1, 0, NULL, NULL),
    (9, 28, 115, 1, 'Dancing on the ceiling promo', '1', 1, 'https://res.cloudinary.com/webprojectimages/video/upload/v1760302881/SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/1ad26ba67ae90bf4d12ad45933cc9dd7.mp3', 0, '2025-10-12 00:00:00', 'SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/1ad26ba67ae90bf4d12ad45933cc9dd7', NULL, NULL, '599688', 'mp3', 'pop soul', NULL, 1, 0, 0, 0, NULL, NULL),
    (10, 29, 116, 1, 'Never too much promo', '1', 0, 'https://res.cloudinary.com/webprojectimages/video/upload/v1760302949/SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/1b48fe5aab228ee0d95e21d65ffbd502.mp3', 0, '2025-10-12 00:00:00', 'SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/1b48fe5aab228ee0d95e21d65ffbd502', NULL, NULL, '599688', 'mp3', 'rnb soul', NULL, 0, 0, 1, 1, NULL, NULL),
    (11, 30, 117, 1, 'No. more drama promo', '1', 0, 'https://res.cloudinary.com/webprojectimages/video/upload/v1760303021/SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/94acac2a3693835fa8ef2d355c5fea9a.mp3', 0, '2025-10-12 00:00:00', 'SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/94acac2a3693835fa8ef2d355c5fea9a', NULL, NULL, '599688', 'mp3', 'rnb soul', NULL, 1, 1, 0, 0, NULL, NULL),
    (12, 31, 118, 1, 'Thriller promo', '1', 0, 'https://res.cloudinary.com/webprojectimages/video/upload/v1760303069/SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/ccbd55da30eb0c03b54b851efc1cbe90.mp3', 0, '2025-10-12 00:00:00', 'SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/ccbd55da30eb0c03b54b851efc1cbe90', NULL, NULL, '599688', 'mp3', 'pop', NULL, 1, 0, 1, 1, NULL, NULL),
    (13, 32, 119, 1, 'Gotta tell you promo', '1', 0, 'https://res.cloudinary.com/webprojectimages/video/upload/v1760303144/SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/32507bf7794d56302235b622bfc2e348.mp3', 0, '2025-10-12 00:00:00', 'SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/32507bf7794d56302235b622bfc2e348', NULL, NULL, '599688', 'mp3', 'pop', NULL, 0, 1, 1, 0, NULL, NULL),
    (14, 33, 120, 1, 'Forever promo', '1', 0, 'https://res.cloudinary.com/webprojectimages/video/upload/v1760303206/SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/bd94f07f34352e50c45ed58aedf657e6.mp3', 0, '2025-10-12 00:00:00', 'SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/bd94f07f34352e50c45ed58aedf657e6', NULL, NULL, '629467', 'mp3', 'pop', NULL, 1, 1, 0, 1, NULL, NULL),
    (15, 34, 121, 1, 'All I do promo', '1', 0, 'https://res.cloudinary.com/webprojectimages/video/upload/v1760264403/SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/6099b272c5e187287d333c91ac09bc55.mp3', 0, '2025-10-12 00:00:00', 'SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/6099b272c5e187287d333c91ac09bc55', NULL, NULL, '599688', 'mp3', 'soul', NULL, 0, 1, 1, 1, NULL, NULL),
    (16, 35, 122, 1, 'You don''t have to call promo', '1', 0, 'https://res.cloudinary.com/webprojectimages/video/upload/v1760303335/SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/59379cb878e4e44da3abda2c73f7e110.mp3', 0, '2025-10-12 00:00:00', 'SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/59379cb878e4e44da3abda2c73f7e110', NULL, NULL, '629467', 'mp3', 'pop rnb', NULL, 1, 0, 1, 1, NULL, NULL);
UNLOCK TABLES;


-- ============================================
-- Table: promotional_videos
-- ============================================

DROP TABLE IF EXISTS `promotional_videos`;

CREATE TABLE "promotional_videos" (
  "id" bigint unsigned NOT NULL AUTO_INCREMENT,
  "artist_id" int DEFAULT NULL,
  "album_id" int DEFAULT NULL,
  "promo_video_url" varchar(255) DEFAULT NULL,
  "activate_video" tinyint(1) DEFAULT NULL,
  "demos" tinyint(1) DEFAULT NULL,
  "duration" int DEFAULT NULL,
  "release_date" date DEFAULT NULL,
  "title" text,
  "promo_video_url_public_identifier" varchar(255) DEFAULT NULL,
  "video_description" text,
  "tags" text,
  "file_size" text,
  "format" text,
  "genre" text,
  "artist_image_id" int DEFAULT NULL,
  "new_release" tinyint(1) DEFAULT '0',
  "recommended" tinyint(1) DEFAULT '0',
  "popular" tinyint(1) DEFAULT '0',
  "featured" tinyint(1) DEFAULT NULL,
  PRIMARY KEY ("id"),
  UNIQUE KEY "id" ("id")
);


-- ============================================
-- Table: purchases
-- ============================================

DROP TABLE IF EXISTS `purchases`;

CREATE TABLE "purchases" (
  "id" bigint unsigned NOT NULL AUTO_INCREMENT,
  "user_id" int DEFAULT NULL,
  "track_id" int DEFAULT NULL,
  "purchased_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  "demos" tinyint(1) DEFAULT NULL,
  "activate" tinyint(1) DEFAULT NULL,
  "stripe_payment_intent_id" varchar(255) DEFAULT NULL,
  "order_id" varchar(50) DEFAULT NULL,
  "amount" decimal(10,2) DEFAULT NULL,
  "currency" varchar(3) DEFAULT 'usd',
  "payment_status" varchar(50) DEFAULT 'pending',
  "customer_email" varchar(255) DEFAULT NULL,
  "customer_name" varchar(255) DEFAULT NULL,
  "shipping_address" text,
  "metadata" json DEFAULT NULL,
  "updated_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  "item_type" varchar(255) DEFAULT NULL COMMENT 'Comma-separated list of item types in this order (e.g., "Track, Album")',
  PRIMARY KEY ("id"),
  UNIQUE KEY "id" ("id"),
  UNIQUE KEY "stripe_payment_intent_id" ("stripe_payment_intent_id"),
  UNIQUE KEY "order_id" ("order_id"),
  KEY "idx_purchases_user_id" ("user_id"),
  KEY "idx_purchases_stripe_payment_intent" ("stripe_payment_intent_id"),
  KEY "idx_purchases_order_id" ("order_id"),
  KEY "idx_purchases_payment_status" ("payment_status"),
  KEY "idx_purchases_item_type" ("item_type")
);

-- Data for purchases
LOCK TABLES `purchases` WRITE;
INSERT INTO `purchases` (`id`, `user_id`, `track_id`, `purchased_at`, `demos`, `activate`, `stripe_payment_intent_id`, `order_id`, `amount`, `currency`, `payment_status`, `customer_email`, `customer_name`, `shipping_address`, `metadata`, `updated_at`, `item_type`) VALUES
    (1, NULL, NULL, '2025-11-01 10:44:18', NULL, NULL, 'pi_3SOcI9DkvlLubMet23XpO9GY', 'ORDER-1761993857718-G095HR9AU', '21.60', 'usd', 'pending', 'marlorouse109@yahoo.com', 'Marlo ', '"123 main st"', '{"ip":"::1","userAgent":"Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"}', '2025-11-01 10:44:18', NULL),
    (2, NULL, NULL, '2025-11-01 10:44:47', NULL, NULL, 'pi_3SOcIdDkvlLubMet1cuVyz2D', 'ORDER-1761993887627-K42H2AWDQ', '21.60', 'usd', 'pending', 'marlorouse109@yahoo.com', 'Marlo ', '"123 main st"', '{"ip":"::1","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}', '2025-11-01 10:44:47', NULL),
    (3, NULL, NULL, '2025-11-01 10:45:58', NULL, NULL, 'pi_3SOcJmDkvlLubMet3BCm26r0', 'ORDER-1761993958289-8YZTA4VXF', '21.60', 'usd', 'succeeded', 'marlorouse109@yahoo.com', 'Marlo ', '"123 main st"', '{"ip":"::1","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}', '2025-11-01 10:46:00', NULL),
    (4, NULL, NULL, '2025-11-01 11:31:34', NULL, NULL, 'pi_3SOd1uDkvlLubMet30UJIkAJ', 'ORDER-1761996694240-ZTWDX8980', '48.60', 'usd', 'succeeded', 'marlorouse109@yahoo.com', 'Marlo Test run 1', '"123 Main st"', '{"ip":"::1","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}', '2025-11-01 11:31:37', NULL),
    (5, NULL, NULL, '2025-11-01 11:43:01', NULL, NULL, 'pi_3SOdCzDkvlLubMet2fEkNtEY', 'ORDER-1761997381247-HTHI7HZIK', '7.56', 'usd', 'succeeded', 'marlorouse109@yahoo.com', 'Marlo Test run2', '"123 main st"', '{"ip":"::1","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}', '2025-11-01 11:43:04', NULL),
    (6, NULL, NULL, '2025-11-01 11:54:52', NULL, NULL, 'pi_3SOdOSDkvlLubMet0Qse3bWm', 'ORDER-1761998092545-ZI6R30B41', '30.24', 'usd', 'succeeded', 'marlorouse109@yahoo.com', 'Marlo test run3', '"123 main st"', '{"ip":"::1","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}', '2025-11-01 11:54:55', NULL),
    (7, NULL, NULL, '2025-11-01 12:03:45', NULL, NULL, 'pi_3SOdX3DkvlLubMet3I7Q9Nzw', 'ORDER-1761998625198-9HNH45QZ8', '21.60', 'usd', 'succeeded', 'marlorouse109@yahoo.com', 'Marlo test run4', '"123 main st"', '{"ip":"::1","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}', '2025-11-01 12:03:48', NULL),
    (8, NULL, NULL, '2025-11-01 13:01:53', NULL, NULL, 'pi_3SOeRJDkvlLubMet1Ie6Eqoo', 'ORDER-1762002113436-4M6S2J0HS', '41.04', 'usd', 'succeeded', 'marlorouse109@yahoo.com', 'Marlo Test run 5', '"123 MainSt"', '{"ip":"::1","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}', '2025-11-01 13:01:56', NULL),
    (9, NULL, NULL, '2025-11-01 13:32:22', NULL, NULL, 'pi_3SOeunDkvlLubMet2vgPq3DQ', 'ORDER-1762003941639-FVR4AR3VT', '76.14', 'usd', 'succeeded', 'marlorouse109@yahoo.com', 'Marlo Test run 6', '"123 Main st"', '{"ip":"::1","userAgent":"Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"}', '2025-11-01 13:32:24', 'Digital Album, Track, Hat, Shirt and Hat, T-shirt and hat, T-shirts and Hats'),
    (10, NULL, NULL, '2025-11-01 13:59:02', NULL, NULL, 'pi_3SOfKcDkvlLubMet3gOJqOYK', 'ORDER-1762005541968-HWH7HIU5Q', '54.00', 'usd', 'succeeded', 'marlorouse109@yahoo.com', 'Marlo Test run 8', '"123 mainSt"', '{"ip":"::1","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}', '2025-11-01 13:59:05', 'Digital Album'),
    (11, 2, NULL, '2025-11-01 14:55:19', NULL, NULL, 'pi_3SOgD5DkvlLubMet3askrGe2', 'ORDER-1762008919462-EJAHPHXCC', '25.92', 'usd', 'succeeded', 'marlorouse109@yahoo.com', 'Marlo Test run 9', '"123 main st"', '{"ip":"::1","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}', '2025-11-01 14:55:22', 'Digital Album, Track, T-shirt'),
    (12, 2, NULL, '2025-11-01 16:24:33', NULL, NULL, 'pi_3SOhbRDkvlLubMet0oxlmwBH', 'ORDER-1762014272993-MDJTJO5I7', '67.50', 'usd', 'succeeded', 'marlorouse109@yahoo.com', 'Marlo Test run10', '"123 Main St"', '{"ip":"::1","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}', '2025-11-01 16:24:36', 'Digital Album, T-shirt, Shirt and Hat, T-shirts and Hats'),
    (13, 2, NULL, '2025-11-02 11:49:55', NULL, NULL, 'pi_3SOznDDkvlLubMet2uFEeVfv', 'ORDER-1762084195565-97RVXWUBM', '10.80', 'usd', 'succeeded', 'Test16@yahoo.com', 'Marlo test 11', '"123 main st"', '{"ip":"::1","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}', '2025-11-02 11:49:58', 'Digital Album'),
    (14, NULL, NULL, '2025-11-02 13:46:30', NULL, NULL, 'pi_3SP1c2DkvlLubMet1q8Ys3t3', 'ORDER-1762091190098-E64QRUABV', '10.80', 'usd', 'succeeded', 'marlorouse109@yahoo.com', 'Marlo Test run12', '"123 Main st"', '{"ip":"::1","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}', '2025-11-02 13:46:33', 'Track, Digital Album'),
    (15, NULL, NULL, '2025-11-02 14:02:56', NULL, NULL, 'pi_3SP1rvDkvlLubMet2sGGPsxm', 'ORDER-1762092175583-4IPC9YGIB', '23.76', 'usd', 'succeeded', 'marlorouse109@yahoo.com', 'Marlo Test run 13', '"123 main st"', '{"ip":"::1","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}', '2025-11-02 14:02:59', 'Digital Album, Track, T-Shirt and Hat'),
    (16, NULL, NULL, '2025-11-02 14:16:24', NULL, NULL, 'pi_3SP24yDkvlLubMet4m7LrVIC', 'ORDER-1762092983995-VOHKQ11QQ', '32.40', 'usd', 'succeeded', 'marlorouse109@yahoo.com', 'Marlo Rouse test run 13', '"123 main st"', '{"ip":"::1","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}', '2025-11-02 14:16:28', 'Digital Album, Track, T-Shirt and Hat'),
    (17, NULL, NULL, '2025-11-02 14:26:26', NULL, NULL, 'pi_3SP2EgDkvlLubMet4ORdqBr8', 'ORDER-1762093586514-TVQ36HIV6', '18.36', 'usd', 'succeeded', 'marlorouse109@yahoo.com', 'Marlo Test run 14', '"123 main st"', '{"ip":"::1","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}', '2025-11-02 14:26:28', 'Digital Album, Track, T-shirt'),
    (18, NULL, NULL, '2025-11-02 14:41:20', NULL, NULL, 'pi_3SP2T6DkvlLubMet2fHABtRf', 'ORDER-1762094479955-D9PMP9PD8', '14.04', 'usd', 'succeeded', 'marlorouse109@yahoo.com', 'Marlo Rouse test run 15', '"123 Main st"', '{"ip":"::1","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}', '2025-11-02 14:41:22', 'Track, Digital Album'),
    (19, NULL, NULL, '2025-11-02 14:58:12', NULL, NULL, 'pi_3SP2jQDkvlLubMet3F0eV8g1', 'ORDER-1762095492185-PJB8Q88HS', '10.80', 'usd', 'succeeded', 'marlorouse109@yahoo.com', 'Marlo test 16', '"123 main st"', '{"ip":"::1","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}', '2025-11-02 14:58:15', 'Digital Album, Track'),
    (20, NULL, NULL, '2025-11-02 15:13:40', NULL, NULL, 'pi_3SP2yODkvlLubMet1sox4rhm', 'ORDER-1762096420155-DB7VTDTLI', '10.80', 'usd', 'succeeded', 'marlorouse109@yahoo.com', 'Marlo Rouse test run 17', '"123 main st"', '{"ip":"::1","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}', '2025-11-02 15:13:42', 'Digital Album, Track'),
    (21, NULL, NULL, '2025-11-02 17:01:46', NULL, NULL, 'pi_3SP4f0DkvlLubMet4CHLKbMQ', 'ORDER-1762102906044-T70BDXZOA', '10.00', 'usd', 'pending', 'test@example.com', 'Test Customer', '"123 Test St"', '{"ip":"::1","userAgent":"node"}', '2025-11-02 17:01:46', 'Track'),
    (22, NULL, NULL, '2025-11-02 17:10:37', NULL, NULL, 'pi_3SP4nZDkvlLubMet0QuYFuuc', 'ORDER-1762103437125-6U6IXMV90', '10.80', 'usd', 'succeeded', 'marlorouse109@yahoo.com', 'John Doe', '"123 main st"', '{"ip":"::1","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}', '2025-11-02 17:10:39', 'Digital Album, Track'),
    (23, NULL, NULL, '2025-11-03 11:05:19', NULL, NULL, 'pi_3SPLZbDkvlLubMet4nBsBbiG', 'ORDER-1762167919307-V4ZMCM92U', '10.80', 'usd', 'succeeded', 'marlorouse109@yahoo.com', 'Marlo Test run 6', '"123 main st"', '{"ip":"::1","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}', '2025-11-03 11:05:22', 'Digital Album, Track'),
    (24, NULL, NULL, '2025-11-03 11:21:43', NULL, NULL, 'pi_3SPLpTDkvlLubMet0XGa5eXq', 'ORDER-1762168903210-PTEYRQ5KN', '18.36', 'usd', 'succeeded', 'marlorouse109@yahoo.com', 'Marlo Test run 6', '"123 main st"', '{"ip":"::1","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}', '2025-11-03 11:21:46', 'Digital Album, Track, T-shirt'),
    (25, NULL, NULL, '2025-11-03 11:49:37', NULL, NULL, 'pi_3SPMGTDkvlLubMet08Om7pLG', 'ORDER-1762170577184-V5Z6C2ENN', '18.36', 'usd', 'succeeded', 'marlorouse109@yahoo.com', 'Marlo Test run 6', '{"address":"123 main st","city":"Jacksonville","state":"NC","zipCode":"28540","country":"US"}', '{"ip":"::1","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}', '2025-11-03 11:49:40', 'Merchandise, Digital Album, Track'),
    (26, NULL, NULL, '2025-11-03 11:58:14', NULL, NULL, 'pi_3SPMOoDkvlLubMet2bETnG4b', 'ORDER-1762171094153-7FLH3RAVO', '7.56', 'usd', 'succeeded', 'marlorouse109@yahoo.com', 'Marlo Test run 6', '{"address":"123 main st","city":"Jacksonville","state":"NC","zipCode":"28540","country":"US"}', '{"ip":"::1","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}', '2025-11-03 11:58:16', 'Merchandise'),
    (27, NULL, NULL, '2025-11-03 12:09:14', NULL, NULL, 'pi_3SPMZSDkvlLubMet0bIPLetD', 'ORDER-1762171754651-V9JFEDRRD', '5.40', 'usd', 'succeeded', 'marlorouse109@yahoo.com', 'Marlo Test run 6', '{"address":"123 main st","city":"Jacksonville","state":"NC","zipCode":"28540","country":"US"}', '{"ip":"::1","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}', '2025-11-03 12:09:17', 'Merchandise'),
    (28, NULL, NULL, '2025-11-03 12:33:53', NULL, NULL, 'pi_3SPMxJDkvlLubMet1aSuoG1R', 'ORDER-1762173233204-DA3J52PJV', '21.60', 'usd', 'succeeded', 'marlorouse109@yahoo.com', 'Marlo Test run 6', '{"address":"123 main st","city":"Jacksonville","state":"NC","zipCode":"28540","country":"US"}', '{"ip":"::1","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}', '2025-11-03 12:33:55', 'Digital Album, Track, Merchandise'),
    (29, NULL, NULL, '2025-11-03 12:54:20', NULL, NULL, 'pi_3SPNH6DkvlLubMet49AYIBwl', 'ORDER-1762174460398-U2OMPEEIY', '27.00', 'usd', 'succeeded', 'marlorouse109@yahoo.com', 'Marlo Test run 6', '{"address":"123 main st","city":"Jacksonville","state":"NC","zipCode":"28540","country":"US"}', '{"ip":"::1","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}', '2025-11-03 12:54:23', 'Digital Album, Track, Merchandise'),
    (30, NULL, NULL, '2025-11-03 13:20:53', NULL, NULL, 'pi_3SPNgnDkvlLubMet36jy65W0', 'ORDER-1762176052754-VEFQBJCYJ', '21.60', 'usd', 'succeeded', 'marlorouse109@yahoo.com', 'Marlo Test run 6', '{"address":"123 Main st","city":"Jacksonville","state":"NC","zipCode":"28540","country":"US"}', '{"ip":"::1","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}', '2025-11-03 13:20:56', 'Digital Album, Merchandise, Track'),
    (31, NULL, NULL, '2025-11-03 13:31:11', NULL, NULL, 'pi_3SPNqlDkvlLubMet1smBPZ2i', 'ORDER-1762176671141-IO3GF57UL', '30.24', 'usd', 'succeeded', 'marlorouse109@yahoo.com', 'Marlo Test run 6', '{"address":"123 Main st","city":"Jacksonville","state":"NC","zipCode":"28540","country":"US"}', '{"ip":"::1","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}', '2025-11-03 13:31:17', 'Digital Album, Track, Merchandise'),
    (32, NULL, NULL, '2025-11-03 13:36:45', NULL, NULL, 'pi_3SPNw9DkvlLubMet2y7kZcRa', 'ORDER-1762177004958-S6K84NNOJ', '37.26', 'usd', 'succeeded', 'marlorouse109@yahoo.com', 'Marlo Test run 6', '{"address":"123 Main st","city":"Jacksonville","state":"NC","zipCode":"28540","country":"US"}', '{"ip":"::1","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}', '2025-11-03 13:36:47', 'Digital Album, Track, Merchandise'),
    (33, NULL, NULL, '2025-11-03 13:44:40', NULL, NULL, 'pi_3SPO3oDkvlLubMet17KsBQ4U', 'ORDER-1762177480313-CQNQ1VO5F', '18.36', 'usd', 'succeeded', 'marlorouse109@yahoo.com', 'Marlo Test run 6', '{"address":"123 Main st","city":"Jacksonville","state":"NC","zipCode":"28540","country":"US"}', '{"ip":"::1","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}', '2025-11-03 13:44:43', 'Digital Album, Track, Merchandise'),
    (34, NULL, NULL, '2025-11-03 13:49:12', NULL, NULL, 'pi_3SPO8CDkvlLubMet0x1U7fu6', 'ORDER-1762177752112-V7K8RFYDO', '22.14', 'usd', 'succeeded', 'marlorouse109@yahoo.com', 'Marlo Test run 6', '{"address":"123 Main st","city":"Jacksonville","state":"NC","zipCode":"28540","country":"US"}', '{"ip":"::1","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}', '2025-11-03 13:49:13', 'Digital Album, Track, Merchandise'),
    (35, NULL, NULL, '2025-11-03 14:06:07', NULL, NULL, 'pi_3SPOOZDkvlLubMet3QEalgis', 'ORDER-1762178767455-YM4L4AA3G', '21.60', 'usd', 'succeeded', 'marlorouse109@yahoo.com', 'Marlo Test run 6', '{"address":"123 Main st","city":"Jacksonville","state":"NC","zipCode":"28540","country":"US"}', '{"ip":"::1","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}', '2025-11-03 14:06:10', 'Digital Album, Track, Merchandise'),
    (36, NULL, NULL, '2025-11-04 11:21:02', NULL, NULL, 'pi_3SPiIMDkvlLubMet1R5BtEjc', 'ORDER-1762255262389-B5L75BXJJ', '10.80', 'usd', 'succeeded', 'marlorouse109@yahoo.com', 'Marlo Test run 6', '{"address":"","city":"","state":"","zipCode":"","country":"US"}', '{"ip":"::1","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}', '2025-11-04 11:21:05', 'Digital Album'),
    (37, NULL, NULL, '2025-11-04 11:24:17', NULL, NULL, 'pi_3SPiLVDkvlLubMet1sfN13OL', 'ORDER-1762255456781-V2NZ4ZTHN', '21.60', 'usd', 'succeeded', 'marlorouse109@yahoo.com', 'Marlo Test run 6', '{"address":"123 Main st","city":"Jacksonville","state":"NC","zipCode":"28540","country":"US"}', '{"ip":"::1","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}', '2025-11-04 11:24:19', 'Digital Album, Track, Merchandise'),
    (38, NULL, NULL, '2025-11-04 16:31:31', NULL, NULL, 'pi_3SPn8pDkvlLubMet14lMyzTL', 'ORDER-1762273891698-IFSVT3SVC', '10.80', 'usd', 'succeeded', 'marlorouse109@yahoo.com', 'Marlo Test run 6', '{"address":"","city":"","state":"","zipCode":"","country":"US"}', '{"ip":"::1","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}', '2025-11-04 16:31:34', 'Digital Album'),
    (39, NULL, NULL, '2025-11-04 17:21:58', NULL, NULL, 'pi_3SPnvdDkvlLubMet1qswysmL', 'ORDER-1762276917759-99QWXFK9Q', '21.60', 'usd', 'succeeded', 'marlorouse109@yahoo.com', 'Marlo Test run 6', '{"address":"123 Main st","city":"Jacksonville","state":"NC","zipCode":"28540","country":"US"}', '{"ip":"::1","userAgent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"}', '2025-11-04 17:22:00', 'Digital Album, Track, Merchandise');
UNLOCK TABLES;


-- ============================================
-- Table: track_plays
-- ============================================

DROP TABLE IF EXISTS `track_plays`;

CREATE TABLE "track_plays" (
  "id" bigint NOT NULL AUTO_INCREMENT,
  "track_id" bigint unsigned NOT NULL,
  "artist_id" bigint unsigned NOT NULL,
  "user_id" bigint DEFAULT NULL,
  "played_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  "ip_address" varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  "session_id" varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  "user_agent" text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY ("id"),
  KEY "idx_artist_plays" ("artist_id","played_at"),
  KEY "idx_track_plays" ("track_id","played_at"),
  KEY "idx_session_plays" ("session_id","played_at"),
  KEY "user_id" ("user_id"),
  CONSTRAINT "track_plays_ibfk_1" FOREIGN KEY ("artist_id") REFERENCES "artists" ("id") ON DELETE CASCADE,
  CONSTRAINT "track_plays_ibfk_2" FOREIGN KEY ("track_id") REFERENCES "tracks" ("id") ON DELETE CASCADE,
  CONSTRAINT "track_plays_ibfk_3" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE SET NULL
);

-- Data for track_plays
LOCK TABLES `track_plays` WRITE;
INSERT INTO `track_plays` (`id`, `track_id`, `artist_id`, `user_id`, `played_at`, `ip_address`, `session_id`, `user_agent`) VALUES
    (1, 7, 26, NULL, '2025-10-22 21:07:54', '107.12.152.42', 'session_1761167273724_0ie5u9sgy', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'),
    (2, 13, 32, NULL, '2025-10-22 21:08:30', '107.12.152.42', 'session_1761167273724_0ie5u9sgy', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'),
    (3, 3, 22, NULL, '2025-10-22 21:36:59', '107.12.152.42', 'session_1761167273724_0ie5u9sgy', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'),
    (4, 3, 22, NULL, '2025-10-22 21:37:05', '107.12.152.42', 'session_1761167273724_0ie5u9sgy', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'),
    (5, 3, 22, NULL, '2025-10-22 21:42:21', '107.12.152.42', 'session_1761167273724_0ie5u9sgy', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'),
    (6, 1, 20, NULL, '2025-10-23 17:22:38', '107.12.152.42', 'session_1761167273724_0ie5u9sgy', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'),
    (7, 16, 35, NULL, '2025-10-23 17:59:42', '107.12.152.42', 'session_1761167273724_0ie5u9sgy', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'),
    (8, 2, 21, NULL, '2025-10-23 18:13:18', '107.12.152.42', 'session_1761167273724_0ie5u9sgy', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'),
    (9, 3, 22, NULL, '2025-10-23 19:30:23', '107.12.152.42', 'session_1761167273724_0ie5u9sgy', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'),
    (10, 7, 26, NULL, '2025-10-23 20:01:01', '107.12.152.42', 'session_1761167273724_0ie5u9sgy', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'),
    (11, 6, 25, NULL, '2025-10-23 20:01:21', '107.12.152.42', 'session_1761167273724_0ie5u9sgy', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'),
    (12, 10, 29, NULL, '2025-10-23 20:01:43', '107.12.152.42', 'session_1761167273724_0ie5u9sgy', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'),
    (13, 3, 22, NULL, '2025-10-24 11:25:13', '107.12.152.42', 'session_1761167273724_0ie5u9sgy', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'),
    (14, 9, 28, NULL, '2025-10-25 13:48:08', '107.12.152.42', 'session_1761167273724_0ie5u9sgy', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'),
    (15, 1, 20, NULL, '2025-10-30 13:25:32', '107.12.152.42', 'session_1761167273724_0ie5u9sgy', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'),
    (16, 3, 22, NULL, '2025-10-30 16:43:23', '107.12.152.42', 'session_1761167273724_0ie5u9sgy', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'),
    (17, 3, 22, NULL, '2025-10-30 19:37:23', '107.12.152.42', 'session_1761167273724_0ie5u9sgy', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'),
    (18, 7, 26, NULL, '2025-10-30 19:37:35', '107.12.152.42', 'session_1761167273724_0ie5u9sgy', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'),
    (19, 1, 20, NULL, '2025-11-01 12:33:00', '107.12.152.42', 'session_1761167273724_0ie5u9sgy', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'),
    (20, 1, 20, NULL, '2025-11-01 12:33:04', '107.12.152.42', 'session_1761167273724_0ie5u9sgy', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'),
    (21, 1, 20, NULL, '2025-11-01 14:11:21', '107.12.152.42', 'session_1761167273724_0ie5u9sgy', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'),
    (22, 1, 20, NULL, '2025-11-01 14:33:16', '107.12.152.42', 'session_1761167273724_0ie5u9sgy', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'),
    (23, 1, 20, NULL, '2025-11-02 23:45:54', '107.12.152.42', 'session_1761167273724_0ie5u9sgy', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36');
UNLOCK TABLES;


-- ============================================
-- Table: tracks
-- ============================================

DROP TABLE IF EXISTS `tracks`;

CREATE TABLE "tracks" (
  "id" bigint unsigned NOT NULL AUTO_INCREMENT,
  "album_id" int DEFAULT NULL,
  "title" varchar(100) NOT NULL,
  "duration" int DEFAULT NULL,
  "audio_url" varchar(255) DEFAULT NULL,
  "demos" tinyint(1) DEFAULT NULL,
  "top_track" tinyint(1) DEFAULT NULL,
  "activate" tinyint(1) DEFAULT NULL,
  "release_date" date DEFAULT NULL,
  "audio_url_public_identifier" varchar(255) DEFAULT NULL,
  "tags" text,
  "file_size" text,
  "format" text,
  "audio_description" text,
  "genre" text,
  "track_pricing" int DEFAULT NULL,
  "top_tracks" tinyint(1) DEFAULT '0',
  "artist_image_id" int DEFAULT NULL,
  "artist_id" int DEFAULT NULL,
  "new_release" tinyint(1) DEFAULT '0',
  "recommended" tinyint(1) DEFAULT '0',
  "popular" tinyint(1) DEFAULT '0',
  "featured" tinyint(1) DEFAULT NULL,
  "purchase_link" varchar(255) DEFAULT NULL,
  "stripe_active" tinyint DEFAULT NULL,
  PRIMARY KEY ("id"),
  UNIQUE KEY "id" ("id"),
  KEY "idx_tracks_top_tracks" ("top_tracks"),
  KEY "idx_tracks_flags" ("top_tracks")
);

-- Data for tracks
LOCK TABLES `tracks` WRITE;
INSERT INTO `tracks` (`id`, `album_id`, `title`, `duration`, `audio_url`, `demos`, `top_track`, `activate`, `release_date`, `audio_url_public_identifier`, `tags`, `file_size`, `format`, `audio_description`, `genre`, `track_pricing`, `top_tracks`, `artist_image_id`, `artist_id`, `new_release`, `recommended`, `popular`, `featured`, `purchase_link`, `stripe_active`) VALUES
    (1, 107, 'So Emotional', NULL, 'https://res.cloudinary.com/webprojectimages/video/upload/v1760301374/SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/a5bd41e399f60a1f56af6ce4b4043b2d.mp3', 1, 0, 0, '2025-10-09 00:00:00', 'SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/a5bd41e399f60a1f56af6ce4b4043b2d', NULL, NULL, NULL, NULL, 'Pop, Soul', NULL, 1, 17, 20, 1, 1, 1, 0, 'https://music.amazon.in/tracks/B002DG247G', NULL),
    (2, 108, 'Before you love me', NULL, 'https://res.cloudinary.com/webprojectimages/video/upload/v1760301472/SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/604fe38f29202db95aa63862e5fe5a06.mp3', 1, 0, 0, '2025-10-09 00:00:00', 'SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/604fe38f29202db95aa63862e5fe5a06', NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 21, 0, 0, 0, 1, NULL, NULL),
    (3, 109, 'Everyday', NULL, 'https://res.cloudinary.com/webprojectimages/video/upload/v1760301529/SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/8da99134f3aad10ffafa002f21639e81.mp3', 1, 0, 0, '2025-10-09 00:00:00', 'SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/8da99134f3aad10ffafa002f21639e81', NULL, NULL, NULL, NULL, 'gospel', NULL, 1, NULL, 22, 0, 0, 0, 0, NULL, NULL),
    (4, 110, 'Whip Appeal', NULL, 'https://res.cloudinary.com/webprojectimages/video/upload/v1760301583/SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/95871f45cad0f48ea2378b5e436c0368.mp3', 1, 0, 0, '2025-10-09 00:00:00', 'SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/95871f45cad0f48ea2378b5e436c0368', NULL, NULL, NULL, NULL, 'rnb soul ', NULL, 0, NULL, 23, 0, 0, 0, 1, NULL, NULL),
    (5, 111, 'Baby one more time', NULL, 'https://res.cloudinary.com/webprojectimages/video/upload/v1760301628/SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/fd41fba199786f5ed0ddb32cd840bdc9.mp3', 1, 0, 0, '2025-10-09 00:00:00', 'SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/fd41fba199786f5ed0ddb32cd840bdc9', NULL, NULL, NULL, NULL, 'pop', NULL, 1, NULL, 24, 0, 0, 1, 1, NULL, NULL),
    (6, 112, 'Brown Sugar', NULL, 'https://res.cloudinary.com/webprojectimages/video/upload/v1760301656/SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/9bd10aea9987b56f96d6dfa0b79aaa0a.mp3', 1, 0, 0, '2025-10-09 00:00:00', 'SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/9bd10aea9987b56f96d6dfa0b79aaa0a', NULL, NULL, NULL, NULL, 'rnb soul', NULL, 0, NULL, 25, 0, 1, 0, 1, NULL, NULL),
    (7, 113, 'Classic Soul', NULL, 'https://res.cloudinary.com/webprojectimages/video/upload/v1760301700/SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/49757a35e97b8e920d4155ce840e81d0.mp3', 1, 0, 0, '2025-10-09 00:00:00', 'SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/49757a35e97b8e920d4155ce840e81d0', NULL, NULL, NULL, NULL, 'easylistening', NULL, 1, NULL, 26, 1, 0, 1, 1, NULL, NULL),
    (8, 114, 'One in a Million', NULL, 'https://res.cloudinary.com/webprojectimages/video/upload/v1760301749/SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/a6893a4ddb8eff61bd7e6399c17fdab3.mp3', 1, 0, 0, '2025-10-09 00:00:00', 'SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/a6893a4ddb8eff61bd7e6399c17fdab3', NULL, NULL, NULL, NULL, 'soul', NULL, 0, NULL, 27, 1, 0, 0, 1, NULL, NULL),
    (9, 115, 'Dancing on the Ceiling', NULL, 'https://res.cloudinary.com/webprojectimages/video/upload/v1760301792/SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/78c79adc89b6a1cb85c042ec2d5ff13c.mp3', 1, 0, 0, '2025-10-09 00:00:00', 'SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/78c79adc89b6a1cb85c042ec2d5ff13c', NULL, NULL, NULL, NULL, 'Pop rock', NULL, 1, NULL, 28, 0, 0, 0, 0, NULL, NULL),
    (10, 116, 'Luther Vandross I''m here', NULL, 'https://res.cloudinary.com/webprojectimages/video/upload/v1760301821/SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/dec4b681c74d6c74a6920ec2704a5827.mp3', 1, 0, 0, '2025-10-09 00:00:00', 'SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/dec4b681c74d6c74a6920ec2704a5827', NULL, NULL, NULL, NULL, 'rnb soul', NULL, 0, NULL, 29, 0, 1, 1, 1, NULL, NULL),
    (11, 117, 'No More Drama', NULL, 'https://res.cloudinary.com/webprojectimages/video/upload/v1760301851/SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/f85462ba570e6d7ca97e973c754298a7.mp3', 1, 0, 0, '2025-10-09 00:00:00', 'SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/f85462ba570e6d7ca97e973c754298a7', NULL, NULL, NULL, NULL, 'rnb', NULL, 0, NULL, 30, 1, 1, 0, 1, NULL, NULL),
    (12, 118, 'Thriller', NULL, 'https://res.cloudinary.com/webprojectimages/video/upload/v1760301885/SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/5306fac18081902865152b809896a8cd.mp3', 1, 0, 0, '2025-10-09 00:00:00', 'SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/5306fac18081902865152b809896a8cd', NULL, NULL, NULL, NULL, 'pop', NULL, 0, NULL, 31, 0, 1, 0, 1, NULL, NULL),
    (13, 119, 'Gotta Tell you', NULL, 'https://res.cloudinary.com/webprojectimages/video/upload/v1760301913/SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/a7c078da11aed9793555eb28cc24490d.mp3', 1, 0, 0, '2025-10-09 00:00:00', 'SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/a7c078da11aed9793555eb28cc24490d', NULL, NULL, NULL, NULL, 'pop', NULL, 0, NULL, 32, 0, 1, 0, 0, NULL, NULL),
    (14, 120, 'Forever ', NULL, 'https://res.cloudinary.com/webprojectimages/video/upload/v1760301943/SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/dd343ae8c254d03f00cc16c813b249ff.mp3', 1, 0, 0, '2025-10-09 00:00:00', 'SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/dd343ae8c254d03f00cc16c813b249ff', NULL, NULL, NULL, NULL, 'pop', NULL, 0, NULL, 33, 1, 1, 0, 0, NULL, NULL),
    (15, 121, 'All I do', NULL, 'https://res.cloudinary.com/webprojectimages/video/upload/v1760301983/SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/fcfca40cf7fe752faadf3790ece82f51.mp3', 1, 0, 0, '2025-10-09 00:00:00', 'SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/fcfca40cf7fe752faadf3790ece82f51', NULL, NULL, NULL, NULL, 'soul', NULL, 0, NULL, 34, 0, 1, 1, 0, NULL, NULL),
    (16, 122, 'You don''t have to call', NULL, 'https://res.cloudinary.com/webprojectimages/video/upload/v1760302022/SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/d4c307b8b3505e6bedf72e9f900776e8.mp3', 1, 0, 0, '2025-10-09 00:00:00', 'SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack/d4c307b8b3505e6bedf72e9f900776e8', NULL, NULL, NULL, NULL, 'rnb pop', NULL, 0, NULL, 35, 0, 1, 0, 1, NULL, NULL);
UNLOCK TABLES;


-- ============================================
-- Table: user
-- ============================================

DROP TABLE IF EXISTS `user`;

CREATE TABLE "user" (
  "id" bigint NOT NULL AUTO_INCREMENT,
  "username" varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  "first_name" varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  "last_name" varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  "email" varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  "newsletter_subscribed" tinyint DEFAULT NULL,
  "password_hash" varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  "profile_image" varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  "email_verified" tinyint(1) DEFAULT '0',
  "is_active" tinyint(1) DEFAULT '1',
  "demo_access" tinyint(1) DEFAULT '0',
  "last_login" timestamp NULL DEFAULT NULL,
  "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY ("id"),
  UNIQUE KEY "username" ("username"),
  UNIQUE KEY "email" ("email"),
  KEY "idx_username" ("username"),
  KEY "idx_email" ("email"),
  KEY "idx_is_active" ("is_active"),
  KEY "idx_newsletter_subscribed" ("newsletter_subscribed")
);

-- Data for user
LOCK TABLES `user` WRITE;
INSERT INTO `user` (`id`, `username`, `first_name`, `last_name`, `email`, `newsletter_subscribed`, `password_hash`, `profile_image`, `email_verified`, `is_active`, `demo_access`, `last_login`, `created_at`, `updated_at`) VALUES
    (1, 'Test15', 'Marlo', 'R', 'Test15@yahoo.com', NULL, '$2b$10$xgjynbtW9wA1vJM7v2DFc.buYt0phVxOiUtj0kJ9gfyJuOGg524He', NULL, 1, 1, 0, '2025-10-22 17:23:31', '2025-10-22 17:23:31', '2025-10-22 17:23:31'),
    (2, 'Test16@yahoo.com', 'Marlo', 'R', 'Test16@yahoo.com', 1, '$2b$10$Bk6bE.eXIoxW2Mz5.P1/2uDr.f4tlGCiEIpn1JMnE0xCzk/ahLPE2', NULL, 1, 1, 0, '2025-10-22 17:31:22', '2025-10-22 17:31:22', '2025-10-28 17:49:18');
UNLOCK TABLES;


-- ============================================
-- Table: user_artist_follows
-- ============================================

DROP TABLE IF EXISTS `user_artist_follows`;

CREATE TABLE "user_artist_follows" (
  "id" bigint NOT NULL AUTO_INCREMENT,
  "user_id" bigint NOT NULL,
  "artist_id" bigint unsigned NOT NULL,
  "followed_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id"),
  UNIQUE KEY "unique_follow" ("user_id","artist_id"),
  KEY "idx_user_follows" ("user_id"),
  KEY "idx_artist_followers" ("artist_id"),
  CONSTRAINT "user_artist_follows_ibfk_1" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE,
  CONSTRAINT "user_artist_follows_ibfk_2" FOREIGN KEY ("artist_id") REFERENCES "artists" ("id") ON DELETE CASCADE
);

-- Data for user_artist_follows
LOCK TABLES `user_artist_follows` WRITE;
INSERT INTO `user_artist_follows` (`id`, `user_id`, `artist_id`, `followed_at`) VALUES
    (2, 1, 22, '2025-10-22 19:26:53');
UNLOCK TABLES;


-- ============================================
-- Table: videos
-- ============================================

DROP TABLE IF EXISTS `videos`;

CREATE TABLE "videos" (
  "id" bigint unsigned NOT NULL AUTO_INCREMENT,
  "track_id" int DEFAULT NULL,
  "video_url" varchar(255) DEFAULT NULL,
  "promo" text,
  "activate" tinyint(1) DEFAULT NULL,
  "demos" tinyint(1) DEFAULT NULL,
  "release_date" date DEFAULT NULL,
  "title" text,
  "video_url_public_identifier" varchar(255) DEFAULT NULL,
  "video_description" text,
  "tags" text,
  "file_size" text,
  "format" text,
  "genre" text,
  "artist_id" int DEFAULT NULL,
  "album_id" int DEFAULT NULL,
  "artist_image_id" int DEFAULT NULL,
  "new_release" tinyint(1) DEFAULT '0',
  "recommended" tinyint(1) DEFAULT '0',
  "popular" tinyint(1) DEFAULT '0',
  "featured" tinyint(1) DEFAULT NULL,
  PRIMARY KEY ("id"),
  UNIQUE KEY "id" ("id")
);

-- Data for videos
LOCK TABLES `videos` WRITE;
INSERT INTO `videos` (`id`, `track_id`, `video_url`, `promo`, `activate`, `demos`, `release_date`, `title`, `video_url_public_identifier`, `video_description`, `tags`, `file_size`, `format`, `genre`, `artist_id`, `album_id`, `artist_image_id`, `new_release`, `recommended`, `popular`, `featured`) VALUES
    (17, 1, 'https://www.youtube.com/watch?v=0YjSHbA6HQQ&list=RD0YjSHbA6HQQ&start_radio=1', '0', 1, 1, '2025-10-12 00:00:00', 'So Emotional ', NULL, NULL, NULL, NULL, NULL, 'pop soul', 20, 107, NULL, 0, 1, 0, 1),
    (18, 2, 'https://www.youtube.com/watch?v=oCLnpQcqBAo&list=RDoCLnpQcqBAo&start_radio=1', '0', 1, 1, '2025-10-12 00:00:00', 'Before you love me ', NULL, 'empty', NULL, NULL, NULL, 'Pop', 21, 108, NULL, 0, 0, 0, 0),
    (19, 3, 'https://www.youtube.com/watch?v=6Pm8ika_xCY&list=RD6Pm8ika_xCY&start_radio=1', '1', 1, 1, '2025-10-12 00:00:00', 'Everyday Jesus', NULL, 'empty', NULL, NULL, NULL, 'Funk Soul', 22, 108, NULL, 0, 0, 1, 0),
    (20, 4, 'https://www.youtube.com/watch?v=aFrdgZ4echY&list=PLnuHwzS0AZ1mPbn7BUFjIeSjHil_yyEgM&index=14', '0', 1, 1, '2025-10-12 00:00:00', 'Whip Appeal', NULL, NULL, NULL, NULL, NULL, 'soul', 23, 110, NULL, 1, 0, 0, 0),
    (21, 5, 'https://www.youtube.com/watch?v=C-u5WLJ9Yk4&list=RDC-u5WLJ9Yk4&start_radio=1', '0', 1, 1, '2025-10-12 00:00:00', 'Baby one more time', NULL, NULL, NULL, NULL, NULL, 'pop', 24, 111, NULL, 1, 1, 0, 1),
    (22, 6, 'https://www.youtube.com/watch?v=H_WzjiTzZBA&list=RDH_WzjiTzZBA&start_radio=1', '1', 1, 1, '2025-10-12 00:00:00', 'Brown Sugar', NULL, NULL, NULL, NULL, NULL, 'soul', 25, 112, NULL, 0, 0, 1, 1),
    (23, 7, 'https://www.youtube.com/watch?v=MYycDyAxgb0', '1', 1, 1, '2025-10-12 00:00:00', 'One in a Million', NULL, NULL, NULL, NULL, NULL, 'Soul', 27, 114, NULL, 0, 0, 1, 0),
    (24, 8, 'https://www.youtube.com/watch?v=tCvzjsq85B0', '1', 1, 1, '2025-10-12 00:00:00', 'Great Soul Classic', NULL, NULL, NULL, NULL, NULL, 'Instrumental', 26, 113, NULL, 0, 0, 0, 1),
    (25, 9, 'https://www.youtube.com/watch?v=ovo6zwv6DX4&list=RDovo6zwv6DX4&start_radio=1', '0', 1, 1, '2025-10-12 00:00:00', 'Dancing on the ceiling', NULL, NULL, NULL, NULL, NULL, 'pop ', 28, 115, NULL, 1, 1, 1, 1),
    (26, 10, 'https://www.youtube.com/watch?v=pNj9bXKGOiI&list=RDpNj9bXKGOiI&start_radio=1', '0', 1, 1, '2025-10-12 00:00:00', 'Never too much', NULL, NULL, NULL, NULL, NULL, 'rnb soul', 29, 116, NULL, 0, 1, 1, 0),
    (27, 11, 'https://www.youtube.com/watch?v=em328ua_Lo8&list=RDem328ua_Lo8&start_radio=1', '0', 1, 1, '2025-10-12 00:00:00', 'No more drama', NULL, NULL, NULL, NULL, NULL, 'rnb ', 30, 117, NULL, 1, 0, 1, 1),
    (28, 12, 'https://www.youtube.com/watch?v=4V90AmXnguw&list=RD4V90AmXnguw&start_radio=1', '0', 1, 1, '2025-10-12 00:00:00', 'Thriller', NULL, NULL, NULL, NULL, NULL, 'pop', 31, 118, NULL, 1, 1, 1, 1),
    (29, 13, 'https://www.youtube.com/watch?v=wZ_SpYYZ-wk&list=RDwZ_SpYYZ-wk&start_radio=1', '0', 1, 1, '2025-10-12 00:00:00', 'Gotta tell you', NULL, NULL, NULL, NULL, NULL, 'pop', 32, 119, NULL, 0, 0, 0, 0),
    (30, 14, 'https://www.youtube.com/watch?v=v1MTKS-1OHU&list=PLF0AhMBAen_tbiM5nvxwzfRGzp1GUm__I', '0', 1, 0, '2025-10-12 00:00:00', 'Forever', NULL, NULL, NULL, NULL, NULL, 'pop', 33, 120, NULL, 0, 1, 0, 1),
    (31, 15, 'https://www.youtube.com/watch?v=-bnx_Qwy7w4&list=PLH_QLWlQVieXC4USNqUc0tdv1EwRxlJC0&index=2', '0', 1, 1, '2025-10-12 00:00:00', 'All I do', NULL, NULL, NULL, NULL, NULL, 'soul', 34, 121, NULL, 0, 0, 1, 0),
    (32, 16, 'https://www.youtube.com/watch?v=3AszPTJXIgM&list=RD3AszPTJXIgM&start_radio=1', '0', 1, 1, '2025-10-12 00:00:00', 'You Don''t have to call', NULL, NULL, NULL, NULL, NULL, 'pop rnb', 35, 122, NULL, 1, 1, 0, 1),
    (34, 1, 'https://www.youtube.com/watch?v=3JWTaaS7LdU&list=RD3JWTaaS7LdU&start_radio=1', '1', 1, 1, '2025-10-02 00:00:00', 'I will always love you', NULL, NULL, NULL, NULL, NULL, 'Pop, Soul', 20, 107, NULL, NULL, NULL, NULL, NULL);
UNLOCK TABLES;


-- ============================================
-- Table: website_mode
-- ============================================

DROP TABLE IF EXISTS `website_mode`;

CREATE TABLE "website_mode" (
  "id" int NOT NULL AUTO_INCREMENT,
  "demo" tinyint(1) NOT NULL,
  PRIMARY KEY ("id")
);


-- ============================================
-- Table: website_settings
-- ============================================

DROP TABLE IF EXISTS `website_settings`;

CREATE TABLE "website_settings" (
  "id" int NOT NULL AUTO_INCREMENT,
  "business_name" varchar(255) DEFAULT 'Soul Felt Music',
  "logo_url" varchar(500) DEFAULT NULL,
  "favicon_url" varchar(500) DEFAULT NULL,
  "primary_color" varchar(7) DEFAULT '#aa2a46',
  "secondary_color" varchar(7) DEFAULT '#d63c65',
  "accent_color" varchar(7) DEFAULT '#fffced',
  "background_color" varchar(7) DEFAULT '#1a1b22',
  "card_background" varchar(7) DEFAULT '#21212b',
  "text_primary" varchar(7) DEFAULT '#fffced',
  "text_secondary" varchar(7) DEFAULT '#ffffff',
  "contact_email" varchar(255) DEFAULT NULL,
  "contact_phone" varchar(50) DEFAULT NULL,
  "contact_address" text,
  "social_media_links" json DEFAULT NULL,
  "terms_of_service" text,
  "cloudinary_cloud_name" varchar(255) DEFAULT NULL,
  "cloudinary_audio_folder" varchar(255) DEFAULT 'SoulFeltMusic/SoulFeltMusicAudio',
  "cloudinary_image_folder" varchar(255) DEFAULT 'SoulFeltMusic/SoulFeltMusicImages',
  "cloudinary_video_folder" varchar(255) DEFAULT 'SoulFeltMusic/SoulFeltMusicVideos',
  "cloudinary_merch_folder" varchar(255) DEFAULT 'SoulFeltMusic/SoulFeltMusicMerch',
  "enable_merchandise" tinyint(1) DEFAULT '1',
  "enable_videos" tinyint(1) DEFAULT '1',
  "enable_artist_profiles" tinyint(1) DEFAULT '1',
  "enable_newsletter" tinyint(1) DEFAULT '1',
  "enable_cart" tinyint(1) DEFAULT '1',
  "enable_user_accounts" tinyint(1) DEFAULT '1',
  "enable_promotional_tracks" tinyint(1) DEFAULT '1',
  "enable_promotional_videos" tinyint(1) DEFAULT '1',
  "enable_stripe" tinyint(1) DEFAULT '1',
  "hero_title" varchar(255) DEFAULT 'Stream & Discover Soul Felt Music',
  "hero_subtitle" text,
  "featured_section_title" varchar(255) DEFAULT 'Featured Artists',
  "about_us_text" text,
  "payment_currency" varchar(3) DEFAULT 'USD',
  "tax_rate" decimal(5,2) DEFAULT '0.00',
  "site_title" varchar(255) DEFAULT 'Soul Felt Music',
  "site_description" text,
  "site_keywords" text,
  "items_per_page" int DEFAULT '20',
  "max_upload_size_mb" int DEFAULT '50',
  "created_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  "office_hours_weekday" varchar(100) DEFAULT '9:00 AM - 6:00 PM',
  "office_hours_saturday" varchar(100) DEFAULT '10:00 AM - 4:00 PM',
  "office_hours_sunday" varchar(100) DEFAULT 'Closed',
  "office_hours_timezone" varchar(50) DEFAULT 'EST',
  "smtp_host" varchar(255) DEFAULT 'smtp.gmail.com',
  "smtp_port" int DEFAULT '587',
  "smtp_secure" tinyint(1) DEFAULT '0',
  "smtp_user" varchar(255) DEFAULT NULL,
  "smtp_password" varchar(255) DEFAULT NULL,
  "contact_form_recipient" varchar(255) DEFAULT NULL,
  "artist_submission_recipient" varchar(255) DEFAULT NULL,
  "press_media_recipient" varchar(255) DEFAULT NULL,
  "contact_form_auto_reply" tinyint(1) DEFAULT '1',
  "contact_form_subject_prefix" varchar(100) DEFAULT '[Soul Felt Music]',
  "auto_reply_message" text,
  "email_service_provider" enum('smtp','resend','sendgrid','mailgun') DEFAULT 'smtp',
  "resend_api_key" varchar(255) DEFAULT NULL,
  "sendgrid_api_key" varchar(255) DEFAULT NULL,
  "mailgun_api_key" varchar(255) DEFAULT NULL,
  "mailgun_domain" varchar(255) DEFAULT NULL,
  "email_provider" varchar(50) DEFAULT 'smtp' COMMENT 'Email service provider: smtp, resend, sendgrid, mailgun, ses-api, postmark',
  "email_api_key" varchar(500) DEFAULT NULL COMMENT 'API key for email service providers like Resend, SendGrid, etc.',
  "email_from_name" varchar(255) DEFAULT 'Soul Felt Music' COMMENT 'Sender name shown in email from field',
  "email_reply_to" varchar(255) DEFAULT NULL COMMENT 'Reply-to email address',
  "logo_line1" varchar(100) DEFAULT 'SOULFELT',
  "logo_line2" varchar(100) DEFAULT 'MUSIC',
  "about_stat1_label" varchar(100) DEFAULT 'Active Listeners',
  "about_stat2_number" varchar(50) DEFAULT '500+',
  "about_stat2_label" varchar(100) DEFAULT 'Artists',
  "about_stat3_number" varchar(50) DEFAULT '5K+',
  "about_stat3_label" varchar(100) DEFAULT 'Tracks',
  "about_stat4_number" varchar(50) DEFAULT '100+',
  "about_stat4_label" varchar(100) DEFAULT 'Albums',
  "about_value2_title" varchar(100) DEFAULT 'Artist Support',
  "about_value3_title" varchar(100) DEFAULT 'Community First',
  "about_value4_title" varchar(100) DEFAULT 'Excellence',
  "about_hero_tagline" text,
  "about_story_paragraph2" text,
  "about_story_paragraph3" text,
  "about_vision" text,
  "about_value1_desc" text,
  "about_value2_desc" text,
  "about_value3_desc" text,
  "about_value4_desc" text,
  "about_cta_description" text,
  "about_page_title" varchar(255) DEFAULT 'About Us',
  "about_story_paragraph1" text,
  "about_mission" text,
  "about_stat1_number" varchar(50) DEFAULT '10K+',
  "about_value1_title" varchar(100) DEFAULT 'Quality Music',
  "about_cta_title" varchar(255) DEFAULT 'Join Our Community',
  PRIMARY KEY ("id")
);

-- Data for website_settings
LOCK TABLES `website_settings` WRITE;
INSERT INTO `website_settings` (`id`, `business_name`, `logo_url`, `favicon_url`, `primary_color`, `secondary_color`, `accent_color`, `background_color`, `card_background`, `text_primary`, `text_secondary`, `contact_email`, `contact_phone`, `contact_address`, `social_media_links`, `terms_of_service`, `cloudinary_cloud_name`, `cloudinary_audio_folder`, `cloudinary_image_folder`, `cloudinary_video_folder`, `cloudinary_merch_folder`, `enable_merchandise`, `enable_videos`, `enable_artist_profiles`, `enable_newsletter`, `enable_cart`, `enable_user_accounts`, `enable_promotional_tracks`, `enable_promotional_videos`, `enable_stripe`, `hero_title`, `hero_subtitle`, `featured_section_title`, `about_us_text`, `payment_currency`, `tax_rate`, `site_title`, `site_description`, `site_keywords`, `items_per_page`, `max_upload_size_mb`, `created_at`, `updated_at`, `office_hours_weekday`, `office_hours_saturday`, `office_hours_sunday`, `office_hours_timezone`, `smtp_host`, `smtp_port`, `smtp_secure`, `smtp_user`, `smtp_password`, `contact_form_recipient`, `artist_submission_recipient`, `press_media_recipient`, `contact_form_auto_reply`, `contact_form_subject_prefix`, `auto_reply_message`, `email_service_provider`, `resend_api_key`, `sendgrid_api_key`, `mailgun_api_key`, `mailgun_domain`, `email_provider`, `email_api_key`, `email_from_name`, `email_reply_to`, `logo_line1`, `logo_line2`, `about_stat1_label`, `about_stat2_number`, `about_stat2_label`, `about_stat3_number`, `about_stat3_label`, `about_stat4_number`, `about_stat4_label`, `about_value2_title`, `about_value3_title`, `about_value4_title`, `about_hero_tagline`, `about_story_paragraph2`, `about_story_paragraph3`, `about_vision`, `about_value1_desc`, `about_value2_desc`, `about_value3_desc`, `about_value4_desc`, `about_cta_description`, `about_page_title`, `about_story_paragraph1`, `about_mission`, `about_stat1_number`, `about_value1_title`, `about_cta_title`) VALUES
    (1, 'Soul Felt Music', '', '', '#aa2a46', '#d63c65', '#fffced', '#191b29', '#21212b', '#fffced', '#ffffff', 'Test email', '1-555-555-5555', '123 main st', '{"twitter":{"0":" ","1":"e","2":"r","url":"https://twitter.com/your-profile","enabled":true},"youtube":{"url":"https://youtube.com/your-profile","enabled":true},"facebook":{"url":"https://facebook.com/your-profile","enabled":true},"linkedin":{"url":"https://linkedin.com/your-profile","enabled":true},"instagram":{"url":"https://instagram.com/your-profile","enabled":true},"custom_1761664912920":{"url":"https://facebook.com/your-profile","icon":"FaLink","name":"Patreaon demo","enabled":true}}', '<h1>Terms of Service</h1>
<p>Last updated: October 29, 2025</p>

<h2>1. Acceptance of Terms</h2>
<p>By accessing and using Soul Felt Music, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>

<h2>2. Use License</h2>
<p>Permission is granted to temporarily access the materials on Soul Felt Music for personal, non-commercial use only.</p>

<h2>3. User Accounts</h2>
<p>When you create an account with us, you must provide accurate and complete information. You are responsible for maintaining the security of your account.</p>

<h2>4. Content</h2>
<p>Our service allows you to access, stream, and in some cases download music content. All content remains the property of the respective artists and copyright holders.</p>

<h2>5. Prohibited Uses</h2>
<p>You may not use our service for any illegal or unauthorized purpose. You must not violate any laws in your jurisdiction.</p>

<h2>6. Intellectual Property</h2>
<p>All content on Soul Felt Music, including text, graphics, logos, and music, is the property of Soul Felt Music or its content suppliers.</p>

<h2>7. Disclaimer</h2>
<p>The materials on Soul Felt Music are provided on an "as is" basis. We make no warranties, expressed or implied.</p>

<h2>8. Limitations</h2>
<p>In no event shall Soul Felt Music be liable for any damages arising out of the use or inability to use our service.</p>

<h2>9. Changes to Terms</h2>
<p>We reserve the right to revise these terms at any time. By continuing to use Soul Felt Music, you agree to be bound by the updated terms.</p>

<h2>10. Contact Information</h2>
<p>If you have any questions about these Terms, please contact us through our contact page.</p>', 'webprojectimages', 'SoulFeltMusic/SoulFeltMusicAudio', 'SoulFeltMusic/SoulFeltMusicImages', 'SoulFeltMusic/SoulFeltMusicVideos', 'SoulFeltMusic/SoulFeltMusicMerch', 1, 1, 0, 1, 0, 1, 0, 0, 1, 'Stream & Discover Soul Felt Music', 'Play samples, discover new artists, and purchase your favorite tracks and albums.', 'Featured Artists', NULL, 'USD', '0.00', 'Soul Felt Music', NULL, NULL, 20, 50, '2025-10-23 23:01:21', '2025-11-05 19:48:39', '8:00 AM - 5:00 PM', '9:00 AM - 1:00 PM', 'Closed', 'MST', 'smtp.gmail.com', 587, 0, 'marlostudioa@gmail.com', 'qlmz ivsl hlxg tdps', 'marlostudioa+info@gmail.com', 'marlostudioa+artist@gmail.com', 'marlostudioa+press@gmail.com', 1, '[Soul Felt Music]', 'We have received your {inquiry_type} and will get back to you as soon as possible.', 'smtp', NULL, NULL, NULL, NULL, 'smtp', NULL, 'Soul Felt Music', NULL, 'SOULFELT', 'MUSIC', 'Active Listeners', '500+', 'Artists', '5K+', 'Tracks', '100+', 'Albums', 'Artist Support', 'Community First', 'Excellence', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'About us', 'Soul Felt Music was born from a simple belief: that music has the power to touch souls and transform lives. Founded by passionate music enthusiasts, we set out to create more than just another music platform—we wanted to build a home for artists and listeners who believe in the raw, authentic power of music.', 'To revolutionize the music industry by providing a platform that connects artists directly with their fans, fostering genuine relationships and supporting creative freedom.', '10K+', 'Quality Music', 'Join Our Community');
UNLOCK TABLES;


SET FOREIGN_KEY_CHECKS = 1;
