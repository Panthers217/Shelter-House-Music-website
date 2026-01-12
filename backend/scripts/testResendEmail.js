/**
 * Test Resend Email Configuration
 * Simple script to test Resend API directly
 * Usage: node backend/scripts/testResendEmail.js
 */

import 'dotenv/config';
import axios from 'axios';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TEST_EMAIL = 'marlostudioa@gmail.com'; // Change this to your test email

console.log('🧪 Testing Resend Email Configuration...\n');

if (!RESEND_API_KEY) {
  console.error('❌ ERROR: RESEND_API_KEY not found in environment variables');
  console.error('💡 Add RESEND_API_KEY to your .env file');
  process.exit(1);
}

console.log('✓ Resend API Key found');
console.log('✓ Test email:', TEST_EMAIL);
console.log('\nSending test email...\n');

try {
  const response = await axios.post(
    'https://api.resend.com/emails',
    {
      from: 'Soul Felt Music <onboarding@resend.dev>', // Use your verified domain or resend.dev for testing
      to: [TEST_EMAIL],
      subject: 'Test Email from Soul Felt Music',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #aa2a46;">Test Email Success! 🎉</h1>
          <p>This is a test email from Soul Felt Music using Resend.</p>
          <p>If you received this email, your Resend configuration is working correctly!</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;">
          <p style="color: #666; font-size: 14px;">
            Sent at: ${new Date().toLocaleString()}<br>
            Provider: Resend
          </p>
        </div>
      `,
      text: `Test Email from Soul Felt Music\n\nIf you received this, Resend is configured correctly!\n\nSent at: ${new Date().toLocaleString()}`,
    },
    {
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  console.log('✅ SUCCESS! Email sent via Resend\n');
  console.log('📧 Email Details:');
  console.log('- ID:', response.data.id);
  console.log('- To:', TEST_EMAIL);
  console.log('- Status:', response.status);
  console.log('\n✉️  Check your inbox at:', TEST_EMAIL);
  console.log('📁 Also check spam/junk folder if not in inbox');
  console.log('\n🔗 View in Resend Dashboard:');
  console.log('   https://resend.com/emails\n');

  process.exit(0);
} catch (error) {
  console.error('❌ ERROR: Failed to send email via Resend\n');
  
  if (error.response) {
    console.error('API Response:', error.response.status);
    console.error('Error:', error.response.data);
    
    if (error.response.status === 401) {
      console.error('\n💡 FIX: Invalid API Key');
      console.error('   - Check RESEND_API_KEY in .env file');
      console.error('   - Get your API key at: https://resend.com/api-keys');
    } else if (error.response.status === 422) {
      console.error('\n💡 FIX: Invalid email address or domain');
      console.error('   - Verify your email address');
      console.error('   - For production, add your domain at: https://resend.com/domains');
      console.error('   - For testing, use: onboarding@resend.dev');
    }
  } else {
    console.error('Error:', error.message);
  }

  console.error('\n📚 Resend Documentation: https://resend.com/docs\n');
  process.exit(1);
}
