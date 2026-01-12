export default function CloudinaryTab({ settings, handleInputChange }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary mb-4">
        Cloudinary Configuration
      </h2>

      <div>
        <label className="block text-accent font-medium mb-2">
          Cloud Name
        </label>
        <input
          type="text"
          value={settings.cloudinary_cloud_name || ""}
          onChange={(e) =>
            handleInputChange("cloudinary_cloud_name", e.target.value)
          }
          className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-accent font-medium mb-2">
          Audio Folder
        </label>
        <input
          type="text"
          value={settings.cloudinary_audio_folder || ""}
          onChange={(e) =>
            handleInputChange("cloudinary_audio_folder", e.target.value)
          }
          placeholder="YourBusiness/Audio"
          className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-accent font-medium mb-2">
          Image Folder
        </label>
        <input
          type="text"
          value={settings.cloudinary_image_folder || ""}
          onChange={(e) =>
            handleInputChange("cloudinary_image_folder", e.target.value)
          }
          placeholder="YourBusiness/Images"
          className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-accent font-medium mb-2">
          Video Folder
        </label>
        <input
          type="text"
          value={settings.cloudinary_video_folder || ""}
          onChange={(e) =>
            handleInputChange("cloudinary_video_folder", e.target.value)
          }
          placeholder="YourBusiness/Videos"
          className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-accent font-medium mb-2">
          Merchandise Folder
        </label>
        <input
          type="text"
          value={settings.cloudinary_merch_folder || ""}
          onChange={(e) =>
            handleInputChange("cloudinary_merch_folder", e.target.value)
          }
          placeholder="YourBusiness/Merch"
          className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>
  );
}
