// Settings routes
import express from 'express';
import { requireAdmin } from './admin.js';
import pool from '../config/db.js';
import {
  getSettings,
  getTheme,
  getFeatures,
  getContactInfo,
  getTerms,
  updateSettings
} from '../controllers/admin/settingsController.js';

const router = express.Router();

// Public routes (no authentication required)
router.get('/theme', getTheme);
router.get('/features', getFeatures);
router.get('/contact', getContactInfo);
router.get('/terms', getTerms);

// Public branding endpoint (logo, site name, etc.)
router.get('/public', async (req, res) => {
  try {
    const [settings] = await pool.query(
      `SELECT 
        business_name,
        logo_url,
        favicon_url,
        hero_title,
        hero_subtitle,
        logo_line1,
        logo_line2,
        contact_email,
        contact_phone,
        contact_address,
        about_page_title,
        about_hero_tagline,
        about_story_paragraph1,
        about_story_paragraph2,
        about_story_paragraph3,
        about_mission,
        about_vision,
        about_stat1_number,
        about_stat1_label,
        about_stat2_number,
        about_stat2_label,
        about_stat3_number,
        about_stat3_label,
        about_stat4_number,
        about_stat4_label,
        about_value1_title,
        about_value1_desc,
        about_value2_title,
        about_value2_desc,
        about_value3_title,
        about_value3_desc,
        about_value4_title,
        about_value4_desc,
        about_cta_title,
        about_cta_description
      FROM website_settings 
      ORDER BY id DESC 
      LIMIT 1`
    );
    
    if (settings.length === 0) {
      // Return defaults if no settings exist
      return res.json({
        business_name: 'Soul Felt Music',
        logo_url: null,
        favicon_url: null,
        hero_title: 'Stream & Discover Soul Felt Music',
        hero_subtitle: 'Feel the Vibes',
        logo_line1: 'SOULFELT',
        logo_line2: 'MUSIC'
      });
    }
    
    res.json(settings[0]);
  } catch (error) {
    console.error('Error fetching public settings:', error);
    res.status(500).json({ error: 'Failed to fetch public settings' });
  }
});

// Admin routes (authentication required)
router.get('/', requireAdmin, getSettings);
router.put('/', requireAdmin, updateSettings);

export default router;
