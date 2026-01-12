// Event routes - public and admin endpoints
import express from 'express';
import { getAllEvents, getEventById } from '../controllers/eventController.js';

const router = express.Router();

// Public routes
router.get('/', getAllEvents); // Get all active events
router.get('/:id', getEventById); // Get single event by ID

export default router;
