import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function testMerchEnum() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306,
      ssl: process.env.DB_HOST && process.env.DB_HOST.includes('aivencloud.com') ? {
        rejectUnauthorized: false
      } : undefined
    });

    console.log('Testing ENUM constraints...\n');
    
    // Test 1: Try to insert invalid value (should fail)
    console.log('Test 1: Attempting to insert invalid merch_type value...');
    try {
      await connection.query(
        "INSERT INTO merchandise (title, merch_type, price, artist_id) VALUES ('Test Invalid', 'InvalidType', 10.00, 1)"
      );
      console.log('❌ FAILED: Should have rejected invalid value\n');
    } catch (err) {
      console.log('✓ SUCCESS: Invalid value rejected as expected');
      console.log(`Error: ${err.sqlMessage}\n`);
    }
    
    // Test 2: Try to insert valid value (should succeed)
    console.log('Test 2: Attempting to insert valid merch_type value...');
    try {
      const [result] = await connection.query(
        "INSERT INTO merchandise (title, merch_type, price, artist_id) VALUES ('Test Valid', 'Apparel', 25.00, 1)"
      );
      console.log(`✓ SUCCESS: Valid value accepted (inserted ID: ${result.insertId})`);
      
      // Clean up test record
      await connection.query(`DELETE FROM merchandise WHERE id = ${result.insertId}`);
      console.log('Test record cleaned up\n');
    } catch (err) {
      console.log('❌ FAILED: Valid value should have been accepted');
      console.log(`Error: ${err.sqlMessage}\n`);
    }
    
    // Test 3: Show all possible ENUM values
    console.log('Test 3: Fetching ENUM definition from database...');
    const [columns] = await connection.query(
      "SHOW COLUMNS FROM merchandise WHERE Field = 'merch_type'"
    );
    console.log('✓ merch_type ENUM values:');
    console.log(columns[0].Type);
    console.log('\nParsed values:');
    const enumValues = columns[0].Type.match(/'([^']+)'/g).map(v => v.replace(/'/g, ''));
    enumValues.forEach((val, idx) => {
      console.log(`  ${idx + 1}. ${val}`);
    });
    
    console.log('\n✅ All tests completed successfully!');
    
  } catch (error) {
    console.error('Test error:', error.message);
  } finally {
    if (connection) await connection.end();
  }
}

testMerchEnum();
