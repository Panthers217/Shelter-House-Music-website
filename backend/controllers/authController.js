// Auth controller for user signup and authentication
import pool from '../config/db.js';
import bcrypt from 'bcrypt';

export async function signupUser(req, res) {
  console.log('Signup request received:', { ...req.body, uid: req.body.uid?.substring(0, 10) + '...' });
  
  const { uid, firstName, lastName, email, username } = req.body;
  
  // Validate required fields
  if (!uid || !firstName || !lastName || !email || !username) {
    console.log('Missing fields:', { uid: !!uid, firstName: !!firstName, lastName: !!lastName, email: !!email, username: !!username });
    return res.status(400).json({ 
      error: 'Missing required fields: uid, firstName, lastName, email, username' 
    });
  }

  let connection;
  try {
    connection = await pool.getConnection();
    
    // Check if user already exists by email or username
    const [existingUsers] = await connection.query(
      'SELECT id FROM user WHERE email = ? OR username = ?',
      [email, username]
    );
    
    if (existingUsers.length > 0) {
      return res.status(409).json({ 
        error: 'User with this email or username already exists' 
      });
    }
    
    // Hash the Firebase UID for additional security (optional, but recommended)
    const hashedUid = await bcrypt.hash(uid, 10);
    
    // Insert new user into database
    const [result] = await connection.query(
      `INSERT INTO user 
        (username, first_name, last_name, email, password_hash, email_verified, is_active, demo_access) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        username,
        firstName,
        lastName,
        email,
        hashedUid, // Store hashed Firebase UID as password_hash
        1, // Email is verified through Firebase
        1, // Active by default
        0  // No demo access by default
      ]
    );
    
    // Update last_login timestamp
    await connection.query(
      'UPDATE user SET last_login = NOW() WHERE id = ?',
      [result.insertId]
    );
    
    console.log('✅ User created successfully in database:', { userId: result.insertId, username });
    
    res.status(201).json({
      message: 'User registered successfully',
      userId: result.insertId,
      username: username
    });
    
  } catch (error) {
    console.error('❌ Database error during signup:', error.message);
    console.error('Full error:', error);
    res.status(500).json({ 
      error: 'Failed to create user account',
      details: error.message 
    });
  } finally {
    if (connection) connection.release();
  }
}
