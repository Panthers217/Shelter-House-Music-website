import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

async function testCloudinary() {
  try {
    console.log('Testing Cloudinary connection...');
    console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
    console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY);
    console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? '***' + process.env.CLOUDINARY_API_SECRET.slice(-4) : 'NOT SET');
    
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    
    // Test connection by getting account details
    const result = await cloudinary.api.ping();
    console.log('✅ Cloudinary connection successful:', result);
    
    // Get cloud usage info
    const usage = await cloudinary.api.usage();
    console.log('✅ Cloudinary account info:');
    console.log('  - Plan:', usage.plan);
    console.log('  - Credits used:', usage.credits?.usage || 'N/A');
    console.log('  - Resources:', usage.resources || 'N/A');
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Cloudinary connection failed:', err.message);
    console.error('Full error:', err);
    process.exit(1);
  }
}

testCloudinary();
