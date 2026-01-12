const mysql = require('mysql2/promise');
require('dotenv').config();

(async () => {
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  });

  console.log('Testing guest checkout verification...\n');
  
  // Get a sample guest purchase
  const [purchases] = await pool.query(`
    SELECT p.customer_email, oi.item_type, oi.item_id, oi.item_title, p.payment_status
    FROM purchases p
    JOIN order_items oi ON oi.purchase_id = p.id
    LIMIT 3
  `);
  
  console.log('Sample purchases:');
  purchases.forEach((p, i) => {
    console.log(`${i+1}. ${p.customer_email} - ${p.item_type} #${p.item_id} - ${p.payment_status}`);
  });
  
  if (purchases.length > 0) {
    const testPurchase = purchases[0];
    console.log('\nTesting verification with:', testPurchase.customer_email);
    
    const [result] = await pool.query(`
      SELECT oi.id, oi.item_title 
      FROM order_items oi
      JOIN purchases p ON oi.purchase_id = p.id
      WHERE p.customer_email = ? 
      AND oi.item_type = ? 
      AND oi.item_id = ?
      AND p.payment_status = 'succeeded'
      LIMIT 1
    `, [testPurchase.customer_email, testPurchase.item_type, testPurchase.item_id]);
    
    console.log('Verification result:', result.length > 0 ? '✓ PASSED' : '✗ FAILED');
    if (result.length > 0) {
      console.log('Found:', result[0]);
    }
  }
  
  await pool.end();
})();
