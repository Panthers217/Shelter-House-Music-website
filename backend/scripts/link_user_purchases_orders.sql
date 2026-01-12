-- ============================================================================
-- Link User, Purchases, and Order Items Tables
-- This script ensures proper relationships and indexes for purchase tracking
-- ============================================================================

-- Step 1: Update purchases table structure
-- Add all necessary columns for Stripe and order tracking
ALTER TABLE purchases
ADD COLUMN IF NOT EXISTS stripe_payment_intent_id VARCHAR(255) UNIQUE,
ADD COLUMN IF NOT EXISTS order_id VARCHAR(50) UNIQUE,
ADD COLUMN IF NOT EXISTS amount DECIMAL(10, 2),
ADD COLUMN IF NOT EXISTS currency VARCHAR(3) DEFAULT 'usd',
ADD COLUMN IF NOT EXISTS payment_status VARCHAR(50) DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS customer_email VARCHAR(255),
ADD COLUMN IF NOT EXISTS customer_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS shipping_address TEXT,
ADD COLUMN IF NOT EXISTS item_type VARCHAR(255),
ADD COLUMN IF NOT EXISTS metadata JSON,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- Step 2: Ensure user_id column exists and is properly typed
-- Check if user_id needs to be updated to match user table's BIGINT UNSIGNED
ALTER TABLE purchases 
MODIFY COLUMN user_id BIGINT UNSIGNED NULL;

-- Step 3: Add foreign key constraint linking purchases to user table
-- First, drop the constraint if it exists (for re-running script)
ALTER TABLE purchases 
DROP FOREIGN KEY IF EXISTS fk_purchases_user;

-- Add the foreign key with proper name
ALTER TABLE purchases
ADD CONSTRAINT fk_purchases_user 
FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE SET NULL;
-- Using SET NULL so if a user is deleted, we keep the purchase record

-- Step 4: Create order_items table if it doesn't exist
CREATE TABLE IF NOT EXISTS order_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    purchase_id BIGINT UNSIGNED NOT NULL,
    item_type VARCHAR(50) NOT NULL, -- 'Track', 'Digital Album', 'Vinyl Record', 'Merchandise', etc.
    item_id BIGINT UNSIGNED NOT NULL, -- ID of the track, album, or merchandise
    item_title VARCHAR(255),
    artist_name VARCHAR(255),
    quantity INT DEFAULT 1,
    price DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Step 5: Add foreign key for order_items linking to purchases
ALTER TABLE order_items 
DROP FOREIGN KEY IF EXISTS fk_order_items_purchase;

ALTER TABLE order_items
ADD CONSTRAINT fk_order_items_purchase
FOREIGN KEY (purchase_id) REFERENCES purchases(id) ON DELETE CASCADE;
-- Using CASCADE so when a purchase is deleted, all its items are deleted too

-- Step 6: Create indexes for efficient queries
-- Purchases table indexes
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_stripe_payment_intent ON purchases(stripe_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_purchases_order_id ON purchases(order_id);
CREATE INDEX IF NOT EXISTS idx_purchases_payment_status ON purchases(payment_status);
CREATE INDEX IF NOT EXISTS idx_purchases_customer_email ON purchases(customer_email);
CREATE INDEX IF NOT EXISTS idx_purchases_created_at ON purchases(purchased_at);

-- Order items table indexes
CREATE INDEX IF NOT EXISTS idx_order_items_purchase_id ON order_items(purchase_id);
CREATE INDEX IF NOT EXISTS idx_order_items_type_id ON order_items(item_type, item_id);
CREATE INDEX IF NOT EXISTS idx_order_items_artist_name ON order_items(artist_name);

-- Step 7: Remove old track_id column if it exists (replaced by order_items)
-- ALTER TABLE purchases DROP COLUMN IF EXISTS track_id;

-- ============================================================================
-- Verification Queries (Run these to check the setup)
-- ============================================================================

-- Check purchases table structure
-- DESCRIBE purchases;

-- Check order_items table structure
-- DESCRIBE order_items;

-- Check foreign keys
-- SELECT 
--   TABLE_NAME,
--   COLUMN_NAME,
--   CONSTRAINT_NAME,
--   REFERENCED_TABLE_NAME,
--   REFERENCED_COLUMN_NAME
-- FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
-- WHERE TABLE_SCHEMA = DATABASE()
--   AND TABLE_NAME IN ('purchases', 'order_items')
--   AND REFERENCED_TABLE_NAME IS NOT NULL;

-- Check indexes
-- SHOW INDEX FROM purchases;
-- SHOW INDEX FROM order_items;

-- ============================================================================
-- Example Query: Get user's purchase history with items
-- ============================================================================

-- SELECT 
--   u.id as user_id,
--   u.username,
--   u.email,
--   p.id as purchase_id,
--   p.order_id,
--   p.amount as total_amount,
--   p.payment_status,
--   p.purchased_at,
--   oi.item_type,
--   oi.item_title,
--   oi.artist_name,
--   oi.quantity,
--   oi.price
-- FROM user u
-- JOIN purchases p ON u.id = p.user_id
-- LEFT JOIN order_items oi ON p.id = oi.purchase_id
-- WHERE u.id = ?  -- Replace with actual user_id
-- ORDER BY p.purchased_at DESC, oi.id;

-- ============================================================================
-- Example Query: Get all purchases with total items count
-- ============================================================================

-- SELECT 
--   p.id,
--   p.order_id,
--   p.customer_name,
--   p.customer_email,
--   p.amount,
--   p.payment_status,
--   p.purchased_at,
--   COUNT(oi.id) as item_count,
--   GROUP_CONCAT(CONCAT(oi.item_type, ': ', oi.item_title) SEPARATOR '; ') as items
-- FROM purchases p
-- LEFT JOIN order_items oi ON p.id = oi.purchase_id
-- GROUP BY p.id
-- ORDER BY p.purchased_at DESC;

