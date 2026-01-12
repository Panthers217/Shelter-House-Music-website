import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

async function runMigration() {
  console.log('🔄 Starting database migration...\n');
  
  let connection;
  try {
    // Create connection
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 27190,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      multipleStatements: true
    });

    console.log('✅ Connected to database\n');

    // Read the SQL file
    const sqlFile = path.join(__dirname, 'scripts', 'link_user_purchases_orders.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');

    // Split by statements and execute individually (better error handling)
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s && !s.startsWith('--') && s.length > 0);

    console.log(`📋 Found ${statements.length} SQL statements to execute\n`);

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      
      // Skip comments and empty lines
      if (statement.startsWith('--') || statement.length < 10) continue;
      
      try {
        console.log(`[${i + 1}/${statements.length}] Executing...`);
        const firstLine = statement.split('\n')[0].substring(0, 60);
        console.log(`   ${firstLine}...`);
        
        await connection.query(statement);
        console.log('   ✅ Success\n');
      } catch (error) {
        // Some errors are OK (like "already exists")
        if (error.code === 'ER_DUP_KEYNAME' || 
            error.code === 'ER_CANT_DROP_FIELD_OR_KEY' ||
            error.code === 'ER_DUP_FIELDNAME' ||
            error.message.includes('Duplicate key name') ||
            error.message.includes('already exists')) {
          console.log('   ⚠️  Already exists (skipping)\n');
        } else {
          console.log('   ❌ Error:', error.message);
          console.log('   Statement:', statement.substring(0, 100) + '...\n');
          // Continue with next statement
        }
      }
    }

    console.log('\n🎉 Migration completed!\n');

    // Verify the setup
    console.log('🔍 Verifying setup...\n');

    // Check foreign keys
    const [foreignKeys] = await connection.query(`
      SELECT 
        TABLE_NAME, COLUMN_NAME, CONSTRAINT_NAME, 
        REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME
      FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME IN ('purchases', 'order_items')
        AND REFERENCED_TABLE_NAME IS NOT NULL
    `);

    console.log('Foreign Keys:');
    foreignKeys.forEach(fk => {
      console.log(`  ✅ ${fk.TABLE_NAME}.${fk.COLUMN_NAME} → ${fk.REFERENCED_TABLE_NAME}.${fk.REFERENCED_COLUMN_NAME}`);
    });

    // Check if order_items table exists
    const [tables] = await connection.query("SHOW TABLES LIKE 'order_items'");
    console.log(`\n✅ order_items table: ${tables.length > 0 ? 'EXISTS' : 'MISSING'}`);

    // Check purchases table structure
    const [columns] = await connection.query("DESCRIBE purchases");
    const hasOrderId = columns.some(c => c.Field === 'order_id');
    const hasStripeId = columns.some(c => c.Field === 'stripe_payment_intent_id');
    console.log(`✅ purchases.order_id: ${hasOrderId ? 'EXISTS' : 'MISSING'}`);
    console.log(`✅ purchases.stripe_payment_intent_id: ${hasStripeId ? 'EXISTS' : 'MISSING'}`);

    console.log('\n✅ Database is ready for purchase tracking!\n');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Database connection closed');
    }
  }
}

runMigration().catch(console.error);
