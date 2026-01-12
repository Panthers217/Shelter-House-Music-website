-- Update purchases table to track complete order and Stripe information
-- Add new columns to purchases table
-- ALTER TABLE purchases
-- ADD COLUMN stripe_payment_intent_id VARCHAR(255) UNIQUE,
-- ADD COLUMN order_id VARCHAR(50) UNIQUE,
-- ADD COLUMN amount DECIMAL(10, 2),
-- ADD COLUMN currency VARCHAR(3) DEFAULT 'usd',
-- ADD COLUMN payment_status VARCHAR(50) DEFAULT 'pending',
-- ADD COLUMN customer_email VARCHAR(255),
-- ADD COLUMN customer_name VARCHAR(255),
-- ADD COLUMN shipping_address TEXT,
-- ADD COLUMN metadata JSON,
-- ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- Remove the old track_id column since items will be in order_items table
-- ALTER TABLE purchases DROP COLUMN track_id;

-- Create indexes for faster queries
-- CREATE INDEX idx_purchases_user_id ON purchases(user_id);
-- CREATE INDEX idx_purchases_stripe_payment_intent ON purchases(stripe_payment_intent_id);
-- CREATE INDEX idx_purchases_order_id ON purchases(order_id);
-- CREATE INDEX idx_purchases_payment_status ON purchases(payment_status);

-- Create order_items table for proper normalization
CREATE TABLE order_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    purchase_id BIGINT UNSIGNED NOT NULL,
    item_type VARCHAR(50) NOT NULL, -- 'track', 'album', 'merchandise'
    item_id BIGINT UNSIGNED NOT NULL,
    item_title VARCHAR(255),
    artist_name VARCHAR(255),
    quantity INT DEFAULT 1,
    price DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id) ON DELETE CASCADE,
    INDEX idx_order_items_purchase_id (purchase_id),
    INDEX idx_order_items_type_id (item_type, item_id)
);
