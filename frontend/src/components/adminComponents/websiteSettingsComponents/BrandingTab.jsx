import React from "react";

const BrandingTab = ({
  settings,
  handleInputChange,
  logoInputMode="url",
  setLogoInputMode,
  uploadingLogo,
  handleLogoUpload,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary mb-4">Branding</h2>

      <div>
        <label className="block text-accent font-medium mb-2">
          Business Name
        </label>
        <input
          type="text"
          value={settings.business_name || ""}
          onChange={(e) => handleInputChange("business_name", e.target.value)}
          className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-accent font-medium mb-2">Logo</label>

        {/* Toggle between URL and Upload */}
        <div className="flex gap-2 mb-3">
          <button
            type="button"
            onClick={() => setLogoInputMode("url")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              logoInputMode === "url"
                ? "bg-primary text-white"
                : "bg-background-secondary text-text-secondary hover:bg-background-tertiary"
            }`}
          >
            URL Input
          </button>
        </div>

        {/* URL Input Mode */}
        {logoInputMode === "url" && (
          <input
            type="text"
            value={settings.logo_url || ""}
            onChange={(e) => handleInputChange("logo_url", e.target.value)}
            placeholder="https://example.com/logo.png"
            className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        )}

        {/* File Upload Mode */}
        {logoInputMode === "upload" && (
          <div className="space-y-2">
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp"
              onChange={handleLogoUpload}
              disabled={uploadingLogo}
              className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-white hover:file:bg-accent file:cursor-pointer cursor-pointer"
            />
            <p className="text-xs text-text-secondary">
              Recommended: PNG or SVG with transparent background. Max size: 5MB
            </p>
            {uploadingLogo && (
              <div className="flex items-center gap-2 text-primary">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                <span>Uploading...</span>
              </div>
            )}
          </div>
        )}

        {/* Logo Preview */}
        {settings.logo_url && (
          <div className="mt-4 p-4 bg-background-secondary rounded-lg">
            <p className="text-sm text-text-secondary mb-2">Preview:</p>
            <img
              src={settings.logo_url}
              alt="Logo preview"
              className="h-20 object-contain"
            />
            <p className="text-xs text-text-secondary mt-2 break-all">
              {settings.logo_url}
            </p>
          </div>
        )}
      </div>

      <div>
        <label className="block text-accent font-medium mb-2">
          Favicon URL
        </label>
        <input
          type="text"
          value={settings.favicon_url || ""}
          onChange={(e) => handleInputChange("favicon_url", e.target.value)}
          placeholder="https://example.com/favicon.ico"
          className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Logo Text Lines */}
      <div className="border-t border-primary pt-6 mt-6">
        <h3 className="text-xl font-semibold text-accent mb-4">
          Fallback Logo Text (when no logo image is uploaded)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-accent font-medium mb-2">
              Logo Line 1 (Top Text)
            </label>
            <input
              type="text"
              value={settings.logo_line1 || ""}
              onChange={(e) => handleInputChange("logo_line1", e.target.value)}
              placeholder="SOULFELT"
              maxLength={100}
              className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-text-secondary mt-1">
              First line of text shown when logo image is not available
            </p>
          </div>

          <div>
            <label className="block text-accent font-medium mb-2">
              Logo Line 2 (Bottom Text)
            </label>
            <input
              type="text"
              value={settings.logo_line2 || ""}
              onChange={(e) => handleInputChange("logo_line2", e.target.value)}
              placeholder="MUSIC"
              maxLength={100}
              className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-text-secondary mt-1">
              Second line of text shown when logo image is not available
            </p>
          </div>
        </div>

        {/* Preview of text logo */}
        <div className="mt-4 p-4 bg-background-secondary rounded-lg">
          <p className="text-sm text-text-secondary mb-2">Text Logo Preview:</p>
          <div className="flex flex-col items-center bg-[#0c0504] p-4 rounded">
            <span className="text-[#e6cfa7] text-xs tracking-widest">
              {settings.logo_line1 || "SOULFELT"}
            </span>
            <span className="text-[#e6cfa7] text-lg font-medium tracking-widest">
              {settings.logo_line2 || "MUSIC"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingTab;
