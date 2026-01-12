import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaTiktok,
  FaSpotify,
  FaSoundcloud,
  FaDiscord,
  FaTwitch,
  FaRedditAlien,
  FaPinterest,
  FaSnapchatGhost,
  FaTelegram,
  FaWhatsapp,
  FaGithub,
  FaBandcamp,
  FaDeezer,
  FaApple,
  FaAmazon,
  FaPatreon,
} from "react-icons/fa";
import { SiTidal, SiNapster } from "react-icons/si";

const ContactInfoTab = ({ 
  settings, 
  handleInputChange,
  customTimeMode,
  setCustomTimeMode,
  renderCustomTimePicker,
  showAddCustom,
  setShowAddCustom,
  customPlatform,
  setCustomPlatform,
  addCustomSocialMedia,
  handleSocialMediaChange,
  removeSocialMedia,
  availablePlatforms
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary mb-4">
        Contact Information
      </h2>

      <div>
        <label className="block text-accent font-medium mb-2">Email</label>
        <input
          type="email"
          value={settings.contact_email || ""}
          onChange={(e) => handleInputChange("contact_email", e.target.value)}
          placeholder="contact@example.com"
          className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-accent font-medium mb-2">Phone</label>
        <input
          type="tel"
          value={settings.contact_phone || ""}
          onChange={(e) => handleInputChange("contact_phone", e.target.value)}
          placeholder="+1 (555) 123-4567"
          className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-accent font-medium mb-2">Address</label>
        <textarea
          value={settings.contact_address || ""}
          onChange={(e) => handleInputChange("contact_address", e.target.value)}
          placeholder="123 Main St, City, State 12345"
          rows="3"
          className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="border-t border-background pt-6">
        <h3 className="text-xl font-semibold text-accent mb-4">Office Hours</h3>

        <div className="mb-4">
          <label className="block text-accent font-medium mb-2">
            Monday - Friday
          </label>
          {!customTimeMode.weekday ? (
            <div>
              <select
                value={settings.office_hours_weekday || ""}
                onChange={(e) => {
                  if (e.target.value === "custom") {
                    setCustomTimeMode((prev) => ({ ...prev, weekday: true }));
                  } else {
                    handleInputChange("office_hours_weekday", e.target.value);
                  }
                }}
                className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Closed">Closed</option>
                <option value="8:00 AM - 5:00 PM">8:00 AM - 5:00 PM</option>
                <option value="9:00 AM - 5:00 PM">9:00 AM - 5:00 PM</option>
                <option value="9:00 AM - 6:00 PM">9:00 AM - 6:00 PM</option>
                <option value="10:00 AM - 6:00 PM">10:00 AM - 6:00 PM</option>
                <option value="8:00 AM - 8:00 PM">8:00 AM - 8:00 PM</option>
                <option value="9:00 AM - 8:00 PM">9:00 AM - 8:00 PM</option>
                <option value="24/7">24/7</option>
                {settings.office_hours_weekday &&
                  ![
                    "Closed",
                    "8:00 AM - 5:00 PM",
                    "9:00 AM - 5:00 PM",
                    "9:00 AM - 6:00 PM",
                    "10:00 AM - 6:00 PM",
                    "8:00 AM - 8:00 PM",
                    "9:00 AM - 8:00 PM",
                    "24/7",
                  ].includes(settings.office_hours_weekday) && (
                    <option value={settings.office_hours_weekday}>
                      {settings.office_hours_weekday}
                    </option>
                  )}
                <option value="custom">Custom Time...</option>
              </select>
              {settings.office_hours_weekday &&
                ![
                  "Closed",
                  "8:00 AM - 5:00 PM",
                  "9:00 AM - 5:00 PM",
                  "9:00 AM - 6:00 PM",
                  "10:00 AM - 6:00 PM",
                  "8:00 AM - 8:00 PM",
                  "9:00 AM - 8:00 PM",
                  "24/7",
                ].includes(settings.office_hours_weekday) && (
                  <button
                    type="button"
                    onClick={() =>
                      setCustomTimeMode((prev) => ({ ...prev, weekday: true }))
                    }
                    className="mt-2 text-sm text-primary hover:underline"
                  >
                    Edit custom time
                  </button>
                )}
            </div>
          ) : (
            renderCustomTimePicker("weekday", "office_hours_weekday")
          )}
        </div>

        <div className="mb-4">
          <label className="block text-accent font-medium mb-2">Saturday</label>
          {!customTimeMode.saturday ? (
            <div>
              <select
                value={settings.office_hours_saturday || ""}
                onChange={(e) => {
                  if (e.target.value === "custom") {
                    setCustomTimeMode((prev) => ({ ...prev, saturday: true }));
                  } else {
                    handleInputChange("office_hours_saturday", e.target.value);
                  }
                }}
                className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Closed">Closed</option>
                <option value="8:00 AM - 12:00 PM">8:00 AM - 12:00 PM</option>
                <option value="9:00 AM - 1:00 PM">9:00 AM - 1:00 PM</option>
                <option value="10:00 AM - 2:00 PM">10:00 AM - 2:00 PM</option>
                <option value="10:00 AM - 4:00 PM">10:00 AM - 4:00 PM</option>
                <option value="9:00 AM - 5:00 PM">9:00 AM - 5:00 PM</option>
                <option value="9:00 AM - 6:00 PM">9:00 AM - 6:00 PM</option>
                <option value="24/7">24/7</option>
                {settings.office_hours_saturday &&
                  ![
                    "Closed",
                    "8:00 AM - 12:00 PM",
                    "9:00 AM - 1:00 PM",
                    "10:00 AM - 2:00 PM",
                    "10:00 AM - 4:00 PM",
                    "9:00 AM - 5:00 PM",
                    "9:00 AM - 6:00 PM",
                    "24/7",
                  ].includes(settings.office_hours_saturday) && (
                    <option value={settings.office_hours_saturday}>
                      {settings.office_hours_saturday}
                    </option>
                  )}
                <option value="custom">Custom Time...</option>
              </select>
              {settings.office_hours_saturday &&
                ![
                  "Closed",
                  "8:00 AM - 12:00 PM",
                  "9:00 AM - 1:00 PM",
                  "10:00 AM - 2:00 PM",
                  "10:00 AM - 4:00 PM",
                  "9:00 AM - 5:00 PM",
                  "9:00 AM - 6:00 PM",
                  "24/7",
                ].includes(settings.office_hours_saturday) && (
                  <button
                    type="button"
                    onClick={() =>
                      setCustomTimeMode((prev) => ({ ...prev, saturday: true }))
                    }
                    className="mt-2 text-sm text-primary hover:underline"
                  >
                    Edit custom time
                  </button>
                )}
            </div>
          ) : (
            renderCustomTimePicker("saturday", "office_hours_saturday")
          )}
        </div>

        <div className="mb-4">
          <label className="block text-accent font-medium mb-2">Sunday</label>
          {!customTimeMode.sunday ? (
            <div>
              <select
                value={settings.office_hours_sunday || ""}
                onChange={(e) => {
                  if (e.target.value === "custom") {
                    setCustomTimeMode((prev) => ({ ...prev, sunday: true }));
                  } else {
                    handleInputChange("office_hours_sunday", e.target.value);
                  }
                }}
                className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Closed">Closed</option>
                <option value="8:00 AM - 12:00 PM">8:00 AM - 12:00 PM</option>
                <option value="9:00 AM - 1:00 PM">9:00 AM - 1:00 PM</option>
                <option value="10:00 AM - 2:00 PM">10:00 AM - 2:00 PM</option>
                <option value="10:00 AM - 4:00 PM">10:00 AM - 4:00 PM</option>
                <option value="9:00 AM - 5:00 PM">9:00 AM - 5:00 PM</option>
                <option value="9:00 AM - 6:00 PM">9:00 AM - 6:00 PM</option>
                <option value="24/7">24/7</option>
                {settings.office_hours_sunday &&
                  ![
                    "Closed",
                    "8:00 AM - 12:00 PM",
                    "9:00 AM - 1:00 PM",
                    "10:00 AM - 2:00 PM",
                    "10:00 AM - 4:00 PM",
                    "9:00 AM - 5:00 PM",
                    "9:00 AM - 6:00 PM",
                    "24/7",
                  ].includes(settings.office_hours_sunday) && (
                    <option value={settings.office_hours_sunday}>
                      {settings.office_hours_sunday}
                    </option>
                  )}
                <option value="custom">Custom Time...</option>
              </select>
              {settings.office_hours_sunday &&
                ![
                  "Closed",
                  "8:00 AM - 12:00 PM",
                  "9:00 AM - 1:00 PM",
                  "10:00 AM - 2:00 PM",
                  "10:00 AM - 4:00 PM",
                  "9:00 AM - 5:00 PM",
                  "9:00 AM - 6:00 PM",
                  "24/7",
                ].includes(settings.office_hours_sunday) && (
                  <button
                    type="button"
                    onClick={() =>
                      setCustomTimeMode((prev) => ({ ...prev, sunday: true }))
                    }
                    className="mt-2 text-sm text-primary hover:underline"
                  >
                    Edit custom time
                  </button>
                )}
            </div>
          ) : (
            renderCustomTimePicker("sunday", "office_hours_sunday")
          )}
        </div>

        <div className="mb-4">
          <label className="block text-accent font-medium mb-2">Timezone</label>
          <select
            value={settings.office_hours_timezone || ""}
            onChange={(e) =>
              handleInputChange("office_hours_timezone", e.target.value)
            }
            className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="EST">Eastern Standard Time (EST)</option>
            <option value="CST">Central Standard Time (CST)</option>
            <option value="MST">Mountain Standard Time (MST)</option>
            <option value="PST">Pacific Standard Time (PST)</option>
            <option value="AKST">Alaska Standard Time (AKST)</option>
            <option value="HST">Hawaii Standard Time (HST)</option>
            <option value="GMT">Greenwich Mean Time (GMT)</option>
            <option value="UTC">Coordinated Universal Time (UTC)</option>
            <option value="CET">Central European Time (CET)</option>
            <option value="IST">India Standard Time (IST)</option>
            <option value="JST">Japan Standard Time (JST)</option>
            <option value="AEST">Australian Eastern Standard Time (AEST)</option>
          </select>
        </div>
      </div>

      <div className="border-t border-background pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-accent">Social Media Links</h3>
          <button
            type="button"
            onClick={() => setShowAddCustom(!showAddCustom)}
            className="px-4 py-2 bg-primary text-accent rounded-lg hover:bg-primary/80 transition text-sm font-medium"
          >
            {showAddCustom ? "Cancel" : "+ Add Custom Link"}
          </button>
        </div>

        <p className="text-text-secondary mb-6 text-sm">
          Select platforms and add your profile URLs. Toggle switches to enable/disable links on your website.
        </p>

        {/* Add Custom Link Form */}
        {showAddCustom && (
          <div className="mb-6 p-4 bg-primary/10 border border-primary/30 rounded-lg">
            <h4 className="text-accent font-medium mb-3">Add Custom Social Media Link</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-accent text-sm font-medium mb-1">Platform Name</label>
                <input
                  type="text"
                  value={customPlatform.name}
                  onChange={(e) =>
                    setCustomPlatform({ ...customPlatform, name: e.target.value })
                  }
                  placeholder="e.g., MySpace, Threads, etc."
                  className="w-full px-3 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
              <div>
                <label className="block text-accent text-sm font-medium mb-1">Profile URL</label>
                <input
                  type="url"
                  value={customPlatform.url}
                  onChange={(e) =>
                    setCustomPlatform({ ...customPlatform, url: e.target.value })
                  }
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
              <button
                type="button"
                onClick={addCustomSocialMedia}
                className="w-full px-4 py-2 bg-primary text-accent rounded-lg hover:bg-primary/80 transition text-sm font-medium"
              >
                Add Link
              </button>
            </div>
          </div>
        )}

        {/* Social Media Platforms List */}
        <div className="space-y-3">
          {availablePlatforms.map((platform) => {
            const Icon = platform.icon;
            const platformData = settings.social_media_links?.[platform.id] || {
              url: "",
              enabled: false,
            };
            const isConfigured = Boolean(platformData.url);

            return (
              <div
                key={platform.id}
                className={`p-4 rounded-lg border transition-all ${
                  isConfigured
                    ? "border-primary/50 bg-primary/5"
                    : "border-background bg-background/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xl"
                    style={{ backgroundColor: platform.color }}
                  >
                    <Icon />
                  </div>

                  {/* Platform Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-accent font-medium">{platform.name}</h4>
                      {isConfigured && (
                        <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded">
                          Configured
                        </span>
                      )}
                    </div>
                    <input
                      type="url"
                      value={platformData.url || ""}
                      onChange={(e) =>
                        handleSocialMediaChange(platform.id, "url", e.target.value)
                      }
                      placeholder={`https://${platform.id}.com/your-profile`}
                      className="w-full px-3 py-1.5 bg-background text-text-primary border border-primary/30 rounded focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>

                  {/* Enable/Disable Toggle */}
                  <div className="flex flex-col items-center gap-1">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={platformData.enabled || false}
                        onChange={(e) =>
                          handleSocialMediaChange(
                            platform.id,
                            "enabled",
                            e.target.checked
                          )
                        }
                        disabled={!isConfigured}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-background peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"></div>
                    </label>
                    <span className="text-xs text-text-secondary">
                      {platformData.enabled ? "Visible" : "Hidden"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Custom Links */}
          {settings.social_media_links &&
            Object.keys(settings.social_media_links)
              .filter((key) => key.startsWith("custom_"))
              .map((customKey) => {
                const customData = settings.social_media_links[customKey];
                return (
                  <div
                    key={customKey}
                    className="p-4 rounded-lg border border-primary/50 bg-primary/5"
                  >
                    <div className="flex items-center gap-4">
                      {/* Custom Icon */}
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-primary to-secondary text-white text-xl">
                        🔗
                      </div>

                      {/* Custom Platform Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-accent font-medium">
                            {customData.name || "Custom Link"}
                          </h4>
                          <span className="px-2 py-0.5 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary text-xs rounded">
                            Custom
                          </span>
                        </div>
                        <input
                          type="url"
                          value={customData.url || ""}
                          onChange={(e) =>
                            handleSocialMediaChange(customKey, "url", e.target.value)
                          }
                          placeholder="https://..."
                          className="w-full px-3 py-1.5 bg-background text-text-primary border border-primary/30 rounded focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                        />
                      </div>

                      {/* Enable/Disable Toggle */}
                      <div className="flex flex-col items-center gap-1">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={customData.enabled || false}
                            onChange={(e) =>
                              handleSocialMediaChange(
                                customKey,
                                "enabled",
                                e.target.checked
                              )
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-background peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                        <span className="text-xs text-text-secondary">
                          {customData.enabled ? "Visible" : "Hidden"}
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeSocialMedia(customKey)}
                        className="px-3 py-1 bg-red-500/20 text-red-500 rounded hover:bg-red-500/30 transition text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
        </div>

        <div className="mt-4 p-3 bg-background/50 rounded-lg border border-primary/20">
          <p className="text-sm text-text-secondary">
            💡 <strong>Tip:</strong> Only enabled links with URLs will appear on
            your website. Use the toggle switches to show/hide links without
            deleting them.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoTab;
