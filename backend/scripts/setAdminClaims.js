import admin from 'firebase-admin';
import dotenv from 'dotenv';

// Usage: node scripts/setAdminClaims.js <USER_FIREBASE_UID>

// Load environment variables
dotenv.config();

// Initialize Firebase Admin with credentials from .env
admin.initializeApp({
	credential: admin.credential.cert({
		type: process.env.FIREBASE_TYPE,
		project_id: process.env.FIREBASE_PROJECT_ID,
		private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
		private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
		client_email: process.env.FIREBASE_CLIENT_EMAIL,
		client_id: process.env.FIREBASE_CLIENT_ID,
		auth_uri: process.env.FIREBASE_AUTH_URI,
		token_uri: process.env.FIREBASE_TOKEN_URI,
		auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
		client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
		universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN
	}),
});
// Function to set admin claim
async function setAdmin(uid) {
	if (!uid) {
		console.error('Usage: node scripts/setAdminClaim.js <USER_FIREBASE_UID>');
		process.exit(1);
	}
	try {
		await admin.auth().setCustomUserClaims(uid, { admin: true });
		console.log('Admin claim set for user:', uid);
		process.exit(0);
	} catch (error) {
		console.error('Error setting admin claim:', error);
		process.exit(1);
	}
}

// Run if called from CLI
const uid = process.argv[2];
setAdmin(uid);