import pool from "../../config/db.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv';
dotenv.config();

// Configure Cloudinary (replace with your actual credentials)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "your_cloud_name",
  api_key: process.env.CLOUDINARY_API_KEY || "your_api_key",
  api_secret: process.env.CLOUDINARY_API_SECRET || "your_api_secret"
});
// import { uploadAlbumImage, uploadArtistImage, uploadTrackAudio } from '../cloudinaryAsyncUploadController.js';
// Delete a record by id


export async function deleteRecord(req, res) {
  const { table, id } = req.params;
  try {
    // Map of table to file field
    const fileFieldMap = {
      albums: 'cover_url',
      artist_images: 'image_url',
      promotional_tracks: 'promo_audio_url',
      promotional_videos: 'promo_video_url',
      tracks: 'audio_url',
      videos: 'video_url',
    };
    const fileField = fileFieldMap[table];
    let publicId;
    if (fileField) {
      // Get all fields for the record
      const [rows] = await pool.query(`SELECT * FROM \`${table}\` WHERE id = ?`, [id]);
      if (rows.length) {
        // Find any field ending with '_public_identifier'
        const identifierField = Object.keys(rows[0]).find(key => key.endsWith('_public_identifier'));
        if (identifierField && rows[0][identifierField]) {
          publicId = rows[0][identifierField];
        } else if (rows[0][fileField]) {
          // Fallback: extract from file URL if public_id column doesn't exist
          const fileUrl = rows[0][fileField];
          const urlParts = fileUrl.split('/');
          const fileNameWithExt = urlParts[urlParts.length - 1];
          const [publicIdBase] = fileNameWithExt.split('.');
          publicId = urlParts.slice(urlParts.length - 2).join('/').replace(/\.[^/.]+$/, '');
        }
        if (publicId) {
          // Determine resource_type based on fileField
          let resourceType = 'image';
          if (fileField.includes('video')) {
            resourceType = 'video';
          } else if (fileField.includes('audio')) {
            resourceType = 'raw';
          }
          // console.log('Cloudinary delete debug:', { publicId, resourceType });
          try {
            const destroyResult = await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
            // console.log('Cloudinary destroy result:', destroyResult);
          } catch (cloudErr) {
            // console.error('Cloudinary delete error:', cloudErr);
          }
        }
      }
    }
    const sql = `DELETE FROM \`${table}\` WHERE id = ?`;
    const [result] = await pool.query(sql, [id]);
    res.json({ success: true, affectedRows: result.affectedRows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Insert a new record
export async function insertRecord(req, res) {
  const { table } = req.params;
  const mode = req.headers['x-mode'] || req.headers['xmode'] || req.body.mode;

  const columns = Object.keys(req.body).map(key => `\`${key}\``);
  // Convert empty strings to null for all values
  const values = Object.values(req.body).map(v => v === "" ? null : v);
  const placeholders = columns.map(() => '?');

    // Create an object from columns and values (columns as keys, values as values)
    // Remove backticks from column names for object keys
    const columnKeys = columns.map(col => col.replace(/`/g, ""));
    const columnValueObj = {};
    columnKeys.forEach((key, idx) => {
      columnValueObj[key] = values[idx];
    });
        
    // You can now use columnValueObj as needed

    const fieldValues = { ...req.body.fields };

  // console.log(`Insert mode: ${mode}`);
  // const { fields, rows, formData } = req.body;
  // console.log('Form Data on line 28:', { body: req.body, file: req.file, files: req.files });

  // Retrieve xmode from header (case-insensitive)
 

  // Unified logic for live and demo modes
  if (req.files && Array.isArray(req.files) && (mode === "live" || mode === "demo") && columns.length > 0) {
    // Prepare an object to hold field values for SQL insert
    for (const file of req.files) {
      let folderPath = "";
      let fieldKey = file.fieldname;
      // Set folderPath based on mode and fieldname
      if (mode === "live") {
        switch (true) {
          case fieldKey.includes("cover_url"): folderPath = "SoulFeltMusic/SoulFeltMusicImages/AlbumCovers"; break;
          case fieldKey.includes("image_url"): folderPath = "SoulFeltMusic/SoulFeltMusicImages/ArtistImages"; break;
          case fieldKey.includes("audio_url"): folderPath = "SoulFeltMusic/SoulFeltMusicAudio/Tracks"; break;
          case fieldKey.includes("promo_audio_url"): folderPath = "SoulFeltMusic/SoulFeltMusicAudio/PromoTracks"; break;
          case fieldKey.includes("video_url"): folderPath = "SoulFeltMusic/SoulFeltMusicVideos/Videos"; break;
          case fieldKey.includes("promo_video_url"): folderPath = "SoulFeltMusic/SoulFeltMusicVideos/PromoVideos"; break;
          default: folderPath = "SoulFeltMusic/SoulFeltMusicMisc";
        }
      } else {
        switch (true) {
          case fieldKey.includes("cover_url"): folderPath = "SoulFeltMusic/SoulFeltMusicImages/DemoImages/AlbumCoversDemos"; break;
          case fieldKey.includes("image_url"): folderPath = "SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo"; break;
          case fieldKey.includes("audio_url"): folderPath = "SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack"; break;
          case fieldKey.includes("promo_audio_url"): folderPath = "SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoPromoTrack"; break;
          case fieldKey.includes("video_url"): folderPath = "SoulFeltMusic/SoulFeltMusicVideos/DemoVideosWebDev/DemoVideos"; break;
          case fieldKey.includes("promo_video_url"): folderPath = "SoulFeltMusic/SoulFeltMusicVideos/DemoVideosWebDev/DemoPromoVideos"; break;
          default: folderPath = "SoulFeltMusic/SoulFeltMusicMisc";
        }
      }
      // Upload to Cloudinary
      let result;
      // Prepare metadata if available
      const metaDataFields = ['title', 'tags', 'image_description', 'video_description', 'audio_description','genre',];
      let metadata = {};
      for (const key of metaDataFields) {
        if (columnValueObj[key]) {
          metadata[key] = columnValueObj[key];
        }
      }
      let uploadOptions = { folder: folderPath };
      if (Object.keys(metadata).length > 0) {
        uploadOptions.context = metadata;
      }
        // Set resource_type based on fieldKey
          if (fieldKey.includes('audio_url') || fieldKey.includes('promo_audio_url')) {
            uploadOptions.resource_type = 'video';
          } else if (fieldKey.includes('video_url') || fieldKey.includes('promo_video_url')) {
            uploadOptions.resource_type = 'video';
          }
      try {
        if (file.path) {
          result = await cloudinary.uploader.upload(file.path, uploadOptions);
        } else if (file.buffer) {
          result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              uploadOptions,
              (error, result) => error ? reject(error) : resolve(result)
            );
            stream.end(file.buffer);
          });
        } else {
          throw new Error("File object missing path and buffer");
        }
      } catch (uploadErr) {
        console.error('Cloudinary upload error:', uploadErr);
        continue; // Skip this file and continue with others
      }

      // Use Cloudinary URL and public_id for the matching field
      if (result) {
        if ('duration' in result) columnValueObj['duration'] = result.duration;
        if ('format' in result) columnValueObj['format'] = result.format;
        if ('bytes' in result) columnValueObj['file_size'] = result.bytes;
        columnValueObj[fieldKey] = result.secure_url;
        columnValueObj[`${fieldKey}_public_identifier`] = result.public_id;
      }

    }
    // After all files processed, filter out non-existent columns before insert
    const [tableFields] = await pool.query(`SHOW COLUMNS FROM \`${table}\``);
    const validFields = tableFields.map(f => f.Field);
    const filteredObj = {};
    Object.keys(columnValueObj).forEach(key => {
      if (validFields.includes(key)) {
        let value = columnValueObj[key];
        
        // Convert boolean-like strings to actual boolean values
        if (typeof value === 'string') {
          const lowerValue = value.toLowerCase();
          if (lowerValue === 'yes' || lowerValue === 'true') {
            value = true;
          } else if (lowerValue === 'no' || lowerValue === 'false') {
            value = false;
          }
        }
        
        filteredObj[key] = value;
      }
    });
    const c = Object.keys(filteredObj);
    const val = Object.values(filteredObj);
    const col = c.map(f => `\`${f}\``).join(", ");
    const placeholders = c.map(() => "?").join(", ");
    const values = val;
    const insertSql = `INSERT INTO \`${table}\` (${col}) VALUES (${placeholders})`;
    await pool.query(insertSql, values);
    res.json({ success: true, inserted: filteredObj });
    return;
  }
  else {
    // Build columns and values from fieldValues
    //   const columns = Object.keys(req.body).map(key => `\`${key}\``);
    //   const values = Object.values(req.body);
    // const placeholders = columns.map(() => '?');

    // if (columns.length > 0) {
    // //   console.log("Prepared to insert record with fields:", fieldValues);
    //   console.log("Columns:", columns);
    //   console.log("Values:", values);
    //   console.log("Placeholders:", placeholders);
    //   // Fix: log req.body as JSON string if it's an object
     
    //   // Uncomment below to actually perform the insert
    //   const insertSql = `INSERT INTO \`${table}\` (${columns.join(", ")}) VALUES (${placeholders.join(", ")})`;
    //   await pool.query(insertSql, values);
    //   res.json({ success: true, inserted: fieldValues });
    // } else {
    //   console.log("No valid fields to insert.");
    //   res.status(400).json({ success: false, message: "No valid fields to insert." });
    // }
    // console.log("No files uploaded or multer not configured.");
  }
  // upload to database

   if (columns.length > 0) {
      const insertSql = `INSERT INTO \`${table}\` (${columns.join(", ")}) VALUES (${placeholders.join(", ")})`;
      await pool.query(insertSql, values);
      res.json({ success: true, inserted: columnValueObj });
    } else {
      // console.log("No valid fields to insert.");
      res.status(400).json({ success: false, message: "No valid fields to insert." });
    }
    return;

} // <-- Add this closing brace to properly end insertRecord function

// Admin controller: retrieve tables, fields, records, and update records

export async function getTables(req, res) {
  try {
    const [tables] = await pool.query("SHOW TABLES");
    res.json(tables);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
export async function getFields(req, res) {
  const { table } = req.params;
  try {
    const [fields] = await pool.query(`SHOW COLUMNS FROM \`${table}\``);
    res.json(fields);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
export async function getRecords(req, res) {
  const { table } = req.params;
  try {
    const [records] = await pool.query(`SELECT * FROM \`${table}\``);
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


export async function updateRecord(req, res) {
  const { table, id } = req.params;
  const mode = req.headers['x-mode'] || req.headers['xmode'] || req.body.mode;
  try {
    let updates = {};
    if (req.is('multipart/form-data')) {
      updates = { ...req.body };
      delete updates.id;
    } else {
      updates = { ...req.body };
      delete updates.id;
    }
    // Handle file upload if file(s) present
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      // Map of table to file field
      const fileFieldMap = {
        albums: 'cover_url',
        artist_images: 'image_url',
        promotional_tracks: 'promo_audio_url',
        promotional_videos: 'promo_video_url',
        tracks: 'audio_url',
        videos: 'video_url',
      };
      for (const file of req.files) {
        let folderPath = "";
        let fieldKey = file.fieldname;
        // Set folderPath based on mode and fieldname
        if (mode === "live") {
          switch (true) {
            case fieldKey.includes("cover_url"):
              folderPath = "SoulFeltMusic/SoulFeltMusicImages/AlbumCovers";
              break;
            case fieldKey.includes("image_url"):
              folderPath = "SoulFeltMusic/SoulFeltMusicImages/ArtistImages";
              break;
            case fieldKey.includes("audio_url"):
              folderPath = "SoulFeltMusic/SoulFeltMusicAudio/Tracks";
              break;
            case fieldKey.includes("promo_audio_url"):
              folderPath = "SoulFeltMusic/SoulFeltMusicAudio/PromoTracks";
              break;
            case fieldKey.includes("video_url"):
              folderPath = "SoulFeltMusic/SoulFeltMusicVideos/Videos";
              break;
            case fieldKey.includes("promo_video_url"):
              folderPath = "SoulFeltMusic/SoulFeltMusicVideos/PromoVideos";
              break;
            default:
              folderPath = "SoulFeltMusic/SoulFeltMusicMisc";
          }
        } else {
          switch (true) {
            case fieldKey.includes("cover_url"):
              folderPath = "SoulFeltMusic/SoulFeltMusicImages/DemoImages/AlbumCoversDemos";
              break;
            case fieldKey.includes("image_url"):
              folderPath = "SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo";
              break;
            case fieldKey.includes("audio_url"):
              folderPath = "SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack";
              break;
            case fieldKey.includes("promo_audio_url"):
              folderPath = "SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoPromoTrack";
              break;
            case fieldKey.includes("video_url"):
              folderPath = "SoulFeltMusic/SoulFeltMusicVideos/DemoVideosWebDev/DemoVideos";
              break;
            case fieldKey.includes("promo_video_url"):
              folderPath = "SoulFeltMusic/SoulFeltMusicVideos/DemoVideosWebDev/DemoPromoVideos";
              break;
            default:
              folderPath = "SoulFeltMusic/SoulFeltMusicMisc";
          }
        }
        // If this field is a managed Cloudinary field, delete the old file first
        // Get the old public_id from the DB if the column exists
        const publicIdField = `${fieldKey}_public_identifier`;
        let oldPublicId = null;
        try {
          const [rows] = await pool.query(`SELECT \`${publicIdField}\` FROM \`${table}\` WHERE id = ?`, [id]);
          if (rows.length && rows[0][publicIdField]) {
            oldPublicId = rows[0][publicIdField];
          }
        } catch (e) {
          // Column may not exist, fallback to extracting from URL
        }
        if (!oldPublicId) {
          // Fallback: extract from file URL if public_id column doesn't exist
          const [rows] = await pool.query(`SELECT \`${fieldKey}\` FROM \`${table}\` WHERE id = ?`, [id]);
          if (rows.length && rows[0][fieldKey]) {
            const fileUrl = rows[0][fieldKey];
            const urlParts = fileUrl.split('/');
            const fileNameWithExt = urlParts[urlParts.length - 1];
            const [publicIdBase] = fileNameWithExt.split('.');
            oldPublicId = urlParts.slice(urlParts.length - 2).join('/').replace(/\.[^/.]+$/, '');
          }
        }
        if (oldPublicId) {
          // Determine resource_type based on field
          let resourceType = 'image';
          if (fieldKey.includes('audio_url') || fieldKey.includes('promo_audio_url')) {
            resourceType = 'video';
          } else if (fieldKey.includes('video_url') || fieldKey.includes('promo_video_url')) {
            resourceType = 'video';
          }
          // console.log(`Deleting old file with public_id: ${oldPublicId} and resource_type: ${resourceType}`);
          try {
            await cloudinary.uploader.destroy(oldPublicId, { resource_type: resourceType });
          } catch (cloudErr) {
            console.error('Cloudinary update delete error:', cloudErr);
          }
        }
        // Log audio_url value and folderPath just before Cloudinary upload
        if (fieldKey === 'audio_url') {
          // console.log('audio_url about to be uploaded:', file.path || file.buffer);
        }
        // console.log('Cloudinary upload folderPath:', folderPath);
        // Upload to Cloudinary
        let result;
        try {
          // Set resource_type: 'raw' for audio files
          let uploadOptions = { folder: folderPath };
          if (fieldKey.includes('audio_url') || fieldKey.includes('promo_audio_url')) {
            uploadOptions.resource_type = 'video';
          }
          // Assign file extension to format
          const extMatch = file.originalname.match(/\.([a-zA-Z0-9]+)$/);
          if (extMatch) {
            uploadOptions.format = extMatch[1].toLowerCase();
          }
          // Add metadata fields if present
          const metaDataFields = ['title', 'tags', 'image_description', 'video_description', 'audio_description', 'genre'];
          let metadata = {};
          for (const key of metaDataFields) {
            if (updates[key]) {
              metadata[key] = updates[key];
            }
          }
          if (Object.keys(metadata).length > 0) {
            uploadOptions.context = metadata;
          }
          if (file.path) {
            result = await cloudinary.uploader.upload(file.path, uploadOptions);
          } else if (file.buffer) {
            result = await new Promise((resolve, reject) => {
              const stream = cloudinary.uploader.upload_stream(
                uploadOptions,
                (error, result) => error ? reject(error) : resolve(result)
              );
              stream.end(file.buffer);
            });
          } else {
            throw new Error("File object missing path and buffer");
          }
        } catch (uploadErr) {
          console.error('Cloudinary upload error:', uploadErr);
          continue; // Skip this file and continue with others
        }
        // Use Cloudinary URL for the matching field
        //Reassign to updates for SQL update
        updates[fieldKey] = await result.secure_url;
        updates[`${fieldKey}_public_identifier`] = await result.public_id;
      }
    }
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ success: false, message: "No fields to update." });
    }
    // Update Cloudinary metadata even if no file is present
    // Only run if audio_url, image_url, video_url, promo_audio_url, promo_video_url exist in updates
    const metaDataFields = ['title', 'tags', 'image_description', 'video_description', 'audio_description', 'genre'];
    let metadata = {};
    for (const key of metaDataFields) {
      if (updates[key]) {
        metadata[key] = updates[key];
      }
    }
    
    // Find the public identifier for the resource
    const cloudinaryFieldKeys = Object.keys(updates).filter(k => k.endsWith('_public_identifier'));
    for (const publicIdKey of cloudinaryFieldKeys) {
      const publicId = updates[publicIdKey];
      if (publicId && Object.keys(metadata).length > 0) {
        try {
          // Determine resource_type based on the field name
          let resourceType = 'image';
          if (publicIdKey.includes('audio')) {
            resourceType = 'video'; // Cloudinary treats audio as video resource type
          } else if (publicIdKey.includes('video')) {
            resourceType = 'video';
          }
          
          await cloudinary.uploader.explicit(publicId, {
            type: 'upload',
            context: metadata,
            resource_type: resourceType
          });
        } catch (metaErr) {
          // Only log non-404 errors (404 means asset doesn't exist in Cloudinary)
          if (metaErr.http_code !== 404) {
            console.error('Cloudinary metadata update error:', metaErr);
          } else {
            console.warn(`Skipping metadata update - Cloudinary asset not found: ${publicId}`);
          }
        }
      }
    }
    //  // console.log("Updates to apply:", updates);
    // Filter out fields with empty, null, or undefined values
    // For tracks table, treat 'duration' as integer field
    function filterEmptyFields(obj) {
      return Object.fromEntries(
        Object.entries(obj).filter(([key, value]) => {
          // Convert string 'null' or '' to actual null for integer fields
          if (table === 'tracks' && key === 'duration') {
            if (value === 'null' || value === '') return false;
            if (typeof value === 'string' && !isNaN(value)) return true;
            if (typeof value === 'number') return true;
            return false;
          }
          return value !== undefined && value !== null && value !== '' && value !== 'null';
        })
      );
    }

    // Use idField for the id param, and filter updates for SQL
    const idField = id; // Always use the id from params
    const filteredUpdates = filterEmptyFields(
      Object.fromEntries(
        Object.entries(updates).filter(
          ([field]) => field !== 'id' && field !== 'created_at' && field !== 'updated_at'
        )
      )
    );
    const filteredFields = Object.keys(filteredUpdates);
    const setClause = filteredFields
      .map((field) => `\`${field}\` = ?`)
      .join(", ");
    const values = filteredFields.map((field) => filteredUpdates[field]);
    values.push(idField); // id for WHERE clause
    
    const sql = `UPDATE \`${table}\` SET ${setClause} WHERE id = ?`;
    const [result] = await pool.query(sql, values);
    res.json({ success: true, affectedRows: result.affectedRows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



export async function getTablesWithFieldsAndRecords(req, res) {
  try {
    // Get all table names
    const [tables] = await pool.query("SHOW TABLES");
    const tableNames = tables.map((obj) => Object.values(obj)[0]);
    const result = {};
    for (const table of tableNames) {
      // Get fields
      const [fields] = await pool.query(`SHOW COLUMNS FROM \`${table}\``);
      // Get records
      const [records] = await pool.query(`SELECT * FROM \`${table}\``);
      result[table] = {
        fields: fields.map((f) => f.Field),
        records: records,
      };
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
