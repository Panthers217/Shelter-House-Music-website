-- ============================================================================
-- Delete Old Artists Script
-- ============================================================================
-- Purpose: Remove all old demo artist data (IDs 20-35) from the database
-- This will preserve the new Shelter House Music artists (IDs 1-5)
-- Date: January 2026
-- ============================================================================

-- WARNING: This script will permanently delete data
-- Ensure you have a backup before proceeding
-- Run this on your target database

USE shelterhouse_dev;

-- ============================================================================
-- DELETE OLD ARTIST DATA
-- Artist IDs to delete: 20-35 (Whitney Houston, Alsou, etc.)
-- Artist IDs to keep: 1-5 (Grace Williams, The Redeemed Voices, etc.)
-- ============================================================================

-- Step 1: Delete track plays for old artists
DELETE FROM track_plays 
WHERE artist_id BETWEEN 20 AND 35;

-- Step 2: Delete user follows for old artists
DELETE FROM user_artist_follows 
WHERE artist_id BETWEEN 20 AND 35;

-- Step 3: Delete promotional videos for old artists
DELETE FROM promotional_videos 
WHERE artist_id BETWEEN 20 AND 35;

-- Step 4: Delete promotional tracks for old artists
DELETE FROM promotional_tracks 
WHERE artist_id BETWEEN 20 AND 35;

-- Step 5: Delete videos for old artists
DELETE FROM videos 
WHERE artist_id BETWEEN 20 AND 35;

-- Step 6: Delete tracks for old artists (will also delete order_items via cascade)
DELETE FROM tracks 
WHERE artist_id BETWEEN 20 AND 35;

-- Step 7: Delete albums for old artists
DELETE FROM albums 
WHERE artist_id BETWEEN 20 AND 35;

-- Step 8: Delete artist images for old artists
DELETE FROM artist_images 
WHERE artist_id BETWEEN 20 AND 35;

-- Step 9: Delete merchandise for old artists
DELETE FROM merchandise 
WHERE artist_id BETWEEN 20 AND 35;

-- Step 10: Finally, delete the artist records themselves
DELETE FROM artists 
WHERE id BETWEEN 20 AND 35;

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Check remaining artists (should only show IDs 1-5)
SELECT id, name, genre 
FROM artists 
ORDER BY id;

-- Count records by table
SELECT 
    'Artists' AS table_name, 
    COUNT(*) AS remaining_count 
FROM artists
UNION ALL
SELECT 'Albums', COUNT(*) FROM albums
UNION ALL
SELECT 'Tracks', COUNT(*) FROM tracks
UNION ALL
SELECT 'Promotional Tracks', COUNT(*) FROM promotional_tracks
UNION ALL
SELECT 'Promotional Videos', COUNT(*) FROM promotional_videos
UNION ALL
SELECT 'Artist Images', COUNT(*) FROM artist_images
UNION ALL
SELECT 'Merchandise', COUNT(*) FROM merchandise
UNION ALL
SELECT 'Videos', COUNT(*) FROM videos;

-- ============================================================================
-- SUCCESS MESSAGE
-- ============================================================================
SELECT 'Old artist records (IDs 20-35) have been successfully deleted!' AS Status;
SELECT 'New Shelter House Music artists (IDs 1-5) remain intact.' AS Status;
