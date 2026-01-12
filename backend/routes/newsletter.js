import { Router } from 'express';
import pool from '../config/db.js';

const router = Router();

// Subscribe to newsletter
router.post('/subscribe', async (req, res) => {
  const { email } = req.body;

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
      // User exists - update their newsletter preference
      if (users[0].newsletter_subscribed) {
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

      await connection.commit();
      return res.status(200).json({ 
        message: 'Successfully subscribed to newsletter!',
        source: 'user_account'
      });
    }

    // Check if email exists in newsletter table
    const [newsletters] = await connection.query(
      'SELECT id, is_active FROM newsletter WHERE email = ?',
      [email]
    );

    if (newsletters.length > 0) {
      // Already in newsletter table
      if (newsletters[0].is_active) {
        await connection.commit();
        return res.status(200).json({ 
          message: 'You are already subscribed to our newsletter!',
          alreadySubscribed: true 
        });
      }

      // Reactivate subscription
      await connection.query(
        'UPDATE newsletter SET is_active = true, subscribed_at = CURRENT_TIMESTAMP WHERE email = ?',
        [email]
      );

      await connection.commit();
      return res.status(200).json({ 
        message: 'Successfully resubscribed to newsletter!',
        source: 'newsletter_table'
      });
    }

    // New subscriber - add to newsletter table
    await connection.query(
      'INSERT INTO newsletter (email, is_active) VALUES (?, true)',
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

// Unsubscribe from newsletter
router.post('/unsubscribe', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();

    // Update user table if exists
    await connection.query(
      'UPDATE user SET newsletter_subscribed = false WHERE email = ?',
      [email]
    );

    // Update newsletter table if exists
    await connection.query(
      'UPDATE newsletter SET is_active = false WHERE email = ?',
      [email]
    );

    await connection.commit();
    res.status(200).json({ message: 'Successfully unsubscribed from newsletter' });

  } catch (error) {
    await connection.rollback();
    console.error('Newsletter unsubscribe error:', error);
    res.status(500).json({ error: 'Failed to unsubscribe from newsletter' });
  } finally {
    connection.release();
  }
});

// Get all newsletter subscribers (admin only - add auth middleware as needed)
router.get('/subscribers', async (req, res) => {
  try {
    const [subscribers] = await pool.query(`
      SELECT email, 'user' as source, created_at as subscribed_at 
      FROM user 
      WHERE newsletter_subscribed = true
      UNION
      SELECT email, 'newsletter' as source, subscribed_at 
      FROM newsletter 
      WHERE is_active = true
      ORDER BY subscribed_at DESC
    `);

    res.status(200).json({ subscribers, count: subscribers.length });
  } catch (error) {
    console.error('Get subscribers error:', error);
    res.status(500).json({ error: 'Failed to fetch subscribers' });
  }
});

// Get all newsletter emails for sending (no duplicates)
router.get('/emails', async (req, res) => {
  try {
    const [emails] = await pool.query(`
      SELECT DISTINCT email 
      FROM (
        SELECT email FROM user WHERE newsletter_subscribed = true
        UNION
        SELECT email FROM newsletter WHERE is_active = true
      ) as all_emails
      ORDER BY email
    `);

    res.status(200).json({ 
      emails: emails.map(row => row.email),
      count: emails.length 
    });
  } catch (error) {
    console.error('Get newsletter emails error:', error);
    res.status(500).json({ error: 'Failed to fetch newsletter emails' });
  }
});

export default router;
