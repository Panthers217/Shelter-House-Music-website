-- -- Alter tracks table to add new, popular, and recommended columns

-- ALTER TABLE tracks ADD COLUMN is_new BOOLEAN DEFAULT false;
-- ALTER TABLE tracks ADD COLUMN is_popular BOOLEAN DEFAULT false;
-- ALTER TABLE tracks ADD COLUMN is_recommended BOOLEAN DEFAULT false;

-- -- Create indexes for faster filtering
-- CREATE INDEX idx_tracks_is_new ON tracks(is_new);
-- CREATE INDEX idx_tracks_is_popular ON tracks(is_popular);
-- CREATE INDEX idx_tracks_is_recommended ON tracks(is_recommended);

-- -- Optional: Add a combined index for queries that filter by multiple flags
-- CREATE INDEX idx_tracks_flags ON tracks(is_new, is_popular, is_recommended);
-- ALTER TABLE artists ADD COLUMN image_url_public_identifier VARCHAR(255);
-- CREATE INDEX idx_tracks_is_recommended ON tracks(is_recommended);

-- Add top_tracks column
ALTER TABLE tracks ADD COLUMN top_tracks BOOLEAN DEFAULT false AFTER is_recommended;

-- Create individual index for top_tracks
CREATE INDEX idx_tracks_top_tracks ON tracks(top_tracks);

-- Drop the old combined index
DROP INDEX idx_tracks_flags ON tracks;

-- Recreate the combined index with all flag columns including top_tracks
CREATE INDEX idx_tracks_flags ON tracks(is_new, is_popular, is_recommended, top_tracks);