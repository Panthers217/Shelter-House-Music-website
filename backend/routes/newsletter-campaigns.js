import { Router } from 'express';
import pool from '../config/db.js';
import { requireAdmin } from '../server.js';
import { sendNewsletterEmail, getSenderEmail } from '../services/emailService.js';

const router = Router();

// Get all newsletter campaigns
router.get('/campaigns', requireAdmin, async (req, res) => {
  try {
    const [campaigns] = await pool.query(`
      SELECT 
        nc.*,
        (SELECT COUNT(*) FROM newsletter_campaign_recipients WHERE campaign_id = nc.id) as total_sent,
        (SELECT COUNT(*) FROM newsletter_campaign_recipients WHERE campaign_id = nc.id AND opened_at IS NOT NULL) as total_opened,
        (SELECT COUNT(*) FROM newsletter_campaign_recipients WHERE campaign_id = nc.id AND clicked_at IS NOT NULL) as total_clicked
      FROM newsletter_campaigns nc
      ORDER BY nc.created_at DESC
    `);

    // Parse JSON fields
    campaigns.forEach(campaign => {
      if (campaign.external_links) {
        campaign.external_links = typeof campaign.external_links === 'string' 
          ? JSON.parse(campaign.external_links) 
          : campaign.external_links;
      }
      if (campaign.artist_ids) {
        campaign.artist_ids = typeof campaign.artist_ids === 'string' 
          ? JSON.parse(campaign.artist_ids) 
          : campaign.artist_ids;
      }
    });

    res.json({ campaigns });
  } catch (error) {
    console.error('Get campaigns error:', error);
    res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
});

// Get single campaign
router.get('/campaigns/:id', requireAdmin, async (req, res) => {
  try {
    const [campaigns] = await pool.query(
      'SELECT * FROM newsletter_campaigns WHERE id = ?',
      [req.params.id]
    );

    if (campaigns.length === 0) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    const campaign = campaigns[0];
    
    // Parse JSON fields
    if (campaign.external_links) {
      campaign.external_links = typeof campaign.external_links === 'string' 
        ? JSON.parse(campaign.external_links) 
        : campaign.external_links;
    }
    if (campaign.artist_ids) {
      campaign.artist_ids = typeof campaign.artist_ids === 'string' 
        ? JSON.parse(campaign.artist_ids) 
        : campaign.artist_ids;
    }

    res.json({ campaign });
  } catch (error) {
    console.error('Get campaign error:', error);
    res.status(500).json({ error: 'Failed to fetch campaign' });
  }
});

// Create new campaign
router.post('/campaigns', requireAdmin, async (req, res) => {
  const {
    title,
    subject,
    content,
    message,
    audio_url,
    video_url,
    external_links,
    artist_ids,
    featured_image,
    status = 'draft',
    scheduled_at
  } = req.body;

  if (!title || !subject || !content) {
    return res.status(400).json({ error: 'Title, subject, and content are required' });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO newsletter_campaigns 
      (title, subject, content, message, audio_url, video_url, external_links, artist_ids, featured_image, status, scheduled_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        subject,
        content,
        message || null,
        audio_url || null,
        video_url || null,
        external_links ? JSON.stringify(external_links) : null,
        artist_ids ? JSON.stringify(artist_ids) : null,
        featured_image || null,
        status,
        scheduled_at || null
      ]
    );

    res.status(201).json({ 
      message: 'Campaign created successfully',
      campaignId: result.insertId 
    });
  } catch (error) {
    console.error('Create campaign error:', error);
    res.status(500).json({ error: 'Failed to create campaign', details: error.message });
  }
});

// Update campaign
router.put('/campaigns/:id', requireAdmin, async (req, res) => {
  const {
    title,
    subject,
    content,
    message,
    audio_url,
    video_url,
    external_links,
    artist_ids,
    featured_image,
    status,
    scheduled_at
  } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE newsletter_campaigns 
      SET title = ?, subject = ?, content = ?, message = ?, audio_url = ?, video_url = ?, 
          external_links = ?, artist_ids = ?, featured_image = ?, status = ?, scheduled_at = ?
      WHERE id = ?`,
      [
        title,
        subject,
        content,
        message || null,
        audio_url || null,
        video_url || null,
        external_links ? JSON.stringify(external_links) : null,
        artist_ids ? JSON.stringify(artist_ids) : null,
        featured_image || null,
        status,
        scheduled_at || null,
        req.params.id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    res.json({ message: 'Campaign updated successfully' });
  } catch (error) {
    console.error('Update campaign error:', error);
    res.status(500).json({ error: 'Failed to update campaign' });
  }
});

// Delete campaign
router.delete('/campaigns/:id', requireAdmin, async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM newsletter_campaigns WHERE id = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    res.json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    console.error('Delete campaign error:', error);
    res.status(500).json({ error: 'Failed to delete campaign' });
  }
});

// Send campaign to all subscribers
router.post('/campaigns/:id/send', requireAdmin, async (req, res) => {
  const campaignId = req.params.id;

  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();

    // Get campaign details
    const [campaigns] = await connection.query(
      'SELECT * FROM newsletter_campaigns WHERE id = ?',
      [campaignId]
    );

    if (campaigns.length === 0) {
      await connection.rollback();
      return res.status(404).json({ error: 'Campaign not found' });
    }

    const campaign = campaigns[0];

    // Allow resending for 'sent' campaigns, just log it differently
    const isResend = campaign.status === 'sent';

    // Get all subscriber emails
    const [emails] = await connection.query(`
      SELECT DISTINCT email 
      FROM (
        SELECT email COLLATE utf8mb4_unicode_ci as email FROM user WHERE newsletter_subscribed = 1
        UNION
        SELECT email COLLATE utf8mb4_unicode_ci as email FROM newsletter WHERE is_active = 1
      ) as all_emails
    `);

    if (emails.length === 0) {
      await connection.rollback();
      return res.status(400).json({ error: 'No subscribers found' });
    }

    // Get sender email address based on configured provider
    let fromEmail;
    try {
      fromEmail = await getSenderEmail();
    } catch (error) {
      await connection.rollback();
      return res.status(500).json({ 
        error: 'Email settings not configured', 
        details: error.message 
      });
    }

    // Parse JSON fields for email template
    if (campaign.external_links && typeof campaign.external_links === 'string') {
      campaign.external_links = JSON.parse(campaign.external_links);
    }
    if (campaign.artist_ids && typeof campaign.artist_ids === 'string') {
      campaign.artist_ids = JSON.parse(campaign.artist_ids);
    }

    // Insert recipients and send emails with rate limiting
    let successCount = 0;
    let failedCount = 0;
    const failedEmails = [];
    
    // Rate limiting: Send max 2 emails per second (Resend free tier limit)
    const BATCH_SIZE = 2;
    const DELAY_MS = 1000; // 1 second between batches
    
    // Helper function to delay execution
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
    // Process emails in batches
    for (let i = 0; i < emails.length; i += BATCH_SIZE) {
      const batch = emails.slice(i, i + BATCH_SIZE);
      
      // Send batch concurrently
      await Promise.all(batch.map(async ({ email }) => {
        try {
          // Insert recipient record
          await connection.query(
            'INSERT INTO newsletter_campaign_recipients (campaign_id, email) VALUES (?, ?)',
            [campaignId, email]
          );

          // Send email using SMTP service
          await sendNewsletterEmail(email, campaign, fromEmail);
          successCount++;
          
          // Update sent timestamp for this recipient
          await connection.query(
            'UPDATE newsletter_campaign_recipients SET sent_at = NOW() WHERE campaign_id = ? AND email = ?',
            [campaignId, email]
          );
        } catch (emailError) {
          console.error(`Failed to send to ${email}:`, emailError.message);
          failedCount++;
          failedEmails.push({ email, error: emailError.message });
        }
      }));
      
      // Wait before next batch (except for last batch)
      if (i + BATCH_SIZE < emails.length) {
        console.log(`📧 Sent batch ${Math.floor(i / BATCH_SIZE) + 1}, waiting ${DELAY_MS}ms...`);
        await delay(DELAY_MS);
      }
    }

    // Update campaign status (only update sent_at and recipient_count on first send)
    if (isResend) {
      // For resend, just increment recipient_count to reflect total sends
      await connection.query(
        'UPDATE newsletter_campaigns SET recipient_count = recipient_count + ? WHERE id = ?',
        [successCount, campaignId]
      );
    } else {
      // First send - set status and sent_at
      await connection.query(
        'UPDATE newsletter_campaigns SET status = ?, sent_at = NOW(), recipient_count = ? WHERE id = ?',
        ['sent', successCount, campaignId]
      );
    }

    await connection.commit();

    const resendNote = isResend ? ' (resent)' : '';
    res.json({ 
      message: `Campaign${resendNote} sent successfully to ${successCount} recipient(s)`,
      recipientCount: emails.length,
      successCount,
      failedCount,
      failedEmails: failedCount > 0 ? failedEmails : undefined,
      isResend
    });
  } catch (error) {
    await connection.rollback();
    console.error('Send campaign error:', error);
    res.status(500).json({ 
      error: 'Failed to send campaign', 
      details: error.message,
      sqlMessage: error.sqlMessage 
    });
  } finally {
    connection.release();
  }
});

// Get campaign analytics
router.get('/campaigns/:id/analytics', requireAdmin, async (req, res) => {
  try {
    const [stats] = await pool.query(`
      SELECT 
        COUNT(*) as total_recipients,
        COUNT(opened_at) as total_opens,
        COUNT(clicked_at) as total_clicks,
        COUNT(unsubscribed_at) as total_unsubscribes,
        ROUND(COUNT(opened_at) * 100.0 / COUNT(*), 2) as open_rate,
        ROUND(COUNT(clicked_at) * 100.0 / COUNT(*), 2) as click_rate
      FROM newsletter_campaign_recipients
      WHERE campaign_id = ?
    `, [req.params.id]);

    res.json({ analytics: stats[0] });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Test email configuration
router.post('/test-email', requireAdmin, async (req, res) => {
  try {
    const { testEmail } = req.body;
    
    if (!testEmail) {
      return res.status(400).json({ error: 'Test email address is required' });
    }

    const { testEmailConfig } = await import('../services/emailService.js');
    const result = await testEmailConfig(testEmail);
    
    res.json({ 
      message: 'Test email sent successfully',
      messageId: result.messageId,
      to: testEmail
    });
  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({ 
      error: 'Failed to send test email', 
      details: error.message 
    });
  }
});

export default router;
