-- Add stats columns to artists table
-- ALTER TABLE artists 
-- ADD COLUMN rating DECIMAL(2,1) DEFAULT NULL,
-- ADD COLUMN monthly_listeners VARCHAR(50) DEFAULT NULL,
-- ADD COLUMN albums_released INT DEFAULT NULL;

-- Insert random realistic data for each artist
UPDATE artists 
SET 
--   rating = ROUND(4.0 + (RAND() * 1.0), 1),
  monthly_listeners = CASE 
    WHEN RAND() > 0.85 THEN CONCAT(ROUND(1.0 + (RAND() * 9), 1), 'M')  -- 1.0M - 10M for top artists
    WHEN RAND() > 0.60 THEN CONCAT(ROUND(100 + (RAND() * 900)), 'K')   -- 100K - 999K for mid-tier
    WHEN RAND() > 0.30 THEN CONCAT(ROUND(10 + (RAND() * 90)), 'K')     -- 10K - 99K for emerging
    ELSE CONCAT(ROUND(1 + (RAND() * 9)), 'K')                          -- 1K - 9K for new artists
  END,
  albums_released = FLOOR(1 + (RAND() * 60))  -- Random albums between 1-60
WHERE name IS NOT NULL;
