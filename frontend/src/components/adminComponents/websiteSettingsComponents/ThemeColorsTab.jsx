import React from "react";

const ThemeColorsTab = ({ settings, handleInputChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary mb-4">Theme Colors</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            key: "primary_color",
            label: "Primary Color",
            desc: "Main brand color",
          },
          {
            key: "secondary_color",
            label: "Secondary Color",
            desc: "Secondary accent",
          },
          {
            key: "accent_color",
            label: "Accent Color",
            desc: "Text accent color",
          },
          {
            key: "background_color",
            label: "Background Color",
            desc: "Page background",
          },
          {
            key: "card_background",
            label: "Card Background",
            desc: "Card/section background",
          },
          {
            key: "text_primary",
            label: "Primary Text",
            desc: "Main text color",
          },
          {
            key: "text_secondary",
            label: "Secondary Text",
            desc: "Secondary text color",
          },
        ].map((color) => (
          <div key={color.key} className="flex items-center gap-4">
            <input
              type="color"
              value={settings[color.key] || "#000000"}
              onChange={(e) => handleInputChange(color.key, e.target.value)}
              className="w-20 h-20 rounded cursor-pointer"
            />
            <div className="flex-1">
              <label className="block text-accent font-medium">
                {color.label}
              </label>
              <p className="text-text-secondary text-sm">{color.desc}</p>
              <code className="text-primary text-xs">{settings[color.key]}</code>
            </div>
          </div>
        ))}
      </div>

      {/* Preview */}
      <div
        className="mt-8 p-6 rounded-lg"
        style={{ backgroundColor: settings.background_color }}
      >
        <h3
          className="text-xl font-bold mb-4"
          style={{ color: settings.accent_color }}
        >
          Theme Preview
        </h3>
        <div className="flex gap-4">
          <button
            className="px-6 py-3 rounded-lg font-semibold"
            style={{
              backgroundColor: settings.primary_color,
              color: settings.accent_color,
            }}
          >
            Primary Button
          </button>
          <button
            className="px-6 py-3 rounded-lg font-semibold"
            style={{
              backgroundColor: settings.secondary_color,
              color: settings.accent_color,
            }}
          >
            Secondary Button
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeColorsTab;
