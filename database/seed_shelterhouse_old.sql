-- ============================================================================
-- Shelter House Music - Seed Data Script
-- ============================================================================
-- Purpose: Create mockup data for Shelter House Music with Gospel/Christian artists
-- This script clears existing demo data and populates with fresh mockup content
-- ============================================================================

-- WARNING: This script will delete existing demo data and insert new mockup data
-- Ensure you have a backup before proceeding
-- Run this on a test/development database first

USE defaultdb;

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
-- SECTION 8: UPDATE COMMUNITY EVENTS
-- ============================================================================

-- Update existing events with Shelter House Music branding
UPDATE community_events SET
    title = REPLACE(title, 'Soul Felt Music', 'Shelter House Music'),
    description = REPLACE(description, 'Soul Felt Music', 'Shelter House Music')
WHERE is_active = 1;

-- Insert new gospel-focused community events
INSERT INTO community_events (title, event_date, description, link, is_active, image_url, image_public_identifier) VALUES
('Shelter House Music Gospel Festival 2026', '2026-06-15', 'Join us for our annual Gospel Music Festival featuring all Shelter House Music artists. A day of worship, praise, and community fellowship celebrating God\'s goodness.', '#', 1, 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop', 'ShelterHouseMusic/Events/gospel_festival_2026'),
('Youth Worship Night', '2026-03-20', 'Special worship night featuring Joyful Noise Youth Choir and other young artists. Bringing the next generation together in praise.', '#', 1, 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop', 'ShelterHouseMusic/Events/youth_worship_2026'),
('Sunday Revival Service with Sister Sarah', '2026-02-28', 'Traditional gospel revival service featuring Sister Sarah James. Experience the power of old-time gospel music.', '#', 1, 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop', 'ShelterHouseMusic/Events/revival_2026'),
('Shelter House Music Recording Workshop', '2026-04-10', 'Free workshop for local church musicians and singers. Learn about the recording process and how Shelter House Music serves the church community.', '#', 1, 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=600&fit=crop', 'ShelterHouseMusic/Events/workshop_2026');

-- ============================================================================
-- SECTION 9: UPDATE FAQS
-- ============================================================================

UPDATE faqs SET
    question = REPLACE(question, 'Soul Felt Music', 'Shelter House Music'),
    answer = REPLACE(answer, 'Soul Felt Music', 'Shelter House Music')
WHERE is_published = 1;

-- Insert gospel/Christian music specific FAQs
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
    name = 'Sarah Monroe',
    bio = 'Sarah Monroe is a powerhouse vocalist known for her emotionally charged performances and soaring vocals. Rising from humble beginnings, she has become one of Shelter House Music\'s most celebrated artists, bringing soul and authenticity to every song.',
    image_url = 'https://res.cloudinary.com/webprojectimages/image/upload/v1760021193/ShelterHouseMusic/ShelterHouseMusicImages/DemoImages/ArtistImagesDemo/eea8002efe919856a3678ee9094003cc.jpg',
    image_url_public_identifier = 'ShelterHouseMusic/ShelterHouseMusicImages/DemoImages/ArtistImagesDemo/eea8002efe919856a3678ee9094003cc',
    Career_Highlights = '• Multiple chart-topping singles\n• Shelter House Music Artist of the Year 2024\n• Sold-out tours across North America\n• Featured on major streaming playlists\n• Collaborated with industry legends',
    Influences = 'Whitney Houston, Aretha Franklin, Mariah Carey, Beyoncé',
    spotify_url = 'https://open.spotify.com/artist/sarahmonroe',
    instagram_url = 'https://instagram.com/sarahmonroe',
    facebook_url = 'https://facebook.com/sarahmonroe',
    youtube_url = 'https://youtube.com/@sarahmonroe',
    twitter_url = 'https://x.com/sarahmonroe',
    apple_music_url = 'https://music.apple.com/artist/sarah-monroe',
    tiktok_url = 'https://tiktok.com/@sarahmonroe'
WHERE id = 20;

-- Artist ID 21: Alsou → Maya Rivers
UPDATE artists SET
    name = 'Maya Rivers',
    bio = 'Maya Rivers brings a fresh, contemporary pop sound to Shelter House Music. Her infectious melodies and relatable lyrics have made her a favorite among younger audiences while earning respect from industry veterans.',
    image_url = 'https://res.cloudinary.com/webprojectimages/image/upload/v1760021246/ShelterHouseMusic/ShelterHouseMusicImages/DemoImages/ArtistImagesDemo/d3e69b61b912d43a8af70848b8433639.jpg',
    image_url_public_identifier = 'ShelterHouseMusic/ShelterHouseMusicImages/DemoImages/ArtistImagesDemo/d3e69b61b912d43a8af70848b8433639',
    Career_Highlights = '• Breakout single reached Top 10 nationally\n• Shelter House Music Rising Star Award\n• Featured in major music festivals\n• Growing social media following\n• Viral TikTok moments',
    Influences = 'Ariana Grande, Dua Lipa, Taylor Swift, Billie Eilish',
    spotify_url = 'https://open.spotify.com/artist/mayarivers',
    instagram_url = 'https://instagram.com/mayarivers',
    facebook_url = 'https://facebook.com/mayarivers',
    youtube_url = 'https://youtube.com/@mayarivers',
    twitter_url = 'https://x.com/mayarivers',
    apple_music_url = 'https://music.apple.com/artist/maya-rivers',
    tiktok_url = 'https://tiktok.com/@mayarivers'
WHERE id = 21;

-- Artist ID 22: Anthony Brown → Marcus Faith
UPDATE artists SET
    name = 'Marcus Faith',
    bio = 'Marcus Faith is a gospel and inspirational music artist who brings hope and upliftment through his powerful messages. His worship leading and authentic faith journey resonate with audiences seeking spiritual connection through music.',
    image_url = 'https://res.cloudinary.com/webprojectimages/image/upload/v1760021677/ShelterHouseMusic/ShelterHouseMusicImages/DemoImages/ArtistImagesDemo/bdf5564c49331b1b885ca484c085e917.jpg',
    image_url_public_identifier = 'ShelterHouseMusic/ShelterHouseMusicImages/DemoImages/ArtistImagesDemo/bdf5564c49331b1b885ca484c085e917',
    Career_Highlights = '• Leading worship pastor and artist\n• Gospel chart success\n• Inspirational music awards\n• Community outreach programs\n• Featured at major gospel events',
    Influences = 'Kirk Franklin, Travis Greene, Tasha Cobbs Leonard, Marvin Sapp',
    spotify_url = 'https://open.spotify.com/artist/marcusfaith',
    instagram_url = 'https://instagram.com/marcusfaith',
    facebook_url = 'https://facebook.com/marcusfaith',
    youtube_url = 'https://youtube.com/@marcusfaith',
    twitter_url = 'https://x.com/marcusfaith',
    apple_music_url = 'https://music.apple.com/artist/marcus-faith',
    tiktok_url = 'https://tiktok.com/@marcusfaith'
WHERE id = 22;

-- Artist ID 23: BabyFace → Devon Smooth
UPDATE artists SET
    name = 'Devon Smooth',
    bio = 'Devon Smooth is a master of R&B balladry, known for his silky vocals and heartfelt songwriting. His romantic anthems and smooth production style have made him a cornerstone of Shelter House Music\'s R&B catalog.',
    image_url = 'https://res.cloudinary.com/webprojectimages/image/upload/v1760021719/ShelterHouseMusic/ShelterHouseMusicImages/DemoImages/ArtistImagesDemo/41e0f23871deba9e1305a1d97bef0ab9.jpg',
    image_url_public_identifier = 'ShelterHouseMusic/ShelterHouseMusicImages/DemoImages/ArtistImagesDemo/41e0f23871deba9e1305a1d97bef0ab9',
    Career_Highlights = '• Multiple R&B chart-toppers\n• Songwriter for other major artists\n• Producer and performer\n• Shelter House Music legacy artist\n• Timeless romantic classics',
    Influences = 'Babyface, Brian McKnight, Maxwell, Joe',
    spotify_url = 'https://open.spotify.com/artist/devonsmooth',
    instagram_url = 'https://instagram.com/devonsmooth',
    facebook_url = 'https://facebook.com/devonsmooth',
    youtube_url = 'https://youtube.com/@devonsmooth',
    twitter_url = 'https://x.com/devonsmooth',
    apple_music_url = 'https://music.apple.com/artist/devon-smooth',
    tiktok_url = 'https://tiktok.com/@devonsmooth'
WHERE id = 23;

-- Artist ID 24: Britney Spears → Jade Starlight
UPDATE artists SET
    name = 'Jade Starlight',
    bio = 'Jade Starlight is a pop sensation who commands the stage with high-energy performances and infectious dance tracks. Her charismatic presence and dedication to her craft have made her a standout performer at Shelter House Music.',
    image_url = 'https://res.cloudinary.com/webprojectimages/image/upload/v1760021790/ShelterHouseMusic/ShelterHouseMusicImages/DemoImages/ArtistImagesDemo/7807bab26f8774fcc25b79adacb7cda0.jpg',
    image_url_public_identifier = 'ShelterHouseMusic/ShelterHouseMusicImages/DemoImages/ArtistImagesDemo/7807bab26f8774fcc25b79adacb7cda0',
    Career_Highlights = '• Pop chart success across multiple singles\n• Dynamic live performer\n• Music video innovator\n• Fashion and music icon\n• Youth culture influencer',
    Influences = 'Britney Spears, Christina Aguilera, Lady Gaga, Madonna',
    spotify_url = 'https://open.spotify.com/artist/jadestarlight',
    instagram_url = 'https://instagram.com/jadestarlight',
    facebook_url = 'https://facebook.com/jadestarlight',
    youtube_url = 'https://youtube.com/@jadestarlight',
    twitter_url = 'https://x.com/jadestarlight',
    apple_music_url = 'https://music.apple.com/artist/jade-starlight',
    tiktok_url = 'https://tiktok.com/@jadestarlight'
WHERE id = 24;

-- Artist ID 25: Deangelo → Phoenix Soul
UPDATE artists SET
    name = 'Phoenix Soul',
    bio = 'Phoenix Soul is a neo-soul artist who blends classic soul with contemporary R&B. His sophisticated arrangements and introspective lyrics create a unique sound that has earned critical acclaim within Shelter House Music.',
    image_url = 'https://res.cloudinary.com/webprojectimages/image/upload/v1760021834/ShelterHouseMusic/ShelterHouseMusicImages/DemoImages/ArtistImagesDemo/fc9e11c3bc4c6f16db71c0bd3bef0794.jpg',
    image_url_public_identifier = 'ShelterHouseMusic/ShelterHouseMusicImages/DemoImages/ArtistImagesDemo/fc9e11c3bc4c6f16db71c0bd3bef0794',
    Career_Highlights = '• Neo-soul pioneer\n• Critically acclaimed albums\n• Multi-instrumentalist\n• Influential producer\n• Shelter House Music artistic excellence award',
    Influences = 'D\'Angelo, Erykah Badu, Prince, Stevie Wonder',
    spotify_url = 'https://open.spotify.com/artist/phoenixsoul',
    instagram_url = 'https://instagram.com/phoenixsoul',
    facebook_url = 'https://facebook.com/phoenixsoul',
    youtube_url = 'https://youtube.com/@phoenixsoul',
    twitter_url = 'https://x.com/phoenixsoul',
    apple_music_url = 'https://music.apple.com/artist/phoenix-soul',
    tiktok_url = 'https://tiktok.com/@phoenixsoul'
WHERE id = 25;

-- Artist ID 26: Alexis FFrench → Adrian Keys
UPDATE artists SET
    name = 'Adrian Keys',
    bio = 'Adrian Keys is a contemporary classical pianist and composer who bridges the gap between classical and popular music. His emotive piano compositions and cinematic soundscapes have made him a unique voice at Shelter House Music.',
    image_url = 'https://res.cloudinary.com/webprojectimages/image/upload/v1760021870/ShelterHouseMusic/ShelterHouseMusicImages/DemoImages/ArtistImagesDemo/6e27252db98a8182809e101c9d52ca95.jpg',
    image_url_public_identifier = 'ShelterHouseMusic/ShelterHouseMusicImages/DemoImages/ArtistImagesDemo/6e27252db98a8182809e101c9d52ca95',
    Career_Highlights = '• Classical chart success\n• Piano virtuoso and composer\n• Film and TV music placements\n• Live concert performances\n• Music education advocate',
    Influences = 'Ludovico Einaudi, Yiruma, Max Richter, Chopin',
    spotify_url = 'https://open.spotify.com/artist/adriankeys',
    instagram_url = 'https://instagram.com/adriankeys',
    facebook_url = 'https://facebook.com/adriankeys',
    youtube_url = 'https://youtube.com/@adriankeys',
    twitter_url = 'https://x.com/adriankeys',
    apple_music_url = 'https://music.apple.com/artist/adrian-keys',
    tiktok_url = 'https://tiktok.com/@adriankeys'
WHERE id = 26;

-- Artist ID 27: Great Soul → The Soul Collective
UPDATE artists SET
    name = 'The Soul Collective',
    bio = 'The Soul Collective is a group of talented musicians dedicated to preserving and celebrating classic soul music. Their authentic approach and deep respect for the genre have made them favorites among soul music enthusiasts.',
    image_url = 'https://res.cloudinary.com/webprojectimages/image/upload/v1760021943/ShelterHouseMusic/ShelterHouseMusicImages/DemoImages/ArtistImagesDemo/765256f360b03577c4a397586a70b3ff.jpg',
    image_url_public_identifier = 'ShelterHouseMusic/ShelterHouseMusicImages/DemoImages/ArtistImagesDemo/765256f360b03577c4a397586a70b3ff',
    Career_Highlights = '• Soul music preservation\n• Live performance excellence\n• Tribute concerts\n• Classic soul covers\n• Community music education',
    Influences = 'Motown legends, Stax Records artists, Classic soul era',
    spotify_url = 'https://open.spotify.com/artist/soulcollective',
    instagram_url = 'https://instagram.com/soulcollective',
    facebook_url = 'https://facebook.com/soulcollective',
    youtube_url = 'https://youtube.com/@soulcollective',
    twitter_url = 'https://x.com/soulcollective',
    apple_music_url = 'https://music.apple.com/artist/the-soul-collective',
    tiktok_url = 'https://tiktok.com/@soulcollective'
WHERE id = 27;

-- Artist ID 28: Lionel Richie → Cameron Gold
UPDATE artists SET
    name = 'Cameron Gold',
    bio = 'Cameron Gold is a smooth vocalist and songwriter known for his timeless ballads and feel-good anthems. His warm voice and positive energy have made him a beloved artist within the Shelter House Music family.',
    image_url = 'https://res.cloudinary.com/webprojectimages/image/upload/v1760021982/ShelterHouseMusic/ShelterHouseMusicImages/DemoImages/ArtistImagesDemo/1bcb8042df29f6a9bf7471ac4c3eef52.jpg',
    image_url_public_identifier = 'ShelterHouseMusic/ShelterHouseMusicImages/DemoImages/ArtistImagesDemo/1bcb8042df29f6a9bf7471ac4c3eef52',
    Career_Highlights = '• Chart-topping ballads\n• International touring artist\n• Songwriter for film and TV\n• Wedding song favorite\n• Cross-generational appeal',
    Influences = 'Lionel Richie, Luther Vandross, Peabo Bryson, James Ingram',
    spotify_url = 'https://open.spotify.com/artist/camerongold',
    instagram_url = 'https://instagram.com/camerongold',
    facebook_url = 'https://facebook.com/camerongold',
    youtube_url = 'https://youtube.com/@camerongold',
    twitter_url = 'https://x.com/camerongold',
    apple_music_url = 'https://music.apple.com/artist/cameron-gold',
    tiktok_url = 'https://tiktok.com/@camerongold'
WHERE id = 28;

-- Artist ID 29: Luther Vandross → Isaiah Velvet
UPDATE artists SET
    name = 'Isaiah Velvet',
    bio = 'Isaiah Velvet possesses one of the most distinctive voices in R&B today. His velvety tone and impeccable phrasing pay homage to classic soul while creating a sound uniquely his own at Shelter House Music.',
    image_url = 'https://res.cloudinary.com/webprojectimages/image/upload/v1760022018/ShelterHouseMusic/ShelterHouseMusicImages/DemoImages/ArtistImagesDemo/f9aa825ded07217a99073edb16a42832.jpg',
    image_url_public_identifier = 'ShelterHouseMusic/ShelterHouseMusicImages/DemoImages/ArtistImagesDemo/f9aa825ded07217a99073edb16a42832',
    Career_Highlights = '• R&B vocal excellence award\n• Multiple platinum albums\n• Legendary live performances\n• Vocal technique clinics\n• Influenced new generation of singers',
    Influences = 'Luther Vandross, Teddy Pendergrass, Marvin Gaye, Sam Cooke',
    spotify_url = 'https://open.spotify.com/artist/isaiahvelvet',
    instagram_url = 'https://instagram.com/isaiahvelvet',
    facebook_url = 'https://facebook.com/isaiahvelvet',
    youtube_url = 'https://youtube.com/@isaiahvelvet',
    twitter_url = 'https://x.com/isaiahvelvet',
    apple_music_url = 'https://music.apple.com/artist/isaiah-velvet',
    tiktok_url = 'https://tiktok.com/@isaiahvelvet'
WHERE id = 29;

-- Artist ID 30: Mary J Blige → Nia Storm
UPDATE artists SET
    name = 'Nia Storm',
    bio = 'Nia Storm is a powerhouse R&B vocalist who blends raw emotion with hip-hop sensibilities. Her authentic storytelling and unmatched vocal prowess have established her as a leading voice at Shelter House Music.',
    image_url = 'https://res.cloudinary.com/webprojectimages/image/upload/v1760022072/ShelterHouseMusic/ShelterHouseMusicImages/DemoImages/ArtistImagesDemo/33396ab521a1e1ac81151a2cc7714752.jpg',
    image_url_public_identifier = 'ShelterHouseMusic/ShelterHouseMusicImages/DemoImages/ArtistImagesDemo/33396ab521a1e1ac81151a2cc7714752',
    Career_Highlights = '• Hip-hop soul innovator\n• Multiple awards and nominations\n• Empowerment anthem creator\n• Acting and music success\n• Cultural icon and influencer',
    Influences = 'Mary J. Blige, Lauryn Hill, Missy Elliott, Aaliyah',
    spotify_url = 'https://open.spotify.com/artist/niastorm',
    instagram_url = 'https://instagram.com/niastorm',
    facebook_url = 'https://facebook.com/niastorm',
    youtube_url = 'https://youtube.com/@niastorm',
    twitter_url = 'https://x.com/niastorm',
    apple_music_url = 'https://music.apple.com/artist/nia-storm',
    tiktok_url = 'https://tiktok.com/@niastorm'
WHERE id = 30;

-- Artist ID 31: Michael Jackson → Jordan Eclipse
UPDATE artists SET
    name = 'Jordan Eclipse',
    bio = 'Jordan Eclipse is a dynamic pop performer who combines incredible vocal ability with electrifying dance moves. His innovative approach to performance art and music production has made him a standout at Shelter House Music.',
    image_url = 'https://res.cloudinary.com/webprojectimages/image/upload/v1760022115/ShelterHouseMusic/ShelterHouseMusicImages/DemoImages/ArtistImagesDemo/d9553d34d97261cd74c0ff26c9507360.jpg',
    image_url_public_identifier = 'ShelterHouseMusic/ShelterHouseMusicImages/DemoImages/ArtistImagesDemo/d9553d34d97261cd74c0ff26c9507360',
    Career_Highlights = '• Groundbreaking music videos\n• Exceptional live performances\n• Pop and dance chart domination\n• Choreography innovation\n• Global tour success',
    Influences = 'Michael Jackson, Prince, Chris Brown, Usher',
    spotify_url = 'https://open.spotify.com/artist/jordaneclipse',
    instagram_url = 'https://instagram.com/jordaneclipse',
    facebook_url = 'https://facebook.com/jordaneclipse',
    youtube_url = 'https://youtube.com/@jordaneclipse',
    twitter_url = 'https://x.com/jordaneclipse',
    apple_music_url = 'https://music.apple.com/artist/jordan-eclipse',
    tiktok_url = 'https://tiktok.com/@jordaneclipse'
WHERE id = 31;

-- Artist ID 32: Samantha Mumba → Sienna Chase
UPDATE artists SET
    name = 'Sienna Chase',
    bio = 'Sienna Chase brings a fresh blend of pop and R&B to Shelter House Music. Her confident vocals and contemporary production have earned her a dedicated fanbase and critical recognition.',
    image_url = 'https://res.cloudinary.com/webprojectimages/image/upload/v1760022171/ShelterHouseMusic/ShelterHouseMusicImages/DemoImages/ArtistImagesDemo/bad368b6ef8c25add0db89ddb8796a0e.png',
    image_url_public_identifier = 'ShelterHouseMusic/ShelterHouseMusicImages/DemoImages/ArtistImagesDemo/bad368b6ef8c25add0db89ddb8796a0e',
    Career_Highlights = '• Pop/R&B crossover success\n• International recognition\n• Music and acting talents\n• Dance-pop anthems\n• Rising star trajectory',
    Influences = 'Janet Jackson, Aaliyah, Brandy, Ciara',
    spotify_url = 'https://open.spotify.com/artist/siennachase',
    instagram_url = 'https://instagram.com/siennachase',
    facebook_url = 'https://facebook.com/siennachase',
    youtube_url = 'https://youtube.com/@siennachase',
    twitter_url = 'https://x.com/siennachase',
    apple_music_url = 'https://music.apple.com/artist/sienna-chase',
    tiktok_url = 'https://tiktok.com/@siennachase'
WHERE id = 32;

-- Artist ID 33: Spice Girls → Harmony Five
UPDATE artists SET
    name = 'Harmony Five',
    bio = 'Harmony Five is an empowering girl group that celebrates friendship, confidence, and unity. Their infectious pop anthems and positive message have made them role models for fans worldwide.',
    image_url = 'https://res.cloudinary.com/webprojectimages/image/upload/v1760022228/ShelterHouseMusic/ShelterHouseMusicImages/DemoImages/ArtistImagesDemo/cfc61052e2d7daf78d38d6d2fdc98b6d.jpg',
    image_url_public_identifier = 'ShelterHouseMusic/ShelterHouseMusicImages/DemoImages/ArtistImagesDemo/cfc61052e2d7daf78d38d6d2fdc98b6d',
    Career_Highlights = '• Girl group phenomenon\n• Empowerment anthems\n• International tours\n• Fashion and music integration\n• Youth movement leaders',
    Influences = 'Spice Girls, Destiny\'s Child, TLC, Fifth Harmony',
    spotify_url = 'https://open.spotify.com/artist/harmonyfive',
    instagram_url = 'https://instagram.com/harmonyfive',
    facebook_url = 'https://facebook.com/harmonyfive',
    youtube_url = 'https://youtube.com/@harmonyfive',
    twitter_url = 'https://x.com/harmonyfive',
    apple_music_url = 'https://music.apple.com/artist/harmony-five',
    tiktok_url = 'https://tiktok.com/@harmonyfive'
WHERE id = 33;

-- Artist ID 34: Stevie Wonder → Marcus Vision
UPDATE artists SET
    name = 'Marcus Vision',
    bio = 'Marcus Vision is a musical virtuoso and multi-instrumentalist whose innovative approach to soul, funk, and R&B pushes creative boundaries. His socially conscious lyrics and musical genius define excellence at Shelter House Music.',
    image_url = 'https://res.cloudinary.com/webprojectimages/image/upload/v1760022267/ShelterHouseMusic/ShelterHouseMusicImages/DemoImages/ArtistImagesDemo/c4e8e3b00caf2da41ab214bbc8377f88.jpg',
    image_url_public_identifier = 'ShelterHouseMusic/ShelterHouseMusicImages/DemoImages/ArtistImagesDemo/c4e8e3b00caf2da41ab214bbc8377f88',
    Career_Highlights = '• Musical genius and innovator\n• Multi-instrumental mastery\n• Socially conscious artistry\n• Legendary live performances\n• Lifetime achievement honors',
    Influences = 'Stevie Wonder, Ray Charles, Donny Hathaway, Prince',
    spotify_url = 'https://open.spotify.com/artist/marcusvision',
    instagram_url = 'https://instagram.com/marcusvision',
    facebook_url = 'https://facebook.com/marcusvision',
    youtube_url = 'https://youtube.com/@marcusvision',
    twitter_url = 'https://x.com/marcusvision',
    apple_music_url = 'https://music.apple.com/artist/marcus-vision',
    tiktok_url = 'https://tiktok.com/@marcusvision'
WHERE id = 34;

-- Artist ID 35: Usher → Dante Flow
UPDATE artists SET
    name = 'Dante Flow',
    bio = 'Dante Flow is a contemporary R&B and pop artist who blends smooth vocals with modern production. His charismatic performances and chart-topping hits have solidified his position as a leading male vocalist at Shelter House Music.',
    image_url = 'https://res.cloudinary.com/webprojectimages/image/upload/v1760022319/ShelterHouseMusic/ShelterHouseMusicImages/DemoImages/ArtistImagesDemo/f0f99fffe02b760c4c2dd54c2bfeb0ac.jpg',
    image_url_public_identifier = 'ShelterHouseMusic/ShelterHouseMusicImages/DemoImages/ArtistImagesDemo/f0f99fffe02b760c4c2dd54c2bfeb0ac',
    Career_Highlights = '• R&B chart domination\n• Dynamic performer\n• Multi-platinum albums\n• Dance and vocal excellence\n• Contemporary R&B leader',
    Influences = 'Usher, Chris Brown, Trey Songz, Ne-Yo',
    spotify_url = 'https://open.spotify.com/artist/danteflow',
    instagram_url = 'https://instagram.com/danteflow',
    facebook_url = 'https://facebook.com/danteflow',
    youtube_url = 'https://youtube.com/@danteflow',
    twitter_url = 'https://x.com/danteflow',
    apple_music_url = 'https://music.apple.com/artist/dante-flow',
    tiktok_url = 'https://tiktok.com/@danteflow'
WHERE id = 35;

-- ============================================================================
-- SECTION 2: ARTIST IMAGES
-- ============================================================================
-- Update artist image URLs and references

UPDATE artist_images SET
    image_url = REPLACE(image_url, 'SoulFeltMusic', 'ShelterHouseMusic'),
    image_url_public_identifier = REPLACE(image_url_public_identifier, 'SoulFeltMusic', 'ShelterHouseMusic'),
    artist_name = CASE artist_id
        WHEN 20 THEN 'Sarah Monroe'
        WHEN 21 THEN 'Maya Rivers'
        WHEN 22 THEN 'Marcus Faith'
        WHEN 23 THEN 'Devon Smooth'
        WHEN 24 THEN 'Jade Starlight'
        WHEN 25 THEN 'Phoenix Soul'
        WHEN 26 THEN 'Adrian Keys'
        WHEN 27 THEN 'The Soul Collective'
        WHEN 28 THEN 'Cameron Gold'
        WHEN 29 THEN 'Isaiah Velvet'
        WHEN 30 THEN 'Nia Storm'
        WHEN 31 THEN 'Jordan Eclipse'
        WHEN 32 THEN 'Sienna Chase'
        WHEN 33 THEN 'Harmony Five'
        WHEN 34 THEN 'Marcus Vision'
        WHEN 35 THEN 'Dante Flow'
        ELSE artist_name
    END
WHERE demos = 1;

-- ============================================================================
-- SECTION 3: ALBUMS
-- ============================================================================
-- Update album information with Shelter House Music releases

-- Update Cloudinary URLs for all albums
UPDATE albums SET
    cover_url = REPLACE(cover_url, 'SoulFeltMusic', 'ShelterHouseMusic'),
    cover_url_public_identifier = REPLACE(cover_url_public_identifier, 'SoulFeltMusic', 'ShelterHouseMusic')
WHERE demos = 1;

-- Update specific album titles for rebranding
UPDATE albums SET title = 'Heart & Soul' WHERE id = 107 AND demos = 1;
UPDATE albums SET title = 'New Horizons' WHERE id = 108 AND demos = 1;
UPDATE albums SET title = 'Every Day Blessings' WHERE id = 109 AND demos = 1;
UPDATE albums SET title = 'Smooth Love' WHERE id = 110 AND demos = 1;
UPDATE albums SET title = 'Starlight Sessions' WHERE id = 111 AND demos = 1;
UPDATE albums SET title = 'Urban Soul' WHERE id = 112 AND demos = 1;
UPDATE albums SET title = 'Classic Piano Moments' WHERE id = 113 AND demos = 1;
UPDATE albums SET title = 'Soul Timeless' WHERE id = 114 AND demos = 1;
UPDATE albums SET title = 'Golden Nights' WHERE id = 115 AND demos = 1;
UPDATE albums SET title = 'Velvet Voice' WHERE id = 116 AND demos = 1;
UPDATE albums SET title = 'Storm Rising' WHERE id = 117 AND demos = 1;
UPDATE albums SET title = 'Eclipse' WHERE id = 118 AND demos = 1;
UPDATE albums SET title = 'Chase The Dream' WHERE id = 119 AND demos = 1;
UPDATE albums SET title = 'Unity' WHERE id = 120 AND demos = 1;
UPDATE albums SET title = 'Vision Quest' WHERE id = 121 AND demos = 1;
UPDATE albums SET title = 'Flow State' WHERE id = 122 AND demos = 1;

-- ============================================================================
-- SECTION 4: PROMOTIONAL TRACKS
-- ============================================================================
-- Update promotional track URLs and titles

UPDATE promotional_tracks SET
    promo_audio_url = REPLACE(promo_audio_url, 'SoulFeltMusic', 'ShelterHouseMusic'),
    promo_audio_url_public_identifier = REPLACE(promo_audio_url_public_identifier, 'SoulFeltMusic', 'ShelterHouseMusic')
WHERE demos = '1';

-- Update track titles
UPDATE promotional_tracks SET title = 'Heart & Soul Preview' WHERE id = 1 AND demos = '1';
UPDATE promotional_tracks SET title = 'New Horizons Sample' WHERE id = 2 AND demos = '1';
UPDATE promotional_tracks SET title = 'Every Day Joy' WHERE id = 3 AND demos = '1';
UPDATE promotional_tracks SET title = 'Smooth Appeal' WHERE id = 4 AND demos = '1';
UPDATE promotional_tracks SET title = 'Starlight Shine' WHERE id = 5 AND demos = '1';
UPDATE promotional_tracks SET title = 'Urban Soul Preview' WHERE id = 6 AND demos = '1';
UPDATE promotional_tracks SET title = 'Classic Moments Sample' WHERE id = 7 AND demos = '1';
UPDATE promotional_tracks SET title = 'Soul Forever' WHERE id = 8 AND demos = '1';
UPDATE promotional_tracks SET title = 'Golden Night Preview' WHERE id = 9 AND demos = '1';
UPDATE promotional_tracks SET title = 'Velvet Dreams' WHERE id = 10 AND demos = '1';
UPDATE promotional_tracks SET title = 'Rising Storm' WHERE id = 11 AND demos = '1';
UPDATE promotional_tracks SET title = 'Eclipse Preview' WHERE id = 12 AND demos = '1';
UPDATE promotional_tracks SET title = 'Dream Chaser' WHERE id = 13 AND demos = '1';
UPDATE promotional_tracks SET title = 'Unity Anthem' WHERE id = 14 AND demos = '1';
UPDATE promotional_tracks SET title = 'Vision Forward' WHERE id = 15 AND demos = '1';
UPDATE promotional_tracks SET title = 'Flow On' WHERE id = 16 AND demos = '1';

-- ============================================================================
-- SECTION 5: MERCHANDISE
-- ============================================================================
-- Update merchandise items with new artist names

UPDATE merchandise SET
    title = CASE artist_id
        WHEN 20 THEN 'Sarah Monroe'
        WHEN 21 THEN 'Maya Rivers'
        WHEN 22 THEN 'Marcus Faith'
        WHEN 23 THEN 'Devon Smooth'
        WHEN 24 THEN 'Jade Starlight'
        WHEN 25 THEN 'Phoenix Soul'
        WHEN 26 THEN 'Adrian Keys'
        WHEN 27 THEN 'The Soul Collective'
        WHEN 28 THEN 'Cameron Gold'
        WHEN 29 THEN 'Isaiah Velvet'
        WHEN 30 THEN 'Nia Storm'
        WHEN 31 THEN 'Jordan Eclipse'
        WHEN 32 THEN 'Sienna Chase'
        WHEN 33 THEN 'Harmony Five'
        WHEN 34 THEN 'Marcus Vision'
        WHEN 35 THEN 'Dante Flow'
        ELSE title
    END,
    image_url = REPLACE(image_url, 'SoulFeltMusic', 'ShelterHouseMusic')
WHERE demos = 1;

-- ============================================================================
-- SECTION 6: COMMUNITY EVENTS
-- ============================================================================
-- Update community events with Shelter House Music branding

UPDATE community_events SET
    title = REPLACE(REPLACE(title, 'Soul Felt Music', 'Shelter House Music'), 'SoulFelt', 'Shelter House'),
    description = REPLACE(REPLACE(description, 'Soul Felt Music', 'Shelter House Music'), 'SoulFelt', 'Shelter House'),
    image_url = REPLACE(image_url, 'SoulFeltMusic', 'ShelterHouseMusic'),
    event_image_url = REPLACE(event_image_url, 'SoulFeltMusic', 'ShelterHouseMusic'),
    image_public_identifier = REPLACE(image_public_identifier, 'SoulFeltMusic', 'ShelterHouseMusic')
WHERE is_active = 1;

-- ============================================================================
-- SECTION 7: FAQS
-- ============================================================================
-- Update FAQ content with new brand name

UPDATE faqs SET
    question = REPLACE(question, 'Soul Felt Music', 'Shelter House Music'),
    answer = REPLACE(answer, 'Soul Felt Music', 'Shelter House Music')
WHERE is_published = 1;

-- ============================================================================
-- SECTION 8: NEWSLETTER CAMPAIGNS
-- ============================================================================
-- Update newsletter campaigns with new brand

UPDATE newsletter_campaigns SET
    title = REPLACE(title, 'Whitney houston', 'Sarah Monroe'),
    subject = REPLACE(subject, 'Whitney houston', 'Sarah Monroe'),
    content = REPLACE(REPLACE(content, 'Whitney', 'Sarah Monroe'), 'whitney', 'Sarah Monroe'),
    message = REPLACE(message, 'Whitney', 'Sarah Monroe'),
    audio_url = REPLACE(audio_url, 'SoulFeltMusic', 'ShelterHouseMusic'),
    video_url = REPLACE(video_url, 'SoulFeltMusic', 'ShelterHouseMusic'),
    featured_image = REPLACE(featured_image, 'SoulFeltMusic', 'ShelterHouseMusic')
WHERE id > 0;

-- ============================================================================
-- SECTION 9: VIDEOS
-- ============================================================================
-- Update video URLs if videos table has data

-- Note: Some columns may not exist in all schema versions, so we update only what exists
UPDATE videos SET
    video_url = REPLACE(video_url, 'SoulFeltMusic', 'ShelterHouseMusic'),
    video_url_public_identifier = REPLACE(video_url_public_identifier, 'SoulFeltMusic', 'ShelterHouseMusic')
WHERE id > 0;

-- Update promotional videos (skip if table doesn't exist)
UPDATE promotional_videos SET
    promo_video_url = REPLACE(promo_video_url, 'SoulFeltMusic', 'ShelterHouseMusic'),
    promo_video_url_public_identifier = REPLACE(promo_video_url_public_identifier, 'SoulFeltMusic', 'ShelterHouseMusic')
WHERE id > 0;

-- ============================================================================
-- SECTION 10: TRACKS (if accessible)
-- ============================================================================
-- Update main tracks table

UPDATE tracks SET
    audio_url = REPLACE(audio_url, 'SoulFeltMusic', 'ShelterHouseMusic'),
    audio_url_public_identifier = REPLACE(audio_url_public_identifier, 'SoulFeltMusic', 'ShelterHouseMusic')
WHERE id > 0;

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================
-- Run these after the script to verify changes

-- SELECT name, bio FROM artists WHERE id BETWEEN 20 AND 35 LIMIT 5;
-- SELECT title, cover_url FROM albums WHERE demos = 1 LIMIT 5;
-- SELECT title FROM promotional_tracks WHERE demos = '1' LIMIT 5;
-- SELECT question FROM faqs WHERE question LIKE '%Shelter House Music%' LIMIT 3;

-- ============================================================================
-- END OF SCRIPT
-- ============================================================================
-- Remember to run rollback_soulfelt.sql if you need to revert these changes
