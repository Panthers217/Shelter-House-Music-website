// Admin routes: routes for adminController logic
import express from 'express';
import admin from 'firebase-admin';

import multer from 'multer';
import {
  getTables,
  getFields,
  getRecords,
  updateRecord,
  getTablesWithFieldsAndRecords,
  deleteRecord,
  insertRecord
} from '../controllers/admin/adminController.js';

import {
  getAllEventsAdmin,
  createEvent,
  updateEvent,
  deleteEvent,
  toggleEventStatus
} from '../controllers/eventController.js';



const upload = multer();

const router = express.Router();
export async function requireAdmin(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ error: 'No token' });
    const idToken = authHeader.split('Bearer ')[1];
    const decoded = await admin.auth().verifyIdToken(idToken);
    if (decoded.admin === true) {
      req.user = decoded;
      return next();
    }
    return res.status(403).json({ error: 'Not an admin' });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// GET all tables
router.get('/tables', getTables);

// GET fields for a table
router.get('/fields/:table',  getFields);

// GET records for a table
router.get('/records/:table',  getRecords);

// Route to get all tables with fields and records
router.get('/tables-with-fields-records',  getTablesWithFieldsAndRecords);

// PUT update a record in a table by id (with file upload support)
router.put('/records/:table/:id', requireAdmin, upload.any(), updateRecord);

// DELETE a record in a table by id
router.delete('/records/:table/:id', requireAdmin, deleteRecord);

// POST insert a new record into a table
router.post('/records/:table/', requireAdmin, upload.any(), insertRecord);

// Event management routes (admin only)
router.get('/events', requireAdmin, getAllEventsAdmin); // Get all events including inactive
router.post('/events', requireAdmin, upload.any(), createEvent); // Create new event with file upload
router.put('/events/:id', requireAdmin, upload.any(), updateEvent); // Update event with file upload
router.delete('/events/:id', requireAdmin, deleteEvent); // Delete event
router.patch('/events/:id/toggle', requireAdmin, toggleEventStatus); // Toggle active status

export default router;
