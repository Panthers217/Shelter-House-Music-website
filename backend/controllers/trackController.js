// Track controller: handles track-related SQL queries and logic
import pool from '../config/db.js';

export async function getAllTracks(req, res) {
  try {
    // Filter based on NODE_ENV: exclude demos (demos=1) in production
    let query = 'SELECT * FROM tracks';
    if (process.env.NODE_ENV === 'production') {
      query += ' WHERE (demos IS NULL OR demos = 0)';
    }
    const [rows] = await pool.query(query);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
// Add more track-related functions here
