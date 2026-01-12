-- Add item_type column to purchases table to track what type of items are in the order

ALTER TABLE purchases
ADD COLUMN item_type VARCHAR(255) COMMENT 'Comma-separated list of item types in this order (e.g., "Track, Album")';

-- Create an index for faster filtering by item type
CREATE INDEX idx_purchases_item_type ON purchases(item_type);
