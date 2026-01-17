const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const data = fs.readFileSync(
  path.join(__dirname, "topTracks.json"),
  "utf8"
);
const artistsDataFromJson = JSON.parse(data);
const data2 = fs.readFileSync(
  path.join(
    __dirname,
    "../frontend/src/assets/artist_mockup_pics /artist_card_pic/Link-1.png"
  ),
  "utf8"
);
// console.log(artists);

const artists = [...artistsDataFromJson];
// Example: Array of image file paths
const imagePaths = [...artists];


async function uploadImages({
  array = artists,
  getFileName,
  getSafeName,
  getPublicId,
  getImgPath,
  cloudinaryFolder = 'ShelterHouseMusicImages/DemoImages/TopTrackCardImage'
} = {}) {
  const uploadPromises = array.map(async (item, idx, arr) => {
    // Dynamic value resolution
    const fileName = getFileName ? getFileName(item, idx, arr) : path.basename(item.img);
    const safeName = getSafeName
      ? getSafeName(item, idx, arr)
      : (item.name ? item.name.replace(/[^a-zA-Z0-9-_]/g, '_') : `artist_${idx}`);
  // Remove file extension from fileName for publicId
  const fileNameNoExt = fileName.replace(/\.[^/.]+$/, '');
  const publicId = getPublicId ? getPublicId(item, idx, arr, fileNameNoExt, safeName) : `${safeName}_${fileNameNoExt}`;
    let imgPath;
    if (getImgPath) {
      imgPath = getImgPath(item, idx, arr, fileName, safeName, publicId);
    } else {
      imgPath = path.join(__dirname, '../frontend', item.img).replace('%20', ' ');
    }
    try {
      const result = await cloudinary.uploader.upload(imgPath, {
        folder: cloudinaryFolder,
        use_filename: true,
        unique_filename: true,
        overwrite: true,
        public_id: publicId
      });
      console.log(`Uploaded ${imgPath}: ${result.secure_url}`);
    } catch (err) {
      console.error(`Error uploading ${imgPath}:`, err.message);
    }
  });
  await Promise.all(uploadPromises);
}

// Example usage: default behavior
const singleArtist = [{
  name: "My Artist_Trackheader_pic",
  img: "/src/assets/artist_mockup_pics%20/artist_top_track_header_pic/Link.png"
}];

uploadImages({ array: imagePaths, cloudinaryFolder: 'ShelterHouseMusicImages/DemoImages/TopTracks' });
