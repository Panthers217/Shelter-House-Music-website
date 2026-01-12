// Settings Controller - Handles website configuration
import pool from '../../config/db.js';

/**
 * Get all website settings
 * @route GET /api/settings
 */
export async function getSettings(req, res) {
  try {
    const [settings] = await pool.query(
      'SELECT * FROM website_settings ORDER BY id DESC LIMIT 1'
    );
    
    if (settings.length === 0) {
      return res.status(404).json({ error: 'Settings not found' });
    }
    
    // Parse JSON fields if they're strings
    if (settings[0].social_media_links && typeof settings[0].social_media_links === 'string') {
      settings[0].social_media_links = JSON.parse(settings[0].social_media_links);
    }
    
    res.json(settings[0]);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get theme settings (public endpoint)
 * @route GET /api/settings/theme
 */
export async function getTheme(req, res) {
  try {
    const [settings] = await pool.query(
      `SELECT 
        primary_color,
        secondary_color,
        accent_color,
        background_color,
        card_background,
        text_primary,
        text_secondary,
        business_name,
        logo_url
      FROM website_settings 
      ORDER BY id DESC 
      LIMIT 1`
    );
    
    if (settings.length === 0) {
      // Return defaults if no settings exist
      return res.json({
        primary_color: '#aa2a46',
        secondary_color: '#d63c65',
        accent_color: '#fffced',
        background_color: '#1a1b22',
        card_background: '#21212b',
        text_primary: '#fffced',
        text_secondary: '#ffffff',
        business_name: 'Soul Felt Music',
        logo_url: null
      });
    }
    
    res.json(settings[0]);
  } catch (error) {
    console.error('Error fetching theme:', error);
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get contact information (public endpoint)
 * @route GET /api/settings/contact
 */
export async function getContactInfo(req, res) {
  try {
    const [settings] = await pool.query(
      `SELECT 
        contact_email,
        contact_phone,
        contact_address,
        office_hours_weekday,
        office_hours_saturday,
        office_hours_sunday,
        office_hours_timezone,
        social_media_links
      FROM website_settings 
      ORDER BY id DESC 
      LIMIT 1`
    );
    
    if (settings.length === 0) {
      // Return defaults
      return res.json({
        contact_email: 'hello@soulfeltmusic.com',
        contact_phone: '+1 (555) 123-4567',
        contact_address: '123 Music Row, Nashville, TN 37203, United States',
        office_hours_weekday: '9:00 AM - 6:00 PM',
        office_hours_saturday: '10:00 AM - 4:00 PM',
        office_hours_sunday: 'Closed',
        office_hours_timezone: 'EST',
        social_media_links: {}
      });
    }
    
    // Parse social_media_links JSON if it exists
    if (settings[0].social_media_links && typeof settings[0].social_media_links === 'string') {
      settings[0].social_media_links = JSON.parse(settings[0].social_media_links);
    }
    
    res.json(settings[0]);
  } catch (error) {
    console.error('Error fetching contact info:', error);
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get terms of service (public endpoint)
 * @route GET /api/settings/terms
 */
export async function getTerms(req, res) {
  try {
    const [settings] = await pool.query(
      `SELECT terms_of_service FROM website_settings ORDER BY id DESC LIMIT 1`
    );
    
    if (settings.length === 0 || !settings[0].terms_of_service) {
      return res.json({ 
        terms_of_service: '<h1>Terms of Service</h1><p>Terms content not yet configured.</p>' 
      });
    }
    
    res.json({ terms_of_service: settings[0].terms_of_service });
  } catch (error) {
    console.error('Error fetching terms:', error);
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get feature toggles (public endpoint)
 * @route GET /api/settings/features
 */
export async function getFeatures(req, res) {
  try {
    const [settings] = await pool.query(
      `SELECT 
        enable_merchandise,
        enable_videos,
        enable_artist_profiles,
        enable_newsletter,
        enable_cart,
        enable_user_accounts,
        enable_promotional_tracks,
        enable_promotional_videos,
        enable_stripe
      FROM website_settings 
      ORDER BY id DESC 
      LIMIT 1`
    );
    
    if (settings.length === 0) {
      // Return defaults
      return res.json({
        enable_merchandise: true,
        enable_videos: true,
        enable_artist_profiles: true,
        enable_newsletter: true,
        enable_cart: true,
        enable_user_accounts: true,
        enable_promotional_tracks: true,
        enable_promotional_videos: true,
        enable_stripe: true
      });
    }
    
    // Convert TINYINT to boolean
    const features = settings[0];
    Object.keys(features).forEach(key => {
      features[key] = features[key] === 1 || features[key] === true;
    });
    
    res.json(features);
  } catch (error) {
    console.error('Error fetching features:', error);
    res.status(500).json({ error: error.message });
  }
}

/**
 * Update website settings (Admin only)
 * @route PUT /api/settings
 */
export async function updateSettings(req, res) {
  try {
    const {
      business_name,
      logo_url,
      favicon_url,
      logo_line1,
      logo_line2,
      primary_color,
      secondary_color,
      accent_color,
      background_color,
      card_background,
      text_primary,
      text_secondary,
      contact_email,
      contact_phone,
      contact_address,
      office_hours_weekday,
      office_hours_saturday,
      office_hours_sunday,
      office_hours_timezone,
      email_provider,
      email_api_key,
      email_from_name,
      email_reply_to,
      smtp_host,
      smtp_port,
      smtp_secure,
      smtp_user,
      smtp_password,
      contact_form_recipient,
      artist_submission_recipient,
      press_media_recipient,
      contact_form_auto_reply,
      contact_form_subject_prefix,
      auto_reply_message,
      social_media_links,
      cloudinary_cloud_name,
      cloudinary_audio_folder,
      cloudinary_image_folder,
      cloudinary_video_folder,
      cloudinary_merch_folder,
      enable_merchandise,
      enable_videos,
      enable_artist_profiles,
      enable_newsletter,
      enable_cart,
      enable_user_accounts,
      enable_promotional_tracks,
      enable_promotional_videos,
      enable_stripe,
      hero_title,
      hero_subtitle,
      featured_section_title,
      about_us_text,
      payment_currency,
      tax_rate,
      site_title,
      site_description,
      site_keywords,
      items_per_page,
      max_upload_size_mb,
      terms_of_service,
      // About page fields
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
    } = req.body;

    // Build dynamic update query
    const updates = [];
    const values = [];

    if (business_name !== undefined) { updates.push('business_name = ?'); values.push(business_name); }
    if (logo_url !== undefined) { updates.push('logo_url = ?'); values.push(logo_url); }
    if (favicon_url !== undefined) { updates.push('favicon_url = ?'); values.push(favicon_url); }
    if (logo_line1 !== undefined) { updates.push('logo_line1 = ?'); values.push(logo_line1); }
    if (logo_line2 !== undefined) { updates.push('logo_line2 = ?'); values.push(logo_line2); }
    if (primary_color !== undefined) { updates.push('primary_color = ?'); values.push(primary_color); }
    if (secondary_color !== undefined) { updates.push('secondary_color = ?'); values.push(secondary_color); }
    if (accent_color !== undefined) { updates.push('accent_color = ?'); values.push(accent_color); }
    if (background_color !== undefined) { updates.push('background_color = ?'); values.push(background_color); }
    if (card_background !== undefined) { updates.push('card_background = ?'); values.push(card_background); }
    if (text_primary !== undefined) { updates.push('text_primary = ?'); values.push(text_primary); }
    if (text_secondary !== undefined) { updates.push('text_secondary = ?'); values.push(text_secondary); }
    if (contact_email !== undefined) { updates.push('contact_email = ?'); values.push(contact_email); }
    if (contact_phone !== undefined) { updates.push('contact_phone = ?'); values.push(contact_phone); }
    if (contact_address !== undefined) { updates.push('contact_address = ?'); values.push(contact_address); }
    if (office_hours_weekday !== undefined) { updates.push('office_hours_weekday = ?'); values.push(office_hours_weekday); }
    if (office_hours_saturday !== undefined) { updates.push('office_hours_saturday = ?'); values.push(office_hours_saturday); }
    if (office_hours_sunday !== undefined) { updates.push('office_hours_sunday = ?'); values.push(office_hours_sunday); }
    if (office_hours_timezone !== undefined) { updates.push('office_hours_timezone = ?'); values.push(office_hours_timezone); }
    if (email_provider !== undefined) { updates.push('email_provider = ?'); values.push(email_provider); }
    if (email_api_key !== undefined) { updates.push('email_api_key = ?'); values.push(email_api_key); }
    if (email_from_name !== undefined) { updates.push('email_from_name = ?'); values.push(email_from_name); }
    if (email_reply_to !== undefined) { updates.push('email_reply_to = ?'); values.push(email_reply_to); }
    if (smtp_host !== undefined) { updates.push('smtp_host = ?'); values.push(smtp_host); }
    if (smtp_port !== undefined) { updates.push('smtp_port = ?'); values.push(smtp_port); }
    if (smtp_secure !== undefined) { updates.push('smtp_secure = ?'); values.push(smtp_secure); }
    if (smtp_user !== undefined) { updates.push('smtp_user = ?'); values.push(smtp_user); }
    if (smtp_password !== undefined) { updates.push('smtp_password = ?'); values.push(smtp_password); }
    if (contact_form_recipient !== undefined) { updates.push('contact_form_recipient = ?'); values.push(contact_form_recipient); }
    if (artist_submission_recipient !== undefined) { updates.push('artist_submission_recipient = ?'); values.push(artist_submission_recipient); }
    if (press_media_recipient !== undefined) { updates.push('press_media_recipient = ?'); values.push(press_media_recipient); }
    if (contact_form_auto_reply !== undefined) { updates.push('contact_form_auto_reply = ?'); values.push(contact_form_auto_reply); }
    if (contact_form_subject_prefix !== undefined) { updates.push('contact_form_subject_prefix = ?'); values.push(contact_form_subject_prefix); }
    if (auto_reply_message !== undefined) { updates.push('auto_reply_message = ?'); values.push(auto_reply_message); }
    if (social_media_links !== undefined) { 
      updates.push('social_media_links = ?'); 
      values.push(JSON.stringify(social_media_links)); 
    }
    if (cloudinary_cloud_name !== undefined) { updates.push('cloudinary_cloud_name = ?'); values.push(cloudinary_cloud_name); }
    if (cloudinary_audio_folder !== undefined) { updates.push('cloudinary_audio_folder = ?'); values.push(cloudinary_audio_folder); }
    if (cloudinary_image_folder !== undefined) { updates.push('cloudinary_image_folder = ?'); values.push(cloudinary_image_folder); }
    if (cloudinary_video_folder !== undefined) { updates.push('cloudinary_video_folder = ?'); values.push(cloudinary_video_folder); }
    if (cloudinary_merch_folder !== undefined) { updates.push('cloudinary_merch_folder = ?'); values.push(cloudinary_merch_folder); }
    if (enable_merchandise !== undefined) { updates.push('enable_merchandise = ?'); values.push(enable_merchandise); }
    if (enable_videos !== undefined) { updates.push('enable_videos = ?'); values.push(enable_videos); }
    if (enable_artist_profiles !== undefined) { updates.push('enable_artist_profiles = ?'); values.push(enable_artist_profiles); }
    if (enable_newsletter !== undefined) { updates.push('enable_newsletter = ?'); values.push(enable_newsletter); }
    if (enable_cart !== undefined) { updates.push('enable_cart = ?'); values.push(enable_cart); }
    if (enable_user_accounts !== undefined) { updates.push('enable_user_accounts = ?'); values.push(enable_user_accounts); }
    if (enable_promotional_tracks !== undefined) { updates.push('enable_promotional_tracks = ?'); values.push(enable_promotional_tracks); }
    if (enable_promotional_videos !== undefined) { updates.push('enable_promotional_videos = ?'); values.push(enable_promotional_videos); }
    if (enable_stripe !== undefined) { updates.push('enable_stripe = ?'); values.push(enable_stripe); }
    if (hero_title !== undefined) { updates.push('hero_title = ?'); values.push(hero_title); }
    if (hero_subtitle !== undefined) { updates.push('hero_subtitle = ?'); values.push(hero_subtitle); }
    if (featured_section_title !== undefined) { updates.push('featured_section_title = ?'); values.push(featured_section_title); }
    if (about_us_text !== undefined) { updates.push('about_us_text = ?'); values.push(about_us_text); }
    if (payment_currency !== undefined) { updates.push('payment_currency = ?'); values.push(payment_currency); }
    if (tax_rate !== undefined) { updates.push('tax_rate = ?'); values.push(tax_rate); }
    if (site_title !== undefined) { updates.push('site_title = ?'); values.push(site_title); }
    if (site_description !== undefined) { updates.push('site_description = ?'); values.push(site_description); }
    if (site_keywords !== undefined) { updates.push('site_keywords = ?'); values.push(site_keywords); }
    if (items_per_page !== undefined) { updates.push('items_per_page = ?'); values.push(items_per_page); }
    if (max_upload_size_mb !== undefined) { updates.push('max_upload_size_mb = ?'); values.push(max_upload_size_mb); }
    if (terms_of_service !== undefined) { updates.push('terms_of_service = ?'); values.push(terms_of_service); }
    
    // About page fields
    if (about_page_title !== undefined) { updates.push('about_page_title = ?'); values.push(about_page_title); }
    if (about_hero_tagline !== undefined) { updates.push('about_hero_tagline = ?'); values.push(about_hero_tagline); }
    if (about_story_paragraph1 !== undefined) { updates.push('about_story_paragraph1 = ?'); values.push(about_story_paragraph1); }
    if (about_story_paragraph2 !== undefined) { updates.push('about_story_paragraph2 = ?'); values.push(about_story_paragraph2); }
    if (about_story_paragraph3 !== undefined) { updates.push('about_story_paragraph3 = ?'); values.push(about_story_paragraph3); }
    if (about_mission !== undefined) { updates.push('about_mission = ?'); values.push(about_mission); }
    if (about_vision !== undefined) { updates.push('about_vision = ?'); values.push(about_vision); }
    if (about_stat1_number !== undefined) { updates.push('about_stat1_number = ?'); values.push(about_stat1_number); }
    if (about_stat1_label !== undefined) { updates.push('about_stat1_label = ?'); values.push(about_stat1_label); }
    if (about_stat2_number !== undefined) { updates.push('about_stat2_number = ?'); values.push(about_stat2_number); }
    if (about_stat2_label !== undefined) { updates.push('about_stat2_label = ?'); values.push(about_stat2_label); }
    if (about_stat3_number !== undefined) { updates.push('about_stat3_number = ?'); values.push(about_stat3_number); }
    if (about_stat3_label !== undefined) { updates.push('about_stat3_label = ?'); values.push(about_stat3_label); }
    if (about_stat4_number !== undefined) { updates.push('about_stat4_number = ?'); values.push(about_stat4_number); }
    if (about_stat4_label !== undefined) { updates.push('about_stat4_label = ?'); values.push(about_stat4_label); }
    if (about_value1_title !== undefined) { updates.push('about_value1_title = ?'); values.push(about_value1_title); }
    if (about_value1_desc !== undefined) { updates.push('about_value1_desc = ?'); values.push(about_value1_desc); }
    if (about_value2_title !== undefined) { updates.push('about_value2_title = ?'); values.push(about_value2_title); }
    if (about_value2_desc !== undefined) { updates.push('about_value2_desc = ?'); values.push(about_value2_desc); }
    if (about_value3_title !== undefined) { updates.push('about_value3_title = ?'); values.push(about_value3_title); }
    if (about_value3_desc !== undefined) { updates.push('about_value3_desc = ?'); values.push(about_value3_desc); }
    if (about_value4_title !== undefined) { updates.push('about_value4_title = ?'); values.push(about_value4_title); }
    if (about_value4_desc !== undefined) { updates.push('about_value4_desc = ?'); values.push(about_value4_desc); }
    if (about_cta_title !== undefined) { updates.push('about_cta_title = ?'); values.push(about_cta_title); }
    if (about_cta_description !== undefined) { updates.push('about_cta_description = ?'); values.push(about_cta_description); }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    // Get the first settings row (or create if doesn't exist)
    const [existing] = await pool.query('SELECT id FROM website_settings LIMIT 1');
    
    if (existing.length === 0) {
      // Insert new settings
      const insertFields = updates.map(u => u.split(' = ')[0]).join(', ');
      const insertPlaceholders = updates.map(() => '?').join(', ');
      await pool.query(
        `INSERT INTO website_settings (${insertFields}) VALUES (${insertPlaceholders})`,
        values
      );
    } else {
      // Update existing settings
      const updateQuery = `UPDATE website_settings SET ${updates.join(', ')} WHERE id = ?`;
      values.push(existing[0].id);
      await pool.query(updateQuery, values);
    }

    // Fetch and return updated settings
    const [updated] = await pool.query('SELECT * FROM website_settings LIMIT 1');
    
    if (updated[0].social_media_links && typeof updated[0].social_media_links === 'string') {
      updated[0].social_media_links = JSON.parse(updated[0].social_media_links);
    }
    
    res.json({ 
      message: 'Settings updated successfully',
      settings: updated[0]
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ error: error.message });
  }
}
