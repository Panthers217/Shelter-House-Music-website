import pool from './config/db.js';

async function quickQuery() {
  try {
    console.log('Verifying donation records in purchase history...\n');
    
    // Query 1: Check donations with user_ids
    const [donationsWithUsers] = await pool.query(`
      SELECT 
        p.id,
        p.order_id, 
        p.item_type,
        p.amount,
        p.user_id,
        p.customer_email,
        p.purchased_at,
        oi.item_type as order_item_type,
        oi.item_title
      FROM purchases p
      LEFT JOIN order_items oi ON p.id = oi.purchase_id
      WHERE (p.item_type LIKE '%Donation%' OR oi.item_type LIKE '%Donation%')
        AND p.user_id IS NOT NULL
      ORDER BY p.purchased_at DESC
      LIMIT 10
    `);
    
    console.log('✅ Donations WITH user_id:', donationsWithUsers.length);
    if (donationsWithUsers.length > 0) {
      donationsWithUsers.forEach(d => {
        console.log(`  - Order: ${d.order_id}`);
        console.log(`    User ID: ${d.user_id}, Email: ${d.customer_email}`);
        console.log(`    Amount: $${d.amount}, Date: ${d.purchased_at}`);
        console.log(`    Item: ${d.item_title} (${d.order_item_type})\n`);
      });
    }
    
    // Query 2: Simulate purchase history query for user 7
    const userId = 7;
    const [userPurchases] = await pool.query(`
      SELECT 
        p.id as purchase_id,
        p.order_id,
        p.amount,
        p.payment_status,
        p.purchased_at,
        oi.item_type as item_type,
        oi.item_title
      FROM purchases p
      LEFT JOIN order_items oi ON p.id = oi.purchase_id
      WHERE p.user_id = ?
      ORDER BY p.purchased_at DESC
    `, [userId]);
    
    console.log(`\n📋 Purchase history for user ${userId}:`);
    console.log(`  Total records: ${userPurchases.length}`);
    
    // Count by item type
    const itemTypes = {};
    userPurchases.forEach(p => {
      const type = p.item_type || 'Unknown';
      itemTypes[type] = (itemTypes[type] || 0) + 1;
    });
    
    console.log('\n  Breakdown by item type:');
    Object.entries(itemTypes).forEach(([type, count]) => {
      console.log(`    ${type}: ${count}`);
    });
    
    // Show recent purchases
    const recentPurchases = userPurchases.slice(0, 5);
    console.log('\n  Recent purchases:');
    recentPurchases.forEach(p => {
      console.log(`    - ${p.item_title} (${p.item_type}) - $${p.amount} - ${p.purchased_at.toISOString().split('T')[0]}`);
    });
    
    console.log('\n✅ All queries completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Query failed:', err.message);
    console.error(err);
    process.exit(1);
  }
}

quickQuery();
