import express from "express";
const router = express.Router();
import {
  createSubscription,
  getUserSubscriptions,
  updateSubscription,
  cancelSubscription,
  reactivateSubscription,
} from "../controllers/subscriptionController.js";
import { verifyFirebaseToken } from "../middleware/auth.js";

// All subscription routes require authentication
// Create a new recurring donation subscription
router.post("/create", verifyFirebaseToken, createSubscription);

// Get all subscriptions for a user by email
router.get("/user/:email", verifyFirebaseToken, getUserSubscriptions);

// Update subscription amount
router.put("/:id/amount", verifyFirebaseToken, updateSubscription);

// Cancel subscription
router.delete("/:id", verifyFirebaseToken, cancelSubscription);

// Reactivate cancelled subscription
router.post("/:id/reactivate", verifyFirebaseToken, reactivateSubscription);

export default router;
