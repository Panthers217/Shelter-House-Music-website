import { Router } from 'express';
import pool from '../config/db.js';

const router = Router();

// Subscribe to newsletter (with user_id relationship)
router.post('/subscribe', async (req, res) => {
  const { email, userId = null } = req.body; // userId optional for authenticated users

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();

    // Check if email exists in user table
    const [users] = await connection.query(
      'SELECT id, newsletter_subscribed FROM user WHERE email = ?',
      [email]
    );

    if (users.length > 0) {
      const user = users[0];
      
      // User exists - update their newsletter preference
      if (user.newsletter_subscribed) {
        await connection.commit();
        return res.status(200).json({ 
          message: 'You are already subscribed to our newsletter!',
          alreadySubscribed: true 
        });
      }

      await connection.query(
        'UPDATE user SET newsletter_subscribed = true WHERE email = ?',
        [email]
      );

      // Also add to newsletter table with user_id for relationship tracking
      const [existing] = await connection.query(
        'SELECT id FROM newsletter WHERE user_id = ?',
        [user.id]
      );

      if (existing.length === 0) {
        await connection.query(
          'INSERT INTO newsletter (email, user_id, is_active) VALUES (?, ?, true)',
          [email, user.id]
        );
      }

      await connection.commit();
      return res.status(200).json({ 
        message: 'Successfully subscribed to newsletter!',
        source: 'user_account',
        userId: user.id
      });
    }

    // Check if email exists in newsletter table (anonymous subscriber)
    const [newsletters] = await connection.query(
      'SELECT id, is_active FROM newsletter WHERE email = ? AND user_id IS NULL',
      [email]
    );

    if (newsletters.length > 0) {
      if (newsletters[0].is_active) {
        await connection.commit();
        return res.status(200).json({ 
          message: 'You are already subscribed to our newsletter!',
          alreadySubscribed: true 
        });
      }

      // Reactivate subscription
      await connection.query(
        'UPDATE newsletter SET is_active = true, subscribed_at = CURRENT_TIMESTAMP WHERE email = ? AND user_id IS NULL',
        [email]
      );

      await connection.commit();
      return res.status(200).json({ 
        message: 'Successfully resubscribed to newsletter!',
        source: 'newsletter_table'
      });
    }

    // New anonymous subscriber
    await connection.query(
      'INSERT INTO newsletter (email, user_id, is_active) VALUES (?, NULL, true)',
      [email]
    );

    await connection.commit();
    res.status(201).json({ 
      message: 'Successfully subscribed to newsletter!',
      source: 'newsletter_table'
    });

  } catch (error) {
    await connection.rollback();
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ error: 'Failed to subscribe to newsletter' });
  } finally {
    connection.release();
  }
});

// Get subscriber details with user relationship
router.get('/subscribers-detailed', async (req, res) => {
  try {
    const [subscribers] = await pool.query(`
      SELECT 
        u.id as user_id,
        u.email,
        u.username,
        u.newsletter_subscribed,
        u.created_at as user_created_at,
        'registered_user' as subscriber_type
      FROM user u
      WHERE u.newsletter_subscribed = true
      
      UNION
      
      SELECT 
        n.user_id,
        n.email,
        CASE 
          WHEN n.user_id IS NOT NULL THEN u2.username 
          ELSE NULL 
        END as username,
        n.is_active as newsletter_subscribed,
        n.subscribed_at as user_created_at,
        CASE 
          WHEN n.user_id IS NOT NULL THEN 'linked_subscriber'
          ELSE 'anonymous_subscriber'
        END as subscriber_type
      FROM newsletter n
      LEFT JOIN user u2 ON n.user_id = u2.id
      WHERE n.is_active = true
      
      ORDER BY user_created_at DESC
    `);

    res.status(200).json({ 
      subscribers, 
      count: subscribers.length,
      breakdown: {
        registered: subscribers.filter(s => s.subscriber_type === 'registered_user').length,
        linked: subscribers.filter(s => s.subscriber_type === 'linked_subscriber').length,
        anonymous: subscribers.filter(s => s.subscriber_type === 'anonymous_subscriber').length
      }
    });
  } catch (error) {
    console.error('Get detailed subscribers error:', error);
    res.status(500).json({ error: 'Failed to fetch subscribers' });
  }
});

export default router;
