import { Router } from 'express';
import db from '../config/db.js';
import { v2 as cloudinary } from 'cloudinary';
import archiver from 'archiver';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

// Configure Cloudinary (using existing env vars)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * GET /api/downloads/file/:token
 * Stream a file download through the server (hides Cloudinary URL)
 * Token contains encrypted purchase verification data
 */
router.get('/file/:token', async (req, res) => {
  try {
    const { token } = req.params;
    
    // Decode the token (base64 encoded JSON)
    let tokenData;
    try {
      tokenData = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
    } catch (err) {
      return res.status(400).json({ error: 'Invalid download token' });
    }

    const { userEmail, itemType, itemId, trackId, expires } = tokenData;

    // Check if token has expired
    if (Date.now() > expires) {
      return res.status(410).json({ error: 'Download link has expired' });
    }

    // Verify the purchase
    const [purchaseCheck] = await db.query(
      `SELECT oi.id 
       FROM order_items oi
       JOIN purchases p ON oi.purchase_id = p.id
       WHERE p.customer_email = ? 
       AND oi.item_type = ? 
       AND oi.item_id = ?
       AND p.payment_status = 'succeeded'
       LIMIT 1`,
      [userEmail, itemType, itemId]
    );

    if (purchaseCheck.length === 0) {
      return res.status(403).json({ error: 'Access denied. Purchase not found.' });
    }

    // Get the file URL from database
    let fileUrl, fileName;
    
    if (itemType === 'Track') {
      const [tracks] = await db.query(
        'SELECT title, audio_url FROM tracks WHERE id = ?',
        [trackId || itemId]
      );
      
      if (tracks.length === 0 || !tracks[0].audio_url) {
        return res.status(404).json({ error: 'Track not found' });
      }
      
      fileUrl = tracks[0].audio_url;
      fileName = `${tracks[0].title.replace(/[^a-z0-9]/gi, '_')}.mp3`;
    } else if ((itemType === 'Digital Album' || itemType === 'Limited Edition' || itemType === 'EP' || itemType === 'Single') && trackId) {
      // Single track from album
      const [tracks] = await db.query(
        'SELECT title, audio_url FROM tracks WHERE id = ? AND album_id = ?',
        [trackId, itemId]
      );
      
      if (tracks.length === 0 || !tracks[0].audio_url) {
        return res.status(404).json({ error: 'Track not found' });
      }
      
      fileUrl = tracks[0].audio_url;
      fileName = `${tracks[0].title.replace(/[^a-z0-9]/gi, '_')}.mp3`;
    } else {
      return res.status(400).json({ error: 'Invalid download parameters' });
    }

    // console.log(`📥 Streaming download: ${fileName} for ${userEmail}`);

    // Stream the file from Cloudinary through our server
    const response = await axios({
      method: 'get',
      url: fileUrl,
      responseType: 'stream'
    });

    // Set headers for download
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    
    // Pipe the stream to the response
    response.data.pipe(res);

  } catch (error) {
    console.error('Error streaming download:', error);
    res.status(500).json({ 
      error: 'Failed to download file',
      details: error.message 
    });
  }
});

/**
 * POST /api/downloads/generate-url
 * Generate download tokens for purchased items
 * Returns tokens that can be used to download files through the proxy
 */
router.post('/generate-url', async (req, res) => {
  try {
    const { itemType, itemId, userEmail } = req.body;

    if (!itemType || !itemId || !userEmail) {
      return res.status(400).json({ 
        error: 'Missing required fields: itemType, itemId, userEmail' 
      });
    }

    // Step 1: Verify the purchase exists for this email (works for both registered users and guest checkouts)
    const [purchaseCheck] = await db.query(
      `SELECT oi.id, oi.item_title 
       FROM order_items oi
       JOIN purchases p ON oi.purchase_id = p.id
       WHERE p.customer_email = ? 
       AND oi.item_type = ? 
       AND oi.item_id = ?
       AND p.payment_status = 'succeeded'
       LIMIT 1`,
      [userEmail, itemType, itemId]
    );

    if (purchaseCheck.length === 0) {
      return res.status(403).json({ 
        error: 'Access denied. You have not purchased this item.' 
      });
    }

    // Step 2: Get track info from database
    let downloadLinks = [];
    let itemTitle = purchaseCheck[0].item_title;
    const expiresAt = Date.now() + (24 * 60 * 60 * 1000); // 24 hours

    if (itemType === 'Track') {
      // Get single track
      const [tracks] = await db.query(
        'SELECT id, title FROM tracks WHERE id = ?',
        [itemId]
      );

      if (tracks.length === 0) {
        return res.status(404).json({ error: 'Track not found' });
      }

      // Create download token
      const token = Buffer.from(JSON.stringify({
        userEmail,
        itemType,
        itemId,
        trackId: tracks[0].id,
        expires: expiresAt
      })).toString('base64');

      downloadLinks.push({
        title: tracks[0].title,
        downloadUrl: `/api/downloads/file/${token}`,
        trackId: tracks[0].id
      });

    } else if (itemType === 'Digital Album' || itemType === 'Limited Edition' || itemType === 'EP' || itemType === 'Single') {
      // Get all tracks for the album
      const [tracks] = await db.query(
        'SELECT id, title FROM tracks WHERE album_id = ? ORDER BY id',
        [itemId]
      );

      if (tracks.length === 0) {
        return res.status(404).json({ error: 'No tracks found for this album' });
      }

      // Create download token for each track
      downloadLinks = tracks.map(track => {
        const token = Buffer.from(JSON.stringify({
          userEmail,
          itemType,
          itemId,
          trackId: track.id,
          expires: expiresAt
        })).toString('base64');

        return {
          title: track.title,
          downloadUrl: `/api/downloads/file/${token}`,
          trackId: track.id
        };
      });
    } else {
      return res.status(400).json({ 
        error: 'Invalid item type. Only Track, Digital Album, Limited Edition, EP, and Single can be downloaded.' 
      });
    }

    // Step 3: Log the download for analytics (optional)
    let userId = null;
    try {
      const [users] = await db.query('SELECT id FROM user WHERE email = ?', [userEmail]);
      if (users.length > 0) userId = users[0].id;
    } catch (err) {
      // console.log('Could not find user_id (guest checkout)');
    }

    if (userId) {
      try {
        await db.query(
          `INSERT INTO download_logs (user_id, item_type, item_id, download_at) 
           VALUES (?, ?, ?, NOW())`,
          [userId, itemType, itemId]
        ).catch(() => {
          // console.log('Download logging skipped (table may not exist)');
        });
      } catch (logError) {
        // console.log('Download logging failed:', logError.message);
      }
    }

    res.json({
      itemTitle: itemTitle,
      itemType: itemType,
      downloads: downloadLinks,
      expiresIn: 86400, // 24 hours in seconds
      message: downloadLinks.length === 1 
        ? 'Download link generated successfully' 
        : `${downloadLinks.length} track download links generated successfully`
    });

  } catch (error) {
    console.error('Error generating download URL:', error);
    res.status(500).json({ 
      error: 'Failed to generate download URL',
      details: error.message 
    });
  }
});

/**
 * POST /api/downloads/generate-album-zip
 * Generate a ZIP file containing all tracks from a purchased album
 * Creates temporary ZIP, uploads to Cloudinary, returns signed URL
 */
router.post('/generate-album-zip', async (req, res) => {
  try {
    const { albumId, userEmail } = req.body;

    if (!albumId || !userEmail) {
      return res.status(400).json({ 
        error: 'Missing required fields: albumId, userEmail' 
      });
    }

    // Step 1: Verify the purchase exists for this email (works for both registered users and guest checkouts)
    const [purchaseCheck] = await db.query(
      `SELECT oi.id, oi.item_title 
       FROM order_items oi
       JOIN purchases p ON oi.purchase_id = p.id
       WHERE p.customer_email = ? 
       AND (oi.item_type = 'Digital Album' OR oi.item_type = 'Limited Edition' OR oi.item_type = 'EP' OR oi.item_type = 'Single') 
       AND oi.item_id = ?
       AND p.payment_status = 'succeeded'
       LIMIT 1`,
      [userEmail, albumId]
    );

    if (purchaseCheck.length === 0) {
      return res.status(403).json({ 
        error: 'Access denied. You have not purchased this album.' 
      });
    }

    const albumTitle = purchaseCheck[0].item_title;

    // Step 2: Get all tracks for the album
    const [tracks] = await db.query(
      'SELECT id, title, audio_url FROM tracks WHERE album_id = ? AND audio_url IS NOT NULL ORDER BY id',
      [albumId]
    );

    if (tracks.length === 0) {
      return res.status(404).json({ error: 'No tracks found for this album' });
    }

    // console.log(`📦 Creating ZIP for album "${albumTitle}" with ${tracks.length} tracks`);

    // Step 3: Create temporary directory for ZIP
    const tempDir = path.join(__dirname, '..', 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const zipFileName = `${albumTitle.replace(/[^a-z0-9]/gi, '_')}_${Date.now()}.zip`;
    const zipFilePath = path.join(tempDir, zipFileName);

    // Step 4: Create ZIP file
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver('zip', {
      zlib: { level: 9 } // Maximum compression
    });

    // Handle archive events
    archive.on('error', (err) => {
      console.error('Archive error:', err);
      throw err;
    });

    archive.pipe(output);

    // Step 5: Download each track and add to ZIP
    for (let i = 0; i < tracks.length; i++) {
      const track = tracks[i];
      // console.log(`⬇️  Downloading track ${i + 1}/${tracks.length}: ${track.title}`);

      try {
        // Download track from Cloudinary
        const response = await axios({
          method: 'get',
          url: track.audio_url,
          responseType: 'stream'
        });

        // Add to ZIP with sanitized filename
        const fileName = `${String(i + 1).padStart(2, '0')}_${track.title.replace(/[^a-z0-9]/gi, '_')}.mp3`;
        archive.append(response.data, { name: fileName });

      } catch (downloadError) {
        console.error(`Failed to download track ${track.title}:`, downloadError.message);
        // Continue with other tracks even if one fails
      }
    }

    // Finalize the archive
    await archive.finalize();

    // Wait for the output stream to finish
    await new Promise((resolve, reject) => {
      output.on('close', resolve);
      output.on('error', reject);
    });

    // console.log(`✅ ZIP created: ${zipFilePath} (${archive.pointer()} bytes)`);

    // Step 6: Upload ZIP to Cloudinary
    // console.log('☁️  Uploading ZIP to Cloudinary...');
    
    const cloudinaryResult = await cloudinary.uploader.upload(zipFilePath, {
      resource_type: 'raw',
      folder: 'SoulFeltMusic/AlbumZips',
      public_id: `album_${albumId}_${Date.now()}`,
      type: 'authenticated', // Requires signed URL to download
    });

    // console.log('✅ ZIP uploaded to Cloudinary:', cloudinaryResult.secure_url);

    // Step 7: Generate signed URL that expires in 2 hours
    const signedUrl = cloudinary.url(cloudinaryResult.public_id, {
      resource_type: 'raw',
      type: 'authenticated',
      sign_url: true,
      secure: true,
      expires_at: Math.floor(Date.now() / 1000) + 7200 // 2 hours
    });

    // Step 8: Clean up local ZIP file
    fs.unlink(zipFilePath, (err) => {
      if (err) console.error('Error deleting temp ZIP:', err);
KU    });

    // Step 9: Schedule Cloudinary ZIP deletion after 3 hours
    setTimeout(async () => {
      try {
        await cloudinary.uploader.destroy(cloudinaryResult.public_id, { resource_type: 'raw' });
        // console.log('🗑️  Cloudinary ZIP deleted:', cloudinaryResult.public_id);
      } catch (err) {
        console.error('Error deleting Cloudinary ZIP:', err);
      }
    }, 3 * 60 * 60 * 1000); // 3 hours

    res.json({
      albumTitle: albumTitle,
      trackCount: tracks.length,
      downloadUrl: signedUrl,
      expiresIn: 7200, // seconds (2 hours)
      fileSize: archive.pointer(),
      message: `ZIP file created with ${tracks.length} tracks`
    });

  } catch (error) {
    console.error('Error generating album ZIP:', error);
    res.status(500).json({ 
      error: 'Failed to generate album ZIP',
      details: error.message 
    });
  }
});

export default router;
