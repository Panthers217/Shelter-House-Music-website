-- Create order_items table and remove order_items JSON column from purchases

-- Remove the order_items JSON column from purchases (if it exists)

-- Create order_items table for proper normalization
CREATE TABLE IF NOT EXISTS order_items (
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
