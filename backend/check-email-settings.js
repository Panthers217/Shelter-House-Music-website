import pool from './config/db.js';

async function checkEmailSettings() {
  try {
    console.log('🔍 Checking email settings in database...\n');
    
    const [settings] = await pool.query(
      `SELECT 
        email_provider,
        email_api_key,
        email_from_name,
        email_reply_to,
        smtp_host,
        smtp_port,
        smtp_secure,
        smtp_user,
        smtp_password,
        contact_email
      FROM website_settings 
      LIMIT 1`
    );

    if (settings.length === 0) {
      console.log('❌ No email settings found in database');
      console.log('You need to configure email settings through the admin panel\n');
    } else {
      const config = settings[0];
      console.log('📧 Current Email Settings:');
      console.log('========================\n');
      console.log('Provider:', config.email_provider || '(not set)');
      console.log('From Name:', config.email_from_name || '(not set)');
      console.log('Reply To:', config.email_reply_to || '(not set)');
      console.log('Contact Email:', config.contact_email || '(not set)');
      console.log('\n--- Provider-specific settings ---\n');
      
      if (config.email_provider === 'smtp' || !config.email_provider) {
        console.log('SMTP Configuration:');
        console.log('  Host:', config.smtp_host || '(not set)');
        console.log('  Port:', config.smtp_port || '(not set)');
        console.log('  Secure:', config.smtp_secure || '(not set)');
        console.log('  User:', config.smtp_user || '(not set)');
        console.log('  Password:', config.smtp_password ? '***SET***' : '(not set)');
      } else {
        console.log(`${config.email_provider.toUpperCase()} Configuration:`);
        console.log('  API Key:', config.email_api_key ? '***SET***' : '(not set)');
      }
      
      console.log('\n========================\n');
      
      // Check if configuration is complete
      const provider = config.email_provider || 'smtp';
      let isConfigured = false;
      
      if (provider === 'smtp') {
        isConfigured = !!(config.smtp_host && config.smtp_user && config.smtp_password);
      } else {
        isConfigured = !!config.email_api_key;
      }
      
      if (isConfigured) {
        console.log('✅ Email configuration appears complete');
      } else {
        console.log('⚠️  Email configuration is INCOMPLETE');
        console.log('Please configure email settings in the admin panel\n');
      }
    }
    
    await pool.end();
  } catch (error) {
    console.error('❌ Error checking email settings:', error.message);
    process.exit(1);
  }
}

checkEmailSettings();
