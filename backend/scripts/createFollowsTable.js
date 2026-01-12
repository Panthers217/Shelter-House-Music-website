import pool from './config/db.js';

async function createFollowsTable() {
  try {
    const connection = await pool.getConnection();
    
    console.log('Creating user_artist_follows table...');
    
    await connection.query(`
      CREATE TABLE IF NOT EXISTS user_artist_follows (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        user_id BIGINT NOT NULL,
        artist_id BIGINT UNSIGNED NOT NULL,
        followed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
        FOREIGN KEY (artist_id) REFERENCES artists(id) ON DELETE CASCADE,
        UNIQUE KEY unique_follow (user_id, artist_id),
        INDEX idx_user_follows (user_id),
        INDEX idx_artist_followers (artist_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    
    console.log('✅ user_artist_follows table created successfully!');
    
    connection.release();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating table:', error);
    process.exit(1);
  }
}

createFollowsTable();
