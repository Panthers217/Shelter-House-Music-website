import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

async function runAboutPageMigration() {
  console.log('🔄 Starting About Page Migration...\n');
  
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
    const sqlFile = path.join(__dirname, 'scripts', 'add_about_page_columns.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');

    // Split by statements and execute individually (better error handling)
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s && !s.startsWith('--') && s.length > 0);

    console.log(`📋 Found ${statements.length} SQL statements to execute\n`);

    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      
      // Skip comments and empty lines
      if (statement.startsWith('--') || statement.length < 10) continue;
      
      try {
        console.log(`[${i + 1}/${statements.length}] Executing...`);
        const firstLine = statement.split('\n')[0].substring(0, 70);
        console.log(`   ${firstLine}...`);
        
        await connection.query(statement);
        console.log('   ✅ Success\n');
        successCount++;
      } catch (error) {
        // Some errors are OK (like "already exists")
        if (error.code === 'ER_DUP_FIELDNAME' ||
            error.message.includes('Duplicate column name') ||
            error.message.includes('already exists')) {
          console.log('   ⚠️  Column already exists (skipping)\n');
          skipCount++;
        } else {
          console.log('   ❌ Error:', error.message);
          console.log('   Statement:', statement.substring(0, 100) + '...\n');
          errorCount++;
        }
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ⚠️  Skipped: ${skipCount}`);
    console.log(`   ❌ Errors: ${errorCount}`);

    console.log('\n🔍 Verifying About Page Columns...\n');

    // Check if columns were added
    const [columns] = await connection.query("DESCRIBE website_settings");
    
    const aboutColumns = [
      'about_page_title',
      'about_hero_tagline',
      'about_story_paragraph1',
      'about_story_paragraph2',
      'about_story_paragraph3',
      'about_mission',
      'about_vision',
      'about_stat1_number',
      'about_stat1_label',
      'about_stat2_number',
      'about_stat2_label',
      'about_stat3_number',
      'about_stat3_label',
      'about_stat4_number',
      'about_stat4_label',
      'about_value1_title',
      'about_value1_desc',
      'about_value2_title',
      'about_value2_desc',
      'about_value3_title',
      'about_value3_desc',
      'about_value4_title',
      'about_value4_desc',
      'about_cta_title',
      'about_cta_description'
    ];

    const existingColumns = columns.map(c => c.Field);
    const foundColumns = aboutColumns.filter(col => existingColumns.includes(col));
    const missingColumns = aboutColumns.filter(col => !existingColumns.includes(col));

    console.log(`✅ Found ${foundColumns.length}/${aboutColumns.length} About page columns`);
    
    if (missingColumns.length > 0) {
      console.log('\n⚠️  Missing columns:');
      missingColumns.forEach(col => console.log(`   - ${col}`));
    } else {
      console.log('\n🎉 All About page columns are present!');
    }

    console.log('\n✅ About Page settings are ready!\n');

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

runAboutPageMigration().catch(console.error);
