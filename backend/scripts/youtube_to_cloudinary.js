// Node.js script to download YouTube audio and upload to Cloudinary
// Requires: ytdl-core, cloudinary, fs, dotenv

import { createWriteStream, unlinkSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import ytdl from 'ytdl-core';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

// ES module compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Load environment variables from .env file
// Ensure you have CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in your .env

async function downloadYoutubeAudio(youtubeUrl, outputPath) {
  return new Promise((resolve, reject) => {
    const stream = ytdl(youtubeUrl, { filter: 'audioonly' });
    const fileStream = createWriteStream(outputPath);
    stream.pipe(fileStream);
    fileStream.on('finish', () => resolve(outputPath));
    stream.on('error', reject);
    fileStream.on('error', reject);
  });
}

async function uploadToCloudinary(audioPath) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  return cloudinary.uploader.upload(audioPath, {
    resource_type: 'video', // Cloudinary treats audio as 'video'
    folder: 'youtube_audio_uploads',
  });
}

async function main() {
  const youtubeUrl = process.argv[2];
  if (!youtubeUrl) {
    console.error('Usage: node youtube_to_cloudinary.js <YouTube_URL>');
    process.exit(1);
  }
  const tempFile = join(__dirname, 'temp_audio.mp3');
  console.log('Downloading audio...');
  await downloadYoutubeAudio(youtubeUrl, tempFile);
  console.log(`Audio downloaded and saved to: ${tempFile}`);
  // Uncomment below to upload to Cloudinary
  // console.log('Uploading to Cloudinary...');
  // const result = await uploadToCloudinary(tempFile);
  // console.log('Cloudinary URL:', result.secure_url);
  // unlinkSync(tempFile);
  // console.log('Temporary audio file removed.');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
