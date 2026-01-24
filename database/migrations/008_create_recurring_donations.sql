-- Migration: Create recurring_donations table for monthly giving
-- Created: 2026-01-23
-- Purpose: Track recurring donation subscriptions via Stripe

CREATE TABLE IF NOT EXISTS recurring_donations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    stripe_subscription_id VARCHAR(255) UNIQUE NOT NULL,
    stripe_customer_id VARCHAR(255) NOT NULL,
    donor_name VARCHAR(255) NOT NULL,
    donor_email VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status ENUM('active', 'cancelled', 'paused', 'past_due') DEFAULT 'active',
    next_billing_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    cancelled_at TIMESTAMP NULL,
    
    INDEX idx_email (donor_email),
    INDEX idx_stripe_customer (stripe_customer_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
