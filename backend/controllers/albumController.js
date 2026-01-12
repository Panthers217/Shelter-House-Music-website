// Album controller: handles album-related SQL queries and logic
import pool from '../config/db.js';

export async function getAllAlbums(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM albums');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
// Add more album-related functions here
