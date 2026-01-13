# Rebranding Inventory: SoulFelt Music → Shelter House Music

## Database Overview
- **Database**: defaultdb (MySQL 8.0.35)
- **Total Tables**: 22
- **Constraint**: Schema remains unchanged; only data/content is rebranded

---

## Table Classification

### 🎨 CONTENT TABLES (Requires Rebranding)
These tables contain SoulFelt-specific content that needs to be replaced with Shelter House Music branding:

#### 1. **artists** (Priority: HIGH)
- **What to rebrand**: 
  - Artist names, bios, career highlights, influences
  - Image URLs containing "SoulFeltMusic" → "ShelterHouseMusic"
  - Social media URLs
  - Country/genre data (review and adjust)
- **Current records**: 16 artists (IDs 20-35)
- **Key columns**: `name`, `bio`, `image_url`, `Career_Highlights`, `Influences`, `image_url_public_identifier`, `spotify_url`, `instagram_url`, `facebook_url`, `youtube_url`, `twitter_url`, `apple_music_url`, `tiktok_url`

#### 2. **albums** (Priority: HIGH)
- **What to rebrand**:
  - Album titles (where appropriate)
  - Cover URLs containing "SoulFeltMusic" → "ShelterHouseMusic"
  - Descriptions and genres
  - Purchase links
- **Current records**: 16 albums (IDs 107-122)
- **Key columns**: `title`, `cover_url`, `cover_url_public_identifier`, `image_description`, `album_description`, `genre`, `purchase_link`

#### 3. **tracks** (Priority: HIGH)
- **What to rebrand**:
  - Track titles (where needed)
  - Audio URLs containing "SoulFeltMusic" → "ShelterHouseMusic"
  - Descriptions and tags
- **Key columns**: `title`, `audio_url`, `audio_url_public_identifier`, `audio_description`, `tags`
- **Note**: Schema not fully visible in dump, needs verification

#### 4. **promotional_tracks** (Priority: HIGH)
- **What to rebrand**:
  - Promotional track titles
  - Audio URLs containing "SoulFeltMusic" → "ShelterHouseMusic"
  - Descriptions and tags
- **Current records**: ~16 promo tracks
- **Key columns**: `title`, `promo_audio_url`, `promo_audio_url_public_identifier`, `audio_description`, `tags`

#### 5. **promotional_videos** (Priority: HIGH)
- **What to rebrand**:
  - Video titles and descriptions
  - Video URLs containing "SoulFeltMusic" → "ShelterHouseMusic"
  - Thumbnail URLs
- **Key columns**: `title`, `video_url`, `video_url_public_identifier`, `thumbnail_url`, `description`

#### 6. **videos** (Priority: MEDIUM)
- **What to rebrand**:
  - Video content URLs and thumbnails
  - Descriptions
- **Key columns**: `video_url`, `thumbnail_url`, `description`, `video_url_public_identifier`

#### 7. **artist_images** (Priority: HIGH)
- **What to rebrand**:
  - Image URLs containing "SoulFeltMusic" → "ShelterHouseMusic"
  - Descriptions
  - Artist names
- **Current records**: 17 images
- **Key columns**: `image_url`, `description`, `image_url_public_identifier`, `image_description`, `artist_name`, `image_name`

#### 8. **merchandise** (Priority: MEDIUM)
- **What to rebrand**:
  - Product titles and descriptions
  - Image URLs containing "SoulFeltMusic" → "ShelterHouseMusic"
  - Purchase links
- **Current records**: 20 merch items (IDs 1-20)
- **Key columns**: `title`, `merch_type`, `description`, `image_url`, `purchase_link`

#### 9. **community_events** (Priority: MEDIUM)
- **What to rebrand**:
  - Event titles containing "Soul Felt Music"
  - Event descriptions referencing the old brand
  - Image URLs containing "SoulFeltMusic" → "ShelterHouseMusic"
- **Current records**: 4 events
- **Key columns**: `title`, `description`, `image_url`, `event_image_url`, `image_public_identifier`

#### 10. **newsletter_campaigns** (Priority: MEDIUM)
- **What to rebrand**:
  - Campaign titles and subjects
  - Content/message text referencing SoulFelt
  - Featured images and media URLs
- **Current records**: 1 campaign
- **Key columns**: `title`, `subject`, `content`, `message`, `audio_url`, `video_url`, `featured_image`

#### 11. **faqs** (Priority: LOW)
- **What to rebrand**:
  - Questions and answers mentioning "Soul Felt Music"
- **Current records**: 15 FAQs
- **Key columns**: `question`, `answer`
- **Examples to update**: 
  - "What is Soul Felt Music?" → "What is Shelter House Music?"
  - References to "Soul Felt Music" throughout answers

#### 12. **website_settings** (Priority: LOW)
- **What to rebrand**:
  - Site name, tagline, about text
  - Social media URLs
  - Contact information
  - Logo URLs
- **Key columns**: `site_name`, `tagline`, `about_text`, `logo_url`, etc.

---

### 🔧 SYSTEM TABLES (No Rebranding Required)
These tables contain system/operational data that should remain unchanged:

#### 13. **user**
- User account information
- No branding content
- **Action**: None

#### 14. **user_artist_follows**
- User follow relationships
- **Action**: None

#### 15. **contact_submissions**
- Contact form submissions (historical data)
- **Action**: Keep for records, or archive

#### 16. **newsletter**
- Newsletter subscriber emails
- **Action**: None (preserve subscribers)

#### 17. **newsletter_campaign_recipients**
- Campaign delivery tracking
- **Action**: None (historical data)

#### 18. **purchases**
- Purchase transaction records
- **Action**: None (preserve transaction history)

#### 19. **order_items**
- Order line items
- **Action**: None (preserve transaction history)

#### 20. **track_plays**
- Play count analytics
- **Action**: None (preserve analytics)

#### 21. **genres**
- Genre taxonomy (Pop, Jazz, Soul, RnB, etc.)
- **Action**: None (generic genres)

#### 22. **website_mode**
- Site configuration/mode
- **Action**: None (technical setting)

---

## Cloudinary URL Pattern Updates

### Current Pattern:
```
https://res.cloudinary.com/webprojectimages/image/upload/v[VERSION]/SoulFeltMusic/...
```

### New Pattern:
```
https://res.cloudinary.com/webprojectimages/image/upload/v[VERSION]/ShelterHouseMusic/...
```

### Affected Columns:
- All `*_url` columns in content tables
- All `*_public_identifier` columns (Cloudinary paths)

**Note**: Actual Cloudinary resources may need to be renamed/moved separately, or new resources uploaded under ShelterHouseMusic folder structure.

---

## Rebranding Strategy

### Phase 1: Artists & Content
1. Update artist names, bios, images
2. Update albums, tracks, promotional content
3. Update Cloudinary URLs

### Phase 2: Marketing & Community
1. Update events and FAQs
2. Update newsletter campaigns
3. Update website settings

### Phase 3: Verification
1. Test all media URLs
2. Verify foreign key relationships intact
3. Test frontend rendering

---

## Important Notes

1. **Schema Integrity**: All table structures, columns, constraints, and relationships remain untouched
2. **Historical Data**: Transaction and user data (purchases, follows, submissions) are preserved
3. **Cloudinary Assets**: May need to duplicate/move assets in Cloudinary from SoulFeltMusic → ShelterHouseMusic paths
4. **Reversibility**: Original data backed up in rollback script
5. **Demo Data**: Many records have `demos=1` flag - these are test records

---

## Next Steps

1. ✅ Create this inventory
2. ⏳ Generate `seed_shelterhouse.sql` with new branded data
3. ⏳ Generate `rollback_soulfelt.sql` to restore original data
4. ⏳ Create README with execution instructions
5. ⏳ Test scripts on development copy of database
