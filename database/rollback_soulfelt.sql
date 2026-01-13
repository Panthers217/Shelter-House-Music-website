-- ============================================================================
-- SoulFelt Music - Rollback Script
-- ============================================================================
-- Purpose: Restore original SoulFelt Music data after Shelter House Music rebrand
-- Schema: UNCHANGED - Only data content is restored
-- Use Case: Rollback changes made by seed_shelterhouse.sql
-- ============================================================================

-- WARNING: This script will revert to SoulFelt Music branding
-- Ensure you want to rollback before proceeding
-- Run this on the same database where seed_shelterhouse.sql was executed

USE defaultdb;

-- ============================================================================
-- SECTION 1: ARTISTS - Restore Original Names and Data
-- ============================================================================

UPDATE artists SET
    name = 'Whitney Houston ',
    bio = NULL,
    image_url = 'https://res.cloudinary.com/webprojectimages/image/upload/v1760021193/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/eea8002efe919856a3678ee9094003cc.jpg',
    image_url_public_identifier = 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/eea8002efe919856a3678ee9094003cc',
    Career_Highlights = NULL,
    Influences = NULL,
    spotify_url = 'https://open.spotify.com/artist/whitneyhouston',
    instagram_url = 'https://instagram.com/whitneyhouston',
    facebook_url = 'https://facebook.com/whitneyhouston',
    youtube_url = 'https://youtube.com/@whitneyhouston',
    twitter_url = 'https://x.com/whitneyhouston',
    apple_music_url = 'https://music.apple.com/artist/whitney-houston-',
    tiktok_url = 'https://tiktok.com/@whitneyhouston'
WHERE id = 20;

UPDATE artists SET
    name = 'Alsou',
    bio = 'Alsou is a Russian pop singer who gained international recognition after representing Russia at Eurovision. Known for her melodic voice and captivating performances, she has become one of the most successful pop artists in Russia, blending contemporary pop with traditional influences.',
    image_url = 'https://res.cloudinary.com/webprojectimages/image/upload/v1760021246/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/d3e69b61b912d43a8af70848b8433639.jpg',
    image_url_public_identifier = 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/d3e69b61b912d43a8af70848b8433639',
    Career_Highlights = '• Represented Russia at Eurovision Song Contest 2000\n• Multiple Russian Music Awards\n• Platinum-selling albums in Russia\n• Successful acting career in Russian cinema\n• International tours across Europe and Asia',
    Influences = 'Russian pop music, Western pop artists, Eurovision performers',
    spotify_url = 'https://open.spotify.com/artist/alsou',
    instagram_url = 'https://instagram.com/alsou',
    facebook_url = 'https://facebook.com/alsou',
    youtube_url = 'https://youtube.com/@alsou',
    twitter_url = 'https://x.com/alsou',
    apple_music_url = 'https://music.apple.com/artist/alsou',
    tiktok_url = 'https://tiktok.com/@alsou'
WHERE id = 21;

UPDATE artists SET
    name = 'Anthony Brown',
    bio = 'Anthony Brown is a renowned gospel music artist and worship leader, known for his powerful messages and soulful performances. As the leader of group therAPy, he has become a influential figure in contemporary gospel music, inspiring audiences with his authentic worship style.',
    image_url = 'https://res.cloudinary.com/webprojectimages/image/upload/v1760021677/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/bdf5564c49331b1b885ca484c085e917.jpg',
    image_url_public_identifier = 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/bdf5564c49331b1b885ca484c085e917',
    Career_Highlights = '• Multiple Stellar Gospel Music Awards\r\n• Dove Award nominations\r\n• Chart-topping gospel albums\r\n• Influential worship leader and pastor\r\n• Inspiring performances at major gospel events',
    Influences = 'Traditional Gospel, Kirk Franklin, Contemporary worship music',
    spotify_url = 'https://open.spotify.com/artist/anthonybrown',
    instagram_url = 'https://instagram.com/anthonybrown',
    facebook_url = 'https://facebook.com/anthonybrown',
    youtube_url = 'https://youtube.com/@anthonybrown',
    twitter_url = 'https://x.com/anthonybrown',
    apple_music_url = 'https://music.apple.com/artist/anthony-brown',
    tiktok_url = 'https://tiktok.com/@anthonybrown'
WHERE id = 22;

UPDATE artists SET
    name = 'BabyFace',
    bio = 'Kenneth "Babyface" Edmonds is a legendary R&B singer, songwriter, and producer who has shaped the sound of modern soul music. With his smooth vocals and masterful production skills, he has written and produced hits for countless artists while maintaining a successful solo career.',
    image_url = 'https://res.cloudinary.com/webprojectimages/image/upload/v1760021719/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/41e0f23871deba9e1305a1d97bef0ab9.jpg',
    image_url_public_identifier = 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/41e0f23871deba9e1305a1d97bef0ab9',
    Career_Highlights = '• 12 Grammy Awards as artist and producer\n• Written and produced over 26 #1 R&B hits\n• Produced for Whitney Houston, Boyz II Men, Toni Braxton\n• Co-founder of LaFace Records\n• Inducted into Songwriters Hall of Fame',
    Influences = 'Marvin Gaye, Stevie Wonder, The Isley Brothers, Smokey Robinson',
    spotify_url = 'https://open.spotify.com/artist/babyface',
    instagram_url = 'https://instagram.com/babyface',
    facebook_url = 'https://facebook.com/babyface',
    youtube_url = 'https://youtube.com/@babyface',
    twitter_url = 'https://x.com/babyface',
    apple_music_url = 'https://music.apple.com/artist/babyface',
    tiktok_url = 'https://tiktok.com/@babyface'
WHERE id = 23;

UPDATE artists SET
    name = 'Britney Spears',
    bio = 'Britney Spears is a pop icon who defined a generation with her catchy songs, innovative music videos, and electrifying performances. Rising to fame in the late 1990s, she became one of the best-selling music artists of all time and a cultural phenomenon that shaped modern pop music.',
    image_url = 'https://res.cloudinary.com/webprojectimages/image/upload/v1760021790/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/7807bab26f8774fcc25b79adacb7cda0.jpg',
    image_url_public_identifier = 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/7807bab26f8774fcc25b79adacb7cda0',
    Career_Highlights = '• "...Baby One More Time" became a global phenomenon\n• 6 #1 albums on Billboard 200\n• Grammy Award winner\n• Over 100 million records sold worldwide\n• MTV Video Vanguard Award recipient',
    Influences = 'Madonna, Janet Jackson, Michael Jackson, Prince',
    spotify_url = 'https://open.spotify.com/artist/britneyspears',
    instagram_url = 'https://instagram.com/britneyspears',
    facebook_url = 'https://facebook.com/britneyspears',
    youtube_url = 'https://youtube.com/@britneyspears',
    twitter_url = 'https://x.com/britneyspears',
    apple_music_url = 'https://music.apple.com/artist/britney-spears',
    tiktok_url = 'https://tiktok.com/@britneyspears'
WHERE id = 24;

UPDATE artists SET
    name = 'Deagngelo',
    bio = 'D\'Angelo is a pioneering neo-soul artist whose innovative approach to R&B has influenced countless musicians. Known for his sultry vocals, complex arrangements, and musical virtuosity, he helped define the neo-soul movement and continues to push creative boundaries.',
    image_url = 'https://res.cloudinary.com/webprojectimages/image/upload/v1760021834/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/fc9e11c3bc4c6f16db71c0bd3bef0794.jpg',
    image_url_public_identifier = 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/fc9e11c3bc4c6f16db71c0bd3bef0794',
    Career_Highlights = '• Grammy Award-winning artist\n• Critically acclaimed albums "Brown Sugar" and "Voodoo"\n• Pioneered the neo-soul movement\n• Collaborated with hip-hop and R&B legends\n• Known for innovative live performances',
    Influences = 'Marvin Gaye, Prince, Al Green, Curtis Mayfield',
    spotify_url = 'https://open.spotify.com/artist/deagngelo',
    instagram_url = 'https://instagram.com/deagngelo',
    facebook_url = 'https://facebook.com/deagngelo',
    youtube_url = 'https://youtube.com/@deagngelo',
    twitter_url = 'https://x.com/deagngelo',
    apple_music_url = 'https://music.apple.com/artist/deagngelo',
    tiktok_url = 'https://tiktok.com/@deagngelo'
WHERE id = 25;

UPDATE artists SET
    name = 'Alexis FFrench',
    bio = 'Alexis Ffrench is a British contemporary classical pianist and composer who bridges the gap between classical and popular music. His emotive compositions and virtuoso performances have made him one of the UK\'s most successful classical artists, bringing piano music to new audiences.',
    image_url = 'https://res.cloudinary.com/webprojectimages/image/upload/v1760021870/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/6e27252db98a8182809e101c9d52ca95.jpg',
    image_url_public_identifier = 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/6e27252db98a8182809e101c9d52ca95',
    Career_Highlights = '• Multiple classical chart-topping albums\n• Over 100 million streams worldwide\n• Performed at prestigious venues including Royal Albert Hall\n• Ambassador for music education\n• Blending classical with contemporary sounds',
    Influences = 'Chopin, Debussy, Ludovico Einaudi, Max Richter',
    spotify_url = 'https://open.spotify.com/artist/alexisffrench',
    instagram_url = 'https://instagram.com/alexisffrench',
    facebook_url = 'https://facebook.com/alexisffrench',
    youtube_url = 'https://youtube.com/@alexisffrench',
    twitter_url = 'https://x.com/alexisffrench',
    apple_music_url = 'https://music.apple.com/artist/alexis-ffrench',
    tiktok_url = 'https://tiktok.com/@alexisffrench'
WHERE id = 26;

UPDATE artists SET
    name = 'Great Soul ',
    bio = NULL,
    image_url = 'https://res.cloudinary.com/webprojectimages/image/upload/v1760021943/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/765256f360b03577c4a397586a70b3ff.jpg',
    image_url_public_identifier = 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/765256f360b03577c4a397586a70b3ff',
    Career_Highlights = NULL,
    Influences = NULL,
    spotify_url = 'https://open.spotify.com/artist/greatsoul',
    instagram_url = 'https://instagram.com/greatsoul',
    facebook_url = 'https://facebook.com/greatsoul',
    youtube_url = 'https://youtube.com/@greatsoul',
    twitter_url = 'https://x.com/greatsoul',
    apple_music_url = 'https://music.apple.com/artist/great-soul-',
    tiktok_url = 'https://tiktok.com/@greatsoul'
WHERE id = 27;

UPDATE artists SET
    name = 'Lionel Richie',
    bio = 'Lionel Richie is a legendary singer, songwriter, and producer whose smooth voice and timeless ballads have made him one of the most successful artists in music history. From his work with The Commodores to his illustrious solo career, his songs have become anthems of love and celebration.',
    image_url = 'https://res.cloudinary.com/webprojectimages/image/upload/v1760021982/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/1bcb8042df29f6a9bf7471ac4c3eef52.jpg',
    image_url_public_identifier = 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/1bcb8042df29f6a9bf7471ac4c3eef52',
    Career_Highlights = '• 4 Grammy Awards and Academy Award winner\n• Over 125 million records sold worldwide\n• Inducted into Songwriters Hall of Fame\n• Kennedy Center Honors recipient\n• Chart-topping hits spanning five decades',
    Influences = 'Nat King Cole, Sam Cooke, Marvin Gaye, Smokey Robinson',
    spotify_url = 'https://open.spotify.com/artist/lionelrichie',
    instagram_url = 'https://instagram.com/lionelrichie',
    facebook_url = 'https://facebook.com/lionelrichie',
    youtube_url = 'https://youtube.com/@lionelrichie',
    twitter_url = 'https://x.com/lionelrichie',
    apple_music_url = 'https://music.apple.com/artist/lionel-richie',
    tiktok_url = 'https://tiktok.com/@lionelrichie'
WHERE id = 28;

UPDATE artists SET
    name = 'Luther Vandross',
    bio = 'Luther Vandross was a masterful R&B vocalist whose velvety voice and impeccable phrasing set the gold standard for soul music. His romantic ballads and passionate performances earned him multiple Grammy Awards and secured his place as one of the greatest singers of all time.',
    image_url = 'https://res.cloudinary.com/webprojectimages/image/upload/v1760022018/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/f9aa825ded07217a99073edb16a42832.jpg',
    image_url_public_identifier = 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/f9aa825ded07217a99073edb16a42832',
    Career_Highlights = '• 8 Grammy Awards\n• Sold over 40 million records worldwide\n• 13 platinum albums\n• Legendary performances at Apollo Theater\n• Influenced generations of R&B vocalists',
    Influences = 'Aretha Franklin, Dionne Warwick, Stevie Wonder, Diana Ross',
    spotify_url = 'https://open.spotify.com/artist/luthervandross',
    instagram_url = 'https://instagram.com/luthervandross',
    facebook_url = 'https://facebook.com/luthervandross',
    youtube_url = 'https://youtube.com/@luthervandross',
    twitter_url = 'https://x.com/luthervandross',
    apple_music_url = 'https://music.apple.com/artist/luther-vandross',
    tiktok_url = 'https://tiktok.com/@luthervandross'
WHERE id = 29;

UPDATE artists SET
    name = 'Mary j Blige',
    bio = 'Mary J. Blige, known as the "Queen of Hip-Hop Soul," revolutionized R&B by blending hip-hop beats with soulful vocals and raw emotional honesty. Her powerful voice and authentic storytelling have made her one of the most influential and successful artists in contemporary music.',
    image_url = 'https://res.cloudinary.com/webprojectimages/image/upload/v1760022072/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/33396ab521a1e1ac81151a2cc7714752.jpg',
    image_url_public_identifier = 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/33396ab521a1e1ac81151a2cc7714752',
    Career_Highlights = '• 9 Grammy Awards from 32 nominations\n• Over 80 million records sold worldwide\n• Academy Award nominations for acting and music\n• Billboard\'s Icon Award recipient\n• Pioneered hip-hop soul genre',
    Influences = 'Aretha Franklin, Chaka Khan, Anita Baker, Hip-Hop culture',
    spotify_url = 'https://open.spotify.com/artist/maryjblige',
    instagram_url = 'https://instagram.com/maryjblige',
    facebook_url = 'https://facebook.com/maryjblige',
    youtube_url = 'https://youtube.com/@maryjblige',
    twitter_url = 'https://x.com/maryjblige',
    apple_music_url = 'https://music.apple.com/artist/mary-j-blige',
    tiktok_url = 'https://tiktok.com/@maryjblige'
WHERE id = 30;

UPDATE artists SET
    name = 'Michael Jackson',
    bio = 'Michael Jackson, the "King of Pop," was a global phenomenon who revolutionized music, dance, and entertainment. His groundbreaking albums, innovative music videos, and electrifying performances made him the most successful entertainer of all time, with an influence that transcends generations and genres.',
    image_url = 'https://res.cloudinary.com/webprojectimages/image/upload/v1760022115/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/d9553d34d97261cd74c0ff26c9507360.jpg',
    image_url_public_identifier = 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/d9553d34d97261cd74c0ff26c9507360',
    Career_Highlights = '• 13 Grammy Awards and Grammy Legend Award\n• "Thriller" is best-selling album of all time\n• Pioneered modern music video artform\n• Inducted into Rock and Roll Hall of Fame twice\n• Over 400 million records sold worldwide',
    Influences = 'James Brown, Jackie Wilson, Diana Ross, Fred Astaire',
    spotify_url = 'https://open.spotify.com/artist/michaeljackson',
    instagram_url = 'https://instagram.com/michaeljackson',
    facebook_url = 'https://facebook.com/michaeljackson',
    youtube_url = 'https://youtube.com/@michaeljackson',
    twitter_url = 'https://x.com/michaeljackson',
    apple_music_url = 'https://music.apple.com/artist/michael-jackson',
    tiktok_url = 'https://tiktok.com/@michaeljackson'
WHERE id = 31;

UPDATE artists SET
    name = 'Samantha Mumba',
    bio = 'Samantha Mumba is an Irish singer and actress who gained international success with her blend of R&B, pop, and dance music. Her debut album showcased her versatile vocals and contemporary sound, establishing her as a prominent artist in the early 2000s pop scene.',
    image_url = 'https://res.cloudinary.com/webprojectimages/image/upload/v1760022171/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/bad368b6ef8c25add0db89ddb8796a0e.png',
    image_url_public_identifier = 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/bad368b6ef8c25add0db89ddb8796a0e',
    Career_Highlights = '• Debut single "Gotta Tell You" reached Top 5 worldwide\n• Platinum-selling debut album\n• MTV Europe Music Award nomination\n• Successful transition to acting\n• International tours across Europe and Asia',
    Influences = 'Whitney Houston, Janet Jackson, Aaliyah, TLC',
    spotify_url = 'https://open.spotify.com/artist/samanthamumba',
    instagram_url = 'https://instagram.com/samanthamumba',
    facebook_url = 'https://facebook.com/samanthamumba',
    youtube_url = 'https://youtube.com/@samanthamumba',
    twitter_url = 'https://x.com/samanthamumba',
    apple_music_url = 'https://music.apple.com/artist/samantha-mumba',
    tiktok_url = 'https://tiktok.com/@samanthamumba'
WHERE id = 32;

UPDATE artists SET
    name = 'Spice Girls',
    bio = 'The Spice Girls were a British pop phenomenon that defined the 1990s with their message of "Girl Power" and infectious pop anthems. As one of the best-selling girl groups of all time, they became a global cultural force, influencing fashion, music, and popular culture worldwide.',
    image_url = 'https://res.cloudinary.com/webprojectimages/image/upload/v1760022228/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/cfc61052e2d7daf78d38d6d2fdc98b6d.jpg',
    image_url_public_identifier = 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/cfc61052e2d7daf78d38d6d2fdc98b6d',
    Career_Highlights = '• Best-selling girl group of all time\n• 9 #1 singles in the UK\n• "Wannabe" topped charts in 37 countries\n• Over 100 million records sold worldwide\n• Brit Awards and MTV Awards winners',
    Influences = 'Madonna, Bananarama, Girl groups of the 60s, Pop culture',
    spotify_url = 'https://open.spotify.com/artist/spicegirls',
    instagram_url = 'https://instagram.com/spicegirls',
    facebook_url = 'https://facebook.com/spicegirls',
    youtube_url = 'https://youtube.com/@spicegirls',
    twitter_url = 'https://x.com/spicegirls',
    apple_music_url = 'https://music.apple.com/artist/spice-girls',
    tiktok_url = 'https://tiktok.com/@spicegirls'
WHERE id = 33;

UPDATE artists SET
    name = 'Stevie Wonder',
    bio = 'Stevie Wonder is a musical genius whose innovative approach to soul, funk, and R&B has made him one of the most celebrated artists in music history. A multi-instrumentalist, singer, and songwriter, his socially conscious lyrics and groundbreaking production techniques have influenced generations of musicians.',
    image_url = 'https://res.cloudinary.com/webprojectimages/image/upload/v1760022267/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/c4e8e3b00caf2da41ab214bbc8377f88.jpg',
    image_url_public_identifier = 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/c4e8e3b00caf2da41ab214bbc8377f88',
    Career_Highlights = '• 25 Grammy Awards including Lifetime Achievement\n• Inducted into Rock and Roll Hall of Fame\n• Presidential Medal of Freedom recipient\n• Over 100 million records sold worldwide\n• Pioneer in use of synthesizers in R&B',
    Influences = 'Ray Charles, Sam Cooke, Aretha Franklin, Jazz legends',
    spotify_url = 'https://open.spotify.com/artist/steviewonder',
    instagram_url = 'https://instagram.com/steviewonder',
    facebook_url = 'https://facebook.com/steviewonder',
    youtube_url = 'https://youtube.com/@steviewonder',
    twitter_url = 'https://x.com/steviewonder',
    apple_music_url = 'https://music.apple.com/artist/stevie-wonder',
    tiktok_url = 'https://tiktok.com/@steviewonder'
WHERE id = 34;

UPDATE artists SET
    name = 'Usher ',
    bio = NULL,
    image_url = 'https://res.cloudinary.com/webprojectimages/image/upload/v1760022319/SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/f0f99fffe02b760c4c2dd54c2bfeb0ac.jpg',
    image_url_public_identifier = 'SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo/f0f99fffe02b760c4c2dd54c2bfeb0ac',
    Career_Highlights = NULL,
    Influences = NULL,
    spotify_url = 'https://open.spotify.com/artist/usher',
    instagram_url = 'https://instagram.com/usher',
    facebook_url = 'https://facebook.com/usher',
    youtube_url = 'https://youtube.com/@usher',
    twitter_url = 'https://x.com/usher',
    apple_music_url = 'https://music.apple.com/artist/usher-',
    tiktok_url = 'https://tiktok.com/@usher'
WHERE id = 35;

-- ============================================================================
-- SECTION 2: ARTIST IMAGES - Restore Original URLs
-- ============================================================================

UPDATE artist_images SET
    image_url = REPLACE(image_url, 'ShelterHouseMusic', 'SoulFeltMusic'),
    image_url_public_identifier = REPLACE(image_url_public_identifier, 'ShelterHouseMusic', 'SoulFeltMusic'),
    artist_name = CASE artist_id
        WHEN 20 THEN 'Whitney Houston'
        WHEN 21 THEN 'Alsou'
        WHEN 22 THEN 'Anthony Brown'
        WHEN 23 THEN 'BabyFace'
        WHEN 24 THEN 'Britney Spears'
        WHEN 25 THEN 'Deangelo'
        WHEN 26 THEN 'Alexis FFrench'
        WHEN 27 THEN 'Great Soul'
        WHEN 28 THEN 'Lionel Richie'
        WHEN 29 THEN 'Luther Vandross'
        WHEN 30 THEN 'Mary j Blige'
        WHEN 31 THEN 'Michael Jackson'
        WHEN 32 THEN 'Samantha Mumba'
        WHEN 33 THEN 'Spice Girls'
        WHEN 34 THEN 'Stevie Wonder'
        WHEN 35 THEN 'Usher'
        ELSE artist_name
    END
WHERE demos = 1;

-- ============================================================================
-- SECTION 3: ALBUMS - Restore Original Titles and URLs
-- ============================================================================

UPDATE albums SET
    cover_url = REPLACE(cover_url, 'ShelterHouseMusic', 'SoulFeltMusic'),
    cover_url_public_identifier = REPLACE(cover_url_public_identifier, 'ShelterHouseMusic', 'SoulFeltMusic')
WHERE demos = 1;

-- Restore original album titles
UPDATE albums SET title = 'So Emotional' WHERE id = 107 AND demos = 1;
UPDATE albums SET title = 'Also is here  demo' WHERE id = 108 AND demos = 1;
UPDATE albums SET title = 'Everyday' WHERE id = 109 AND demos = 1;
UPDATE albums SET title = 'Tender Lover' WHERE id = 110 AND demos = 1;
UPDATE albums SET title = 'Britney I here demo' WHERE id = 111 AND demos = 1;
UPDATE albums SET title = 'Brown Sugar' WHERE id = 112 AND demos = 1;
UPDATE albums SET title = 'Classic Soul of Alexis FFrench' WHERE id = 113 AND demos = 1;
UPDATE albums SET title = 'Great Soul  Covers' WHERE id = 114 AND demos = 1;
UPDATE albums SET title = 'Dancing On The Ceiling ' WHERE id = 115 AND demos = 1;
UPDATE albums SET title = 'Luther Vandross I\'m here demo' WHERE id = 116 AND demos = 1;
UPDATE albums SET title = 'No More Drama' WHERE id = 117 AND demos = 1;
UPDATE albums SET title = 'Thriller' WHERE id = 118 AND demos = 1;
UPDATE albums SET title = 'Got To Tell You' WHERE id = 119 AND demos = 1;
UPDATE albums SET title = 'Forever' WHERE id = 120 AND demos = 1;
UPDATE albums SET title = 'Hotter Than July' WHERE id = 121 AND demos = 1;
UPDATE albums SET title = 'Confessions' WHERE id = 122 AND demos = 1;

-- ============================================================================
-- SECTION 4: PROMOTIONAL TRACKS - Restore Original
-- ============================================================================

UPDATE promotional_tracks SET
    promo_audio_url = REPLACE(promo_audio_url, 'ShelterHouseMusic', 'SoulFeltMusic'),
    promo_audio_url_public_identifier = REPLACE(promo_audio_url_public_identifier, 'ShelterHouseMusic', 'SoulFeltMusic')
WHERE demos = '1';

-- Restore original track titles
UPDATE promotional_tracks SET title = 'So emotional promo' WHERE id = 1 AND demos = '1';
UPDATE promotional_tracks SET title = 'Before you love me promo' WHERE id = 2 AND demos = '1';
UPDATE promotional_tracks SET title = 'Everyday Jesus' WHERE id = 3 AND demos = '1';
UPDATE promotional_tracks SET title = 'Whip Appeal' WHERE id = 4 AND demos = '1';
UPDATE promotional_tracks SET title = 'Baby one more time promo' WHERE id = 5 AND demos = '1';
UPDATE promotional_tracks SET title = 'Brown Sugar promo' WHERE id = 6 AND demos = '1';
UPDATE promotional_tracks SET title = 'Classic soul promo' WHERE id = 7 AND demos = '1';
UPDATE promotional_tracks SET title = 'One in a Milllion promo' WHERE id = 8 AND demos = '1';
UPDATE promotional_tracks SET title = 'Dancing on the ceiling promo' WHERE id = 9 AND demos = '1';
UPDATE promotional_tracks SET title = 'Never too much promo' WHERE id = 10 AND demos = '1';
UPDATE promotional_tracks SET title = 'No. more drama promo' WHERE id = 11 AND demos = '1';
UPDATE promotional_tracks SET title = 'Thriller promo' WHERE id = 12 AND demos = '1';
UPDATE promotional_tracks SET title = 'Gotta tell you promo' WHERE id = 13 AND demos = '1';
UPDATE promotional_tracks SET title = 'Forever promo' WHERE id = 14 AND demos = '1';
UPDATE promotional_tracks SET title = 'All I do promo' WHERE id = 15 AND demos = '1';
UPDATE promotional_tracks SET title = 'You don\'t have to call promo' WHERE id = 16 AND demos = '1';

-- ============================================================================
-- SECTION 5: MERCHANDISE - Restore Original
-- ============================================================================

UPDATE merchandise SET
    title = CASE artist_id
        WHEN 20 THEN 'Whitney Houston'
        WHEN 21 THEN 'Alsou'
        WHEN 22 THEN 'Anthony Brown'
        WHEN 23 THEN 'BabyFace'
        WHEN 24 THEN 'Britney Spears'
        WHEN 25 THEN 'Deangelo'
        WHEN 26 THEN 'Alexis FFrench'
        WHEN 27 THEN 'Great Soul'
        WHEN 28 THEN 'Lionel Richie'
        WHEN 29 THEN 'Luther Vandross'
        WHEN 30 THEN 'Mary j Blidge'
        WHEN 31 THEN 'Michael Jackson'
        WHEN 32 THEN 'Samantha Mumba'
        WHEN 33 THEN 'Spice Gilrs'
        WHEN 34 THEN 'Stevie Wonder'
        WHEN 35 THEN 'Usher'
        ELSE title
    END,
    image_url = REPLACE(image_url, 'ShelterHouseMusic', 'SoulFeltMusic')
WHERE demos = 1;

-- ============================================================================
-- SECTION 6: COMMUNITY EVENTS - Restore Original
-- ============================================================================

UPDATE community_events SET
    title = REPLACE(REPLACE(title, 'Shelter House Music', 'Soul Felt Music'), 'Shelter House', 'SoulFelt'),
    description = REPLACE(REPLACE(description, 'Shelter House Music', 'Soul Felt Music'), 'Shelter House', 'SoulFelt'),
    image_url = REPLACE(image_url, 'ShelterHouseMusic', 'SoulFeltMusic'),
    event_image_url = REPLACE(event_image_url, 'ShelterHouseMusic', 'SoulFeltMusic'),
    image_public_identifier = REPLACE(image_public_identifier, 'ShelterHouseMusic', 'SoulFeltMusic')
WHERE is_active = 1;

-- ============================================================================
-- SECTION 7: FAQS - Restore Original
-- ============================================================================

UPDATE faqs SET
    question = REPLACE(question, 'Shelter House Music', 'Soul Felt Music'),
    answer = REPLACE(answer, 'Shelter House Music', 'Soul Felt Music')
WHERE is_published = 1;

-- ============================================================================
-- SECTION 8: NEWSLETTER CAMPAIGNS - Restore Original
-- ============================================================================

UPDATE newsletter_campaigns SET
    title = REPLACE(title, 'Sarah Monroe', 'Whitney houston'),
    subject = REPLACE(subject, 'Sarah Monroe', 'Whitney houston'),
    content = REPLACE(content, 'Sarah Monroe', 'Whitney'),
    message = REPLACE(message, 'Sarah Monroe', 'Whitney'),
    audio_url = REPLACE(audio_url, 'ShelterHouseMusic', 'SoulFeltMusic'),
    video_url = REPLACE(video_url, 'ShelterHouseMusic', 'SoulFeltMusic'),
    featured_image = REPLACE(featured_image, 'ShelterHouseMusic', 'SoulFeltMusic')
WHERE id > 0;

-- ============================================================================
-- SECTION 9: VIDEOS - Restore Original URLs
-- ============================================================================

UPDATE videos SET
    video_url = REPLACE(video_url, 'ShelterHouseMusic', 'SoulFeltMusic'),
    thumbnail_url = REPLACE(thumbnail_url, 'ShelterHouseMusic', 'SoulFeltMusic'),
    video_url_public_identifier = REPLACE(video_url_public_identifier, 'ShelterHouseMusic', 'SoulFeltMusic')
WHERE id > 0;

UPDATE promotional_videos SET
    promo_video_url = REPLACE(promo_video_url, 'ShelterHouseMusic', 'SoulFeltMusic'),
    promo_video_url_public_identifier = REPLACE(promo_video_url_public_identifier, 'ShelterHouseMusic', 'SoulFeltMusic')
WHERE id > 0;

-- ============================================================================
-- SECTION 10: TRACKS - Restore Original
-- ============================================================================

UPDATE tracks SET
    audio_url = REPLACE(audio_url, 'ShelterHouseMusic', 'SoulFeltMusic'),
    audio_url_public_identifier = REPLACE(audio_url_public_identifier, 'ShelterHouseMusic', 'SoulFeltMusic')
WHERE id > 0;

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================
-- Run these after rollback to verify restoration

-- SELECT name, bio FROM artists WHERE id BETWEEN 20 AND 35 LIMIT 5;
-- SELECT title, cover_url FROM albums WHERE demos = 1 LIMIT 5;
-- SELECT title FROM promotional_tracks WHERE demos = '1' LIMIT 5;
-- SELECT question FROM faqs WHERE question LIKE '%Soul Felt Music%' LIMIT 3;

-- ============================================================================
-- END OF ROLLBACK SCRIPT
-- ============================================================================
-- SoulFelt Music data has been restored
