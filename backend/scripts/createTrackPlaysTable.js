import pool from '../config/db.js';

/**
 * Creates the track_plays table for logging website track plays
 */
async function createTrackPlaysTable() {
  try {
    const connection = await pool.getConnection();
    
    console.log('🔨 Creating track_plays table...');
    
    await connection.query(`
      CREATE TABLE IF NOT EXISTS track_plays (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        track_id BIGINT UNSIGNED NOT NULL,
        artist_id BIGINT UNSIGNED NOT NULL,
        user_id BIGINT NULL,
        played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ip_address VARCHAR(45) NULL,
        session_id VARCHAR(255) NULL,
        user_agent TEXT NULL,
        INDEX idx_artist_plays (artist_id, played_at),
        INDEX idx_track_plays (track_id, played_at),
        INDEX idx_session_plays (session_id, played_at),
        FOREIGN KEY (artist_id) REFERENCES artists(id) ON DELETE CASCADE,
        FOREIGN KEY (track_id) REFERENCES tracks(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    
    console.log('✅ track_plays table created successfully!');
    
    connection.release();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating table:', error);
    process.exit(1);
  }
}

createTrackPlaysTable();
