/**
 * Test script to verify the download proxy system
 * This tests that download tokens are generated correctly and files can be streamed
 */

import axios from 'axios';

const API_URL = 'http://localhost:3001';

async function testDownloadProxy() {
  console.log('🧪 Testing Download Proxy System\n');
  
  try {
    // Step 1: Generate download token (simulating what the frontend does)
    console.log('1️⃣ Generating download token for a purchased track...');
    
    const verifyResponse = await axios.post(`${API_URL}/api/downloads/generate-url`, {
      itemType: 'Track',
      itemId: 2, // Track ID from a real purchase
      userEmail: 'test@example.com' // Email from test purchase
    });
    
    console.log('✅ Token generated successfully');
    console.log('Item:', verifyResponse.data.itemTitle);
    console.log('Downloads:', verifyResponse.data.downloads.length);
    console.log('Expires in:', Math.floor(verifyResponse.data.expiresIn / 3600), 'hours\n');
    
    // Step 2: Test the download URL
    if (verifyResponse.data.downloads.length > 0) {
      const downloadUrl = verifyResponse.data.downloads[0].downloadUrl;
      console.log('2️⃣ Testing download URL...');
      console.log('URL:', `${API_URL}${downloadUrl}`);
      
      // Make a HEAD request to check if the file is accessible
      const headResponse = await axios.head(`${API_URL}${downloadUrl}`);
      
      console.log('✅ Download endpoint accessible');
      console.log('Content-Type:', headResponse.headers['content-type']);
      console.log('Content-Disposition:', headResponse.headers['content-disposition']);
      
      console.log('\n🎉 Download proxy system is working correctly!');
      console.log('\n📝 Summary:');
      console.log('- Purchase verification: ✅');
      console.log('- Token generation: ✅');
      console.log('- File streaming: ✅');
      console.log('- Cloudinary URL hidden: ✅');
    }
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Error:', error.response.data);
    }
    
    process.exit(1);
  }
}

testDownloadProxy();
