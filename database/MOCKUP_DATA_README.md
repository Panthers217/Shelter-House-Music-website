# Shelter House Music - Mockup Data Documentation

## Overview
This document describes the mockup data created for Shelter House Music, a Christian music recording ministry dedicated to serving local churches, gospel artists, and the broader community of Eastern North Carolina.

## Purpose
The mockup data provides realistic examples of Gospel and Christian artists, albums, tracks, and related content that showcase the ministry's mission and services.

## Database Seed File
**File:** `seed_shelterhouse.sql`
**Location:** `/database/seed_shelterhouse.sql`

## What This Script Does

### 1. Clears Existing Demo Data
The script safely removes all existing demo data before inserting new records:
- Track plays
- Promotional videos
- Promotional tracks
- Tracks
- Albums
- Artist images
- Merchandise
- Artists

### 2. Inserts 5 Gospel & Christian Artists

#### Artist 1: Grace Williams
- **Genre:** Contemporary Christian, Worship
- **Description:** Passionate worship leader and contemporary Christian artist
- **Albums:** 2 albums ("Worship Without Walls", "Faithful Heart")
- **Tracks:** 3 worship songs
- **Key Features:** Leading worship at major conferences, featured on Christian radio

#### Artist 2: The Redeemed Voices
- **Genre:** Traditional Gospel, Contemporary Gospel
- **Description:** Powerful gospel choir with 25 voices
- **Albums:** 2 albums ("Joyful Sounds of Praise", "Sunday Morning Glory")
- **Tracks:** 3 gospel choir performances
- **Key Features:** Performed at Gospel Music Festivals, community ministry

#### Artist 3: Marcus Reid
- **Genre:** Gospel, Praise & Worship
- **Description:** Pastor and gospel recording artist
- **Albums:** 2 albums ("Breakthrough", "The Worship Experience")
- **Tracks:** 3 powerful gospel songs
- **Key Features:** Stellar Award nomination, leading worship conferences

#### Artist 4: Joyful Noise Youth Choir
- **Genre:** Contemporary Christian, Youth Gospel
- **Description:** Youth choir ages 12-18 representing next generation
- **Albums:** 1 album ("Young and Faithful")
- **Tracks:** 3 energetic youth worship songs
- **Key Features:** Youth Choir Excellence Award, growing social media presence

#### Artist 5: Sister Sarah James
- **Genre:** Traditional Gospel, Hymns
- **Description:** Traditional gospel singer with 30+ years ministry experience
- **Albums:** 2 albums ("Old Time Religion", "Testimony Time")
- **Tracks:** 3 traditional gospel songs
- **Key Features:** Keeper of gospel heritage, mentor to young singers

## Complete Data Package

### Each Artist Includes:
- ✅ **Comprehensive Bio:** Ministry background and mission
- ✅ **Career Highlights:** Key achievements and milestones
- ✅ **Musical Influences:** Inspiration from gospel legends
- ✅ **Social Media Links:** Spotify, YouTube, Instagram, Facebook, TikTok, Apple Music, Twitter
- ✅ **High-Quality Images:** Profile photos from Unsplash
- ✅ **Multiple Albums:** 1-2 albums per artist
- ✅ **Multiple Tracks:** 3 tracks per artist with audio URLs
- ✅ **Promotional Content:** Preview tracks and music videos
- ✅ **Merchandise:** T-shirts, CDs, hats, bundles
- ✅ **Genre Tags:** Gospel, Contemporary Christian, Worship, Traditional Gospel

### Total Records Created:
- **5 Artists** (IDs 1-5)
- **9 Albums** (IDs 101-109)
- **15 Tracks** (IDs 1-15)
- **5 Promotional Tracks** (IDs 1-5)
- **5 Promotional Videos** (IDs 1-5)
- **6 Artist Images** (IDs 1-6)
- **10 Merchandise Items** (IDs 1-10)
- **4 Community Events** (Gospel Festival, Youth Worship Night, Revival Service, Workshop)
- **5 FAQs** (Ministry mission, church partnerships, booking info)

## Audio & Video Content

### Audio Files
- All tracks use placeholder audio URLs from soundhelix.com
- Duration: 180-300 seconds per track
- Formats: MP3
- Genres properly tagged for each song

### Video Files
- All videos use placeholder YouTube URLs
- Include music videos, live performances, concert footage
- Each video has descriptive titles and contexts

### Image Files
- All images use high-quality stock photos from Unsplash
- Album covers, artist portraits, merchandise photos, event images
- Resolution: 600x600 for albums, 800x800 for artists

## Running the Seed Script

### Prerequisites
1. MySQL database running
2. Database name: `defaultdb`
3. Backup existing data if needed

### Execution
```bash
# Connect to your MySQL database
mysql -u your_username -p

# Run the seed script
source /path/to/seed_shelterhouse.sql

# Or run directly
mysql -u your_username -p defaultdb < seed_shelterhouse.sql
```

### Expected Output
```
Shelter House Music mockup data successfully inserted!
Total_Artists: 5
Total_Albums: 9
Total_Tracks: 15
Total_Promotional_Tracks: 5
Total_Merchandise: 10
```

## Content Highlights

### Album Titles
1. Worship Without Walls
2. Faithful Heart
3. Joyful Sounds of Praise
4. Sunday Morning Glory
5. Breakthrough
6. The Worship Experience
7. Young and Faithful
8. Old Time Religion
9. Testimony Time

### Featured Track Titles
- Great Are You Lord
- Holy Spirit Come
- Hallelujah Praise
- Glory to His Name
- Amazing Grace (Live)
- I'm Free
- Breakthrough Is Coming
- We Give You Glory
- Shout for Joy
- Jesus Is Alive
- Generation Worship
- Give Me That Old Time Religion
- I Shall Wear a Crown
- My Testimony

### Community Events
1. **Gospel Festival 2026** - Annual celebration featuring all artists
2. **Youth Worship Night** - Next generation praise event
3. **Sunday Revival Service** - Traditional gospel revival
4. **Recording Workshop** - Free training for church musicians

## Merchandise Available
- Artist T-Shirts ($18-$25)
- CD Albums ($15)
- CD Bundles ($45)
- Embroidered Hats ($20)
- Ministry Hoodies ($35)
- Complete Ministry Bundles ($60)

## Ministry Focus Areas

### Primary Services
1. **Professional Recording** - High-quality studio production
2. **Live Worship Events** - Concerts and church services
3. **Artist Development** - Mentoring and training
4. **Community Outreach** - Youth programs and revivals
5. **Church Partnerships** - Collaboration with local congregations

### Target Demographics
- Local churches in Eastern North Carolina
- Gospel and Christian artists
- Youth groups and choirs
- Traditional gospel music enthusiasts
- Contemporary worship leaders

## Data Flags & Features

### All records include:
- `demos = 1` flag for easy identification
- `activate = 1` for live status
- `new_release` flags for recent content
- `recommended` flags for featured content
- `popular` flags for trending items
- `featured` flags for homepage highlights

## Customization Notes

### Easy Updates:
1. **Images:** Replace Unsplash URLs with actual artist photos
2. **Audio:** Replace placeholder URLs with real track files
3. **Videos:** Update YouTube links with actual music videos
4. **Social Media:** Update URLs with real artist profiles
5. **Pricing:** Adjust album and merchandise pricing as needed

### Adding More Artists:
- Follow the same pattern for new INSERT statements
- Increment IDs appropriately
- Maintain the `demos = 1` flag
- Include all required fields

## Genre Classification

### Primary Genres Used:
- **Contemporary Christian** - Modern worship music
- **Traditional Gospel** - Classic gospel hymns
- **Worship** - Congregational worship songs
- **Gospel** - General gospel music
- **Youth Gospel** - Music for young believers
- **Praise & Worship** - Corporate worship settings

## Support & Contact

For questions about the mockup data or Shelter House Music ministry:
- Review the FAQs in the database
- Check community events for upcoming activities
- Use the contact form for artist submissions
- Explore merchandise to support the ministry

---

**Last Updated:** January 13, 2026
**Version:** 1.0
**Ministry:** Shelter House Music - Eastern North Carolina
**Purpose:** Demo & Development Database Content
