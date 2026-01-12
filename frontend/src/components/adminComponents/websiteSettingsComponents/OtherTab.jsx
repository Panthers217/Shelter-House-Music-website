import React from "react";

const OtherTab = ({ settings, handleInputChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary mb-4">Other Settings</h2>

      <div>
        <label className="block text-accent font-medium mb-2">
          Payment Currency
        </label>
        <select
          value={settings.payment_currency || "USD"}
          onChange={(e) => handleInputChange("payment_currency", e.target.value)}
          className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="USD">USD - US Dollar</option>
          <option value="EUR">EUR - Euro</option>
          <option value="GBP">GBP - British Pound</option>
          <option value="CAD">CAD - Canadian Dollar</option>
        </select>
      </div>

      <div>
        <label className="block text-accent font-medium mb-2">Tax Rate (%)</label>
        <input
          type="number"
          step="0.01"
          value={settings.tax_rate || 0}
          onChange={(e) =>
            handleInputChange("tax_rate", parseFloat(e.target.value))
          }
          className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-accent font-medium mb-2">
          Items Per Page
        </label>
        <input
          type="number"
          value={settings.items_per_page || 20}
          onChange={(e) =>
            handleInputChange("items_per_page", parseInt(e.target.value))
          }
          className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-accent font-medium mb-2">
          Max Upload Size (MB)
        </label>
        <input
          type="number"
          value={settings.max_upload_size_mb || 50}
          onChange={(e) =>
            handleInputChange(
              "max_upload_size_mb",
              parseInt(e.target.value)
            )
          }
          className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>
  );
};

export default OtherTab;
