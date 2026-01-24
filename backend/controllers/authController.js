// Auth controller for user signup and authentication
import pool from '../config/db.js';
import bcrypt from 'bcrypt';
import { sendEmail } from '../services/emailService.js';
import admin from 'firebase-admin';

export async function signupUser(req, res) {
  console.log('Signup request received:', { ...req.body, uid: req.body.uid?.substring(0, 10) + '...' });
  
  const { uid, firstName, lastName, email, username } = req.body;
  
  // Validate required fields
  if (!uid || !firstName || !lastName || !email || !username) {
    console.log('Missing fields:', { uid: !!uid, firstName: !!firstName, lastName: !!lastName, email: !!email, username: !!username });
    return res.status(400).json({ 
      error: 'Missing required fields: uid, firstName, lastName, email, username' 
    });
  }

  let connection;
  try {
    connection = await pool.getConnection();
    
    // Check if user already exists by email or username
    const [existingUsers] = await connection.query(
      'SELECT id FROM user WHERE email = ? OR username = ?',
      [email, username]
    );
    
    if (existingUsers.length > 0) {
      return res.status(409).json({ 
        error: 'User with this email or username already exists' 
      });
    }
    
    // Hash the Firebase UID for additional security (optional, but recommended)
    const hashedUid = await bcrypt.hash(uid, 10);
    
    // Insert new user into database
    const [result] = await connection.query(
      `INSERT INTO user 
        (username, first_name, last_name, email, password_hash, email_verified, is_active, demo_access) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        username,
        firstName,
        lastName,
        email,
        hashedUid, // Store hashed Firebase UID as password_hash
        1, // Email is verified through Firebase
        1, // Active by default
        0  // No demo access by default
      ]
    );
    
    // Update last_login timestamp
    await connection.query(
      'UPDATE user SET last_login = NOW() WHERE id = ?',
      [result.insertId]
    );
    
    console.log('✅ User created successfully in database:', { userId: result.insertId, username });
    
    res.status(201).json({
      message: 'User registered successfully',
      userId: result.insertId,
      username: username
    });
    
  } catch (error) {
    console.error('❌ Database error during signup:', error.message);
    console.error('Full error:', error);
    res.status(500).json({ 
      error: 'Failed to create user account',
      details: error.message 
    });
  } finally {
    if (connection) connection.release();
  }
}

/**
 * Request account deletion
 * Marks the account for deletion after 30-day grace period
 */
export async function requestAccountDeletion(req, res) {
  console.log('Account deletion request received');
  
  const { email, uid } = req.body;
  const userEmail = email || req.user?.email; // Get from body or verified token
  
  if (!userEmail) {
    return res.status(400).json({ 
      error: 'Email is required' 
    });
  }

  let connection;
  try {
    connection = await pool.getConnection();
    
    // Find user in database
    const [users] = await connection.query(
      'SELECT id, username, first_name, last_name, email, account_status FROM user WHERE email = ?',
      [userEmail]
    );
    
    if (users.length === 0) {
      return res.status(404).json({ 
        error: 'User not found' 
      });
    }

    const user = users[0];

    // Check if already pending deletion
    if (user.account_status === 'pending_deletion') {
      return res.status(400).json({ 
        error: 'Account is already scheduled for deletion',
        message: 'Your account is already scheduled for deletion. Log in again to cancel.'
      });
    }

    // Check if already deleted
    if (user.account_status === 'deleted') {
      return res.status(400).json({ 
        error: 'Account has already been deleted'
      });
    }

    // Calculate deletion date (30 days from now)
    const deletionDate = new Date();
    deletionDate.setDate(deletionDate.getDate() + 30);

    // Get requester IP address
    const ipAddress = req.ip || req.connection.remoteAddress;

    // Update user record to pending_deletion
    await connection.query(
      `UPDATE user 
       SET account_status = 'pending_deletion',
           deletion_requested_at = NOW(),
           scheduled_deletion_date = ?,
           deletion_ip_address = ?
       WHERE id = ?`,
      [deletionDate, ipAddress, user.id]
    );

    console.log(`✅ Account deletion requested for user ${user.id} (${userEmail}). Scheduled for: ${deletionDate.toISOString()}`);

    // Send confirmation email
    try {
      const emailSent = await sendEmail({
        to: userEmail,
        subject: 'Your Account Deletion Request - 30 Day Grace Period',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #D4A24C;">Account Deletion Request Received</h2>
            
            <p>Hello ${user.first_name || user.username},</p>
            
            <p>We've received your request to delete your Shelter House Music account.</p>
            
            <div style="background-color: #f0f0f0; padding: 15px; border-left: 4px solid #D4A24C; margin: 20px 0;">
              <strong style="color: #1E1E1E;">⏰ 30-Day Grace Period</strong>
              <p style="margin: 10px 0;">Your account is scheduled for permanent deletion on <strong>${deletionDate.toLocaleDateString()}</strong>.</p>
              <p style="margin: 10px 0;">You can cancel this deletion at any time before this date by simply logging back into your account.</p>
            </div>
            
            <h3 style="color: #D4A24C;">What Happens Next:</h3>
            <ul style="line-height: 1.8;">
              <li><strong>Now - ${deletionDate.toLocaleDateString()}:</strong> Your account remains active but is marked for deletion</li>
              <li><strong>To Cancel:</strong> Simply log in anytime during this period</li>
              <li><strong>After ${deletionDate.toLocaleDateString()}:</strong> Your account will be permanently deleted</li>
            </ul>
            
            <h3 style="color: #D4A24C;">What Will Be Deleted:</h3>
            <ul style="line-height: 1.8;">
              <li>✗ Personal profile information (name, email, preferences)</li>
              <li>✗ Account access and login credentials</li>
              <li>✓ Purchase history (retained anonymously for legal/tax compliance)</li>
            </ul>
            
            <div style="margin: 30px 0; padding: 20px; background-color: #fff3cd; border: 1px solid #D4A24C; border-radius: 5px;">
              <strong>Change Your Mind?</strong>
              <p style="margin: 10px 0;">To cancel this deletion request, simply log back into your account at any time within the next 30 days.</p>
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/login" 
                 style="display: inline-block; margin-top: 10px; padding: 12px 24px; background-color: #D4A24C; color: #1E1E1E; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Log In to Cancel Deletion
              </a>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              If you did not request this deletion, please log in immediately to secure your account.
            </p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            
            <p style="color: #999; font-size: 12px;">
              This email was sent by Shelter House Music. If you have questions, please contact our support team.
            </p>
          </div>
        `
      });

      if (!emailSent) {
        console.warn('⚠️ Failed to send deletion confirmation email');
      }
    } catch (emailError) {
      console.error('❌ Error sending deletion confirmation email:', emailError);
      // Don't fail the request if email fails
    }

    res.status(200).json({
      success: true,
      message: 'Account deletion requested successfully. You have 30 days to cancel by logging in.',
      scheduledDeletionDate: deletionDate.toISOString(),
      gracePeriodDays: 30
    });
    
  } catch (error) {
    console.error('❌ Error requesting account deletion:', error.message);
    console.error('Full error:', error);
    res.status(500).json({ 
      error: 'Failed to request account deletion',
      message: error.message 
    });
  } finally {
    if (connection) connection.release();
  }
}

/**
 * Cancel account deletion
 * Cancels a pending deletion request
 */
export async function cancelAccountDeletion(req, res) {
  console.log('Account deletion cancellation request received');
  
  const userEmail = req.user?.email;
  
  if (!userEmail) {
    return res.status(400).json({ 
      error: 'Email is required' 
    });
  }

  let connection;
  try {
    connection = await pool.getConnection();
    
    // Find user in database
    const [users] = await connection.query(
      'SELECT id, username, first_name, email, account_status FROM user WHERE email = ?',
      [userEmail]
    );
    
    if (users.length === 0) {
      return res.status(404).json({ 
        error: 'User not found' 
      });
    }

    const user = users[0];

    // Check if pending deletion
    if (user.account_status !== 'pending_deletion') {
      return res.status(400).json({ 
        error: 'No pending deletion to cancel',
        message: 'Your account is not scheduled for deletion.'
      });
    }

    // Restore account to active status
    await connection.query(
      `UPDATE user 
       SET account_status = 'active',
           deletion_requested_at = NULL,
           scheduled_deletion_date = NULL,
           deletion_reason = NULL,
           deletion_ip_address = NULL
       WHERE id = ?`,
      [user.id]
    );

    console.log(`✅ Account deletion cancelled for user ${user.id} (${userEmail})`);

    // Send cancellation confirmation email
    try {
      await sendEmail({
        to: userEmail,
        subject: 'Account Deletion Cancelled - Welcome Back!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #D4A24C;">Account Deletion Cancelled</h2>
            
            <p>Hello ${user.first_name || user.username},</p>
            
            <p>Good news! Your account deletion request has been successfully cancelled.</p>
            
            <div style="background-color: #d4edda; padding: 15px; border-left: 4px solid #6F7D5C; margin: 20px 0;">
              <strong style="color: #155724;">✓ Your Account is Active</strong>
              <p style="margin: 10px 0;">Your account is now fully active and will not be deleted.</p>
            </div>
            
            <p>You can continue using all features of Shelter House Music as normal.</p>
            
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/" 
               style="display: inline-block; margin-top: 20px; padding: 12px 24px; background-color: #D4A24C; color: #1E1E1E; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Go to Shelter House Music
            </a>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              If you did not cancel this deletion, please contact our support team immediately.
            </p>
          </div>
        `
      });
    } catch (emailError) {
      console.error('❌ Error sending cancellation confirmation email:', emailError);
    }

    res.status(200).json({
      success: true,
      message: 'Account deletion cancelled successfully. Welcome back!'
    });
    
  } catch (error) {
    console.error('❌ Error cancelling account deletion:', error.message);
    res.status(500).json({ 
      error: 'Failed to cancel account deletion',
      message: error.message 
    });
  } finally {
    if (connection) connection.release();
  }
}

/**
 * Get user profile information
 */
export async function getUserProfile(req, res) {
  const userEmail = req.user?.email;
  
  if (!userEmail) {
    return res.status(400).json({ error: 'Email is required' });
  }

  let connection;
  try {
    connection = await pool.getConnection();
    
    const [users] = await connection.query(
      `SELECT id, username, first_name, last_name, email, email_verified, 
              account_status, created_at, last_login, newsletter_subscribed
       FROM user WHERE email = ?`,
      [userEmail]
    );
    
    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(users[0]);
    
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  } finally {
    if (connection) connection.release();
  }
}

/**
 * Update newsletter preference
 */
export async function updateNewsletterPreference(req, res) {
  const userEmail = req.user?.email;
  const { subscribe_to_newsletter } = req.body;
  
  if (!userEmail) {
    return res.status(400).json({ error: 'Email is required' });
  }

  let connection;
  try {
    connection = await pool.getConnection();
    
    await connection.query(
      'UPDATE user SET newsletter_subscribed = ? WHERE email = ?',
      [subscribe_to_newsletter ? 1 : 0, userEmail]
    );

    res.status(200).json({ 
      success: true,
      message: 'Newsletter preference updated successfully' 
    });
    
  } catch (error) {
    console.error('Error updating newsletter preference:', error);
    res.status(500).json({ error: 'Failed to update newsletter preference' });
  } finally {
    if (connection) connection.release();
  }
}
