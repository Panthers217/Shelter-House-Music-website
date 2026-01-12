// Album routes
import express from 'express';
import { getAllAlbums } from '../controllers/albumController.js';

const router = express.Router();

// Example route: GET all albums
router.get('/', getAllAlbums);

export default router;
