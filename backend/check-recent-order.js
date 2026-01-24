import pool from './config/db.js';

async function checkRecentOrder() {
  try {
    console.log('🔍 Checking most recent order...\n');
    
    // Get most recent purchase
    const [purchases] = await pool.query(
      `SELECT id, order_id, customer_email, customer_name, amount, payment_status, purchased_at 
       FROM purchases 
       ORDER BY purchased_at DESC 
       LIMIT 1`
    );
    
    if (purchases.length === 0) {
      console.log('❌ No purchases found');
      await pool.end();
      return;
    }
    
    const purchase = purchases[0];
    console.log('📦 Latest Purchase:');
    console.log('  Order ID:', purchase.order_id);
    console.log('  Customer:', purchase.customer_name, `(${purchase.customer_email})`);
    console.log('  Amount: $' + purchase.amount);
    console.log('  Status:', purchase.payment_status);
    console.log('  Date:', purchase.purchased_at);
    console.log('');
    
    // Get order items
    const [orderItems] = await pool.query(
      `SELECT 
        oi.item_type,
        oi.item_id,
        oi.item_title,
        oi.artist_name,
        oi.quantity,
        oi.price,
        CASE 
          WHEN oi.item_type = 'Track' THEN (
            SELECT a.cover_url 
            FROM tracks t 
            JOIN albums a ON t.album_id = a.id 
            WHERE t.id = oi.item_id
          )
          WHEN oi.item_type = 'Digital Album' THEN (
            SELECT cover_url 
            FROM albums 
            WHERE id = oi.item_id
          )
          WHEN oi.item_type = 'Physical Album' THEN (
            SELECT cover_url 
            FROM albums 
            WHERE id = oi.item_id
          )
          WHEN oi.item_type IN ('Merchandise', 'Apparel', 'Accessories', 'Ministry Resources', 'Other') THEN (
            SELECT image_url 
            FROM merchandise 
            WHERE id = oi.item_id
          )
          ELSE NULL
        END as image_url
      FROM order_items oi
      WHERE oi.purchase_id = ?`,
      [purchase.id]
    );
    
    console.log('🛒 Order Items:');
    orderItems.forEach((item, idx) => {
      console.log(`\n  ${idx + 1}. ${item.item_title}`);
      console.log(`     Type: ${item.item_type}`);
      console.log(`     Artist: ${item.artist_name}`);
      console.log(`     Price: $${item.price}`);
      console.log(`     Quantity: ${item.quantity}`);
      console.log(`     Image URL: ${item.image_url || '❌ MISSING'}`);
      
      if (item.image_url) {
        console.log(`     ✅ Image present`);
      } else {
        console.log(`     ⚠️  No image found for ${item.item_type} with ID ${item.item_id}`);
      }
    });
    
    await pool.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkRecentOrder();
