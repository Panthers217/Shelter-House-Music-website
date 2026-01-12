/**
 * Test script to verify purchase tracking system API endpoints
 * Run with: node backend/testPurchaseSystem.js
 */

const axios = require('axios');

// Configuration
const API_URL = process.env.VITE_API_URL || 'http://localhost:5000';
const TEST_USER_ID = '1'; // Change this to a real user ID in your system
const TEST_ORDER_ID = 'ORDER-TEST-123'; // Change this to a real order ID

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(60));
  log(title, 'blue');
  console.log('='.repeat(60));
}

async function testEndpoint(name, method, url, headers = {}, data = null) {
  try {
    log(`\nTesting: ${name}`, 'yellow');
    log(`${method} ${url}`);
    
    const config = { method, url, headers };
    if (data) config.data = data;
    
    const response = await axios(config);
    log('✓ Success', 'green');
    log(`Status: ${response.status}`);
    log(`Response: ${JSON.stringify(response.data, null, 2).substring(0, 500)}...`);
    return { success: true, data: response.data };
  } catch (error) {
    log('✗ Failed', 'red');
    if (error.response) {
      log(`Status: ${error.response.status}`);
      log(`Error: ${JSON.stringify(error.response.data, null, 2)}`);
    } else {
      log(`Error: ${error.message}`);
    }
    return { success: false, error: error.message };
  }
}

async function runTests() {
  logSection('PURCHASE TRACKING SYSTEM - API TEST');
  
  log('\nNOTE: These tests require:', 'yellow');
  log('1. Server running on ' + API_URL);
  log('2. Valid authentication token (if auth is required)');
  log('3. Real user_id and order_id in database');
  log('4. Purchase history route registered in server.js\n');

  // Test without authentication (will likely fail, but shows endpoint exists)
  logSection('Test 1: Get User Purchase History');
  await testEndpoint(
    'User Purchase History',
    'GET',
    `${API_URL}/api/purchase-history/user/${TEST_USER_ID}`
  );

  logSection('Test 2: Get All Purchases (Admin)');
  await testEndpoint(
    'All Purchases',
    'GET',
    `${API_URL}/api/purchase-history/all?limit=10`
  );

  logSection('Test 3: Get Order Details');
  await testEndpoint(
    'Order Details',
    'GET',
    `${API_URL}/api/purchase-history/order/${TEST_ORDER_ID}`
  );

  logSection('Test 4: Get Purchase Statistics');
  await testEndpoint(
    'Purchase Stats',
    'GET',
    `${API_URL}/api/purchase-history/stats`
  );

  logSection('Test 5: Check if route is registered');
  log('\nChecking if purchase-history route exists...');
  try {
    const response = await axios.get(`${API_URL}/api/purchase-history/all`);
    log('✓ Route is registered!', 'green');
  } catch (error) {
    if (error.response && error.response.status === 401) {
      log('✓ Route exists but requires authentication', 'green');
    } else if (error.code === 'ECONNREFUSED') {
      log('✗ Server is not running', 'red');
      log(`Make sure your server is running on ${API_URL}`, 'yellow');
    } else if (error.response && error.response.status === 404) {
      log('✗ Route not found', 'red');
      log('Add this to your server.js:', 'yellow');
      log('const purchaseHistoryRoutes = require("./routes/purchase-history");', 'yellow');
      log('app.use("/api/purchase-history", purchaseHistoryRoutes);', 'yellow');
    } else {
      log(`Unexpected error: ${error.message}`, 'red');
    }
  }

  logSection('TESTS COMPLETE');
  log('\nNext Steps:', 'blue');
  log('1. If routes are not registered, add them to server.js');
  log('2. If authentication fails, add a valid JWT token to the requests');
  log('3. Run the SQL verification script to check database setup');
  log('4. Make a test purchase through the UI to generate data');
}

// Run the tests
runTests().catch(error => {
  log('\nTest suite failed:', 'red');
  log(error.message, 'red');
  process.exit(1);
});
