import pool from "./config/db.js";
import dotenv from 'dotenv';
dotenv.config();

// Fetch cloudinary folder settings from database (same as adminController)
async function getCloudinaryFolders() {
  try {
    const [settings] = await pool.query(
      'SELECT cloudinary_image_folder, cloudinary_audio_folder, cloudinary_video_folder, cloudinary_merch_folder FROM website_settings ORDER BY id DESC LIMIT 1'
    );
    
    if (settings.length === 0) {
      console.log('⚠️  No settings found in database, using defaults');
      return {
        imageFolder: 'ShelterHouseMusic',
        audioFolder: 'ShelterHouseMusic',
        videoFolder: 'ShelterHouseMusic',
        merchFolder: 'ShelterHouseMusic'
      };
    }
    
    console.log('✓ Database settings found:');
    console.log('  - cloudinary_image_folder:', settings[0].cloudinary_image_folder);
    console.log('  - cloudinary_audio_folder:', settings[0].cloudinary_audio_folder);
    console.log('  - cloudinary_video_folder:', settings[0].cloudinary_video_folder);
    console.log('  - cloudinary_merch_folder:', settings[0].cloudinary_merch_folder);
    
    return {
      imageFolder: settings[0].cloudinary_image_folder || 'ShelterHouseMusic',
      audioFolder: settings[0].cloudinary_audio_folder || 'ShelterHouseMusic',
      videoFolder: settings[0].cloudinary_video_folder || 'ShelterHouseMusic',
      merchFolder: settings[0].cloudinary_merch_folder || 'ShelterHouseMusic'
    };
  } catch (error) {
    console.error('❌ Error fetching cloudinary folders from database:', error);
    return {
      imageFolder: 'ShelterHouseMusic',
      audioFolder: 'ShelterHouseMusic',
      videoFolder: 'ShelterHouseMusic',
      merchFolder: 'ShelterHouseMusic'
    };
  }
}

// Test function to get folder path based on mode and field
function getFolderPath(mode, fieldKey, folders) {
  let folderPath = "";
  
  if (mode === "live") {
    switch (true) {
      case fieldKey.includes("cover_url"): 
        folderPath = `${folders.imageFolder}/AlbumCovers`; 
        break;
      case fieldKey.includes("image_url"): 
        folderPath = `${folders.imageFolder}/ArtistImages`; 
        break;
      case fieldKey.includes("audio_url"): 
        folderPath = `${folders.audioFolder}/Tracks`; 
        break;
      case fieldKey.includes("promo_audio_url"): 
        folderPath = `${folders.audioFolder}/PromoTracks`; 
        break;
      case fieldKey.includes("video_url"): 
        folderPath = `${folders.videoFolder}/Videos`; 
        break;
      case fieldKey.includes("promo_video_url"): 
        folderPath = `${folders.videoFolder}/PromoVideos`; 
        break;
      default: 
        folderPath = `${folders.merchFolder}/Misc`;
    }
  } else {
    switch (true) {
      case fieldKey.includes("cover_url"): 
        folderPath = `${folders.imageFolder}/Demos`; 
        break;
      case fieldKey.includes("image_url"): 
        folderPath = `${folders.imageFolder}/Demos`; 
        break;
      case fieldKey.includes("audio_url"): 
        folderPath = `${folders.audioFolder}/Demos`; 
        break;
      case fieldKey.includes("promo_audio_url"): 
        folderPath = `${folders.audioFolder}/Demos`; 
        break;
      case fieldKey.includes("video_url"): 
        folderPath = `${folders.videoFolder}/Demos`; 
        break;
      case fieldKey.includes("promo_video_url"): 
        folderPath = `${folders.videoFolder}/Demos`; 
        break;
      default: 
        folderPath = `${folders.merchFolder}/DemoMisc`;
    }
  }
  
  return folderPath;
}

// Test all upload scenarios
async function testCloudinaryPaths() {
  console.log('\n===========================================');
  console.log('CLOUDINARY UPLOAD PATH TEST');
  console.log('===========================================\n');
  
  // Get folder settings from database
  const folders = await getCloudinaryFolders();
  
  console.log('\n-------------------------------------------');
  console.log('Resolved Folder Configuration:');
  console.log('-------------------------------------------');
  console.log(JSON.stringify(folders, null, 2));
  
  // Test file types
  const testFields = [
    'cover_url',
    'image_url',
    'audio_url',
    'promo_audio_url',
    'video_url',
    'promo_video_url',
    'merch_image_url'
  ];
  
  // Test both modes
  const modes = ['live', 'demo'];
  
  for (const mode of modes) {
    console.log('\n===========================================');
    console.log(`MODE: ${mode.toUpperCase()}`);
    console.log('===========================================');
    
    for (const fieldKey of testFields) {
      const folderPath = getFolderPath(mode, fieldKey, folders);
      const icon = mode === 'live' ? '🟢' : '🟡';
      console.log(`${icon} ${fieldKey.padEnd(20)} → ${folderPath}`);
    }
  }
  
  console.log('\n===========================================');
  console.log('EXPECTED PATHS FOR YOUR REQUIREMENT:');
  console.log('===========================================');
  console.log('✓ Artist Images (LIVE):   ShelterHouseMusic/ArtistImages');
  console.log('✓ Album Covers (LIVE):    ShelterHouseMusic/AlbumCovers');
  console.log('✓ Audio Tracks (LIVE):    ShelterHouseMusic/Tracks');
  console.log('✓ All Demo uploads:       ShelterHouseMusic/Demos');
  
  console.log('\n===========================================');
  console.log('VERIFICATION:');
  console.log('===========================================');
  
  const liveArtistPath = getFolderPath('live', 'image_url', folders);
  const demoArtistPath = getFolderPath('demo', 'image_url', folders);
  
  if (liveArtistPath === 'ShelterHouseMusic/ArtistImages') {
    console.log('✅ LIVE artist images path is CORRECT');
  } else {
    console.log('❌ LIVE artist images path is INCORRECT');
    console.log(`   Expected: ShelterHouseMusic/ArtistImages`);
    console.log(`   Got: ${liveArtistPath}`);
  }
  
  if (demoArtistPath === 'ShelterHouseMusic/Demos') {
    console.log('✅ DEMO artist images path is CORRECT');
  } else {
    console.log('❌ DEMO artist images path is INCORRECT');
    console.log(`   Expected: ShelterHouseMusic/Demos`);
    console.log(`   Got: ${demoArtistPath}`);
  }
  
  console.log('\n===========================================\n');
  
  // Close database connection
  await pool.end();
}

// Run the test
testCloudinaryPaths().catch(error => {
  console.error('Test failed:', error);
  process.exit(1);
});
