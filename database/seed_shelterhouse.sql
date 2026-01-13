-- ============================================================================
-- Shelter House Music - Seed Data Script
-- ============================================================================
-- Purpose: Create mockup data for Shelter House Music with Gospel/Christian artists
-- This script clears existing demo data and populates with fresh mockup content
-- Date: January 2026
-- Ministry: Shelter House Music - Eastern North Carolina
-- ============================================================================

-- WARNING: This script will delete existing demo data and insert new mockup data
-- Ensure you have a backup before proceeding
-- Run this on a test/development database first

USE shelterhouse_dev;

-- ============================================================================
-- CLEAR EXISTING DEMO DATA
-- ============================================================================

DELETE FROM track_plays WHERE artist_id IN (SELECT id FROM artists WHERE demos = 1);
DELETE FROM promotional_videos WHERE demos = 1;
DELETE FROM promotional_tracks WHERE demos = '1';
DELETE FROM tracks WHERE demos = 1;
DELETE FROM albums WHERE demos = 1;
DELETE FROM artist_images WHERE demos = 1;
DELETE FROM merchandise WHERE demos = 1;
DELETE FROM artists WHERE demos = 1;

-- ============================================================================
-- SECTION 1: INSERT GOSPEL & CHRISTIAN ARTISTS
-- ============================================================================
-- Mockup data for Shelter House Music ministry

-- Artist 1: Grace Williams - Contemporary Christian Worship Leader
INSERT INTO artists (
    id, name, bio, image_url, image_url_public_identifier, Career_Highlights, Influences,
    demos, activate, genre, spotify_url, instagram_url, facebook_url, youtube_url, 
    twitter_url, apple_music_url, tiktok_url, artist_country, new_artist, recommended, popular, featured
) VALUES (
    1,
    'Grace Williams',
    'Grace Williams is a passionate worship leader and contemporary Christian artist serving the church community in Eastern North Carolina. With a heart for authentic worship and powerful vocals that inspire congregations, Grace brings a fresh sound to traditional hymns while writing original worship songs that resonate with believers of all ages. Her ministry through Shelter House Music has touched countless lives.',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=800&fit=crop',
    'ShelterHouseMusic/Artists/GraceWilliams/profile_main',
    '• Leading worship at major Christian conferences across NC\n• Released 3 acclaimed worship albums\n• Featured on regional Christian radio stations\n• Shelter House Music Worship Artist of the Year 2025\n• Active in local church ministry and community outreach',
    'Kari Jobe, Lauren Daigle, Hillsong Worship, Bethel Music',
    1, 1, 'Contemporary Christian, Worship',
    'https://open.spotify.com/artist/gracewilliams',
    'https://instagram.com/gracewilliamsmusic',
    'https://facebook.com/gracewilliamsmusic',
    'https://youtube.com/@gracewilliamsmusic',
    'https://x.com/graceworship',
    'https://music.apple.com/artist/grace-williams',
    'https://tiktok.com/@gracewilliamsmusic',
    'USA',
    1, 1, 1, 1
);

-- Artist 2: The Redeemed Voices - Gospel Choir
INSERT INTO artists (
    id, name, bio, image_url, image_url_public_identifier, Career_Highlights, Influences,
    demos, activate, genre, spotify_url, instagram_url, facebook_url, youtube_url,
    twitter_url, apple_music_url, tiktok_url, artist_country, new_artist, recommended, popular, featured
) VALUES (
    2,
    'The Redeemed Voices',
    'The Redeemed Voices is a powerful gospel choir based in Eastern North Carolina, bringing the rich tradition of African American gospel music to churches and communities. With 25 voices united in praise, this dynamic ensemble delivers soul-stirring performances that celebrate faith, hope, and redemption through Christ. Their ministry with Shelter House Music brings the joy of gospel music to congregations throughout the region.',
    'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=800&fit=crop',
    'ShelterHouseMusic/Artists/RedeemedVoices/choir_main',
    '• Performed at regional Gospel Music Festival 2024 & 2025\n• Collaborated with renowned gospel artists\n• Regular performances at churches across Eastern NC\n• Released 2 live worship albums\n• Active in community ministry and youth programs',
    'Kirk Franklin, The Clark Sisters, Hezekiah Walker, Mississippi Mass Choir',
    1, 1, 'Traditional Gospel, Contemporary Gospel',
    'https://open.spotify.com/artist/redeemedvoices',
    'https://instagram.com/redeemedvoices',
    'https://facebook.com/redeemedvoiceschoir',
    'https://youtube.com/@redeemedvoices',
    'https://x.com/redeemedvoices',
    'https://music.apple.com/artist/redeemed-voices',
    'https://tiktok.com/@redeemedvoices',
    'USA',
    0, 1, 1, 1
);

-- Artist 3: Marcus Reid - Gospel Singer & Pastor
INSERT INTO artists (
    id, name, bio, image_url, image_url_public_identifier, Career_Highlights, Influences,
    demos, activate, genre, spotify_url, instagram_url, facebook_url, youtube_url,
    twitter_url, apple_music_url, tiktok_url, artist_country, new_artist, recommended, popular, featured
) VALUES (
    3,
    'Marcus Reid',
    'Marcus Reid serves as both a pastor and gospel recording artist, bringing powerful messages of hope and salvation through his anointed voice. His transparent testimony and heartfelt worship have made him a beloved figure in the gospel community. Through Shelter House Music, Marcus has recorded soul-stirring songs that minister to the brokenhearted and draw believers closer to God.',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop',
    'ShelterHouseMusic/Artists/MarcusReid/profile_main',
    '• Pastor at Faith Community Church\n• Released 4 gospel albums with Shelter House Music\n• Featured on national gospel radio\n• Stellar Award nomination 2025\n• Leading worship conferences and revivals',
    'Marvin Sapp, Donnie McClurkin, John P. Kee, Fred Hammond',
    1, 1, 'Gospel, Praise & Worship',
    'https://open.spotify.com/artist/marcusreid',
    'https://instagram.com/pastormarcusreid',
    'https://facebook.com/marcusreidmusic',
    'https://youtube.com/@marcusreidgospel',
    'https://x.com/marcusreid',
    'https://music.apple.com/artist/marcus-reid',
    'https://tiktok.com/@marcusreidmusic',
    'USA',
    0, 1, 1, 1
);

-- Artist 4: Joyful Noise Youth Choir - Young Voices for Christ
INSERT INTO artists (
    id, name, bio, image_url, image_url_public_identifier, Career_Highlights, Influences,
    demos, activate, genre, spotify_url, instagram_url, facebook_url, youtube_url,
    twitter_url, apple_music_url, tiktok_url, artist_country, new_artist, recommended, popular, featured
) VALUES (
    4,
    'Joyful Noise Youth Choir',
    'Joyful Noise Youth Choir represents the next generation of gospel music, featuring talented young singers ages 12-18 from churches across Eastern North Carolina. Under the direction of Shelter House Music, these young voices bring fresh energy and authentic faith to contemporary Christian music. Their youthful enthusiasm and genuine love for God inspire audiences of all ages.',
    'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=800&fit=crop',
    'ShelterHouseMusic/Artists/JoyfulNoiseYouth/group_main',
    '• Youth Choir Excellence Award 2025\n• Performed at NC Christian Youth Conference\n• Released debut album \"Young and Faithful\"\n• Active in community service and mission trips\n• Growing social media following among Christian youth',
    'Tasha Cobbs Leonard, Travis Greene, Elevation Worship, Maverick City Music',
    1, 1, 'Contemporary Christian, Youth Gospel',
    'https://open.spotify.com/artist/joyfulnoiseyouth',
    'https://instagram.com/joyfulnoiseyouth',
    'https://facebook.com/joyfulnoiseyouthchoir',
    'https://youtube.com/@joyfulnoiseyouth',
    'https://x.com/joyfulnoiseyth',
    'https://music.apple.com/artist/joyful-noise-youth',
    'https://tiktok.com/@joyfulnoiseyouth',
    'USA',
    1, 1, 1, 1
);

-- Artist 5: Sister Sarah James - Traditional Gospel Singer
INSERT INTO artists (
    id, name, bio, image_url, image_url_public_identifier, Career_Highlights, Influences,
    demos, activate, genre, spotify_url, instagram_url, facebook_url, youtube_url,
    twitter_url, apple_music_url, tiktok_url, artist_country, new_artist, recommended, popular, featured
) VALUES (
    5,
    'Sister Sarah James',
    'Sister Sarah James carries the torch of traditional gospel music with her powerful, spirit-filled voice that echoes the great gospel singers of yesteryear. With over 30 years of ministry experience, she brings authenticity and deep spiritual wisdom to every performance. Her partnership with Shelter House Music preserves the rich heritage of gospel music while inspiring new generations of believers.',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=800&fit=crop',
    'ShelterHouseMusic/Artists/SarahJames/profile_main',
    '• 30+ years in gospel ministry\n• Released 6 traditional gospel albums\n• Regular performer at revivals and camp meetings\n• Mentor to young gospel singers\n• Keeper of traditional gospel heritage',
    'Mahalia Jackson, Shirley Caesar, Dorothy Norwood, Albertina Walker',
    1, 1, 'Traditional Gospel, Hymns',
    'https://open.spotify.com/artist/sistersarahjames',
    'https://instagram.com/sistersarahjames',
    'https://facebook.com/sistersarahjamesmusic',
    'https://youtube.com/@sistersarahjames',
    'https://x.com/sistersarah',
    'https://music.apple.com/artist/sister-sarah-james',
    'https://tiktok.com/@sistersarahjames',
    'USA',
    0, 1, 1, 1
);

-- ============================================================================
-- SECTION 2: INSERT ALBUMS
-- ============================================================================

-- Grace Williams Albums
INSERT INTO albums (id, artist_id, title, release_date, cover_url, cover_url_public_identifier, demos, activate, genre, album_type, album_pricing, new_release, recommended, popular, featured, album_description) VALUES
(101, 1, 'Worship Without Walls', '2024-03-15', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=600&fit=crop', 'ShelterHouseMusic/Albums/GraceWilliams/worship_without_walls', 1, 1, 'Contemporary Christian', 'digital', 1200, 1, 1, 1, 1, 'A powerful collection of worship songs recorded live at various churches across Eastern NC'),
(102, 1, 'Faithful Heart', '2023-09-20', 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=600&fit=crop', 'ShelterHouseMusic/Albums/GraceWilliams/faithful_heart', 1, 1, 'Worship', 'digital', 1000, 0, 1, 1, 1, 'Intimate worship songs for personal devotion and church gatherings');

-- The Redeemed Voices Albums
INSERT INTO albums (id, artist_id, title, release_date, cover_url, cover_url_public_identifier, demos, activate, genre, album_type, album_pricing, new_release, recommended, popular, featured, album_description) VALUES
(103, 2, 'Joyful Sounds of Praise', '2024-06-01', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=600&fit=crop', 'ShelterHouseMusic/Albums/RedeemedVoices/joyful_sounds', 1, 1, 'Gospel', 'digital', 1500, 1, 1, 1, 1, 'Uplifting gospel choir music celebrating God\'s goodness and grace'),
(104, 2, 'Sunday Morning Glory', '2023-11-10', 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=600&fit=crop', 'ShelterHouseMusic/Albums/RedeemedVoices/sunday_morning', 1, 1, 'Traditional Gospel', 'digital', 1300, 0, 1, 1, 1, 'Classic gospel hymns and favorites performed with power and passion');

-- Marcus Reid Albums
INSERT INTO albums (id, artist_id, title, release_date, cover_url, cover_url_public_identifier, demos, activate, genre, album_type, album_pricing, new_release, recommended, popular, featured, album_description) VALUES
(105, 3, 'Breakthrough', '2025-01-05', 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&h=600&fit=crop', 'ShelterHouseMusic/Albums/MarcusReid/breakthrough', 1, 1, 'Gospel', 'digital', 1400, 1, 1, 1, 1, 'Songs of deliverance and breakthrough for every believer'),
(106, 3, 'The Worship Experience', '2024-04-12', 'https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=600&h=600&fit=crop', 'ShelterHouseMusic/Albums/MarcusReid/worship_experience', 1, 1, 'Praise & Worship', 'digital', 1200, 0, 1, 1, 1, 'Live worship recording from Faith Community Church');

-- Joyful Noise Youth Choir Album
INSERT INTO albums (id, artist_id, title, release_date, cover_url, cover_url_public_identifier, demos, activate, genre, album_type, album_pricing, new_release, recommended, popular, featured, album_description) VALUES
(107, 4, 'Young and Faithful', '2024-08-20', 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&h=600&fit=crop', 'ShelterHouseMusic/Albums/JoyfulNoiseYouth/young_faithful', 1, 1, 'Contemporary Christian', 'digital', 1000, 1, 1, 1, 1, 'Fresh, energetic worship from the next generation of believers');

-- Sister Sarah James Albums
INSERT INTO albums (id, artist_id, title, release_date, cover_url, cover_url_public_identifier, demos, activate, genre, album_type, album_pricing, new_release, recommended, popular, featured, album_description) VALUES
(108, 5, 'Old Time Religion', '2024-02-28', 'https://images.unsplash.com/photo-1415886541506-6efc5e4b1786?w=600&h=600&fit=crop', 'ShelterHouseMusic/Albums/SarahJames/old_time_religion', 1, 1, 'Traditional Gospel', 'digital', 1100, 0, 1, 1, 1, 'Traditional gospel hymns sung with power and conviction'),
(109, 5, 'Testimony Time', '2023-07-15', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=600&fit=crop', 'ShelterHouseMusic/Albums/SarahJames/testimony_time', 1, 1, 'Gospel', 'digital', 1100, 0, 1, 1, 1, 'Songs of testimony and praise from a life lived for Christ');

-- ============================================================================
-- SECTION 3: INSERT TRACKS
-- ============================================================================

-- Grace Williams Tracks
INSERT INTO tracks (id, album_id, artist_id, title, duration, audio_url, audio_url_public_identifier, demos, activate, genre, release_date, new_release, recommended, popular, featured) VALUES
(1, 101, 1, 'Great Are You Lord', 180, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', 'ShelterHouseMusic/Tracks/GraceWilliams/great_are_you', 1, 1, 'Worship', '2024-03-15', 1, 1, 1, 1),
(2, 101, 1, 'Holy Spirit Come', 240, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', 'ShelterHouseMusic/Tracks/GraceWilliams/holy_spirit', 1, 1, 'Worship', '2024-03-15', 1, 1, 1, 1),
(3, 102, 1, 'Faithful Heart', 195, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', 'ShelterHouseMusic/Tracks/GraceWilliams/faithful_heart', 1, 1, 'Contemporary Christian', '2023-09-20', 0, 1, 1, 1);

-- The Redeemed Voices Tracks
INSERT INTO tracks (id, album_id, artist_id, title, duration, audio_url, audio_url_public_identifier, demos, activate, genre, release_date, new_release, recommended, popular, featured) VALUES
(4, 103, 2, 'Hallelujah Praise', 210, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', 'ShelterHouseMusic/Tracks/RedeemedVoices/hallelujah', 1, 1, 'Gospel', '2024-06-01', 1, 1, 1, 1),
(5, 103, 2, 'Glory to His Name', 225, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', 'ShelterHouseMusic/Tracks/RedeemedVoices/glory', 1, 1, 'Gospel', '2024-06-01', 1, 1, 1, 1),
(6, 104, 2, 'Amazing Grace (Live)', 270, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', 'ShelterHouseMusic/Tracks/RedeemedVoices/amazing_grace', 1, 1, 'Traditional Gospel', '2023-11-10', 0, 1, 1, 1);

-- Marcus Reid Tracks
INSERT INTO tracks (id, album_id, artist_id, title, duration, audio_url, audio_url_public_identifier, demos, activate, genre, release_date, new_release, recommended, popular, featured) VALUES
(7, 105, 3, 'I\'m Free', 255, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', 'ShelterHouseMusic/Tracks/MarcusReid/im_free', 1, 1, 'Gospel', '2025-01-05', 1, 1, 1, 1),
(8, 105, 3, 'Breakthrough Is Coming', 240, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', 'ShelterHouseMusic/Tracks/MarcusReid/breakthrough', 1, 1, 'Gospel', '2025-01-05', 1, 1, 1, 1),
(9, 106, 3, 'We Give You Glory', 300, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', 'ShelterHouseMusic/Tracks/MarcusReid/we_give_glory', 1, 1, 'Praise & Worship', '2024-04-12', 0, 1, 1, 1);

-- Joyful Noise Youth Choir Tracks
INSERT INTO tracks (id, album_id, artist_id, title, duration, audio_url, audio_url_public_identifier, demos, activate, genre, release_date, new_release, recommended, popular, featured) VALUES
(10, 107, 4, 'Shout for Joy', 190, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3', 'ShelterHouseMusic/Tracks/JoyfulNoise/shout_for_joy', 1, 1, 'Contemporary Christian', '2024-08-20', 1, 1, 1, 1),
(11, 107, 4, 'Jesus Is Alive', 210, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3', 'ShelterHouseMusic/Tracks/JoyfulNoise/jesus_alive', 1, 1, 'Youth Gospel', '2024-08-20', 1, 1, 1, 1),
(12, 107, 4, 'Generation Worship', 200, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3', 'ShelterHouseMusic/Tracks/JoyfulNoise/generation', 1, 1, 'Contemporary Christian', '2024-08-20', 1, 1, 1, 1);

-- Sister Sarah James Tracks
INSERT INTO tracks (id, album_id, artist_id, title, duration, audio_url, audio_url_public_identifier, demos, activate, genre, release_date, new_release, recommended, popular, featured) VALUES
(13, 108, 5, 'Give Me That Old Time Religion', 285, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3', 'ShelterHouseMusic/Tracks/SarahJames/old_time', 1, 1, 'Traditional Gospel', '2024-02-28', 0, 1, 1, 1),
(14, 108, 5, 'I Shall Wear a Crown', 260, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3', 'ShelterHouseMusic/Tracks/SarahJames/wear_crown', 1, 1, 'Gospel', '2024-02-28', 0, 1, 1, 1),
(15, 109, 5, 'My Testimony', 245, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3', 'ShelterHouseMusic/Tracks/SarahJames/testimony', 1, 1, 'Gospel', '2023-07-15', 0, 1, 1, 1);

-- ============================================================================
-- SECTION 4: INSERT PROMOTIONAL TRACKS
-- ============================================================================

INSERT INTO promotional_tracks (id, artist_id, album_id, title, promo_audio_url, promo_audio_url_public_identifier, demos, activate, promote_track, top_track, genre, release_date, new_release, recommended, popular, featured) VALUES
(1, 1, 101, 'Great Are You Lord (Preview)', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', 'ShelterHouseMusic/Promo/grace_great', '1', 1, 1, 1, 'Worship', '2024-03-15', 1, 1, 1, 1),
(2, 2, 103, 'Hallelujah Praise (Preview)', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', 'ShelterHouseMusic/Promo/redeemed_hallelujah', '1', 1, 1, 1, 'Gospel', '2024-06-01', 1, 1, 1, 1),
(3, 3, 105, 'I\'m Free (Preview)', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', 'ShelterHouseMusic/Promo/marcus_free', '1', 1, 1, 1, 'Gospel', '2025-01-05', 1, 1, 1, 1),
(4, 4, 107, 'Shout for Joy (Preview)', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3', 'ShelterHouseMusic/Promo/youth_shout', '1', 1, 1, 1, 'Contemporary Christian', '2024-08-20', 1, 1, 1, 1),
(5, 5, 108, 'Give Me That Old Time Religion (Preview)', 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3', 'ShelterHouseMusic/Promo/sarah_oldtime', '1', 1, 1, 1, 'Traditional Gospel', '2024-02-28', 0, 1, 1, 1);

-- ============================================================================
-- SECTION 5: INSERT PROMOTIONAL VIDEOS
-- ============================================================================

INSERT INTO promotional_videos (id, artist_id, album_id, title, promo_video_url, promo_video_url_public_identifier, demos, activate_video, genre, release_date, new_release, recommended, popular, featured, video_description) VALUES
(1, 1, 101, 'Great Are You Lord (Music Video)', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'ShelterHouseMusic/Videos/grace_great', 1, 1, 'Worship', '2024-03-15', 1, 1, 1, 1, 'Official music video filmed at local church worship service'),
(2, 2, 103, 'Hallelujah Praise (Live Performance)', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'ShelterHouseMusic/Videos/redeemed_hallelujah', 1, 1, 'Gospel', '2024-06-01', 1, 1, 1, 1, 'Live performance at Eastern NC Gospel Festival'),
(3, 3, 105, 'I\'m Free (Official Video)', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'ShelterHouseMusic/Videos/marcus_free', 1, 1, 'Gospel', '2025-01-05', 1, 1, 1, 1, 'Powerful testimony and worship video'),
(4, 4, 107, 'Shout for Joy (Youth Concert)', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'ShelterHouseMusic/Videos/youth_shout', 1, 1, 'Contemporary Christian', '2024-08-20', 1, 1, 1, 1, 'Energetic performance at youth worship night'),
(5, 5, 108, 'Old Time Religion (Revival Service)', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'ShelterHouseMusic/Videos/sarah_oldtime', 1, 1, 'Traditional Gospel', '2024-02-28', 0, 1, 1, 1, 'Powerful ministry at revival meeting');

-- ============================================================================
-- SECTION 6: INSERT ARTIST IMAGES
-- ============================================================================

INSERT INTO artist_images (id, artist_id, artist_name, image_url, image_url_public_identifier, demos, activate, description) VALUES
(1, 1, 'Grace Williams', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=800&fit=crop', 'ShelterHouseMusic/Artists/GraceWilliams/profile_1', 1, 1, 'Grace Williams worship portrait'),
(2, 1, 'Grace Williams', 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=800&h=800&fit=crop', 'ShelterHouseMusic/Artists/GraceWilliams/profile_2', 1, 1, 'Grace Williams concert photo'),
(3, 2, 'The Redeemed Voices', 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=800&fit=crop', 'ShelterHouseMusic/Artists/RedeemedVoices/group_1', 1, 1, 'Choir group photo'),
(4, 3, 'Marcus Reid', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop', 'ShelterHouseMusic/Artists/MarcusReid/profile_1', 1, 1, 'Pastor Marcus Reid portrait'),
(5, 4, 'Joyful Noise Youth Choir', 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=800&fit=crop', 'ShelterHouseMusic/Artists/JoyfulNoiseYouth/group_1', 1, 1, 'Youth choir performance'),
(6, 5, 'Sister Sarah James', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=800&fit=crop', 'ShelterHouseMusic/Artists/SarahJames/profile_1', 1, 1, 'Sister Sarah James portrait');

-- ============================================================================
-- SECTION 7: INSERT MERCHANDISE
-- ============================================================================

INSERT INTO merchandise (id, artist_id, title, merch_type, description, price, image_url, stock_quantity, is_available, demos) VALUES
(1, 1, 'Grace Williams "Worship" T-Shirt', 'T-Shirt', 'Comfortable cotton t-shirt featuring Grace Williams ministry logo', 25.00, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop', 50, 1, 1),
(2, 1, 'Grace Williams CD Bundle', 'Bundle', 'All 3 albums on CD with digital download codes', 45.00, 'https://images.unsplash.com/photo-1611415569083-30e4e367c5ec?w=600&h=600&fit=crop', 30, 1, 1),
(3, 2, 'Redeemed Voices Choir T-Shirt', 'T-Shirt', 'Gospel choir merchandise supporting ministry', 22.00, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop', 75, 1, 1),
(4, 2, 'Redeemed Voices "Joyful Sounds" CD', 'CD', 'Physical CD with booklet', 15.00, 'https://images.unsplash.com/photo-1611415569083-30e4e367c5ec?w=600&h=600&fit=crop', 100, 1, 1),
(5, 3, 'Marcus Reid "Breakthrough" Hat', 'Hat', 'Embroidered cap with Breakthrough album art', 20.00, 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=600&fit=crop', 40, 1, 1),
(6, 3, 'Marcus Reid Ministry Bundle', 'Bundle', 'T-shirt, hat, and 2 CDs', 60.00, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop', 25, 1, 1),
(7, 4, 'Joyful Noise Youth T-Shirt', 'T-Shirt', 'Youth-sized t-shirt for young believers', 18.00, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop', 60, 1, 1),
(8, 4, 'Youth Choir Hoodie', 'Hoodie', 'Warm hoodie with choir logo', 35.00, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop', 45, 1, 1),
(9, 5, 'Sister Sarah James "Old Time Religion" CD', 'CD', 'Traditional gospel album on CD', 15.00, 'https://images.unsplash.com/photo-1611415569083-30e4e367c5ec?w=600&h=600&fit=crop', 80, 1, 1),
(10, 5, 'Sister Sarah Ministry T-Shirt', 'T-Shirt', 'Classic t-shirt supporting traditional gospel', 22.00, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop', 50, 1, 1);

-- ============================================================================
-- SECTION 8: INSERT COMMUNITY EVENTS
-- ============================================================================

INSERT INTO community_events (title, event_date, description, link, is_active, image_url, image_public_identifier) VALUES
('Shelter House Music Gospel Festival 2026', '2026-06-15', 'Join us for our annual Gospel Music Festival featuring all Shelter House Music artists. A day of worship, praise, and community fellowship celebrating God\'s goodness.', '#', 1, 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop', 'ShelterHouseMusic/Events/gospel_festival_2026'),
('Youth Worship Night', '2026-03-20', 'Special worship night featuring Joyful Noise Youth Choir and other young artists. Bringing the next generation together in praise.', '#', 1, 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop', 'ShelterHouseMusic/Events/youth_worship_2026'),
('Sunday Revival Service with Sister Sarah', '2026-02-28', 'Traditional gospel revival service featuring Sister Sarah James. Experience the power of old-time gospel music.', '#', 1, 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop', 'ShelterHouseMusic/Events/revival_2026'),
('Shelter House Music Recording Workshop', '2026-04-10', 'Free workshop for local church musicians and singers. Learn about the recording process and how Shelter House Music serves the church community.', '#', 1, 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=600&fit=crop', 'ShelterHouseMusic/Events/workshop_2026');

-- ============================================================================
-- SECTION 9: INSERT FAQS
-- ============================================================================

INSERT INTO faqs (question, answer, category, display_order, is_published) VALUES
('What is Shelter House Music\'s mission?', 'Shelter House Music is a Christian music recording ministry dedicated to serving local churches, gospel artists, and the broader community of Eastern North Carolina through professional, high-quality music production. We believe in using music as a tool for worship, evangelism, and building up the body of Christ.', 'About Us', 1, 1),
('How can my church work with Shelter House Music?', 'We partner with churches in Eastern North Carolina for recording services, live worship events, and artist collaborations. Contact us through our contact form to discuss how we can serve your church\'s music ministry.', 'Services', 2, 1),
('Do you only record gospel music?', 'While we specialize in gospel and Christian music, Shelter House Music welcomes all artists with messages that align with our Christian values. We\'ve recorded contemporary Christian, traditional gospel, worship music, and inspirational songs.', 'Services', 3, 1),
('Can I book Shelter House Music artists for my church event?', 'Yes! Our artists are available for church services, revivals, conferences, and community events. Please use our contact form to inquire about artist availability and booking information.', 'Bookings', 4, 1),
('How do I submit my music to Shelter House Music?', 'We welcome submissions from gospel and Christian artists in Eastern North Carolina. Use our contact form and select "Artist Submission" to send us information about your music ministry, along with samples of your work.', 'Artists', 5, 1);

-- ============================================================================
-- END OF SCRIPT
-- ============================================================================
-- Database now populated with gospel and Christian artist mockup data
-- All artists, albums, tracks, and supporting content ready for Shelter House Music ministry

SELECT 'Shelter House Music mockup data successfully inserted!' AS Status;
SELECT COUNT(*) AS Total_Artists FROM artists WHERE demos = 1;
SELECT COUNT(*) AS Total_Albums FROM albums WHERE demos = 1;
SELECT COUNT(*) AS Total_Tracks FROM tracks WHERE demos = 1;
SELECT COUNT(*) AS Total_Promotional_Tracks FROM promotional_tracks WHERE demos = '1';
SELECT COUNT(*) AS Total_Merchandise FROM merchandise WHERE demos = 1;
