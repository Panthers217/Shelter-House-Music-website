// Auth routes for user signup and authentication
import express from 'express';
import { signupUser } from '../controllers/authController.js';
import admin from 'firebase-admin';

const router = express.Router();

// Middleware to verify Firebase token
async function verifyFirebaseToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No authentication token provided' });
    }
    
    const idToken = authHeader.split('Bearer ')[1];
    const decoded = await admin.auth().verifyIdToken(idToken);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// POST /api/auth/signup - Register new user
router.post('/signup', verifyFirebaseToken, signupUser);

export default router;
