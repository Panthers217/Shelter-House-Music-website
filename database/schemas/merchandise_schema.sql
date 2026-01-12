-- -- Merchandise Table Schema for Soul Felt Music
-- -- This table stores merchandise items for the Artist Store

-- CREATE TABLE merchandise (
--   id SERIAL PRIMARY KEY,
--   artist_id INTEGER REFERENCES artists(id) ON DELETE CASCADE,
--   title VARCHAR(150) NOT NULL,
--   merch_type VARCHAR(50) NOT NULL, -- 'Apparel', 'Accessories', 'Posters & Art', 'Limited Edition', etc.
--   description TEXT,
--   price NUMERIC(10,2) NOT NULL, -- Price in dollars (e.g., 24.99)
--   image_url VARCHAR(255),
--   stock_quantity INTEGER DEFAULT 0,
--   is_available BOOLEAN DEFAULT true,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   demos TINYINT DEFAULT 0
-- );

-- -- Create index on artist_id for faster queries
-- CREATE INDEX idx_merchandise_artist_id ON merchandise(artist_id);

-- -- Create index on merch_type for filtering
-- CREATE INDEX idx_merchandise_type ON merchandise(merch_type);

-- Sample data insertion
INSERT INTO merchandise (artist_id, title, merch_type, description, price, image_url, stock_quantity) VALUES
(1, 'Luna Starlight T-Shirt', 'Apparel', 'Official band t-shirt with logo', 24.99, 'https://placehold.co/265x265', 50),
(1, 'Retro Wave Hoodie', 'Apparel', 'Comfortable hoodie with vintage design', 49.99, 'https://placehold.co/265x265', 30),
(1, 'Neon Keychain', 'Accessories', 'LED keychain with band logo', 9.99, 'https://placehold.co/265x265', 100),
(1, 'Synthwave Poster Set', 'Posters & Art', 'Set of 3 high-quality posters', 15.99, 'https://placehold.co/265x265', 75),
(1, 'Cosmic Journey - Limited Edition', 'Limited Edition', 'Signed limited edition merchandise', 19.99, 'https://placehold.co/265x265', 10);
