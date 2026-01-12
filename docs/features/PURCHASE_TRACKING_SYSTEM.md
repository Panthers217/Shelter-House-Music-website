# Purchase Tracking System Documentation

## Overview
Complete system linking users, purchases, and order items for tracking all transactions in Soul Felt Music website.

## Database Schema

### Tables Relationship
```
user (id) 
  ↓ (one-to-many)
purchases (id, user_id FK → user.id)
  ↓ (one-to-many)
order_items (purchase_id FK → purchases.id)
```

### Table: `user`
Stores user account information.
```sql
- id (BIGINT UNSIGNED, PRIMARY KEY)
- username (VARCHAR(50), UNIQUE)
- email (VARCHAR(100), UNIQUE)
- password_hash (VARCHAR(255))
- created_at (TIMESTAMP)
```

### Table: `purchases`
Stores one record per order/payment.
```sql
- id (BIGINT UNSIGNED, PRIMARY KEY)
- user_id (BIGINT UNSIGNED, FK → user.id, NULL for guest checkout)
- stripe_payment_intent_id (VARCHAR(255), UNIQUE)
- order_id (VARCHAR(50), UNIQUE)
- amount (DECIMAL(10,2)) - Total order amount in dollars
- currency (VARCHAR(3), DEFAULT 'usd')
- payment_status (VARCHAR(50)) - 'pending', 'succeeded', 'failed', 'canceled'
- customer_email (VARCHAR(255))
- customer_name (VARCHAR(255))
- shipping_address (TEXT, JSON)
- item_type (VARCHAR(255)) - Summary: "Track, Album, Merchandise"
- metadata (JSON) - Additional order metadata
- purchased_at (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
- updated_at (TIMESTAMP, ON UPDATE)
```

**Foreign Keys:**
- `user_id` references `user(id)` ON DELETE SET NULL (keeps purchase history even if user deleted)

**Indexes:**
- idx_purchases_user_id
- idx_purchases_stripe_payment_intent
- idx_purchases_order_id
- idx_purchases_payment_status
- idx_purchases_customer_email
- idx_purchases_created_at

### Table: `order_items`
Stores individual items within each purchase.
```sql
- id (BIGINT UNSIGNED, PRIMARY KEY)
- purchase_id (BIGINT UNSIGNED, FK → purchases.id)
- item_type (VARCHAR(50)) - 'Track', 'Digital Album', 'Vinyl Record', 'Merchandise'
- item_id (BIGINT UNSIGNED) - ID of the track/album/merch
- item_title (VARCHAR(255))
- artist_name (VARCHAR(255))
- quantity (INT, DEFAULT 1)
- price (DECIMAL(10,2)) - Price per unit
- created_at (TIMESTAMP)
```

**Foreign Keys:**
- `purchase_id` references `purchases(id)` ON DELETE CASCADE (deletes items when purchase deleted)

**Indexes:**
- idx_order_items_purchase_id
- idx_order_items_type_id (composite: item_type, item_id)
- idx_order_items_artist_name

## Setup Instructions

### 1. Run Database Migration
```bash
# Navigate to backend scripts
cd backend/scripts

# Run the migration (using your database client or command line)
mysql -u your_username -p your_database < link_user_purchases_orders.sql
```

### 2. Register Purchase History Routes
Add to your `server.js` or main app file:
```javascript
const purchaseHistoryRoutes = require('./routes/purchase-history');
app.use('/api/purchase-history', purchaseHistoryRoutes);
```

### 3. Verify Setup
Run these queries to check:
```sql
-- Check foreign keys exist
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

-- Check indexes
SHOW INDEX FROM purchases;
SHOW INDEX FROM order_items;
```

## How It Works

### Purchase Flow

1. **User adds items to cart** (frontend)
   - CartContext stores items with: id, trackId, albumId, artistId, artist_name, type, title, price, quantity

2. **User proceeds to checkout** (frontend → backend)
   - POST /api/payments/create-payment-intent
   - Receives: amount, cart[], customerInfo, userEmail

3. **Backend creates payment intent** (paymentController.js)
   - Looks up `user_id` from `user` table by email (if authenticated)
   - Generates unique `order_id`
   - Creates Stripe PaymentIntent with metadata
   - Inserts record into `purchases` table with:
     * user_id (or NULL for guest)
     * stripe_payment_intent_id
     * order_id
     * amount, currency, payment_status='pending'
     * customer info
     * item_type summary

4. **Backend creates order items** (paymentController.js)
   - For each item in cart:
     * Looks up artist_name from database if not provided
     * Inserts into `order_items` table with:
       - purchase_id (links to purchases.id)
       - item_type, item_id, item_title
       - artist_name, quantity, price

5. **User completes payment** (Stripe)
   - Stripe webhook fires with payment_intent.succeeded

6. **Backend updates status** (webhook handler)
   - Updates `purchases.payment_status` to 'succeeded'
   - Order is now complete and tracked

### Guest Checkout
- `user_id` is NULL for guest purchases
- Still tracks: customer_email, customer_name, order details
- Can later link to user account if they register with same email

## API Endpoints

### User Purchase History
```http
GET /api/purchase-history/user/:userId
Authorization: Bearer <token>
```

**Response:**
```json
{
  "user_id": "123",
  "purchase_count": 5,
  "purchases": [
    {
      "purchase_id": 789,
      "order_id": "ORDER-1234567890",
      "amount": 29.99,
      "payment_status": "succeeded",
      "purchased_at": "2025-01-15T10:30:00Z",
      "items": [
        {
          "item_type": "Digital Album",
          "item_title": "No More Drama",
          "artist_name": "Mary J Blige",
          "quantity": 1,
          "price": 10.00
        },
        {
          "item_type": "Track",
          "item_title": "So Emotional",
          "artist_name": "Whitney Houston",
          "quantity": 2,
          "price": 2.99
        }
      ]
    }
  ]
}
```

### All Purchases (Admin)
```http
GET /api/purchase-history/all?status=succeeded&limit=50&offset=0
Authorization: Bearer <admin_token>
```

**Query Parameters:**
- `status` (optional): Filter by payment_status
- `limit` (default: 50): Results per page
- `offset` (default: 0): Pagination offset

### Order Details
```http
GET /api/purchase-history/order/:orderId
Authorization: Bearer <token>
```

**Response:**
```json
{
  "purchase": {
    "id": 789,
    "order_id": "ORDER-1234567890",
    "user_id": 123,
    "username": "john_doe",
    "stripe_payment_intent_id": "pi_abc123",
    "amount": 29.99,
    "payment_status": "succeeded",
    "customer_email": "john@example.com",
    "customer_name": "John Doe",
    "purchased_at": "2025-01-15T10:30:00Z"
  },
  "items": [
    {
      "id": 1,
      "purchase_id": 789,
      "item_type": "Digital Album",
      "item_id": 117,
      "item_title": "No More Drama",
      "artist_name": "Mary J Blige",
      "quantity": 1,
      "price": 10.00
    }
  ]
}
```

### Purchase Statistics (Admin)
```http
GET /api/purchase-history/stats
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "overview": {
    "total_revenue": 15234.50,
    "total_orders": 523,
    "average_order_value": 29.13
  },
  "by_status": [
    { "payment_status": "succeeded", "count": 500, "total_amount": 14500.00 },
    { "payment_status": "pending", "count": 15, "total_amount": 434.50 },
    { "payment_status": "failed", "count": 8, "total_amount": 300.00 }
  ],
  "top_items": [
    {
      "item_type": "Digital Album",
      "item_title": "No More Drama",
      "artist_name": "Mary J Blige",
      "order_count": 45,
      "total_quantity": 52,
      "total_revenue": 520.00
    }
  ],
  "last_7_days": {
    "count": 23,
    "revenue": 678.90
  }
}
```

## Admin Queries

### View all purchases for a specific user
```sql
SELECT 
  p.order_id,
  p.amount,
  p.payment_status,
  p.purchased_at,
  oi.item_type,
  oi.item_title,
  oi.artist_name,
  oi.quantity,
  oi.price
FROM user u
JOIN purchases p ON u.id = p.user_id
LEFT JOIN order_items oi ON p.id = oi.purchase_id
WHERE u.email = 'user@example.com'
ORDER BY p.purchased_at DESC;
```

### Get revenue by artist
```sql
SELECT 
  oi.artist_name,
  COUNT(DISTINCT p.id) as order_count,
  SUM(oi.quantity) as items_sold,
  SUM(oi.price * oi.quantity) as total_revenue
FROM order_items oi
JOIN purchases p ON oi.purchase_id = p.id
WHERE p.payment_status = 'succeeded'
GROUP BY oi.artist_name
ORDER BY total_revenue DESC;
```

### Get revenue by item type
```sql
SELECT 
  oi.item_type,
  COUNT(*) as items_sold,
  SUM(oi.price * oi.quantity) as total_revenue
FROM order_items oi
JOIN purchases p ON oi.purchase_id = p.id
WHERE p.payment_status = 'succeeded'
GROUP BY oi.item_type
ORDER BY total_revenue DESC;
```

### Find incomplete/failed orders
```sql
SELECT 
  p.order_id,
  p.customer_email,
  p.amount,
  p.payment_status,
  p.purchased_at,
  p.updated_at
FROM purchases p
WHERE p.payment_status IN ('pending', 'failed', 'canceled')
ORDER BY p.purchased_at DESC
LIMIT 50;
```

## Security Considerations

1. **User Authentication**: All endpoints require JWT token verification
2. **Authorization**: Users can only view their own purchase history (unless admin)
3. **Data Privacy**: 
   - Guest purchases store email but no user_id
   - Foreign key ON DELETE SET NULL preserves purchase history even if user deleted
4. **Admin Access**: TODO - Implement admin role check in middleware

## Future Enhancements

- [ ] Add admin role/permission system
- [ ] Email receipts after successful purchase
- [ ] Refund tracking
- [ ] Download history for digital purchases
- [ ] Export orders to CSV for accounting
- [ ] Purchase analytics dashboard
- [ ] Automated abandoned cart recovery

## Troubleshooting

### Issue: Foreign key constraint fails
**Solution**: Ensure user table uses BIGINT UNSIGNED for id field
```sql
ALTER TABLE user MODIFY COLUMN id BIGINT UNSIGNED AUTO_INCREMENT;
```

### Issue: Order items not appearing
**Solution**: Check purchase_id exists and matches
```sql
SELECT p.id, p.order_id, COUNT(oi.id) as item_count
FROM purchases p
LEFT JOIN order_items oi ON p.id = oi.purchase_id
GROUP BY p.id
HAVING item_count = 0;
```

### Issue: Duplicate order_id
**Solution**: Regenerate order_id in paymentController.js line 47
```javascript
const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
```

## Contact

For questions or issues, please contact the development team.
