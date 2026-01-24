import React, { useState, useEffect } from "react";
import CalendarIcon from "../modal/CalendarIcon";
import CalendarModal from "../modal/CalendarModal";
import axios from "axios";

const InputFields = ({
  fields,
  fieldValues,
  setFieldValues,
  requiredFields = [],
  booleanFields = [],
  isRestrictedField = () => false,
  validateIdFields = () => ({}),
}) => {
  // Get validation errors for _id fields
  const idFieldErrors = validateIdFields(fieldValues);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [genres, setGenres] = useState([]);

  // Fetch active genres on component mount
  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/genres/active`);
        setGenres(response.data.genres || []);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    }
    fetchGenres();
  }, []);

  // Helper to check if a field is a genre field
  const isGenreField = (field) => field.toLowerCase().includes('genre');

  // Helper to check if a field is merch_type
  const isMerchTypeField = (field) => field === 'merch_type';

  // Ministry Resources type options (matching database ENUM)
  const merchTypeOptions = ['Apparel', 'Accessories', 'Posters & Art', 'Merchandise'];

  // Helper to check if a field is album_type
  const isAlbumTypeField = (field) => field === 'album_type';

  // Album type options (matching database ENUM)
  const albumTypeOptions = ['Digital Album', 'Physical Album', 'Limited Edition', 'EP', 'Single'];

  // Helper to parse genre value (comma-separated string to array)
  const parseGenreValue = (value) => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    return value.split(',').map(g => g.trim()).filter(g => g);
  };

  // Helper to handle genre selection
  const handleGenreChange = (field, selectedOptions) => {
    const selectedGenres = Array.from(selectedOptions)
      .filter(option => option.selected)
      .map(option => option.value);
    
    // Store as comma-separated string to match database format
    setFieldValues({
      ...fieldValues,
      [field]: selectedGenres.join(', ')
    });
  };

  // Helper to check if a field is release_date
  const isReleaseDate = (field) => field === "release_date";

  // Helper to format date as yyyy-mm-dd
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  // Helper to check if a field is boolean
  const isBooleanField = (field) => booleanFields.includes(field);

  // Helper to convert dropdown value to 0/1 for fieldValues
  const handleBooleanChange = (field, value) => {
    setFieldValues({
      ...fieldValues,
      [field]: value === 'true' ? 1 : 0,
    });
  };

  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Enter values for selected fields:</h3>
      {fields.map((field, i) => (
        <div key={field} className="mb-2 relative">
          <label className="block mb-1">{field}</label>
          {/* Show error for _id fields */}
          {field.endsWith('_id') && idFieldErrors[field] && (
            <span className="text-red-500 text-xs block mb-1">{idFieldErrors[field]}</span>
          )}
          {field === "cover_url" ||
          field === "image_url" ||
          field === "promo_audio_url" ||
          field === "promo_video_url" ||
          field === "video_url" ||
          field === "audio_url" ? (
            <>
              <input
                type="file"
                accept={
                  field === "audio_url"
                    ? "audio/*"
                    : field === "video_url"
                    ? "video/*"
                    : field === "image_url"
                    ? "image/*"
                    : field === "promo_audio_url"
                    ? "audio/*"
                    : field === "promo_video_url"
                    ? "video/*"
                    : "image/*"
                }
                onChange={(e) => {
                  setFieldValues({
                    ...fieldValues,
                    [field]: e.target.files[0],
                  });
                }}
                className="w-full p-2 border rounded mb-1"
                required={requiredFields.includes(field)}
                disabled={isRestrictedField(field)}
              />
              <span className="text-xs text-gray-500">
                (Optional: upload a file or enter a URL below)
              </span>
              <input
                type="text"
                value={
                  typeof fieldValues[field] === "string"
                    ? fieldValues[field]
                    : ""
                }
                onChange={(e) =>
                  setFieldValues({ ...fieldValues, [field]: e.target.value })
                }
                className="w-full p-2 border rounded mt-1"
                placeholder={
                  field === "audio_url"
                    ? "Audio URL (optional)"
                    : "Image URL (optional)"
                }
                required={requiredFields.includes(field)}
                disabled={isRestrictedField(field)}
              />
            </>
          ) : isReleaseDate(field) ? (
            <>
              <input
                type="text"
                value={fieldValues[field] || ""}
                onChange={(e) =>
                  setFieldValues({ ...fieldValues, [field]: e.target.value })
                }
                className="w-full p-2 border rounded pr-10"
                placeholder="YYYY-MM-DD"
                required={requiredFields.includes(field)}
                disabled={isRestrictedField(field)}
              />
              <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <CalendarIcon onClick={() => setCalendarOpen(true)} />
              </span>
              <CalendarModal
                isOpen={calendarOpen}
                onClose={() => setCalendarOpen(false)}
                onSelectDate={(date) => {
                  setFieldValues({
                    ...fieldValues,
                    [field]: formatDate(date),
                  });
                  setCalendarOpen(false);
                }}
              />
            </>
          ) : isBooleanField(field) ? (
            <select
              className="w-full p-2 border rounded"
              value={
                fieldValues[field] === 1
                  ? "true"
                  : fieldValues[field] === 0
                  ? "false"
                  : ""
              }
              onChange={(e) => handleBooleanChange(field, e.target.value)}
              required={requiredFields.includes(field)}
              disabled={isRestrictedField(field)}
            >
              <option value="" disabled>
                Select true or false
              </option>
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          ) : isGenreField(field) ? (
            <div>
              <select
                multiple
                className="w-full p-2 border rounded min-h-[120px]"
                value={parseGenreValue(fieldValues[field])}
                onChange={(e) => handleGenreChange(field, e.target.selectedOptions)}
                required={requiredFields.includes(field)}
                disabled={isRestrictedField(field)}
              >
                {genres.map(genre => (
                  <option key={genre.id} value={genre.name}>
                    {genre.name}
                  </option>
                ))}
              </select>
              <span className="text-xs text-gray-500 mt-1 block">
                Hold Ctrl (Windows) or Cmd (Mac) to select multiple genres
              </span>
              {fieldValues[field] && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {parseGenreValue(fieldValues[field]).map((genre, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {genre}
                      <button
                        type="button"
                        onClick={() => {
                          const updatedGenres = parseGenreValue(fieldValues[field])
                            .filter(g => g !== genre);
                          setFieldValues({
                            ...fieldValues,
                            [field]: updatedGenres.join(', ')
                          });
                        }}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          ) : isMerchTypeField(field) ? (
            <select
              className="w-full p-2 border rounded"
              value={fieldValues[field] || ""}
              onChange={(e) =>
                setFieldValues({ ...fieldValues, [field]: e.target.value })
              }
              required={requiredFields.includes(field)}
              disabled={isRestrictedField(field)}
            >
              <option value="">Select merchandise type</option>
              {merchTypeOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : isAlbumTypeField(field) ? (
            <select
              className="w-full p-2 border rounded"
              value={fieldValues[field] || ""}
              onChange={(e) =>
                setFieldValues({ ...fieldValues, [field]: e.target.value })
              }
              required={requiredFields.includes(field)}
              disabled={isRestrictedField(field)}
            >
              <option value="">Select album type</option>
              {albumTypeOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              autoFocus={i === 0}
              value={fieldValues[field] || ""}
              onChange={(e) =>
                setFieldValues({ ...fieldValues, [field]: e.target.value })
              }
              className="w-full p-2 border rounded"
              required={requiredFields.includes(field)}
              placeholder={
                field === "phone_number"
                  ? "e.g. 000-123-4567"
                  : field === "email"
                  ? "e.g. example@example.com"
                  : undefined
              }
              disabled={isRestrictedField(field)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default InputFields;
