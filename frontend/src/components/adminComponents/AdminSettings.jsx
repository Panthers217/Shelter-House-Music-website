import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useFeatures } from "../../context/FeaturesContext";
import { auth } from "../../firebase";
import toast from "react-hot-toast";
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
import { BrandingTab, ThemeColorsTab,ContactInfoTab, EmailSettingsTab,CloudinaryTab, FeaturesTab, HomepageTab, LegalTab, OtherTab, AboutTab} from "./websiteSettingsComponents";
import { Cloud } from "lucide-react";

const AdminSettings = () => {
  const { updateTheme } = useTheme();
  const { refreshFeatures } = useFeatures();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("branding");
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [logoInputMode, setLogoInputMode] = useState("url"); // 'url' or 'upload'

  // Custom time picker state for office hours
  const [customTimeMode, setCustomTimeMode] = useState({
    weekday: false,
    saturday: false,
    sunday: false,
  });

  // Time picker states for each day
  const [weekdayTime, setWeekdayTime] = useState({
    startHour: "9",
    startMinute: "00",
    startPeriod: "AM",
    endHour: "6",
    endMinute: "00",
    endPeriod: "PM",
  });
  const [saturdayTime, setSaturdayTime] = useState({
    startHour: "10",
    startMinute: "00",
    startPeriod: "AM",
    endHour: "4",
    endMinute: "00",
    endPeriod: "PM",
  });
  const [sundayTime, setSundayTime] = useState({
    startHour: "10",
    startMinute: "00",
    startPeriod: "AM",
    endHour: "2",
    endMinute: "00",
    endPeriod: "PM",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  // Initialize time picker values when settings load or custom mode is activated
  useEffect(() => {
    if (settings) {
      // Initialize weekday time
      const weekdayParsed = parseTimeString(settings.office_hours_weekday);
      if (weekdayParsed) setWeekdayTime(weekdayParsed);

      // Initialize saturday time
      const saturdayParsed = parseTimeString(settings.office_hours_saturday);
      if (saturdayParsed) setSaturdayTime(saturdayParsed);

      // Initialize sunday time
      const sundayParsed = parseTimeString(settings.office_hours_sunday);
      if (sundayParsed) setSundayTime(sundayParsed);
    }
  }, [
    settings?.office_hours_weekday,
    settings?.office_hours_saturday,
    settings?.office_hours_sunday,
  ]);

  const fetchSettings = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        toast.error("Not authenticated");
        setLoading(false);
        return;
      }
      const token = await user.getIdToken();

      const response = await fetch(
        `${import.meta.env.VITE_API_URL || ""}/api/settings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      } else {
        const errorText = await response.text();
        console.error("Settings fetch failed:", response.status, errorText);
        toast.error(`Failed to load settings: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast.error("Error loading settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        toast.error("Not authenticated");
        setSaving(false);
        return;
      }
      const token = await user.getIdToken();

      const response = await fetch(
        `${import.meta.env.VITE_API_URL || ""}/api/settings`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(settings),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const updatedSettings = data.settings || data;
        setSettings(updatedSettings);

        // Update theme context if colors changed
        updateTheme({
          primary_color: updatedSettings.primary_color,
          secondary_color: updatedSettings.secondary_color,
          accent_color: updatedSettings.accent_color,
          background_color: updatedSettings.background_color,
          card_background: updatedSettings.card_background,
          text_primary: updatedSettings.text_primary,
          text_secondary: updatedSettings.text_secondary,
          business_name: updatedSettings.business_name,
          logo_url: updatedSettings.logo_url,
        });

        // Refresh features to update feature toggles across the app
        refreshFeatures();

        toast.success("Settings saved successfully!");
      } else {
        toast.error("Failed to save settings");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Error saving settings");
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogoUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/svg+xml",
      "image/webp",
    ];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid image file (PNG, JPG, SVG, or WebP)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setUploadingLogo(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append(
      "folder",
      settings.cloudinary_image_folder || "SoulFeltMusic/SoulFeltMusicImages"
    );

    try {
      const user = auth.currentUser;
      if (!user) {
        toast.error("Not authenticated");
        return;
      }
      const token = await user.getIdToken();

      const response = await fetch(
        `${import.meta.env.VITE_API_URL || ""}/api/cloudinary/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        handleInputChange("logo_url", data.url);
        toast.success("Logo uploaded successfully!");
      } else {
        const errorText = await response.text();
        console.error("Upload failed:", errorText);
        toast.error("Failed to upload logo");
      }
    } catch (error) {
      console.error("Error uploading logo:", error);
      toast.error("Error uploading logo");
    } finally {
      setUploadingLogo(false);
    }
  };

  // Generate hour options (1-12)
  const generateHours = () => {
    return Array.from({ length: 12 }, (_, i) => i + 1);
  };

  // Generate minute options (00, 15, 30, 45)
  const generateMinutes = () => {
    return ["00", "15", "30", "45"];
  };

  // Parse time string to components
  const parseTimeString = (timeString) => {
    if (!timeString || timeString === "Closed" || timeString === "24/7")
      return null;
    const match = timeString.match(
      /^(\d{1,2}):(\d{2})\s*(AM|PM)\s*-\s*(\d{1,2}):(\d{2})\s*(AM|PM)$/
    );
    if (!match) return null;
    return {
      startHour: match[1],
      startMinute: match[2],
      startPeriod: match[3],
      endHour: match[4],
      endMinute: match[5],
      endPeriod: match[6],
    };
  };

  // Build time string from components
  const buildTimeString = (
    startHour,
    startMinute,
    startPeriod,
    endHour,
    endMinute,
    endPeriod
  ) => {
    return `${startHour}:${startMinute} ${startPeriod} - ${endHour}:${endMinute} ${endPeriod}`;
  };

  // Get the time state and setter for a specific day
  const getTimeState = (day) => {
    if (day === "weekday") return [weekdayTime, setWeekdayTime];
    if (day === "saturday") return [saturdayTime, setSaturdayTime];
    if (day === "sunday") return [sundayTime, setSundayTime];
  };

  // Render custom time picker
  const renderCustomTimePicker = (day, fieldName) => {
    const [timeState, setTimeState] = getTimeState(day);

    const applyCustomTime = () => {
      const timeString = buildTimeString(
        timeState.startHour,
        timeState.startMinute,
        timeState.startPeriod,
        timeState.endHour,
        timeState.endMinute,
        timeState.endPeriod
      );
      handleInputChange(fieldName, timeString);
      setCustomTimeMode((prev) => ({ ...prev, [day]: false }));
    };

    return (
      <div className="bg-card-background p-4 rounded-lg border border-primary/30 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Start Time */}
          <div>
            <label className="block text-accent text-sm font-medium mb-2">
              Start Time
            </label>
            <div className="flex gap-2">
              <select
                value={timeState.startHour}
                onChange={(e) =>
                  setTimeState({ ...timeState, startHour: e.target.value })
                }
                className="flex-1 px-2 py-2 bg-background text-text-primary border border-primary/50 rounded focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              >
                {generateHours().map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
              <select
                value={timeState.startMinute}
                onChange={(e) =>
                  setTimeState({ ...timeState, startMinute: e.target.value })
                }
                className="flex-1 px-2 py-2 bg-background text-text-primary border border-primary/50 rounded focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              >
                {generateMinutes().map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                value={timeState.startPeriod}
                onChange={(e) =>
                  setTimeState({ ...timeState, startPeriod: e.target.value })
                }
                className="flex-1 px-2 py-2 bg-background text-text-primary border border-primary/50 rounded focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
          {/* End Time */}
          <div>
            <label className="block text-accent text-sm font-medium mb-2">
              End Time
            </label>
            <div className="flex gap-2">
              <select
                value={timeState.endHour}
                onChange={(e) =>
                  setTimeState({ ...timeState, endHour: e.target.value })
                }
                className="flex-1 px-2 py-2 bg-background text-text-primary border border-primary/50 rounded focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              >
                {generateHours().map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
              <select
                value={timeState.endMinute}
                onChange={(e) =>
                  setTimeState({ ...timeState, endMinute: e.target.value })
                }
                className="flex-1 px-2 py-2 bg-background text-text-primary border border-primary/50 rounded focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              >
                {generateMinutes().map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                value={timeState.endPeriod}
                onChange={(e) =>
                  setTimeState({ ...timeState, endPeriod: e.target.value })
                }
                className="flex-1 px-2 py-2 bg-background text-text-primary border border-primary/50 rounded focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={applyCustomTime}
            className="px-4 py-2 bg-primary text-accent rounded hover:bg-primary/80 transition text-sm font-medium"
          >
            Apply
          </button>
          <button
            type="button"
            onClick={() =>
              setCustomTimeMode((prev) => ({ ...prev, [day]: false }))
            }
            className="px-4 py-2 bg-background text-text-primary border border-primary/50 rounded hover:bg-background/80 transition text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  // Available social media platforms with icons
  const availablePlatforms = [
    { id: "facebook", name: "Facebook", icon: FaFacebookF, color: "#1877F2" },
    { id: "twitter", name: "Twitter/X", icon: FaTwitter, color: "#1DA1F2" },
    { id: "instagram", name: "Instagram", icon: FaInstagram, color: "#E4405F" },
    { id: "youtube", name: "YouTube", icon: FaYoutube, color: "#FF0000" },
    { id: "tiktok", name: "TikTok", icon: FaTiktok, color: "#000000" },
    { id: "spotify", name: "Spotify", icon: FaSpotify, color: "#1DB954" },
    {
      id: "soundcloud",
      name: "SoundCloud",
      icon: FaSoundcloud,
      color: "#FF5500",
    },
    { id: "bandcamp", name: "Bandcamp", icon: FaBandcamp, color: "#629AA9" },
    { id: "applemusic", name: "Apple Music", icon: FaApple, color: "#FA243C" },
    { id: "tidal", name: "Tidal", icon: SiTidal, color: "#000000" },
    { id: "deezer", name: "Deezer", icon: FaDeezer, color: "#FF0092" },
    {
      id: "amazonmusic",
      name: "Amazon Music",
      icon: FaAmazon,
      color: "#FF9900",
    },
    { id: "napster", name: "Napster", icon: SiNapster, color: "#000000" },
    { id: "linkedin", name: "LinkedIn", icon: FaLinkedinIn, color: "#0A66C2" },
    { id: "discord", name: "Discord", icon: FaDiscord, color: "#5865F2" },
    { id: "twitch", name: "Twitch", icon: FaTwitch, color: "#9146FF" },
    { id: "reddit", name: "Reddit", icon: FaRedditAlien, color: "#FF4500" },
    { id: "pinterest", name: "Pinterest", icon: FaPinterest, color: "#E60023" },
    {
      id: "snapchat",
      name: "Snapchat",
      icon: FaSnapchatGhost,
      color: "#FFFC00",
    },
    { id: "telegram", name: "Telegram", icon: FaTelegram, color: "#26A5E4" },
    { id: "whatsapp", name: "WhatsApp", icon: FaWhatsapp, color: "#25D366" },
    { id: "github", name: "GitHub", icon: FaGithub, color: "#181717" },
    { id: "patreon", name: "Patreon", icon: FaPatreon, color: "#FF424D" },
  ];

  // Handle social media link changes with enabled/disabled state
  const handleSocialMediaChange = (platform, field, value) => {
    setSettings((prev) => {
      const currentLinks = prev.social_media_links || {};
      const platformData = currentLinks[platform] || {
        url: "",
        enabled: false,
      };

      return {
        ...prev,
        social_media_links: {
          ...currentLinks,
          [platform]: {
            ...platformData,
            [field]: value,
          },
        },
      };
    });
  };

  // Add custom social media platform
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [customPlatform, setCustomPlatform] = useState({
    name: "",
    url: "",
    icon: "",
  });

  const addCustomSocialMedia = () => {
    if (!customPlatform.name || !customPlatform.url) {
      toast.error("Please provide both name and URL");
      return;
    }

    const customId = `custom_${Date.now()}`;
    handleSocialMediaChange(customId, "url", customPlatform.url);
    handleSocialMediaChange(customId, "enabled", true);
    handleSocialMediaChange(customId, "name", customPlatform.name);
    handleSocialMediaChange(customId, "icon", customPlatform.icon || "FaLink");

    setCustomPlatform({ name: "", url: "", icon: "" });
    setShowAddCustom(false);
    toast.success("Custom social media link added!");
  };

  // Remove social media platform
  const removeSocialMedia = (platform) => {
    setSettings((prev) => {
      const currentLinks = { ...prev.social_media_links };
      delete currentLinks[platform];
      return {
        ...prev,
        social_media_links: currentLinks,
      };
    });
  };

  const handleResetToDefaults = async () => {
    if (
      !window.confirm(
        "⚠️ Are you sure you want to reset ALL settings to default Soul Felt Music values? This cannot be undone!"
      )
    ) {
      return;
    }

    const defaultSettings = {
      business_name: "Soul Felt Music",
      logo_url: null,
      favicon_url: null,
      logo_line1: "SOULFELT",
      logo_line2: "MUSIC",
      primary_color: "#aa2a46",
      secondary_color: "#d63c65",
      accent_color: "#fffced",
      background_color: "#1a1b22",
      card_background: "#21212b",
      text_primary: "#fffced",
      text_secondary: "#ffffff",
      contact_email: null,
      contact_phone: null,
      contact_address: null,
      office_hours_weekday: "9:00 AM - 6:00 PM",
      office_hours_saturday: "10:00 AM - 4:00 PM",
      office_hours_sunday: "Closed",
      office_hours_timezone: "EST",
      social_media_links: {
        twitter: "",
        instagram: "",
        facebook: "",
        youtube: "",
      },
      cloudinary_cloud_name: "webprojectimages",
      cloudinary_audio_folder: "SoulFeltMusic/SoulFeltMusicAudio",
      cloudinary_image_folder: "SoulFeltMusic/SoulFeltMusicImages",
      cloudinary_video_folder: "SoulFeltMusic/SoulFeltMusicVideos",
      cloudinary_merch_folder: "SoulFeltMusic/SoulFeltMusicMerch",
      enable_merchandise: true,
      enable_videos: true,
      enable_artist_profiles: true,
      enable_newsletter: true,
      enable_cart: true,
      enable_user_accounts: true,
      enable_promotional_tracks: true,
      enable_promotional_videos: true,
      enable_stripe: true,
      hero_title: "Stream & Discover Soul Felt Music",
      hero_subtitle:
        "Play samples, discover new artists, and purchase your favorite tracks and albums.",
      featured_section_title: "Featured Artists",
      about_us_text: null,
      payment_currency: "USD",
      tax_rate: 0.0,
      site_title: "Soul Felt Music",
      site_description: null,
      site_keywords: null,
      items_per_page: 20,
      max_upload_size_mb: 50,
    };

    setSaving(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        toast.error("Not authenticated");
        setSaving(false);
        return;
      }
      const token = await user.getIdToken();

      const response = await fetch(
        `${import.meta.env.VITE_API_URL || ""}/api/settings`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(defaultSettings),
        }
      );

      if (response.ok) {
        const updatedSettings = await response.json();
        setSettings(updatedSettings.settings || updatedSettings);

        // Update theme context
        updateTheme({
          primary_color: defaultSettings.primary_color,
          secondary_color: defaultSettings.secondary_color,
          accent_color: defaultSettings.accent_color,
          background_color: defaultSettings.background_color,
          card_background: defaultSettings.card_background,
          text_primary: defaultSettings.text_primary,
          text_secondary: defaultSettings.text_secondary,
          business_name: defaultSettings.business_name,
          logo_url: defaultSettings.logo_url,
          logo_line1: defaultSettings.logo_line1,
          logo_line2: defaultSettings.logo_line2,
        });

        toast.success("✅ Settings reset to defaults successfully!");
      } else {
        toast.error("Failed to reset settings");
      }
    } catch (error) {
      console.error("Error resetting settings:", error);
      toast.error("Error resetting settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-accent text-xl">Loading settings...</div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-accent text-xl">
          Failed to load settings. Please try again.
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "branding", label: "🎨 Branding", icon: "🎨" },
    { id: "theme", label: "🌈 Theme Colors", icon: "🌈" },
    { id: "contact", label: "📞 Contact Info", icon: "📞" },
    { id: "email", label: "📧 Email Settings", icon: "📧" },
    { id: "cloudinary", label: "☁️ Cloudinary", icon: "☁️" },
    { id: "features", label: "🔧 Features", icon: "🔧" },
    { id: "homepage", label: "🏠 Homepage", icon: "🏠" },
    { id: "about", label: "ℹ️ About", icon: "ℹ️" },
    { id: "legal", label: "⚖️ Legal", icon: "⚖️" },
    { id: "other", label: "⚙️ Other", icon: "⚙️" },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-accent mb-2">
            Website Settings
          </h1>
          <p className="text-text-secondary">
            Configure your website's appearance and features
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-card-bg pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === tab.id
                  ? "bg-primary text-accent"
                  : "bg-card-bg text-text-secondary hover:bg-primary/30"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-card-bg rounded-lg p-8">
          {/* Branding Tab */}
          {activeTab === "branding" && (
            <BrandingTab
              settings={settings}
              handleInputChange={handleInputChange}
            />
          )}

          {/* Theme Colors Tab */}
          {activeTab === "theme" && (
            <ThemeColorsTab
              settings={settings}
              handleInputChange={handleInputChange}
            />
          )}

          {/* Contact Info Tab */}
          {activeTab === "contact" && (
            <ContactInfoTab
              settings={settings}
              handleInputChange={handleInputChange}
              customTimeMode={customTimeMode}
              setCustomTimeMode={setCustomTimeMode}
              renderCustomTimePicker={renderCustomTimePicker}
              showAddCustom={showAddCustom}
              setShowAddCustom={setShowAddCustom}
              customPlatform={customPlatform}
              setCustomPlatform={setCustomPlatform}
              addCustomSocialMedia={addCustomSocialMedia}
              handleSocialMediaChange={handleSocialMediaChange}
              removeSocialMedia={removeSocialMedia}
              availablePlatforms={availablePlatforms}
            />
          )}

          {/* Email Settings Tab */}
          {activeTab === "email" && (
            <EmailSettingsTab
              settings={settings}
              handleInputChange={handleInputChange}
            />
          )}

          {/* Cloudinary Tab */}
          {activeTab === "cloudinary" && (
            <CloudinaryTab
              settings={settings}
              handleInputChange={handleInputChange}
            />
          )}

          {/* Features Tab */}
          {activeTab === "features" && (
            <FeaturesTab
              settings={settings}
              handleInputChange={handleInputChange}
            />
          )}

          {/* Homepage Tab */}
          {activeTab === "homepage" && (
            <HomepageTab
              settings={settings}
              handleInputChange={handleInputChange}
            />
          )}
          {/* About Tab */}
          {activeTab === "about" && (
            <AboutTab
              settings={settings}
              handleInputChange={handleInputChange}
            />
          )}

          {/* Legal Tab */}
          {activeTab === "legal" && (
            <LegalTab
              settings={settings}
              handleInputChange={handleInputChange}
            />
          )}

          {/* Other Tab */}
          {activeTab === "other" && (
            <OtherTab
              settings={settings}
              handleInputChange={handleInputChange}
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={handleResetToDefaults}
            disabled={saving}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ⚠️ Reset to Defaults
          </button>

          <div className="flex gap-4">
            <button
              onClick={() => fetchSettings()}
              className="px-6 py-3 bg-card-bg text-text-secondary rounded-lg font-semibold hover:bg-background transition"
            >
              Discard Changes
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-8 py-3 bg-primary hover:bg-secondary text-accent rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : "Save All Settings"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
