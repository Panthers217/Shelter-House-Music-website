// Contact routes
import express from 'express';
import { submitContactForm, getContactSubmissions } from '../controllers/contactController.js';
import { requireAdmin } from './admin.js';

const router = express.Router();

// Public route - submit contact form
router.post('/submit', submitContactForm);

// Admin route - view submissions
router.get('/submissions', requireAdmin, getContactSubmissions);

export default router;
