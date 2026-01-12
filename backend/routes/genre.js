import express from 'express';
import pool from '../config/db.js';
import { requireAdmin } from '../server.js';

const router = express.Router();

// Get all genres (admin - for forms)
router.get('/admin/genres', requireAdmin, async (req, res) => {
  try {
    const [genres] = await pool.query(
      'SELECT * FROM genres ORDER BY name ASC'
    );
    res.json({ genres });
  } catch (error) {
    console.error('Error fetching genres:', error);
    res.status(500).json({ error: 'Failed to fetch genres' });
  }
});

// Get active genres only (public - for frontend filters)
router.get('/genres/active', async (req, res) => {
  try {
    const [genres] = await pool.query(
      'SELECT * FROM genres WHERE is_active = 1 ORDER BY name ASC'
    );
    res.json({ genres });
  } catch (error) {
    console.error('Error fetching active genres:', error);
    res.status(500).json({ error: 'Failed to fetch genres' });
  }
});

// Add new genre (admin only)
router.post('/admin/genres', requireAdmin, async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Genre name is required' });
    }

    // Check for duplicates (case-insensitive)
    const [existing] = await pool.query(
      'SELECT id FROM genres WHERE LOWER(name) = LOWER(?)',
      [name.trim()]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: 'Genre already exists' });
    }

    // Insert new genre
    await pool.query(
      'INSERT INTO genres (name, is_active) VALUES (?, 1)',
      [name.trim()]
    );

    // Return updated list
    const [genres] = await pool.query('SELECT * FROM genres ORDER BY name ASC');
    res.json({ genres });
  } catch (error) {
    console.error('Error adding genre:', error);
    res.status(500).json({ error: 'Failed to add genre' });
  }
});

// Toggle genre active status (admin only)
router.patch('/admin/genres/:id/toggle', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Toggle the is_active status
    await pool.query(
      'UPDATE genres SET is_active = NOT is_active WHERE id = ?',
      [id]
    );

    // Return updated list
    const [genres] = await pool.query('SELECT * FROM genres ORDER BY name ASC');
    res.json({ genres });
  } catch (error) {
    console.error('Error toggling genre:', error);
    res.status(500).json({ error: 'Failed to update genre status' });
  }
});

// Delete genre (admin only)
router.delete('/admin/genres/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if genre is in use
    const [artistCheck] = await pool.query(
      'SELECT COUNT(*) as count FROM artists WHERE genre LIKE ?',
      [`%${id}%`]
    );

    if (artistCheck[0].count > 0) {
      return res.status(400).json({ 
        error: 'Cannot delete genre that is currently assigned to artists. Please disable it instead.' 
      });
    }

    // Delete the genre
    await pool.query('DELETE FROM genres WHERE id = ?', [id]);

    // Return updated list
    const [genres] = await pool.query('SELECT * FROM genres ORDER BY name ASC');
    res.json({ genres });
  } catch (error) {
    console.error('Error deleting genre:', error);
    res.status(500).json({ error: 'Failed to delete genre' });
  }
});

export default router;
