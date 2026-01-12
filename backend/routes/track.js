// Track routes
import express from 'express';
import { getAllTracks } from '../controllers/trackController.js';
import pool from '../config/db.js';
import admin from 'firebase-admin';

const router = express.Router();

/**
 * Verify Firebase token middleware (optional for play logging)
 */
async function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    
    if (token) {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken;
    }
    
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    next(); // Continue without user info for anonymous plays
  }
}

// Example route: GET all tracks
router.get('/', getAllTracks);

/**
 * Log a track play
 * POST /api/tracks/play
 */
router.post('/play', verifyToken, async (req, res) => {
  try {
    const { trackId, artistId, sessionId } = req.body;
    
    if (!trackId || !artistId) {
      return res.status(400).json({ error: 'trackId and artistId are required' });
    }
    
    const connection = await pool.getConnection();
    
    try {
      // Get user_id if authenticated
      let userId = null;
      if (req.user?.email) {
        const [users] = await connection.query(
          'SELECT id FROM user WHERE email = ?',
          [req.user.email]
        );
        if (users.length > 0) {
          userId = users[0].id;
        }
      }
      
      // Get client IP
      const ipAddress = req.headers['x-forwarded-for']?.split(',')[0] || 
                       req.socket.remoteAddress;
      
      // Get user agent
      const userAgent = req.headers['user-agent'];
      
      // Log the play
      await connection.query(
        `INSERT INTO track_plays 
        (track_id, artist_id, user_id, ip_address, session_id, user_agent) 
        VALUES (?, ?, ?, ?, ?, ?)`,
        [trackId, artistId, userId, ipAddress, sessionId, userAgent]
      );
      
      // console.log(`✅ Logged play: Track ${trackId}, Artist ${artistId}`);
      
      res.json({ success: true });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error logging track play:', error);
    res.status(500).json({ error: 'Failed to log track play' });
  }
});

/**
 * Get track play statistics
 * GET /api/tracks/:trackId/stats
 */
router.get('/:trackId/stats', async (req, res) => {
  try {
    const { trackId } = req.params;
    const connection = await pool.getConnection();
    
    try {
      // Get total plays
      const [totalPlays] = await connection.query(
        'SELECT COUNT(*) as total FROM track_plays WHERE track_id = ?',
        [trackId]
      );
      
      // Get unique listeners (last 30 days)
      const [uniqueListeners] = await connection.query(
        `SELECT COUNT(DISTINCT 
          CASE 
            WHEN user_id IS NOT NULL THEN user_id
            ELSE CONCAT(ip_address, '-', session_id)
          END
        ) as unique_count
        FROM track_plays 
        WHERE track_id = ? 
        AND played_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)`,
        [trackId]
      );
      
      res.json({
        totalPlays: totalPlays[0].total,
        uniqueListeners: uniqueListeners[0].unique_count
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error fetching track stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

export default router;
