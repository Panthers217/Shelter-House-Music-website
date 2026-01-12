import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function getStorage(folder, allowed_formats, publicIdField) {
  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder,
      resource_type: 'auto',
      allowed_formats,
      public_id: (req, file) => {
        const fieldValue = req.body[publicIdField] || 'unknown';
        return `${fieldValue}_${Date.now()}`;
      },
    },
  });
}

const uploadArtistImage = multer({ storage: getStorage('SoulFeltMusicImages/ArtistImages', ['jpg', 'jpeg', 'png'], 'artistName') }).single('image');
const uploadAlbumImage = multer({ storage: getStorage('SoulFeltMusicImages/AlbumCovers', ['jpg', 'jpeg', 'png'], 'albumTitle') }).single('cover');
const uploadTrackAudio = multer({ storage: getStorage('SoulFeltMusicAudio/Tracks', ['mp3', 'wav', 'flac', 'aac', 'ogg'], 'trackTitle') }).single('audio');
const uploadPromoAudio = multer({ storage: getStorage('SoulFeltMusicAudio/PromoTracks', ['mp3', 'wav', 'flac', 'aac', 'ogg'], 'promoTitle') }).single('promo');


export async function uploadAllMediaAsync(req, res) {
  try {
    const results = {};

    // Helper to promisify multer single upload
    function multerSinglePromise(uploader) {
      return new Promise((resolve, reject) => {
        uploader(req, res, function (err) {
          if (err) return reject(err);
          resolve(req.file);
        });
      });
    }

    // Artist Image
    if (req.body.image_url === 'image_url') {
      const file = await multerSinglePromise(uploadArtistImage);
      results.artistImage = {
        imageUrl: file.path,
        public_id: file.filename,
        
      };
    }

    // Album Image
    if (req.body === 'cover_url') {
      const file = await multerSinglePromise(uploadAlbumImage);
      results.albumImage = {
        imageUrl: file.path,
        public_id: file.filename,
        albumTitle: req.body.albumTitle
      };
    }

    // Track Audio
    if (req.body === 'audio_url') {
      const file = await multerSinglePromise(uploadTrackAudio);
      results.trackAudio = {
        audioUrl: file.path,
        public_id: file.filename,
        trackTitle: req.body.trackTitle
      };
    }

    // Promo Audio
    if (req.body.promoTitle && req.file && req.file.fieldname === 'promo') {
      const file = await multerSinglePromise(uploadPromoAudio);
      results.promoAudio = {
        promoUrl: file.path,
        public_id: file.filename,
        promoTitle: req.body.promoTitle
      };
    }

    if (Object.keys(results).length === 0) {
      return res.status(400).json({ success: false, error: 'No valid upload fields found.' });
    }
    res.json({ success: true, results });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
