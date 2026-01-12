// Track controller: handles track-related SQL queries and logic
import pool from '../config/db.js';

export async function getAllTracks(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM tracks');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
// Add more track-related functions here
