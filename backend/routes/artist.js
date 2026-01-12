// Artist routes
import express from 'express';
import { getAllArtists } from '../controllers/artistController.js';

const router = express.Router();

// Example route: GET all artists
router.get('/', getAllArtists);

export default router;
