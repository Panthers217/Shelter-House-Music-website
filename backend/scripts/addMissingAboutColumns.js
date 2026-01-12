import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function addMissingColumns() {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 27190,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  console.log('✅ Connected to database\n');

  const [cols] = await conn.query('DESCRIBE website_settings');
  const aboutCols = cols.filter(c => c.Field.startsWith('about_')).map(c => c.Field);

  const allNeeded = [
    'about_page_title', 
    'about_story_paragraph1', 
    'about_mission', 
    'about_stat1_number', 
    'about_value1_title', 
    'about_cta_title'
  ];
  
  const toAdd = allNeeded.filter(m => !aboutCols.includes(m));

  console.log('Missing columns to add:', toAdd.join(', ') || 'None');
  console.log('');

  for (const col of toAdd) {
    try {
      if (col.includes('paragraph') || col === 'about_mission') {
        await conn.query(`ALTER TABLE website_settings ADD COLUMN ${col} TEXT`);
      } else if (col.includes('stat')) {
        await conn.query(`ALTER TABLE website_settings ADD COLUMN ${col} VARCHAR(50) DEFAULT '10K+'`);
      } else if (col === 'about_page_title') {
        await conn.query(`ALTER TABLE website_settings ADD COLUMN ${col} VARCHAR(255) DEFAULT 'About Us'`);
      } else if (col === 'about_cta_title') {
        await conn.query(`ALTER TABLE website_settings ADD COLUMN ${col} VARCHAR(255) DEFAULT 'Join Our Community'`);
      } else if (col === 'about_value1_title') {
        await conn.query(`ALTER TABLE website_settings ADD COLUMN ${col} VARCHAR(100) DEFAULT 'Quality Music'`);
      } else {
        await conn.query(`ALTER TABLE website_settings ADD COLUMN ${col} VARCHAR(100)`);
      }
      console.log(`✅ Added ${col}`);
    } catch (e) {
      console.log(`⚠️  ${col}: ${e.message}`);
    }
  }

  await conn.query(`UPDATE website_settings SET 
    about_story_paragraph1 = 'Soul Felt Music was born from a simple belief: that music has the power to touch souls and transform lives. Founded by passionate music enthusiasts, we set out to create more than just another music platform—we wanted to build a home for artists and listeners who believe in the raw, authentic power of music.',
    about_mission = 'To revolutionize the music industry by providing a platform that connects artists directly with their fans, fostering genuine relationships and supporting creative freedom.'
  WHERE id = 1`);

  console.log('\n✅ All About page columns added and initialized!');
  await conn.end();
}

addMissingColumns().catch(console.error);
