import { sendPurchaseConfirmationEmail } from './services/emailService.js';
import pool from './config/db.js';

async function testOrderEmail() {
  try {
    console.log('🧪 Testing Order Confirmation Email...\n');
    
    // Test purchase data
    const testEmail = process.argv[2] || 'test@example.com';
    
    if (testEmail === 'test@example.com') {
      console.log('⚠️  Using default test email. To use your email, run:');
      console.log('   node test-order-email.js your-email@example.com\n');
    }
    
    const testData = {
      customer_email: testEmail,
      customer_name: 'Test Customer',
      order_id: 'TEST-' + Date.now(),
      purchased_at: new Date(),
      amount: '29.99',
      items: [
        {
          item_id: 1,
          item_title: 'Test Song',
          item_type: 'Track',
          artist_name: 'Test Artist',
          price: '9.99',
          quantity: 1,
          image_url: 'https://via.placeholder.com/300',
          secure_download_url: 'https://example.com/download/test'
        }
      ],
      shipping_address: null
    };
    
    console.log('Sending test email to:', testData.customer_email);
    console.log('Order ID:', testData.order_id);
    console.log('Note: Check the email for Shelter House branding (honey gold colors and logo)');
    console.log('\n⏳ Sending email...\n');
    
    const result = await sendPurchaseConfirmationEmail(testData);
    
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', result.messageId);
    console.log('Recipient:', result.recipient);
    console.log('\n📬 Check your inbox!\n');
    
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error sending test email:', error.message);
    if (error.stack) {
      console.error('\nFull error:', error);
    }
    await pool.end();
    process.exit(1);
  }
}

testOrderEmail();
