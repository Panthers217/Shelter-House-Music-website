import express from 'express';
import pool from '../config/db.js';
import admin from 'firebase-admin';

const router = express.Router();

// Middleware to verify Firebase token
async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split('Bearer ')[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Follow an artist
router.post('/artist/:artistId', verifyToken, async (req, res) => {
  const { artistId } = req.params;
  const userEmail = req.user.email; // Get email from Firebase token

  try {
    const connection = await pool.getConnection();
    
    // Get user_id from email
    const [users] = await connection.query(
      'SELECT id FROM user WHERE email = ?',
      [userEmail]
    );

    if (users.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'User not found' });
    }

    const userId = users[0].id;

    // Check if already following
    const [existing] = await connection.query(
      'SELECT id FROM user_artist_follows WHERE user_id = ? AND artist_id = ?',
      [userId, artistId]
    );

    if (existing.length > 0) {
      connection.release();
      return res.status(409).json({ error: 'Already following this artist' });
    }

    // Insert follow
    await connection.query(
      'INSERT INTO user_artist_follows (user_id, artist_id) VALUES (?, ?)',
      [userId, artistId]
    );

    connection.release();
    res.status(201).json({ message: 'Successfully followed artist' });
  } catch (error) {
    console.error('Follow artist error:', error);
    res.status(500).json({ error: 'Failed to follow artist' });
  }
});

// Unfollow an artist
router.delete('/artist/:artistId', verifyToken, async (req, res) => {
  const { artistId } = req.params;
  const userEmail = req.user.email; // Get email from Firebase token

  try {
    const connection = await pool.getConnection();
    
    // Get user_id from email
    const [users] = await connection.query(
      'SELECT id FROM user WHERE email = ?',
      [userEmail]
    );

    if (users.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'User not found' });
    }

    const userId = users[0].id;

    // Delete follow
    const [result] = await connection.query(
      'DELETE FROM user_artist_follows WHERE user_id = ? AND artist_id = ?',
      [userId, artistId]
    );

    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Not following this artist' });
    }

    res.json({ message: 'Successfully unfollowed artist' });
  } catch (error) {
    console.error('Unfollow artist error:', error);
    res.status(500).json({ error: 'Failed to unfollow artist' });
  }
});

// Check if user is following an artist
router.get('/artist/:artistId/status', verifyToken, async (req, res) => {
  const { artistId } = req.params;
  const userEmail = req.user.email; // Get email from Firebase token

  try {
    const connection = await pool.getConnection();
    
    // Get user_id from email
    const [users] = await connection.query(
      'SELECT id FROM user WHERE email = ?',
      [userEmail]
    );

    if (users.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'User not found' });
    }

    const userId = users[0].id;

    // Check follow status
    const [follows] = await connection.query(
      'SELECT id FROM user_artist_follows WHERE user_id = ? AND artist_id = ?',
      [userId, artistId]
    );

    connection.release();
    res.json({ isFollowing: follows.length > 0 });
  } catch (error) {
    console.error('Check follow status error:', error);
    res.status(500).json({ error: 'Failed to check follow status' });
  }
});

// Get all artists followed by user
router.get('/user/following', verifyToken, async (req, res) => {
  const userEmail = req.user.email; // Get email from Firebase token

  try {
    const connection = await pool.getConnection();
    
    const [users] = await connection.query(
      'SELECT id FROM user WHERE email = ?',
      [userEmail]
    );

    if (users.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'User not found' });
    }

    const userId = users[0].id;

    // Get followed artists with details
    const [artists] = await connection.query(
      `SELECT a.*, f.followed_at 
       FROM user_artist_follows f
       JOIN artists a ON f.artist_id = a.id
       WHERE f.user_id = ?
       ORDER BY f.followed_at DESC`,
      [userId]
    );

    connection.release();
    res.json({ following: artists });
  } catch (error) {
    console.error('Get following error:', error);
    res.status(500).json({ error: 'Failed to get following list' });
  }
});

export default router;
