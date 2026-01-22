import { sendPurchaseConfirmationEmail } from './services/emailService.js';

// Test data simulating a purchase
const testPurchaseData = {
  customer_email: 'marlorouse109@yahoo.com', // Change this to your email for testing
  customer_name: 'Test Customer',
  order_id: 'TEST-ORDER-123',
  purchased_at: new Date(),
  amount: 29.99,
  items: [
    {
      item_type: 'Track',
      item_id: 1,
      item_title: 'Test Song',
      artist_name: 'Test Artist',
      quantity: 1,
      price: 9.99,
      image_url: 'https://via.placeholder.com/300'
    },
    {
      item_type: 'Digital Album',
      item_id: 2,
      item_title: 'Test Album',
      artist_name: 'Test Artist',
      quantity: 1,
      price: 19.99,
      image_url: 'https://via.placeholder.com/300'
    }
  ],
  shipping_address: JSON.stringify({
    address: '123 Test St',
    city: 'Test City',
    state: 'CA',
    zipCode: '12345',
    country: 'US'
  })
};

console.log('🧪 Testing email sending...');
console.log('📧 Recipient:', testPurchaseData.customer_email);
console.log('');

sendPurchaseConfirmationEmail(testPurchaseData)
  .then((result) => {
    console.log('✅ Email sent successfully!');
    console.log('📬 Result:', result);
  })
  .catch((error) => {
    console.error('❌ Error sending email:');
    console.error(error);
    process.exit(1);
  });
