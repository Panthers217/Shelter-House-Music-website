-- ============================================================================
-- PURCHASE TRACKING SYSTEM VERIFICATION SCRIPT
-- Run this to check if your database is properly configured
-- ============================================================================

-- 1. Check if purchases table has all required columns
SELECT 'Checking purchases table structure...' as status;
DESCRIBE purchases;

-- 2. Check if order_items table exists and has correct structure
SELECT 'Checking order_items table structure...' as status;
DESCRIBE order_items;

-- 3. Check foreign key constraints
SELECT 'Checking foreign key relationships...' as status;
SELECT 
  TABLE_NAME,
  COLUMN_NAME,
  CONSTRAINT_NAME,
  REFERENCED_TABLE_NAME,
  REFERENCED_COLUMN_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME IN ('purchases', 'order_items')
  AND REFERENCED_TABLE_NAME IS NOT NULL;

-- 4. Check indexes on purchases table
SELECT 'Checking indexes on purchases table...' as status;
SHOW INDEX FROM purchases;

-- 5. Check indexes on order_items table
SELECT 'Checking indexes on order_items table...' as status;
SHOW INDEX FROM order_items;

-- 6. Check if there are any purchases in the system
SELECT 'Checking purchase records...' as status;
SELECT 
  COUNT(*) as total_purchases,
  COUNT(DISTINCT user_id) as unique_users,
  SUM(CASE WHEN payment_status = 'succeeded' THEN 1 ELSE 0 END) as successful_purchases,
  SUM(CASE WHEN payment_status = 'pending' THEN 1 ELSE 0 END) as pending_purchases
FROM purchases;

-- 7. Check if order_items are linked to purchases
SELECT 'Checking order items linkage...' as status;
SELECT 
  COUNT(*) as total_order_items,
  COUNT(DISTINCT purchase_id) as linked_purchases
FROM order_items;

-- 8. Check for any orphaned order_items (shouldn't exist if FK is working)
SELECT 'Checking for orphaned order items...' as status;
SELECT COUNT(*) as orphaned_items
FROM order_items oi
LEFT JOIN purchases p ON oi.purchase_id = p.id
WHERE p.id IS NULL;

-- 9. Sample data - Show most recent purchase with items
SELECT 'Sample purchase with items...' as status;
SELECT 
  p.id as purchase_id,
  p.order_id,
  p.user_id,
  p.customer_name,
  p.customer_email,
  p.amount,
  p.payment_status,
  p.purchased_at,
  oi.item_type,
  oi.item_title,
  oi.artist_name,
  oi.quantity,
  oi.price
FROM purchases p
LEFT JOIN order_items oi ON p.id = oi.purchase_id
ORDER BY p.purchased_at DESC
LIMIT 5;

-- 10. Check user linkage
SELECT 'Checking user-purchase linkage...' as status;
SELECT 
  CASE 
    WHEN user_id IS NULL THEN 'Guest Purchase'
    ELSE 'Registered User'
  END as user_type,
  COUNT(*) as count
FROM purchases
GROUP BY user_type;

-- ============================================================================
-- VERIFICATION COMPLETE
-- ============================================================================
SELECT '✅ Verification script completed!' as status;
SELECT 'Review the results above to ensure everything is set up correctly.' as note;
