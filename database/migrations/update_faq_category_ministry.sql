-- Migration: Update FAQ category from "Store & Purchases" to "Ministry Support & Giving"
-- Date: 2026-01-21

UPDATE faqs 
SET category = 'Ministry Support & Giving' 
WHERE category = 'Store & Purchases';

-- Verify the update
SELECT id, question, category 
FROM faqs 
WHERE category = 'Ministry Support & Giving';
