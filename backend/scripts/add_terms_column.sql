-- Add terms_of_service column to website_settings table
-- ALTER TABLE website_settings 
-- ADD COLUMN IF NOT EXISTS terms_of_service TEXT DEFAULT NULL AFTER social_media_links;

-- Add default terms content
UPDATE website_settings 
SET terms_of_service = '<h1>Terms of Service</h1>
<p>Last updated: October 29, 2025</p>

<h2>1. Acceptance of Terms</h2>
<p>By accessing and using Soul Felt Music, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>

<h2>2. Use License</h2>
<p>Permission is granted to temporarily access the materials on Soul Felt Music for personal, non-commercial use only.</p>

<h2>3. User Accounts</h2>
<p>When you create an account with us, you must provide accurate and complete information. You are responsible for maintaining the security of your account.</p>

<h2>4. Content</h2>
<p>Our service allows you to access, stream, and in some cases download music content. All content remains the property of the respective artists and copyright holders.</p>

<h2>5. Prohibited Uses</h2>
<p>You may not use our service for any illegal or unauthorized purpose. You must not violate any laws in your jurisdiction.</p>

<h2>6. Intellectual Property</h2>
<p>All content on Soul Felt Music, including text, graphics, logos, and music, is the property of Soul Felt Music or its content suppliers.</p>

<h2>7. Disclaimer</h2>
<p>The materials on Soul Felt Music are provided on an "as is" basis. We make no warranties, expressed or implied.</p>

<h2>8. Limitations</h2>
<p>In no event shall Soul Felt Music be liable for any damages arising out of the use or inability to use our service.</p>

<h2>9. Changes to Terms</h2>
<p>We reserve the right to revise these terms at any time. By continuing to use Soul Felt Music, you agree to be bound by the updated terms.</p>

<h2>10. Contact Information</h2>
<p>If you have any questions about these Terms, please contact us through our contact page.</p>'
ORDER BY id DESC LIMIT 1;
