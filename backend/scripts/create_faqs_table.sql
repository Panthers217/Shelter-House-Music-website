-- Create FAQs table for frequently asked questions management
CREATE TABLE  faqs (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  question VARCHAR(500) NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(100) DEFAULT 'General',
  display_order INT DEFAULT 0,
  is_published TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_published (is_published),
  INDEX idx_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample FAQs
INSERT INTO faqs (question, answer, category, display_order, is_published) VALUES
('What is Soul Felt Music?', 'Soul Felt Music is a platform dedicated to discovering and supporting independent artists. We provide a space where music lovers can explore new sounds, connect with artists, and support the music community.', 'General', 1, 1),
('How do I create an account?', 'Click the "Sign Up" button in the navigation bar. You can register using your email address or sign in with Google. After creating an account, you''ll have access to features like following artists, saving music, and subscribing to our newsletter.', 'General', 2, 1),
('Is Soul Felt Music free to use?', 'Yes! Creating an account and browsing music is completely free. Some premium features and merchandise may require payment, but the core experience is free for all users.', 'General', 3, 1),

('How do I follow an artist?', 'Visit any artist''s profile page and click the "Follow" button. You''ll receive updates when they release new music or announce events. You can manage your followed artists from your profile page.', 'Music & Artists', 1, 1),
('Can I submit my music to Soul Felt Music?', 'Yes! We welcome submissions from independent artists. Use the contact form and select "Artist Submission" as your inquiry type. Include links to your music and a brief bio. Our team will review your submission.', 'Music & Artists', 2, 1),
('How do I download or stream music?', 'You can stream music directly on our platform. For downloads, look for the download button on track pages where available. Some tracks may be stream-only based on artist preferences.', 'Music & Artists', 3, 1),

('How do I make a purchase from the store?', 'Browse our store, add items to your cart, and proceed to checkout. We accept major credit cards and process payments securely through Stripe. You''ll receive an order confirmation via email.', 'Store & Purchases', 1, 1),
('What is your shipping policy?', 'We ship worldwide! Shipping times vary by location. Domestic orders typically arrive within 5-7 business days, while international orders may take 10-15 business days. You''ll receive tracking information once your order ships.', 'Store & Purchases', 2, 1),
('What is your return policy?', 'We offer 30-day returns on merchandise. Items must be unused and in original packaging. Contact our support team to initiate a return. Digital products are non-refundable.', 'Store & Purchases', 3, 1),

('How do I unsubscribe from the newsletter?', 'You can unsubscribe anytime by clicking the "Unsubscribe" link at the bottom of any newsletter email, or by visiting your account settings and toggling the newsletter preference.', 'Account & Newsletter', 1, 1),
('Can I change my email address?', 'Yes, you can update your email address in your account settings. You''ll need to verify the new email address before the change takes effect.', 'Account & Newsletter', 2, 1),
('How do I reset my password?', 'Click "Forgot Password" on the login page. Enter your email address and we''ll send you a password reset link. Follow the instructions in the email to create a new password.', 'Account & Newsletter', 3, 1),

('I''m having trouble playing music. What should I do?', 'First, try refreshing your browser. Make sure your internet connection is stable and your browser is up to date. If problems persist, try clearing your browser cache or using a different browser. Contact support if issues continue.', 'Technical Support', 1, 1),
('Is my payment information secure?', 'Absolutely! We use Stripe for payment processing, which is PCI-compliant and uses industry-standard encryption. We never store your full credit card information on our servers.', 'Technical Support', 2, 1),
('Which browsers are supported?', 'Soul Felt Music works best on the latest versions of Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience.', 'Technical Support', 3, 1);
