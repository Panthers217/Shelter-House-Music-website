import pool from '../config/db.js';

/**
 * Adds external stats columns to artists table
 */
async function addExternalStatsColumns() {
  try {
    const connection = await pool.getConnection();
    
    console.log('🔨 Adding external stats columns to artists table...');
    
    // Helper function to check if column exists
    async function columnExists(tableName, columnName) {
      const [columns] = await connection.query(
        `SELECT COLUMN_NAME 
         FROM INFORMATION_SCHEMA.COLUMNS 
         WHERE TABLE_SCHEMA = DATABASE() 
         AND TABLE_NAME = ? 
         AND COLUMN_NAME = ?`,
        [tableName, columnName]
      );
      return columns.length > 0;
    }
    
    // Add listener count columns one by one
    const listenerColumns = [
      { name: 'spotify_monthly_listeners', type: 'INT DEFAULT 0' },
      { name: 'apple_music_monthly_listeners', type: 'INT DEFAULT 0' },
      { name: 'youtube_monthly_listeners', type: 'INT DEFAULT 0' },
      { name: 'soundcloud_monthly_listeners', type: 'INT DEFAULT 0' },
      { name: 'website_monthly_listeners', type: 'INT DEFAULT 0' },
      { name: 'total_monthly_listeners', type: 'INT DEFAULT 0' },
      { name: 'stats_last_updated', type: 'TIMESTAMP NULL' }
    ];
    
    for (const col of listenerColumns) {
      if (!(await columnExists('artists', col.name))) {
        await connection.query(`ALTER TABLE artists ADD COLUMN ${col.name} ${col.type}`);
        console.log(`  ✓ Added ${col.name}`);
      } else {
        console.log(`  ⊙ ${col.name} already exists`);
      }
    }
    
    console.log('✅ Listener count columns processed');
    
    // Add external platform ID columns
    const platformColumns = [
      { name: 'spotify_artist_id', type: 'VARCHAR(100) NULL' },
      { name: 'apple_music_artist_id', type: 'VARCHAR(100) NULL' },
      { name: 'youtube_channel_id', type: 'VARCHAR(100) NULL' },
      { name: 'soundcloud_username', type: 'VARCHAR(100) NULL' }
    ];
    
    for (const col of platformColumns) {
      if (!(await columnExists('artists', col.name))) {
        await connection.query(`ALTER TABLE artists ADD COLUMN ${col.name} ${col.type}`);
        console.log(`  ✓ Added ${col.name}`);
      } else {
        console.log(`  ⊙ ${col.name} already exists`);
      }
    }
    
    console.log('✅ External platform ID columns processed');
    
    // Helper function to check if index exists
    async function indexExists(tableName, indexName) {
      const [indexes] = await connection.query(
        `SELECT INDEX_NAME 
         FROM INFORMATION_SCHEMA.STATISTICS 
         WHERE TABLE_SCHEMA = DATABASE() 
         AND TABLE_NAME = ? 
         AND INDEX_NAME = ?`,
        [tableName, indexName]
      );
      return indexes.length > 0;
    }
    
    // Create indexes
    const indexes = [
      { name: 'idx_stats_updated', column: 'stats_last_updated' },
      { name: 'idx_spotify_id', column: 'spotify_artist_id' },
      { name: 'idx_youtube_id', column: 'youtube_channel_id' }
    ];
    
    for (const idx of indexes) {
      if (!(await indexExists('artists', idx.name))) {
        await connection.query(`CREATE INDEX ${idx.name} ON artists(${idx.column})`);
        console.log(`  ✓ Created index ${idx.name}`);
      } else {
        console.log(`  ⊙ Index ${idx.name} already exists`);
      }
    }
    
    console.log('✅ Indexes processed');
    console.log('✅ All columns and indexes added successfully!');
    
    connection.release();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding columns:', error);
    process.exit(1);
  }
}

addExternalStatsColumns();
