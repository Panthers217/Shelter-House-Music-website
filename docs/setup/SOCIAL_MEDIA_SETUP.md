# Social Media Integration Setup

## Database Migration

Run the SQL migration to add social media columns and demo data:

```bash
# Connect to your database and run:
mysql -u your_user -p your_database < backend/Sql\ table\ schema/add_artist_social_media.sql

# Or if using MySQL Workbench/Aiven Console, copy and paste the SQL from:
# backend/Sql table schema/add_artist_social_media.sql
```

## What was added:

### Database Schema
Added 7 new columns to the `artists` table:
- `spotify_url` - Artist's Spotify profile
- `instagram_url` - Artist's Instagram profile  
- `twitter_url` - Artist's X (Twitter) profile
- `youtube_url` - Artist's YouTube channel
- `apple_music_url` - Artist's Apple Music profile
- `tiktok_url` - Artist's TikTok profile
- `facebook_url` - Artist's Facebook page

### Demo Data
The migration automatically:
1. Generates placeholder URLs for all existing artists
2. Updates specific popular artists (Whitney Houston, Michael Jackson, etc.) with example real URLs
3. Creates an index for faster social media queries

### Frontend Integration
The `ArtistOverview` component now:
- Reads social media URLs from the artist data
- Conditionally renders only icons for platforms where the artist has a URL
- Displays modern, brand-accurate icons with hover effects
- Links directly to artist profiles on each platform

## Customization

To add/update social media links for specific artists:

```sql
UPDATE artists 
SET 
  spotify_url = 'https://open.spotify.com/artist/YOUR_ID',
  instagram_url = 'https://instagram.com/username',
  twitter_url = 'https://x.com/username',
  youtube_url = 'https://youtube.com/@username',
  apple_music_url = 'https://music.apple.com/artist/YOUR_ID',
  tiktok_url = 'https://tiktok.com/@username',
  facebook_url = 'https://facebook.com/username'
WHERE id = YOUR_ARTIST_ID;
```

## Backend Update Needed

Update your artist API endpoint to include the new social media fields:

```javascript
// In backend/controllers/artistController.js or similar
// Make sure your SELECT query includes:
SELECT 
  id, name, bio, image_url, genre, 
  spotify_url, instagram_url, twitter_url, 
  youtube_url, apple_music_url, tiktok_url, facebook_url
  -- ... other fields
FROM artists;
```
