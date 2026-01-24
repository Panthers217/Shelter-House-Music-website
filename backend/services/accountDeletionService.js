// Scheduled task to permanently delete accounts after grace period
import pool from '../config/db.js';
import admin from 'firebase-admin';
import { sendEmail } from './emailService.js';
import cron from 'node-cron';

/**
 * Process accounts scheduled for deletion
 * Runs daily to check for accounts past their grace period
 */
export async function processScheduledDeletions() {
  console.log('🗑️  Running scheduled account deletion check...');
  
  let connection;
  try {
    connection = await pool.getConnection();
    
    // Find accounts past their deletion date
    const [accountsToDelete] = await connection.query(
      `SELECT id, username, email, first_name, last_name, scheduled_deletion_date
       FROM user 
       WHERE account_status = 'pending_deletion' 
       AND scheduled_deletion_date <= NOW()
       ORDER BY scheduled_deletion_date ASC`
    );

    if (accountsToDelete.length === 0) {
      console.log('✓ No accounts to delete');
      return { deletedCount: 0 };
    }

    console.log(`Found ${accountsToDelete.length} account(s) ready for deletion`);

    let deletedCount = 0;
    let errorCount = 0;

    for (const user of accountsToDelete) {
      try {
        await deleteUserAccount(connection, user);
        deletedCount++;
        console.log(`✓ Deleted account: ${user.email} (ID: ${user.id})`);
      } catch (error) {
        errorCount++;
        console.error(`✗ Failed to delete account ${user.email}:`, error.message);
      }
    }

    console.log(`🗑️  Deletion complete: ${deletedCount} deleted, ${errorCount} errors`);
    
    return { 
      deletedCount, 
      errorCount,
      totalProcessed: accountsToDelete.length 
    };
    
  } catch (error) {
    console.error('❌ Error in scheduled deletion process:', error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

/**
 * Delete a single user account permanently
 * @param {Connection} connection - MySQL connection
 * @param {Object} user - User object to delete
 */
async function deleteUserAccount(connection, user) {
  try {
    // Start transaction
    await connection.beginTransaction();

    // 1. Anonymize purchase records (keep for legal/tax compliance)
    await connection.query(
      `UPDATE purchases 
       SET user_email = CONCAT('deleted_user_', ?),
           user_id = NULL
       WHERE user_email = ?`,
      [user.id, user.email]
    );

    // 2. Delete Firebase user
    try {
      // Find Firebase user by email
      const firebaseUser = await admin.auth().getUserByEmail(user.email);
      await admin.auth().deleteUser(firebaseUser.uid);
      console.log(`  ✓ Deleted Firebase account for ${user.email}`);
    } catch (firebaseError) {
      // User might not exist in Firebase or already deleted
      console.warn(`  ⚠️  Firebase deletion warning for ${user.email}:`, firebaseError.message);
    }

    // 3. Delete newsletter subscription if exists
    await connection.query(
      'DELETE FROM newsletter WHERE email = ?',
      [user.email]
    );

    // 4. Mark database user as deleted (soft delete for audit trail)
    await connection.query(
      `UPDATE user 
       SET account_status = 'deleted',
           email = CONCAT('deleted_', id, '@deleted.local'),
           username = CONCAT('deleted_user_', id),
           first_name = 'Deleted',
           last_name = 'User',
           password_hash = NULL,
           is_active = 0
       WHERE id = ?`,
      [user.id]
    );

    // 5. Send final deletion confirmation email (before email is anonymized)
    try {
      await sendEmail({
        to: user.email,
        subject: 'Your Account Has Been Deleted',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #D4A24C;">Account Deleted</h2>
            
            <p>Hello ${user.first_name || user.username},</p>
            
            <p>Your Shelter House Music account has been permanently deleted as requested.</p>
            
            <div style="background-color: #f0f0f0; padding: 15px; border-left: 4px solid #D4A24C; margin: 20px 0;">
              <strong>What Has Been Deleted:</strong>
              <ul style="line-height: 1.8;">
                <li>Your profile and personal information</li>
                <li>Account login credentials</li>
                <li>Saved preferences and settings</li>
              </ul>
            </div>
            
            <div style="background-color: #d4edda; padding: 15px; border-left: 4px solid #6F7D5C; margin: 20px 0;">
              <strong>What Has Been Retained:</strong>
              <ul style="line-height: 1.8;">
                <li>Purchase records (anonymized, for tax/legal compliance)</li>
              </ul>
            </div>
            
            <p>Thank you for being part of Shelter House Music. You're welcome back anytime with a new account.</p>
            
            <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/sign-up" 
               style="display: inline-block; margin-top: 20px; padding: 12px 24px; background-color: #D4A24C; color: #1E1E1E; text-decoration: none; border-radius: 5px; font-weight: bold;">
              Create New Account
            </a>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              If you did not request this deletion, please contact our support team immediately.
            </p>
          </div>
        `
      });
    } catch (emailError) {
      console.error('  ⚠️  Failed to send final deletion email:', emailError.message);
      // Don't fail the deletion if email fails
    }

    // Commit transaction
    await connection.commit();
    
  } catch (error) {
    // Rollback on error
    await connection.rollback();
    throw error;
  }
}

/**
 * Setup cron job to run daily at 2 AM
 */
export function setupDeletionCronJob() {
  // Run every day at 2:00 AM
  cron.schedule('0 2 * * *', async () => {
    console.log('⏰ Daily account deletion check starting...');
    try {
      await processScheduledDeletions();
    } catch (error) {
      console.error('❌ Scheduled deletion cron job failed:', error);
    }
  });

  console.log('✓ Account deletion cron job scheduled (daily at 2:00 AM)');
}
