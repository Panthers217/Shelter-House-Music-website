// Artist controller: handles artist-related SQL queries and logic
import pool from '../config/db.js';

export async function getAllArtists(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM artists');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
// Add more artist-related functions here
