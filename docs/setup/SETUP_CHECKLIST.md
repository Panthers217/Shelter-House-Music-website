# Purchase Tracking System - Setup Checklist

## ✅ Setup Checklist

### 1. Database Setup
- [ ] **Run the migration script**
  ```bash
  mysql -u your_username -p your_database < backend/scripts/link_user_purchases_orders.sql
  ```
  
- [ ] **Verify database structure**
  ```bash
  mysql -u your_username -p your_database < backend/scripts/verify_purchase_system.sql
  ```
  
- [ ] **Check results** - Look for:
  - ✅ Foreign keys: `fk_purchases_user`, `fk_order_items_purchase`
  - ✅ Indexes on purchases and order_items tables
  - ✅ All required columns exist

### 2. Backend Setup
- [ ] **Register the routes in `server.js`**
  
  Add these lines:
  ```javascript
  // Purchase history routes
  const purchaseHistoryRoutes = require('./routes/purchase-history');
  app.use('/api/purchase-history', purchaseHistoryRoutes);
  ```

- [ ] **Restart your server**
  ```bash
  cd backend
  npm run dev  # or your start command
  ```

### 3. Test the System
- [ ] **Run API test script**
  ```bash
  node backend/testPurchaseSystem.js
  ```

- [ ] **Make a test purchase** through the UI
  1. Add items to cart
  2. Go to checkout
  3. Complete payment (use Stripe test card: 4242 4242 4242 4242)
  4. Check if purchase appears in database

### 4. Verify Data in Database
- [ ] **Check purchases table**
  ```sql
  SELECT * FROM purchases ORDER BY purchased_at DESC LIMIT 5;
  ```

- [ ] **Check order_items table**
  ```sql
  SELECT oi.*, p.order_id, p.customer_name
  FROM order_items oi
  JOIN purchases p ON oi.purchase_id = p.id
  ORDER BY oi.created_at DESC LIMIT 10;
  ```

- [ ] **Check user linkage**
  ```sql
  SELECT 
    u.username,
    u.email,
    COUNT(p.id) as purchase_count,
    SUM(p.amount) as total_spent
  FROM user u
  LEFT JOIN purchases p ON u.id = p.user_id AND p.payment_status = 'succeeded'
  GROUP BY u.id
  HAVING purchase_count > 0;
  ```

### 5. Test API Endpoints
Use Postman, curl, or your frontend to test:

- [ ] **Get user purchase history**
  ```
  GET /api/purchase-history/user/:userId
  Headers: Authorization: Bearer <token>
  ```

- [ ] **Get all purchases (admin)**
  ```
  GET /api/purchase-history/all?limit=50&offset=0
  Headers: Authorization: Bearer <admin_token>
  ```

- [ ] **Get order details**
  ```
  GET /api/purchase-history/order/:orderId
  Headers: Authorization: Bearer <token>
  ```

- [ ] **Get statistics**
  ```
  GET /api/purchase-history/stats
  Headers: Authorization: Bearer <admin_token>
  ```

## 🔍 Verification Commands

### Quick Database Check
```sql
-- Should return foreign key relationships
SELECT 
  TABLE_NAME, COLUMN_NAME, CONSTRAINT_NAME, 
  REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME IN ('purchases', 'order_items')
  AND REFERENCED_TABLE_NAME IS NOT NULL;
```

### Quick Server Check
```bash
# Check if routes are registered
curl http://localhost:5000/api/purchase-history/all
# Should return 401 Unauthorized (means route exists, needs auth)
# OR 404 Not Found (means route not registered)
```

### Check Recent Purchase with Items
```sql
SELECT 
  p.order_id,
  p.customer_name,
  p.amount,
  p.payment_status,
  GROUP_CONCAT(
    CONCAT(oi.item_type, ': ', oi.item_title, ' (', oi.artist_name, ')')
    SEPARATOR ' | '
  ) as items
FROM purchases p
LEFT JOIN order_items oi ON p.id = oi.purchase_id
GROUP BY p.id
ORDER BY p.purchased_at DESC
LIMIT 5;
```

## 🐛 Troubleshooting

### Problem: Foreign key constraint fails
**Solution:**
```sql
-- Check if user table id is BIGINT UNSIGNED
DESCRIBE user;

-- If not, update it:
ALTER TABLE user MODIFY COLUMN id BIGINT UNSIGNED AUTO_INCREMENT;

-- Then re-run migration
```

### Problem: Routes return 404
**Solution:** Make sure you added routes to server.js:
```javascript
const purchaseHistoryRoutes = require('./routes/purchase-history');
app.use('/api/purchase-history', purchaseHistoryRoutes);
```

### Problem: order_items table not created
**Solution:**
```sql
-- Check if table exists
SHOW TABLES LIKE 'order_items';

-- If not, run this part of migration:
CREATE TABLE order_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    purchase_id BIGINT UNSIGNED NOT NULL,
    item_type VARCHAR(50) NOT NULL,
    item_id BIGINT UNSIGNED NOT NULL,
    item_title VARCHAR(255),
    artist_name VARCHAR(255),
    quantity INT DEFAULT 1,
    price DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id) ON DELETE CASCADE
);
```

### Problem: Purchases saved but no order_items
**Check:**
1. paymentController.js lines 107-155 - order items insertion code
2. Console logs for errors during order items creation
3. Database logs for failed inserts

```bash
# Check server logs for errors
tail -f server.log  # or wherever your logs are
```

## 📊 Admin Queries

### Top Customers
```sql
SELECT 
  u.username,
  u.email,
  COUNT(p.id) as total_orders,
  SUM(p.amount) as total_spent
FROM user u
JOIN purchases p ON u.id = p.user_id
WHERE p.payment_status = 'succeeded'
GROUP BY u.id
ORDER BY total_spent DESC
LIMIT 10;
```

### Revenue by Artist
```sql
SELECT 
  oi.artist_name,
  COUNT(*) as items_sold,
  SUM(oi.price * oi.quantity) as revenue
FROM order_items oi
JOIN purchases p ON oi.purchase_id = p.id
WHERE p.payment_status = 'succeeded'
GROUP BY oi.artist_name
ORDER BY revenue DESC;
```

### Recent Orders
```sql
SELECT 
  p.order_id,
  p.customer_name,
  p.amount,
  p.payment_status,
  p.purchased_at,
  COUNT(oi.id) as item_count
FROM purchases p
LEFT JOIN order_items oi ON p.id = oi.purchase_id
GROUP BY p.id
ORDER BY p.purchased_at DESC
LIMIT 20;
```

## ✅ Success Indicators

Your system is working correctly when:

1. ✅ Foreign keys exist in database
2. ✅ API endpoints return data (or 401 Unauthorized if not logged in)
3. ✅ Test purchase creates records in both `purchases` and `order_items`
4. ✅ User's purchase history shows correctly
5. ✅ Order details display all items
6. ✅ Statistics show accurate revenue data

## 📚 Documentation

- Full system docs: `PURCHASE_TRACKING_SYSTEM.md`
- Database migration: `backend/scripts/link_user_purchases_orders.sql`
- Verification script: `backend/scripts/verify_purchase_system.sql`
- API routes: `backend/routes/purchase-history.js`
- Test script: `backend/testPurchaseSystem.js`

## 🚀 Next Steps After Setup

1. Create a frontend component to display purchase history
2. Add admin dashboard for viewing all orders
3. Implement email receipts
4. Add export to CSV functionality
5. Create analytics visualizations
