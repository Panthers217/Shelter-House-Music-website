export default function HomepageTab({ settings, handleInputChange }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary mb-4">
        Homepage Settings
      </h2>

      <div>
        <label className="block text-accent font-medium mb-2">
          Hero Title
        </label>
        <input
          type="text"
          value={settings.hero_title || ""}
          onChange={(e) =>
            handleInputChange("hero_title", e.target.value)
          }
          className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-accent font-medium mb-2">
          Hero Subtitle
        </label>
        <textarea
          value={settings.hero_subtitle || ""}
          onChange={(e) =>
            handleInputChange("hero_subtitle", e.target.value)
          }
          rows="3"
          className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-accent font-medium mb-2">
          Featured Section Title
        </label>
        <input
          type="text"
          value={settings.featured_section_title || ""}
          onChange={(e) =>
            handleInputChange("featured_section_title", e.target.value)
          }
          className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-accent font-medium mb-2">
          About Us Text
        </label>
        <textarea
          value={settings.about_us_text || ""}
          onChange={(e) =>
            handleInputChange("about_us_text", e.target.value)
          }
          rows="5"
          placeholder="Tell visitors about your business..."
          className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-accent font-medium mb-2">
          Site Title (SEO)
        </label>
        <input
          type="text"
          value={settings.site_title || ""}
          onChange={(e) =>
            handleInputChange("site_title", e.target.value)
          }
          className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-accent font-medium mb-2">
          Site Description (SEO)
        </label>
        <textarea
          value={settings.site_description || ""}
          onChange={(e) =>
            handleInputChange("site_description", e.target.value)
          }
          rows="3"
          placeholder="Brief description for search engines..."
          className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-accent font-medium mb-2">
          Site Keywords (SEO)
        </label>
        <input
          type="text"
          value={settings.site_keywords || ""}
          onChange={(e) =>
            handleInputChange("site_keywords", e.target.value)
          }
          placeholder="music, artist, store, etc."
          className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>
  );
}
