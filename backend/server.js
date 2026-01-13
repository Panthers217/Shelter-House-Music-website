import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import artistRouter from './routes/artist.js';
// import userRouter from './routes/user.js';
import albumRouter from './routes/album.js';
import trackRouter from './routes/track.js';
import adminRouter from './routes/admin.js';
import authRouter from './routes/auth.js';
import followRouter from './routes/follow.js';
import statsScheduleRouter, { readScheduleConfig } from './routes/statsSchedule.js';
import genreRouter from './routes/genre.js';
import settingsRouter from './routes/settings.js';
import paymentsRouter from './routes/payments.js';
import purchaseHistoryRouter from './routes/purchase-history.js';
import downloadsRouter from './routes/downloads.js';
import eventsRouter from './routes/events.js';
import contactRouter from './routes/contact.js';
import newsletterRouter from './routes/newsletter.js';
import newsletterCampaignsRouter from './routes/newsletter-campaigns.js';
import faqRouter from './routes/faq.js';
import admin from 'firebase-admin';
import dotenv from 'dotenv';
import { getTables } from './controllers/admin/adminController.js';
import cron from 'node-cron';
import { exec } from 'child_process';
import { promisify } from 'util';
dotenv.config();

const execAsync = promisify(exec);

// Global variable to track active cron job
let currentCronJob = null;
global.scheduleNeedsUpdate = false;


admin.initializeApp({
  credential: admin.credential.cert({
      type: process.env.FIREBASE_TYPE,
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI,
      token_uri: process.env.FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
      universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN
    }),
});

const app = express();

// Configure CORS for development and production
const allowedOrigins = [
  'http://localhost:5173',       // Local Vite dev
  'http://localhost:4173',       // Local Vite preview
  'http://localhost:3001',       // Alternative local
  process.env.FRONTEND_URL,      // From env variable  'https://curly-umbrella-j9xjjg545v9f5jwx-5173.app.github.dev',  // GitHub Codespaces frontend  'https://soulfeltmusicdemo.netlify.app',  // Production Netlify URL
  // Add your production URLs here when deploying:
  // 'https://your-site.netlify.app',
  // 'https://soulfeltmusic.com',
].filter(Boolean); // Remove undefined values

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    
    // In development, allow all origins
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    
    // In production, check against whitelist
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`⚠️  CORS blocked request from: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options('*', cors(corsOptions));

// Stripe webhook needs raw body - must come BEFORE bodyParser.json()
app.use('/api/payments/webhook', express.raw({ type: 'application/json' }));

// Parse JSON for all other routes
app.use(bodyParser.json());

// Debug logging for auth routes
app.use('/api/auth', (req, res, next) => {
  // console.log(`🔍 Auth route hit: ${req.method} ${req.originalUrl}`);
  // console.log('Headers:', { authorization: req.headers.authorization?.substring(0, 20) + '...' });
  next();
});
// app.post('/api/admin/verify', async (req, res) => {
//   const { idToken } = req.body;
//   try {
//     const decodedToken = await admin.auth().verifyIdToken(idToken);
//     // Optionally check for admin privileges here
//     res.json({ success: true, uid: decodedToken.uid });
//   } catch (error) {
//     res.status(401).json({ success: false, message: 'Invalid token' });
//   }
// });


app.use('/api/artists', artistRouter);
// app.use('/api/artist-images', artistImageRouter);
// app.use('/api/users', userRouter);
app.use('/api/albums', albumRouter);
app.use('/api/auth', authRouter);
app.use('/api/tracks', trackRouter);
app.use('/api/follow', followRouter);
app.use('/api/admin', statsScheduleRouter);
app.use('/api', genreRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/purchase-history', purchaseHistoryRouter);
app.use('/api/downloads', downloadsRouter);
app.use('/api/events', eventsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/newsletter', newsletterRouter);
app.use('/api/newsletter', newsletterCampaignsRouter);
app.use('/api/faq', faqRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Soul Felt Music API is running',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Health check endpoint for monitoring services (Render, etc.)
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Readiness check endpoint
app.get('/ready', async (req, res) => {
  try {
    // Could add database connection check here if needed
    res.status(200).json({ 
      status: 'ready',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({ 
      status: 'not ready',
      error: error.message 
    });
  }
});

// Middleware to require admin
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

// Routers

app.use('/api/admin', adminRouter);
// app.use('/api/admin', getTables);



/**
 * Convert schedule config to cron expression
 */
function getCronExpression(config) {
  const { type, value, day, hour } = config;
  
  switch (type) {
    case 'minutes':
      return `*/${value} * * * *`; // Every X minutes
    case 'hours':
      return `0 */${value} * * *`; // Every X hours
    case 'daily':
      return `0 ${hour} * * *`; // Daily at specified hour
    case 'weekly':
      return `0 ${hour} * * ${day}`; // Weekly on specified day and hour
    case 'monthly':
      return `0 ${hour} ${value} * *`; // Monthly on specified day and hour
    default:
      return '0 2 * * 0'; // Default: Sunday at 2 AM
  }
}

/**
 * Run stats update job
 */
async function runStatsUpdate() {
  // console.log('📊 Running scheduled stats update...');
  
  try {
    // Step 1: Update external stats (Spotify, YouTube, etc.)
    // console.log('🌐 Fetching external API stats...');
    const { stdout: externalOutput, stderr: externalError } = await execAsync('node scripts/updateExternalStats.js');
    // console.log(externalOutput);
    if (externalError) console.error('External stats errors:', externalError);
    
    // Step 2: Calculate website plays and totals
    // console.log('🧮 Calculating monthly listeners...');
    const { stdout: monthlyOutput, stderr: monthlyError } = await execAsync('node scripts/updateMonthlyListeners.js');
    // console.log(monthlyOutput);
    if (monthlyError) console.error('Monthly listeners errors:', monthlyError);
    
    // console.log('✅ Stats update completed!');
  } catch (error) {
    // console.error('❌ Error during stats update:', error);
  }
}

/**
 * Initialize or update cron schedule
 */
async function initializeSchedule() {
  const config = await readScheduleConfig();
  
  // Stop existing job if any
  if (currentCronJob) {
    currentCronJob.stop();
    currentCronJob = null;
  }
  
  // Only schedule if enabled
  if (config.enabled) {
    const cronExpression = getCronExpression(config);
    
    currentCronJob = cron.schedule(cronExpression, runStatsUpdate);
    
    const scheduleDesc = getScheduleDescription(config);
    // console.log(`⏰ Stats update scheduled: ${scheduleDesc}`);
  } else {
    // console.log('⏸️  Stats update schedule is disabled');
  }
}

/**
 * Get human-readable schedule description
 */
function getScheduleDescription(config) {
  const { type, value, day, hour } = config;
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  switch (type) {
    case 'minutes':
      return `Every ${value} minute${value !== '1' ? 's' : ''}`;
    case 'hours':
      return `Every ${value} hour${value !== '1' ? 's' : ''}`;
    case 'daily':
      return `Daily at ${hour}:00`;
    case 'weekly':
      return `Every ${days[parseInt(day)]} at ${hour}:00`;
    case 'monthly':
      return `Monthly on day ${value} at ${hour}:00`;
    default:
      return 'Custom schedule';
  }
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 FRONTEND_URL: ${process.env.FRONTEND_URL || 'NOT SET (using default)'}`);
  console.log(`🔒 NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
  
  // Initialize schedule on startup
  await initializeSchedule();
  
  // Check for schedule updates every 10 seconds
  setInterval(async () => {
    if (global.scheduleNeedsUpdate) {
      // console.log('🔄 Reloading stats schedule...');
      await initializeSchedule();
      global.scheduleNeedsUpdate = false;
    }
  }, 10000);
});
