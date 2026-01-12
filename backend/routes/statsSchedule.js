import express from 'express';
import { requireAdmin } from '../server.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to store schedule config
const CONFIG_PATH = path.join(__dirname, '../config/statsSchedule.json');

/**
 * Get current stats schedule configuration
 * GET /api/admin/stats-schedule
 */
router.get('/stats-schedule', requireAdmin, async (req, res) => {
  try {
    const config = await readScheduleConfig();
    res.json({ schedule: config });
  } catch (error) {
    console.error('Error reading schedule config:', error);
    res.status(500).json({ error: 'Failed to read schedule configuration' });
  }
});

/**
 * Update stats schedule configuration
 * PUT /api/admin/stats-schedule
 */
router.put('/stats-schedule', requireAdmin, async (req, res) => {
  try {
    const { enabled, type, value, day, hour } = req.body;
    
    // Validate input
    if (typeof enabled !== 'boolean') {
      return res.status(400).json({ error: 'enabled must be a boolean' });
    }
    
    if (enabled && !['minutes', 'hours', 'daily', 'weekly', 'monthly'].includes(type)) {
      return res.status(400).json({ error: 'Invalid schedule type' });
    }
    
    const config = {
      enabled,
      type,
      value: value || '1',
      day: day || '0',
      hour: hour || '2',
      updatedAt: new Date().toISOString()
    };
    
    await writeScheduleConfig(config);
    
    // Notify that schedule needs to be reloaded
    global.scheduleNeedsUpdate = true;
    
    res.json({ 
      success: true, 
      message: 'Schedule updated successfully',
      schedule: config 
    });
  } catch (error) {
    console.error('Error updating schedule config:', error);
    res.status(500).json({ error: 'Failed to update schedule configuration' });
  }
});

/**
 * Read schedule configuration from file
 */
async function readScheduleConfig() {
  try {
    const data = await fs.readFile(CONFIG_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // Return default config if file doesn't exist
    return {
      enabled: true,
      type: 'weekly',
      value: '1',
      day: '0',
      hour: '2'
    };
  }
}

/**
 * Write schedule configuration to file
 */
async function writeScheduleConfig(config) {
  // Ensure config directory exists
  const configDir = path.dirname(CONFIG_PATH);
  try {
    await fs.access(configDir);
  } catch {
    await fs.mkdir(configDir, { recursive: true });
  }
  
  await fs.writeFile(CONFIG_PATH, JSON.stringify(config, null, 2), 'utf8');
}

export { readScheduleConfig };
export default router;
