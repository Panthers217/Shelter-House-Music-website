export default function EmailSettingsTab({ settings, handleInputChange }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary mb-4">
        Email Configuration
      </h2>
      <p className="text-text-secondary mb-6">
        Configure email service provider and settings
      </p>

      {/* Email Provider Selection */}
      <div className="border-t border-background pt-6">
        <h3 className="text-xl font-semibold text-accent mb-4">
          Email Service Provider
        </h3>

        <div className="mb-4">
          <label className="block text-accent font-medium mb-2">
            Select Provider
          </label>
          <select
            value={settings.email_provider || "smtp"}
            onChange={(e) =>
              handleInputChange("email_provider", e.target.value)
            }
            className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="smtp">SMTP (Gmail, Outlook, Custom)</option>
            <option value="resend">Resend</option>
            <option value="sendgrid">SendGrid</option>
            <option value="mailgun">Mailgun</option>
            <option value="postmark">Postmark</option>
            <option value="ses-smtp">Amazon SES (SMTP)</option>
          </select>
          <p className="text-sm text-text-secondary mt-1">
            Choose your email service provider
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-accent font-medium mb-2">
            Sender Name
          </label>
          <input
            type="text"
            value={settings.email_from_name || ""}
            onChange={(e) =>
              handleInputChange("email_from_name", e.target.value)
            }
            placeholder="Soul Felt Music"
            className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <p className="text-sm text-text-secondary mt-1">
            Name displayed in "From" field
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-accent font-medium mb-2">
            Reply-To Email
          </label>
          <input
            type="email"
            value={settings.email_reply_to || ""}
            onChange={(e) =>
              handleInputChange("email_reply_to", e.target.value)
            }
            placeholder="contact@soulfeltmusic.com"
            className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <p className="text-sm text-text-secondary mt-1">
            Email address for replies (optional)
          </p>
        </div>
      </div>

      {/* API Key for API-based providers */}
      {settings.email_provider &&
        settings.email_provider !== "smtp" &&
        settings.email_provider !== "ses-smtp" && (
          <div className="border-t border-background pt-6">
            <h3 className="text-xl font-semibold text-accent mb-4">
              API Configuration
            </h3>

            <div className="mb-4">
              <label className="block text-accent font-medium mb-2">
                API Key
              </label>
              <input
                type="password"
                value={settings.email_api_key || ""}
                onChange={(e) =>
                  handleInputChange("email_api_key", e.target.value)
                }
                placeholder="Enter your API key"
                className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-sm text-text-secondary mt-1">
                {settings.email_provider === "resend" &&
                  "Get your API key from https://resend.com/api-keys"}
                {settings.email_provider === "sendgrid" &&
                  "Get your API key from SendGrid dashboard"}
                {settings.email_provider === "mailgun" &&
                  "Get your API key from Mailgun dashboard"}
                {settings.email_provider === "postmark" &&
                  "Get your API key from Postmark account settings"}
              </p>
            </div>

            {settings.email_provider === "resend" && (
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                <p className="text-sm text-blue-300">
                  <strong>Resend Setup:</strong>
                  <br />
                  1. Sign up at{" "}
                  <a
                    href="https://resend.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    resend.com
                  </a>
                  <br />
                  2. Verify your domain in the Resend dashboard
                  <br />
                  3. Create an API key
                  <br />
                  4. Use a verified domain email in "SMTP Username"
                  field below
                </p>
              </div>
            )}
          </div>
        )}

      {/* SMTP Settings - shown for SMTP and SES-SMTP */}
      {(!settings.email_provider ||
        settings.email_provider === "smtp" ||
        settings.email_provider === "ses-smtp" ||
        settings.email_provider === "mailgun") && (
        <div className="border-t border-background pt-6">
          <h3 className="text-xl font-semibold text-accent mb-4">
            SMTP Server Settings
          </h3>

          {settings.email_provider === "smtp" && (
            <div className="mb-4">
              <label className="block text-accent font-medium mb-2">
                SMTP Host
              </label>
              <input
                type="text"
                value={settings.smtp_host || ""}
                onChange={(e) =>
                  handleInputChange("smtp_host", e.target.value)
                }
                placeholder="smtp.gmail.com"
                className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-sm text-text-secondary mt-1">
                e.g., smtp.gmail.com, smtp.sendgrid.net
              </p>
            </div>
          )}

          {settings.email_provider === "smtp" && (
            <div className="mb-4">
              <label className="block text-accent font-medium mb-2">
                SMTP Port
              </label>
              <input
                type="number"
                value={settings.smtp_port || ""}
                onChange={(e) =>
                  handleInputChange(
                    "smtp_port",
                    parseInt(e.target.value)
                  )
                }
                placeholder="587"
                className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-sm text-text-secondary mt-1">
                Common ports: 587 (TLS), 465 (SSL), 25 (unencrypted)
              </p>
            </div>
          )}

          {settings.email_provider === "smtp" && (
            <div className="mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.smtp_secure || false}
                  onChange={(e) =>
                    handleInputChange("smtp_secure", e.target.checked)
                  }
                  className="w-5 h-5 text-primary bg-background border-primary rounded focus:ring-2 focus:ring-primary"
                />
                <span className="text-accent font-medium">
                  Use SSL/TLS
                </span>
              </label>
              <p className="text-sm text-text-secondary mt-1 ml-7">
                Enable for port 465, disable for port 587
              </p>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-accent font-medium mb-2">
              {settings.email_provider === "mailgun"
                ? "Mailgun Domain Username"
                : "SMTP Username"}
            </label>
            <input
              type="text"
              value={settings.smtp_user || ""}
              onChange={(e) =>
                handleInputChange("smtp_user", e.target.value)
              }
              placeholder={
                settings.email_provider === "resend"
                  ? "verified@yourdomain.com"
                  : settings.email_provider === "mailgun"
                  ? "postmaster@your-domain.com"
                  : "your-email@gmail.com"
              }
              className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-sm text-text-secondary mt-1">
              {settings.email_provider === "resend" &&
                "Must be a verified domain email"}
              {settings.email_provider === "mailgun" &&
                "Your Mailgun SMTP username (e.g., postmaster@yourdomain.com)"}
              {(!settings.email_provider ||
                settings.email_provider === "smtp") &&
                "Your email address or SMTP username"}
              {settings.email_provider === "ses-smtp" &&
                "AWS SES SMTP username"}
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-accent font-medium mb-2">
              {settings.email_provider === "mailgun"
                ? "API Key"
                : "SMTP Password"}
            </label>
            <input
              type="password"
              value={settings.smtp_password || ""}
              onChange={(e) =>
                handleInputChange("smtp_password", e.target.value)
              }
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-sm text-text-secondary mt-1">
              {settings.email_provider === "resend" &&
                "Your Resend API key"}
              {settings.email_provider === "mailgun" &&
                "Your Mailgun API key"}
              {settings.email_provider === "ses-smtp" &&
                "AWS SES SMTP password"}
              {(!settings.email_provider ||
                settings.email_provider === "smtp") &&
                "For Gmail, use an App Password (not your regular password)"}
            </p>
          </div>
        </div>
      )}

      <div className="border-t border-background pt-6">
        <h3 className="text-xl font-semibold text-accent mb-4">
          Recipient Emails
        </h3>
        <p className="text-text-secondary mb-4">
          Set different email addresses for each inquiry type
        </p>

        <div className="mb-4">
          <label className="block text-accent font-medium mb-2">
            General Inquiry Recipient
          </label>
          <input
            type="email"
            value={settings.contact_form_recipient || ""}
            onChange={(e) =>
              handleInputChange(
                "contact_form_recipient",
                e.target.value
              )
            }
            placeholder="info@soulfeltmusic.com"
            className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <p className="text-sm text-text-secondary mt-1">
            Receives general contact form submissions
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-accent font-medium mb-2">
            Artist Submission Recipient
          </label>
          <input
            type="email"
            value={settings.artist_submission_recipient || ""}
            onChange={(e) =>
              handleInputChange(
                "artist_submission_recipient",
                e.target.value
              )
            }
            placeholder="artists@soulfeltmusic.com"
            className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <p className="text-sm text-text-secondary mt-1">
            Receives artist submission inquiries
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-accent font-medium mb-2">
            Press & Media Recipient
          </label>
          <input
            type="email"
            value={settings.press_media_recipient || ""}
            onChange={(e) =>
              handleInputChange("press_media_recipient", e.target.value)
            }
            placeholder="press@soulfeltmusic.com"
            className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <p className="text-sm text-text-secondary mt-1">
            Receives press and media inquiries
          </p>
        </div>
      </div>

      <div className="border-t border-background pt-6">
        <h3 className="text-xl font-semibold text-accent mb-4">
          Email Options
        </h3>

        <div className="mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={settings.contact_form_auto_reply || false}
              onChange={(e) =>
                handleInputChange(
                  "contact_form_auto_reply",
                  e.target.checked
                )
              }
              className="w-5 h-5 text-primary bg-background border-primary rounded focus:ring-2 focus:ring-primary"
            />
            <span className="text-accent font-medium">
              Send Auto-Reply to Customers
            </span>
          </label>
          <p className="text-sm text-text-secondary mt-1 ml-7">
            Automatically send a confirmation email to form submitters
          </p>
        </div>

        {settings.contact_form_auto_reply && (
          <div className="mb-4 ml-7 p-4 bg-background/50 rounded-lg border border-primary/30">
            <label className="block text-accent font-medium mb-2">
              Auto-Reply Message
            </label>
            <textarea
              value={settings.auto_reply_message || ""}
              onChange={(e) =>
                handleInputChange("auto_reply_message", e.target.value)
              }
              placeholder="We have received your message and will get back to you as soon as possible."
              rows="4"
              className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-sm text-text-secondary mt-1">
              Customize the message customers receive. Available
              variables: {"{name}"}, {"{inquiry_type}"},{" "}
              {"{business_name}"}
            </p>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-accent font-medium mb-2">
            Email Subject Prefix
          </label>
          <input
            type="text"
            value={settings.contact_form_subject_prefix || ""}
            onChange={(e) =>
              handleInputChange(
                "contact_form_subject_prefix",
                e.target.value
              )
            }
            placeholder="[Soul Felt Music]"
            className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <p className="text-sm text-text-secondary mt-1">
            Prefix added to email subjects (e.g., [Soul Felt Music] New
            Contact Form)
          </p>
        </div>
      </div>

      <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mt-6">
        <h4 className="text-accent font-semibold mb-2">
          📝 Setup Instructions
        </h4>
        <ul className="text-sm text-text-secondary space-y-2 ml-4 list-disc">
          <li>
            <strong>Gmail:</strong> Enable 2FA, then create an App
            Password at myaccount.google.com/apppasswords
          </li>
          <li>
            <strong>SendGrid:</strong> Use "apikey" as username and your
            API key as password
          </li>
          <li>
            <strong>Other providers:</strong> Check your email
            provider's SMTP documentation
          </li>
          <li>
            Test your settings by submitting a contact form after saving
          </li>
        </ul>
      </div>
    </div>
  );
}
