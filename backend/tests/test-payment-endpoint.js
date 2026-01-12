import dotenv from 'dotenv';
dotenv.config();

console.log('🧪 Testing Payment Endpoint...\n');

const testPayment = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/payments/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: 1000, // $10.00
        cart: [{
          id: 1,
          type: 'Track',
          title: 'Test Track',
          price: '$10.00'
        }],
        customerInfo: {
          email: 'test@example.com',
          name: 'Test Customer',
          address: '123 Test St'
        },
        userEmail: null // Guest checkout
      })
    });

    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    
    const data = await response.json();
    console.log('\nResponse:', JSON.stringify(data, null, 2));

    if (response.ok) {
      console.log('\n✅ Payment endpoint working!');
    } else {
      console.log('\n❌ Payment endpoint returned error');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

testPayment();
