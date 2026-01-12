import pool from '../config/db.js';

const initialGenres = [
  'Pop',
  'Jazz',
  'Soul',
  'RnB',
  'Easy Listening',
  'Instrumental',
  'Funk',
  'Funk Soul'
];

async function createGenresTable() {
  try {
    console.log('Creating genres table...');

    // Create genres table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS genres (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        is_active BOOLEAN DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_active (is_active),
        INDEX idx_name (name)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    console.log('✅ Genres table created successfully');

    // Insert initial genres
    console.log('Inserting initial genres...');
    
    for (const genre of initialGenres) {
      try {
        await pool.query(
          'INSERT IGNORE INTO genres (name, is_active) VALUES (?, 1)',
          [genre]
        );
        console.log(`  ✓ Added: ${genre}`);
      } catch (err) {
        console.log(`  ⚠ Skipped (already exists): ${genre}`);
      }
    }

    console.log('✅ Initial genres inserted successfully');

    // Show all genres
    const [genres] = await pool.query('SELECT * FROM genres ORDER BY name ASC');
    console.log('\nCurrent genres in database:');
    genres.forEach(g => {
      console.log(`  ${g.is_active ? '✓' : '✗'} ${g.name} (ID: ${g.id})`);
    });

    console.log('\n✅ Genre management system setup complete!');
  } catch (error) {
    console.error('❌ Error setting up genres table:', error);
    throw error;
  } finally {
    await pool.end();
  }
}

createGenresTable();
