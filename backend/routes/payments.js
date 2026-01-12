import express from 'express';
import { createPaymentIntent, handleWebhook } from '../controllers/paymentController.js';

const router = express.Router();

// Create payment intent
router.post('/create-payment-intent', createPaymentIntent);

// Stripe webhook (raw body parsing handled in server.js)
router.post('/webhook', handleWebhook);

export default router;
