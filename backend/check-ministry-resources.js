import pool from './config/db.js';

async function checkOrderItems() {
  try {
    // Check order_items schema
    const [columns] = await pool.query('DESCRIBE order_items');
    console.log('\n📋 order_items table schema:');
    columns.forEach(col => {
      console.log(`  ${col.Field}: ${col.Type} ${col.Null === 'NO' ? 'NOT NULL' : 'NULL'}`);
    });
    
    // Check recent Ministry Resources purchases
    const [ministryItems] = await pool.query(`
      SELECT 
        oi.id,
        oi.item_type,
        oi.item_title,
        oi.item_id,
        m.image_url as merch_image_url,
        m.title as merch_title,
        m.merch_type
      FROM order_items oi
      LEFT JOIN merchandise m ON oi.item_id = m.id
      WHERE oi.item_type LIKE '%Ministry Resource%'
      ORDER BY oi.id DESC
      LIMIT 5
    `);
    
    console.log('\n🎁 Recent Ministry Resources items:');
    if (ministryItems.length === 0) {
      console.log('  No Ministry Resources items found');
    } else {
      ministryItems.forEach(item => {
        console.log(`  - ID: ${item.id}, Title: ${item.item_title}`);
        console.log(`    item_id: ${item.item_id}, merch_title: ${item.merch_title}`);
        console.log(`    merch_type: ${item.merch_type}`);
        console.log(`    image_url: ${item.merch_image_url || 'MISSING'}`);
      });
    }
    
    // Check ALL merchandise with Ministry Resources type
    const [allMinistryMerch] = await pool.query(`
      SELECT id, title, merch_type, image_url
      FROM merchandise
      WHERE merch_type = 'Ministry Resources'
      LIMIT 10
    `);
    
    console.log('\n🗂️  All Ministry Resources merchandise:');
    if (allMinistryMerch.length === 0) {
      console.log('  No Ministry Resources merchandise found');
    } else {
      allMinistryMerch.forEach(item => {
        console.log(`  - ID: ${item.id}, Title: ${item.title}`);
        console.log(`    image_url: ${item.image_url || 'MISSING'}`);
      });
    }
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    console.error(err);
    process.exit(1);
  }
}

checkOrderItems();
