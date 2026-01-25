// Event controller: handles community events-related SQL queries and logic
import pool from '../config/db.js';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Fetch cloudinary folder settings from database
async function getCloudinaryFolders() {
  try {
    const [settings] = await pool.query(
      'SELECT cloudinary_image_folder FROM website_settings ORDER BY id DESC LIMIT 1'
    );
    
    if (settings.length === 0) {
      // Return defaults if no settings exist
      return {
        imageFolder: 'ShelterHouseMusic'
      };
    }
    
    return {
      imageFolder: settings[0].cloudinary_image_folder || 'ShelterHouseMusic'
    };
  } catch (error) {
    console.error('Error fetching cloudinary folders from database:', error);
    // Return defaults on error
    return {
      imageFolder: 'ShelterHouseMusic'
    };
  }
}

// Get all active events (public endpoint)
export async function getAllEvents(req, res) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM community_events WHERE is_active = 1 ORDER BY event_date DESC'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get all events including inactive ones (admin only)
export async function getAllEventsAdmin(req, res) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM community_events ORDER BY event_date DESC'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get single event by ID
export async function getEventById(req, res) {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      'SELECT * FROM community_events WHERE id = ?',
      [id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Create new event (admin only)
export async function createEvent(req, res) {
  try {
    let { title, event_date, description, link, is_active, image_url } = req.body;
    
    // Convert is_active to integer (0 or 1)
    if (is_active !== undefined) {
      is_active = (is_active === 'true' || is_active === true || is_active === 1 || is_active === '1') ? 1 : 0;
    }
    
    // Validation
    if (!title || !event_date || !description) {
      return res.status(400).json({ 
        error: 'Title, event_date, and description are required' 
      });
    }
    
    // Handle file upload if present
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      const file = req.files.find(f => f.fieldname === 'event_image');
      
      if (file) {
        // DEMO BRANCH: Force demo mode for all uploads
        const mode = 'demo'; // Original: req.headers['x-mode'] || req.headers['xmode'] || 'demo';
        
        // Get cloudinary folder paths from database
        const folders = await getCloudinaryFolders();
        
        // Determine folder path based on mode
        const folderPath = mode === 'live' 
          ? `${folders.imageFolder || 'ShelterHouseMusic'}/CommunityEvents/Images` 
          : `${folders.imageFolder || 'ShelterHouseMusic'}/Demos/CommunityEvents/Images`;
        
        try {
          let result;
          const uploadOptions = { 
            folder: folderPath,
            context: {
              title: title,
              event_date: event_date
            }
          };
          
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
          }
          
          if (result) {
            image_url = result.secure_url;
            // Store public_id for future updates/deletes
            req.body.image_public_identifier = result.public_id;
          }
        } catch (uploadErr) {
          console.error('Cloudinary upload error:', uploadErr);
          return res.status(500).json({ error: 'Failed to upload image' });
        }
      }
    }
    
    const [result] = await pool.query(
      'INSERT INTO community_events (title, event_date, description, image_url, image_public_identifier, link, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        title, 
        event_date, 
        description, 
        image_url || null, 
        req.body.image_public_identifier || null,
        link || null, 
        is_active !== undefined ? is_active : 1
      ]
    );
    
    res.status(201).json({ 
      message: 'Event created successfully', 
      id: result.insertId 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Update event (admin only)
export async function updateEvent(req, res) {
  try {
    const { id } = req.params;
    let { title, event_date, description, link, is_active, image_url } = req.body;
    
    // Convert is_active to integer (0 or 1)
    if (is_active !== undefined) {
      is_active = (is_active === 'true' || is_active === true || is_active === 1 || is_active === '1') ? 1 : 0;
    }
    
    // Check if event exists
    const [existing] = await pool.query(
      'SELECT * FROM community_events WHERE id = ?',
      [id]
    );
    
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    // Handle file upload if present
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      const file = req.files.find(f => f.fieldname === 'event_image');
      
      if (file) {
        // DEMO BRANCH: Force demo mode for all uploads
        const mode = 'demo'; // Original: req.headers['x-mode'] || req.headers['xmode'] || 'demo';
        
        // Delete old image from Cloudinary if exists
        const oldPublicId = existing[0].image_public_identifier;
        if (oldPublicId) {
          try {
            await cloudinary.uploader.destroy(oldPublicId, { resource_type: 'image' });
            // console.log(`Deleted old event image: ${oldPublicId}`);
          } catch (cloudErr) {
            console.error('Cloudinary delete error:', cloudErr);
          }
        }
        
        // Get cloudinary folder paths from database
        const folders = await getCloudinaryFolders();
        
        // Upload new image
        const folderPath = mode === 'live' 
          ? `${folders.imageFolder || 'ShelterHouseMusic'}/CommunityEvents/Images` 
          : `${folders.imageFolder || 'ShelterHouseMusic'}/CommunityEvents/DemoImages`;
        
        try {
          let result;
          const uploadOptions = { 
            folder: folderPath,
            context: {
              title: title || existing[0].title,
              event_date: event_date || existing[0].event_date
            }
          };
          
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
          }
          
          if (result) {
            image_url = result.secure_url;
            req.body.image_public_identifier = result.public_id;
          }
        } catch (uploadErr) {
          console.error('Cloudinary upload error:', uploadErr);
          return res.status(500).json({ error: 'Failed to upload image' });
        }
      }
    }
    
    // Build update query dynamically
    const updates = [];
    const values = [];
    
    if (title !== undefined) {
      updates.push('title = ?');
      values.push(title);
    }
    if (event_date !== undefined) {
      updates.push('event_date = ?');
      values.push(event_date);
    }
    if (description !== undefined) {
      updates.push('description = ?');
      values.push(description);
    }
    if (image_url !== undefined) {
      updates.push('image_url = ?');
      values.push(image_url);
    }
    if (req.body.image_public_identifier !== undefined) {
      updates.push('image_public_identifier = ?');
      values.push(req.body.image_public_identifier);
    }
    if (link !== undefined) {
      updates.push('link = ?');
      values.push(link);
    }
    if (is_active !== undefined) {
      updates.push('is_active = ?');
      values.push(is_active);
    }
    
    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }
    
    values.push(id);
    
    await pool.query(
      `UPDATE community_events SET ${updates.join(', ')} WHERE id = ?`,
      values
    );
    
    res.json({ message: 'Event updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Delete event (admin only)
export async function deleteEvent(req, res) {
  try {
    const { id } = req.params;
    
    const [result] = await pool.query(
      'DELETE FROM community_events WHERE id = ?',
      [id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Toggle event active status (admin only)
export async function toggleEventStatus(req, res) {
  try {
    const { id } = req.params;
    
    await pool.query(
      'UPDATE community_events SET is_active = NOT is_active WHERE id = ?',
      [id]
    );
    
    res.json({ message: 'Event status toggled successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
