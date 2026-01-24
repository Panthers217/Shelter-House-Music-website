import admin from 'firebase-admin';

// Middleware to verify Firebase authentication token
export async function verifyFirebaseToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'No authentication token provided',
        requiresAuth: true 
      });
    }
    
    const idToken = authHeader.split('Bearer ')[1];
    const decoded = await admin.auth().verifyIdToken(idToken);
    req.user = decoded;
    
    // Fetch user from database to get user_id
    const db = await import('../config/db.js');
    const [users] = await db.default.query(
      'SELECT id, email, username, first_name, last_name FROM user WHERE email = ?',
      [decoded.email]
    );
    
    if (users.length === 0) {
      return res.status(401).json({ 
        error: 'User not found in database',
        requiresAuth: true 
      });
    }
    
    req.user.userId = users[0].id;
    req.user.dbUser = users[0];
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ 
      error: 'Invalid or expired token',
      requiresAuth: true 
    });
  }
}

// Optional middleware - allows request to proceed without auth but adds user if available
export async function optionalAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      const idToken = authHeader.split('Bearer ')[1];
      const decoded = await admin.auth().verifyIdToken(idToken);
      req.user = decoded;
      
      // Fetch user from database
      const db = await import('../config/db.js');
      const [users] = await db.default.query(
        'SELECT id, email, username, first_name, last_name FROM user WHERE email = ?',
        [decoded.email]
      );
      
      if (users.length > 0) {
        req.user.userId = users[0].id;
        req.user.dbUser = users[0];
      }
    }
  } catch (error) {
    console.error('Optional auth error:', error);
    // Continue without auth
  }
  next();
}
