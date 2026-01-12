
import admin from 'firebase-admin';
// Usage: node scripts/setAdminClaim.js <USER_FIREBASE_UID>


const serviceAccount = {
	type: "service_account",
	project_id: "soul-felt-music-website",
	private_key_id: "bf9a8e6d0435f2444de8146299f76bdc5742c39c",
	private_key:
		"-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDJ6hgAYm2VcM+2\nrHQv0apqUe3h6A6BOGRDE6EK67ZBdhMPqEGWWBPR0znuZ9dfsgXb9AQYYoOu6y/3\nFibr04mSf2Tv0JjZGWEqVyZL8GMFURldTxTqkUuS8XdYeMEEwz5BuQTzYrSHYkwd\nE0P3JZQEXU8Z2N3Fv7kKYu6Gpjro5sxFCQgB4pkeoSYubtLHKG2zUs4IA/WbqJXk\nGVsXsFfbPZr4dZdghGWVs+Dqt1EirkzJOq2dWrhwMt+uvE8Gjdps2xCCZdgSqp1M\n6oRylIjlW8k4g7ATQyr5g5uYau96QrbD4gLXTwiPLrTeOq9gc54jOLzu6zhdwq1z\nsA4GRYovAgMBAAECggEAErL7Rg3Xgt96XRCGMhIuFhVAUouLIax3Rz7/dbjJSDFc\nfTa33D82lq1ZJXBjIcRQMUPdR+TXt9ClazHsqNUOXeLZFjHbSz/DyogHo+tp6t7N\nL+GtrjYxKYqd4t5MAdo9tG3OEjwx5oJ+n11euKS3my/eWNEcuL4+BMLkvtOQ4RX/\nPuW0gRVikmguvp5nOrBuVIpfF+OnSiGgudjxZUoRa4mlr+hv/Jm5t2AMjbHWhmS7\nsGQx/FdpMbIXslRQrte4xIBT/1X9YO8Wa9WHPdA+/gASgyLJAeSwJ9jiqYc8axXz\nhcck9wvH8qc4OpujyMk81+nV1ZXkPOPetXK0qoGVAQKBgQDvpGLLosM6Un9Embh6\nJ9KC4kJuOZZhjnklrmlgLfolbd5vTDXVDgZjTbOxdjsRRpIRO/YS6N8tBBSXZVVx\nqO4FjVDoDhCsNTss+Zqxaqfxa+JejRwQ5/BgT7gKuEppdXFCld8j9MuQoIsIFK5e\nPN9pW1+cE9cVqVEuvtgGFjcfrQKBgQDXsm/gwMlIbEwf1PHwFZB5rdQoXy8TPr/a\nIUItYK4KX6HuToV/+P/99e4F7u3mNH45ws/6EFF4JFTGhoh7JtSZpOR09CLrdeEu\nZw3IUStDo840GEj3J5iqpAPPwupIggTNcUXngm0D68ACpLeTig8+oVLssL4DUZIT\nAmTgdoqcywKBgDI5KndxEidb+M5AxTfctrK1hqShLxIdEOjDx9Pfbuh/QTnkJ/gR\n62bOdxV/KNvzBVPVVDocUgGWNFaSZzjd5ZyGRGmN4RKmSVOgsDn0l2Pyb0vPmQ01\n/tvAeVrNytKVSXph/JUFjdAuxVSZOP4JFe13t+72/YHNrXT1jEKiT0U1AoGAGnRy\nMFi010MhGw5dFhsu+x2M1d7GwU+C7FgD69jdv7v2+ml7CjUaAKX3KZciaoepq5/v\nLjZuJ5QdKbQ6bRBYJvgIZSfEWKi+k5hkIluCOOuQUOdhm56ppNQ0+3hmj7oSqLfp\n4PkoMcDqbeiR83CNahsTNqB+zZ1lkxtKEBW57n0CgYBbCsEt0fxI7Pw5USPLyBcy\n1LbYwmXYup8q7jRXFjmkzb7ZckZC7P5Vjy5+T29uQA0k5IrnCU+lOOQSIEiwDvf5\nERHQZCgByTHIrvROjysO1IyadkeJhIEOJ4/XB0CE+1REG+X5eCGSfBU857NHKuc2\ndPmy+X8Ut0IkALk4WUSxRw==\n-----END PRIVATE KEY-----\n",
	client_email: "firebase-adminsdk-fbsvc@soul-felt-music-website.iam.gserviceaccount.com",
	client_id: "114613336554172563594",
	auth_uri: "https://accounts.google.com/o/oauth2/auth",
	token_uri: "https://oauth2.googleapis.com/token",
	auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
	client_x509_cert_url:
		"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40soul-felt-music-website.iam.gserviceaccount.com",
	universe_domain: "googleapis.com"
};

// Load credentials from environment variables
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});
const uid = '9UomaPzazOPM6qGOB35E29tegkl2';
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
if (process.argv[1] && process.argv[1].endsWith('setAdminClaim.js')) {
	const uid = process.argv[2];
	setAdmin(uid);
}

setAdmin(/** */)