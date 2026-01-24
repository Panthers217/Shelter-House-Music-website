import pool from './config/db.js';

async function fixDonationUserIds() {
  try {
    console.log('🔧 Fixing user_id for existing donations...\n');
    
    // Get all purchases with null user_id but valid customer_email
    const [orphanedPurchases] = await pool.query(`
      SELECT id, order_id, customer_email
      FROM purchases
      WHERE user_id IS NULL AND customer_email IS NOT NULL
      ORDER BY purchased_at DESC
    `);
    
    console.log(`📋 Found ${orphanedPurchases.length} purchases without user_id`);
    
    let updatedCount = 0;
    let notFoundCount = 0;
    
    for (const purchase of orphanedPurchases) {
      // Look up user by email
      const [users] = await pool.query(
        'SELECT id FROM user WHERE email = ?',
        [purchase.customer_email]
      );
      
      if (users.length > 0) {
        const userId = users[0].id;
        
        // Update the purchase with the user_id
        await pool.query(
          'UPDATE purchases SET user_id = ? WHERE id = ?',
          [userId, purchase.id]
        );
        
        console.log(`✅ Updated ${purchase.order_id} - Email: ${purchase.customer_email} -> User ID: ${userId}`);
        updatedCount++;
      } else {
        console.log(`⚠️  No user found for email: ${purchase.customer_email} (Order: ${purchase.order_id})`);
        notFoundCount++;
      }
    }
    
    console.log('\n📊 Summary:');
    console.log(`  ✅ Updated: ${updatedCount} purchases`);
    console.log(`  ⚠️  No matching user: ${notFoundCount} purchases`);
    console.log(`  📋 Total processed: ${orphanedPurchases.length} purchases`);
    
    // Verify donations now have user_ids
    const [donationsWithUsers] = await pool.query(`
      SELECT COUNT(*) as count
      FROM purchases
      WHERE (item_type LIKE '%Donation%' OR EXISTS (
        SELECT 1 FROM order_items oi 
        WHERE oi.purchase_id = purchases.id AND oi.item_type LIKE '%Donation%'
      )) AND user_id IS NOT NULL
    `);
    
    console.log(`\n🎉 Donations with user_id: ${donationsWithUsers[0].count}`);
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    console.error(err);
    process.exit(1);
  }
}

fixDonationUserIds();
