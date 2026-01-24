import pool from './config/db.js';

async function testMinistryResourceImages() {
  try {
    console.log('🧪 Testing Ministry Resources image retrieval...\n');
    
    // Simulate the webhook query that fetches order items with images
    const purchaseId = 250; // One of the Ministry Resources orders we found
    
    const [orderItems] = await pool.query(
      `SELECT 
        oi.id,
        oi.item_type,
        oi.item_id,
        oi.item_title,
        oi.artist_name,
        oi.quantity,
        oi.price,
        CASE 
          WHEN oi.item_type IN ('Digital Album', 'Track', 'Album', 'Limited Edition') THEN (
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
        END as image_url,
        CASE 
          WHEN oi.item_type IN ('Merchandise', 'Apparel', 'Accessories', 'Ministry Resources', 'Other') THEN (
            SELECT merch_type 
            FROM merchandise 
            WHERE id = oi.item_id
          )
          ELSE NULL
        END as merch_type
      FROM order_items oi
      WHERE oi.purchase_id = ?`,
      [purchaseId]
    );
    
    console.log(`📦 Order items for purchase #${purchaseId}:`);
    if (orderItems.length === 0) {
      console.log('  No items found');
    } else {
      orderItems.forEach(item => {
        console.log(`\n  ✅ ${item.item_type}: ${item.item_title}`);
        console.log(`     item_id: ${item.item_id}`);
        console.log(`     image_url: ${item.image_url ? '✓ PRESENT' : '✗ MISSING'}`);
        if (item.image_url) {
          console.log(`     ${item.image_url.substring(0, 80)}...`);
        }
        console.log(`     merch_type: ${item.merch_type || 'N/A'}`);
      });
    }
    
    console.log('\n✅ Test complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    console.error(err);
    process.exit(1);
  }
}

testMinistryResourceImages();
