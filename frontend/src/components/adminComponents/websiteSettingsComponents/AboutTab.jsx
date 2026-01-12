export default function AboutTab({ settings, handleInputChange }) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-primary mb-4">
        About Page Settings
      </h2>

      {/* Hero Section */}
      <div className="bg-primary/10 p-6 rounded-lg border border-primary/30">
        <h3 className="text-xl font-bold text-accent mb-4">Hero Section</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-accent font-medium mb-2">
              Page Title
            </label>
            <input
              type="text"
              value={settings.about_page_title || ""}
              onChange={(e) => handleInputChange("about_page_title", e.target.value)}
              placeholder="About Us"
              className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-accent font-medium mb-2">
              Hero Tagline
            </label>
            <textarea
              value={settings.about_hero_tagline || ""}
              onChange={(e) => handleInputChange("about_hero_tagline", e.target.value)}
              placeholder="Where passion meets melody, and artists connect with souls who truly feel the music."
              rows="2"
              className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="bg-primary/10 p-6 rounded-lg border border-primary/30">
        <h3 className="text-xl font-bold text-accent mb-4">Our Story</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-accent font-medium mb-2">
              Story Paragraph 1
            </label>
            <textarea
              value={settings.about_story_paragraph1 || ""}
              onChange={(e) => handleInputChange("about_story_paragraph1", e.target.value)}
              placeholder="Tell your origin story..."
              rows="4"
              className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-accent font-medium mb-2">
              Story Paragraph 2
            </label>
            <textarea
              value={settings.about_story_paragraph2 || ""}
              onChange={(e) => handleInputChange("about_story_paragraph2", e.target.value)}
              placeholder="Describe your values and approach..."
              rows="4"
              className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-accent font-medium mb-2">
              Story Paragraph 3
            </label>
            <textarea
              value={settings.about_story_paragraph3 || ""}
              onChange={(e) => handleInputChange("about_story_paragraph3", e.target.value)}
              placeholder="Share your current status and future..."
              rows="4"
              className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-primary/10 p-6 rounded-lg border border-primary/30">
        <h3 className="text-xl font-bold text-accent mb-4">Mission & Vision</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-accent font-medium mb-2">
              Mission Statement
            </label>
            <textarea
              value={settings.about_mission || ""}
              onChange={(e) => handleInputChange("about_mission", e.target.value)}
              placeholder="What is your company's mission?"
              rows="3"
              className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-accent font-medium mb-2">
              Vision Statement
            </label>
            <textarea
              value={settings.about_vision || ""}
              onChange={(e) => handleInputChange("about_vision", e.target.value)}
              placeholder="What is your long-term vision?"
              rows="3"
              className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-primary/10 p-6 rounded-lg border border-primary/30">
        <h3 className="text-xl font-bold text-accent mb-4">Impact Statistics</h3>
        <p className="text-text-secondary text-sm mb-4">Display key metrics about your platform</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-accent font-medium mb-2">
              Stat 1 - Number
            </label>
            <input
              type="text"
              value={settings.about_stat1_number || ""}
              onChange={(e) => handleInputChange("about_stat1_number", e.target.value)}
              placeholder="10K+"
              className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-accent font-medium mb-2">
              Stat 1 - Label
            </label>
            <input
              type="text"
              value={settings.about_stat1_label || ""}
              onChange={(e) => handleInputChange("about_stat1_label", e.target.value)}
              placeholder="Active Listeners"
              className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-accent font-medium mb-2">
              Stat 2 - Number
            </label>
            <input
              type="text"
              value={settings.about_stat2_number || ""}
              onChange={(e) => handleInputChange("about_stat2_number", e.target.value)}
              placeholder="500+"
              className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-accent font-medium mb-2">
              Stat 2 - Label
            </label>
            <input
              type="text"
              value={settings.about_stat2_label || ""}
              onChange={(e) => handleInputChange("about_stat2_label", e.target.value)}
              placeholder="Artists"
              className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-accent font-medium mb-2">
              Stat 3 - Number
            </label>
            <input
              type="text"
              value={settings.about_stat3_number || ""}
              onChange={(e) => handleInputChange("about_stat3_number", e.target.value)}
              placeholder="5K+"
              className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-accent font-medium mb-2">
              Stat 3 - Label
            </label>
            <input
              type="text"
              value={settings.about_stat3_label || ""}
              onChange={(e) => handleInputChange("about_stat3_label", e.target.value)}
              placeholder="Tracks"
              className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-accent font-medium mb-2">
              Stat 4 - Number
            </label>
            <input
              type="text"
              value={settings.about_stat4_number || ""}
              onChange={(e) => handleInputChange("about_stat4_number", e.target.value)}
              placeholder="100+"
              className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-accent font-medium mb-2">
              Stat 4 - Label
            </label>
            <input
              type="text"
              value={settings.about_stat4_label || ""}
              onChange={(e) => handleInputChange("about_stat4_label", e.target.value)}
              placeholder="Albums"
              className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-primary/10 p-6 rounded-lg border border-primary/30">
        <h3 className="text-xl font-bold text-accent mb-4">Core Values</h3>
        <p className="text-text-secondary text-sm mb-4">Define what your company stands for (4 values)</p>
        
        <div className="space-y-6">
          {/* Value 1 */}
          <div className="border border-primary/20 p-4 rounded-lg">
            <h4 className="font-semibold text-accent mb-3">Value 1</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-accent font-medium mb-2 text-sm">
                  Title
                </label>
                <input
                  type="text"
                  value={settings.about_value1_title || ""}
                  onChange={(e) => handleInputChange("about_value1_title", e.target.value)}
                  placeholder="Quality Music"
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-accent font-medium mb-2 text-sm">
                  Description
                </label>
                <textarea
                  value={settings.about_value1_desc || ""}
                  onChange={(e) => handleInputChange("about_value1_desc", e.target.value)}
                  placeholder="Brief description of this value..."
                  rows="2"
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Value 2 */}
          <div className="border border-primary/20 p-4 rounded-lg">
            <h4 className="font-semibold text-accent mb-3">Value 2</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-accent font-medium mb-2 text-sm">
                  Title
                </label>
                <input
                  type="text"
                  value={settings.about_value2_title || ""}
                  onChange={(e) => handleInputChange("about_value2_title", e.target.value)}
                  placeholder="Artist Support"
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-accent font-medium mb-2 text-sm">
                  Description
                </label>
                <textarea
                  value={settings.about_value2_desc || ""}
                  onChange={(e) => handleInputChange("about_value2_desc", e.target.value)}
                  placeholder="Brief description of this value..."
                  rows="2"
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Value 3 */}
          <div className="border border-primary/20 p-4 rounded-lg">
            <h4 className="font-semibold text-accent mb-3">Value 3</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-accent font-medium mb-2 text-sm">
                  Title
                </label>
                <input
                  type="text"
                  value={settings.about_value3_title || ""}
                  onChange={(e) => handleInputChange("about_value3_title", e.target.value)}
                  placeholder="Community First"
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-accent font-medium mb-2 text-sm">
                  Description
                </label>
                <textarea
                  value={settings.about_value3_desc || ""}
                  onChange={(e) => handleInputChange("about_value3_desc", e.target.value)}
                  placeholder="Brief description of this value..."
                  rows="2"
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Value 4 */}
          <div className="border border-primary/20 p-4 rounded-lg">
            <h4 className="font-semibold text-accent mb-3">Value 4</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-accent font-medium mb-2 text-sm">
                  Title
                </label>
                <input
                  type="text"
                  value={settings.about_value4_title || ""}
                  onChange={(e) => handleInputChange("about_value4_title", e.target.value)}
                  placeholder="Excellence"
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-accent font-medium mb-2 text-sm">
                  Description
                </label>
                <textarea
                  value={settings.about_value4_desc || ""}
                  onChange={(e) => handleInputChange("about_value4_desc", e.target.value)}
                  placeholder="Brief description of this value..."
                  rows="2"
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary/10 p-6 rounded-lg border border-primary/30">
        <h3 className="text-xl font-bold text-accent mb-4">Call to Action Section</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-accent font-medium mb-2">
              CTA Title
            </label>
            <input
              type="text"
              value={settings.about_cta_title || ""}
              onChange={(e) => handleInputChange("about_cta_title", e.target.value)}
              placeholder="Join Our Community"
              className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-accent font-medium mb-2">
              CTA Description
            </label>
            <textarea
              value={settings.about_cta_description || ""}
              onChange={(e) => handleInputChange("about_cta_description", e.target.value)}
              placeholder="Encourage visitors to take action..."
              rows="3"
              className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
        <p className="text-sm text-text-secondary">
          <strong className="text-accent">Note:</strong> Contact information (email, phone, address) is managed in the Contact Info tab.
        </p>
      </div>
    </div>
  );
}
