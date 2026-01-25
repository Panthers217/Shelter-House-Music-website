// Stylish TableSelector component for table selection (used in ExistingArtist)

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useApiData } from "../context/ApiDataContext";
import { useNavbar } from "../context/NavbarContext";
import CalendarModal from "./modal/CalendarModal";
import CalendarIcon from "./modal/CalendarIcon";
import ArtistSearchForm from "./ArtistSearchForm";
import axios from "axios";
import AdminSqlViewer from "./AdminSqlViewer";
import UploadNewArtist from "./adminComponents/UploadNewArtist";
import SelectFields from "./adminComponents/SelectFields";
import InputFields from "./adminComponents/InputFields";
import MultipleInputFields from "./adminComponents/MultipleInputFields";
import TableSelector from "./adminComponents/TableSelector";
import ExistingArtist from "./adminComponents/ExistingArtist";
import StatsScheduleSettings from "./adminComponents/StatsScheduleSettings";
import AdminSettings from "./adminComponents/AdminSettings";
import EventManagement from "./adminComponents/EventManagement";
import PurchaseStats from "./adminComponents/PurchaseStats";
import AdminSettingsSidebar from "./AdminComponents/AdminSettingsSidebar";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// const InputFields = ({
//   fields,
//   fieldValues,
//   setFieldValues,
//   requiredFields = [],
// }) => {
//   return (
//     <div className="mb-4">
//       <h3 className="font-semibold mb-2">Enter values for selected fields:</h3>
//       {fields.map((field, i) => (
//         <div key={field} className="mb-2">
//           <label className="block mb-1">{field}</label>
//           {field === "cover_url" ||
//           field === "image_url" ||
//           field === "promo_audio_url" ||
//           field === "promo_video_url" ||
//           field === "video_url" ||
//           field === "audio_url" ? (
//             <>
//               <input
//                 type="file"
//                 accept={
//                   field === "audio_url"
//                     ? "audio/*"
//                     : field === "video_url"
//                     ? "video/*"
//                     : field === "image_url"
//                     ? "image/*"
//                     : field === "promo_audio_url"
//                     ? "audio/*"
//                     : field === "promo_video_url"
//                     ? "video/*"
//                     : "image/*"
//                 }
//                 onChange={(e) => {
//                   setFieldValues({
//                     ...fieldValues,
//                     [field]: e.target.files[0],
//                   });
//                 }}
//                 className="w-full p-2 border rounded mb-1"
//                 required={requiredFields.includes(field)}
//               />
//               <span className="text-xs text-gray-500">
//                 (Optional: upload a file or enter a URL below)
//               </span>
//               <input
//                 type="text"
//                 value={
//                   typeof fieldValues[field] === "string"
//                     ? fieldValues[field]
//                     : ""
//                 }
//                 onChange={(e) =>
//                   setFieldValues({ ...fieldValues, [field]: e.target.value })
//                 }
//                 className="w-full p-2 border rounded mt-1"
//                 placeholder={
//                   field === "audio_url"
//                     ? "Audio URL (optional)"
//                     : "Image URL (optional)"
//                 }
//                 required={requiredFields.includes(field)}
//               />
//             </>
//           ) : (
//             <input
//               type="text"
//               autoFocus={i === 0}
//               value={fieldValues[field] || ""}
//               onChange={(e) =>
//                 setFieldValues({ ...fieldValues, [field]: e.target.value })
//               }
//               className="w-full p-2 border rounded"
//               required={requiredFields.includes(field)}
//               placeholder={
//                 field === "phone_number"
//                   ? "e.g. 000-123-4567"
//                   : field === "email"
//                   ? "e.g. example@example.com"
//                   : undefined
//               }
//             />
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// function MultipleInputFields({ rows, setRows }) {
//   return (
//     <textarea
//       placeholder="Rows (CSV, one row per line)\nExample: 1,Test Album,2025-01-01"
//       value={rows}
//       onChange={(e) => setRows(e.target.value)}
//       className="w-full p-2 mb-4 border rounded"
//       rows={6}
//       required
//     />
//   );
// }

// function TableSelector({ table, setTable, tableOptions, searchResult }) {
//   // State for calendar modal in update modal
//   const [calendarOpen, setCalendarOpen] = useState(false);
//   // Validation logic from UploadNewArtist
//   const booleanFields = [
//     "demos",
//     "top_track",
//     "featured_track",
//     "activate",
//     "activate_video",
//     "featured_artists",
//     "is_active",
//     "promote_track",
//     "promo",
//   ];
//   const requiredFields = [
//     "name",
//     "release_date",
//     "title",
//     "email",
//     "phone_number",
//   ];
//   const isRequired = (field) => requiredFields.includes(field);
//   const isEmailvalid = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };
//   const isPhoneValid = (phone) => {
//     if (!phone) return false;
//     const digits = phone.replace(/\D/g, "");
//     return digits.length === 10;
//   };
//   const [emailError, setEmailError] = useState("");
//   const [phoneError, setPhoneError] = useState("");
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [pendingUpdate, setPendingUpdate] = useState(null);
//   const [editValues, setEditValues] = useState({});
//   const [updateLoading, setUpdateLoading] = useState(false);
//   const [updateError, setUpdateError] = useState("");
//   const [updateSuccess, setUpdateSuccess] = useState("");

//   // Update handler
//   const handleUpdateRecord = async (record) => {
//     setUpdateLoading(true);
//     setUpdateError("");
//     setUpdateSuccess("");
//     try {
//       // Use FormData for file upload (like UploadNewArtist)
//       const formData = new FormData();
//       Object.entries(record).forEach(([key, value]) => {
//         formData.append(key, value);
//       });
//       const response = await axios.put(
//         `/api/admin/updatedRecord/${table}/${record.id}`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );
//       setUpdateSuccess(response.data.message || "Update successful!");
//       setShowUpdateModal(false);
//     } catch (err) {
//       setUpdateError(
//         err.response?.data?.message || err.message || "Update failed"
//       );
//     } finally {
//       setUpdateLoading(false);
//     }
//   };
//   const [tableData, setTableData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (table) {
//       setLoading(true);
//       setError("");
//       fetch(`/api/admin/records/${table}`)
//         .then((res) => {
//           if (!res.ok) throw new Error("Failed to fetch table data");
//           return res.json();
//         })
//         .then((data) => {
//           setTableData(data.records || data);
//           setLoading(false);
//         })
//         .catch((err) => {
//           setError(err.message);
//           setTableData(null);
//           setLoading(false);
//         });
//     } else {
//       setTableData(null);
//     }
//   }, [table]);

//   // If searchResult is a record (not error), filter to only show that card
//   let filteredData = tableData;
//   if (searchResult && typeof searchResult === "object" && !searchResult.error) {
//     filteredData = [searchResult];
//   }

//   return (
//     <div className="mb-6 flex flex-col items-center w-full">
//       <label className="mb-2 text-lg font-bold text-purple-700">
//         Select Table to Update
//       </label>
//       <div className="relative w-full max-w-xs mb-4">
//         <select
//           value={table || ""}
//           onChange={(e) => setTable(e.target.value)}
//           className="block w-full px-4 py-2 pr-8 text-base border-2 border-purple-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white text-purple-900 font-semibold appearance-none transition duration-200"
//         >
//           <option value="" disabled>
//             Choose a table
//           </option>
//           {tableOptions.map((opt) => (
//             <option key={opt} value={opt} className="text-purple-800">
//               {opt.charAt(0).toUpperCase() + opt.slice(1).replace(/_/g, " ")}
//             </option>
//           ))}
//         </select>
//         <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-purple-700">
//           <svg
//             className="w-5 h-5"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M19 9l-7 7-7-7"
//             />
//           </svg>
//         </span>
//       </div>
//       {/* Table Data Display */}
//       <div className="w-full max-w-2xl">
//         {/* Only show cards if a table is selected */}
//         {table && (
//           <>
//             {loading && (
//               <div className="text-purple-600 font-semibold">
//                 Loading table data...
//               </div>
//             )}
//             {error && <div className="text-red-500 font-semibold">{error}</div>}
//             {updateError && (
//               <div className="text-red-500 font-semibold">{updateError}</div>
//             )}
//             {updateSuccess && (
//               <div className="text-green-600 font-semibold">
//                 {updateSuccess}
//               </div>
//             )}
//             {filteredData &&
//               Array.isArray(filteredData) &&
//               filteredData.length > 0 && (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
//                   {filteredData.map((row, idx) => (
//                     <div
//                       key={idx}
//                       className="bg-white border border-purple-200 rounded-xl shadow-lg p-6 flex flex-col gap-2 transition-transform transform hover:scale-105 hover:shadow-2xl"
//                     >
//                       <div className="flex flex-col gap-y-2">
//                         {Object.entries(row).map(([field, value]) => (
//                           <div key={field} className="flex flex-col mb-2">
//                             <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-1">
//                               {field.replace(/_/g, " ")}
//                             </span>
//                             <span className="text-base text-purple-900 break-words">
//                               {value === null ||
//                               value === undefined ||
//                               String(value).trim() === ""
//                                 ? "null"
//                                 : String(value)}
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                       <button
//                         className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 font-bold self-end"
//                         onClick={() => {
//                           setPendingUpdate(row);
//                           setEditValues(row);
//                           setShowUpdateModal(true);
//                         }}
//                       >
//                         Update
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             {filteredData &&
//               Array.isArray(filteredData) &&
//               filteredData.length === 0 && (
//                 <div className="text-gray-500 italic">
//                   No records found for this table.
//                 </div>
//               )}
//           </>
//         )}
//         {/* Update Modal */}
//         {showUpdateModal && pendingUpdate && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
//             <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full relative">
//               <h3 className="text-xl font-bold mb-4 text-center text-purple-700">
//                 Edit Record Before Update
//               </h3>
//               <form
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   let valid = true;
//                   if (isRequired("email") && !isEmailvalid(editValues.email)) {
//                     setEmailError("Please enter a valid email address.");
//                     valid = false;
//                   } else {
//                     setEmailError("");
//                   }
//                   if (
//                     isRequired("phone_number") &&
//                     !isPhoneValid(editValues.phone_number)
//                   ) {
//                     setPhoneError(
//                       "Please enter a valid 10-digit phone number."
//                     );
//                     valid = false;
//                   } else {
//                     setPhoneError("");
//                   }
//                   // Check required fields
//                   for (const field of requiredFields) {
//                     if (
//                       !editValues[field] ||
//                       String(editValues[field]).trim() === ""
//                     ) {
//                       valid = false;
//                     }
//                   }
//                   if (!valid) return;
//                   handleUpdateRecord(editValues);
//                 }}
//               >
//                 {/* Render editable fields using InputFields logic and validation */}
//                 {Object.keys(editValues).map((field, i) =>
//                   field === "release_date" ? (
//                     <div key={field} className="mb-2 relative">
//                       <label className="block mb-1 font-semibold">
//                         release_date<span className="text-red-500">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         className="w-full p-2 border rounded pr-10"
//                         value={editValues[field] || ""}
//                         onChange={(e) =>
//                           setEditValues({
//                             ...editValues,
//                             [field]: e.target.value,
//                           })
//                         }
//                         placeholder="YYYY-MM-DD"
//                         required={isRequired(field)}
//                       />
//                       <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
//                         <CalendarIcon onClick={() => setCalendarOpen(true)} />
//                       </span>
//                       <CalendarModal
//                         isOpen={calendarOpen}
//                         onClose={() => setCalendarOpen(false)}
//                         onSelectDate={(date) => {
//                           setEditValues({
//                             ...editValues,
//                             [field]: new Date(date).toISOString().split("T")[0],
//                           });
//                           setCalendarOpen(false);
//                         }}
//                       />
//                     </div>
//                   ) : null
//                 )}
//                 <InputFields
//                   fields={Object.keys(editValues).filter(
//                     (f) => f !== "release_date"
//                   )}
//                   fieldValues={editValues}
//                   setFieldValues={setEditValues}
//                   requiredFields={requiredFields}
//                 />
//                 <div className="flex justify-end gap-4 mt-4">
//                   <button
//                     type="button"
//                     className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 font-semibold"
//                     onClick={() => setShowUpdateModal(false)}
//                     disabled={updateLoading}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-bold"
//                     disabled={updateLoading}
//                   >
//                     {updateLoading ? "Updating..." : "Confirm Update"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
// function ExistingArtist({
//   // Stylish TableSelector component for table selection

//   inputMode,
//   setInputMode,
//   table,
//   setTable,
//   fields,
//   setFields,
//   tableFields,
//   tableOptions,
//   fieldValues,
//   setFieldValues,
//   rows,
//   setRows,
//   message,
//   handleSubmit,
//   dbSnapshot,
// }) {
//   useEffect(() => {
//     setInputMode("single");
//   }, [setInputMode]);

//   const [searchType, setSearchType] = useState("id");
//   const [searchValue, setSearchValue] = useState("");
//   const [artistResult, setArtistResult] = useState(null);

//   // Clear search handler
//   const handleClearSearch = () => {
//     setArtistResult(null);
//   };

//   useEffect(() => {
//     setSearchValue("");
//   }, [searchType]);

//   // Search dbSnapshot for selected table
//   const handleArtistSearch = (e) => {
//     e.preventDefault();
//     setArtistResult(null);
//     if (
//       !searchValue ||
//       !dbSnapshot ||
//       !table ||
//       !dbSnapshot[table] ||
//       !dbSnapshot[table].records
//     ) {
//       setArtistResult({ error: "No data available for this table" });
//       return;
//     }
//     const records = dbSnapshot[table].records;
//     let found = null;
//     if (
//       [
//         "albums",
//         "promotional_videos",
//         "promotional_tracks",
//         "tracks",
//         "videos",
//       ].includes(table)
//     ) {
//       if (searchType === "id") {
//         found = records.find((r) => String(r.id) === String(searchValue));
//       } else if (searchType === "title") {
//         found = records.find(
//           (r) => r.title && r.title.toLowerCase() === searchValue.toLowerCase()
//         );
//       } else if (searchType === "artist_id") {
//         found = records.find(
//           (r) => String(r.artist_id) === String(searchValue)
//         );
//       }
//     } else if (table === "artists") {
//       if (searchType === "id") {
//         found = records.find((a) => String(a.id) === String(searchValue));
//       } else if (searchType === "name") {
//         found = records.find(
//           (a) => a.name && a.name.toLowerCase() === searchValue.toLowerCase()
//         );
//       }
//     } else {
//       // Any other table: only id
//       found = records.find((r) => String(r.id) === String(searchValue));
//     }
//     setArtistResult(found || { error: "Record not found" });
//   };

//   return (
//     <div>
//       <ArtistSearchForm
//         table={table}
//         setTable={setTable}
//         tableOptions={tableOptions}
//         searchType={searchType}
//         setSearchType={setSearchType}
//         searchValue={searchValue}
//         setSearchValue={setSearchValue}
//         handleArtistSearch={handleArtistSearch}
//         artistResult={artistResult}
//         onClearSearch={handleClearSearch}
//       />
//       {/* Stylish TableSelector for updating/viewing tables */}
//       <TableSelector
//         table={table}
//         setTable={setTable}
//         tableOptions={tableOptions}
//         searchResult={artistResult}
//       />
//     </div>
//   );
// }

// TOP-LEVEL (file scope) — not inside any other component
// ...existing code...

//Main exporting component

function AdminDashboard() {
  const [artistMenu, setArtistMenu] = useState("upload");
  const [inputMode, setInputMode] = useState("");
  const [fieldValues, setFieldValues] = useState({});
  const [table, setTable] = useState("");
  const [fields, setFields] = useState([]);
  const [rows, setRows] = useState("");
  const [message, setMessage] = useState("");
  const [tableOptions, setTableOptions] = useState([]);

  // Show demo mode reminder toast on component mount (only once)
  useEffect(() => {
    // Check if toast has been shown before
    const hasShownDemoReminder = localStorage.getItem('demoModeReminderShown');
    
    if (!hasShownDemoReminder) {
      toast(
        (t) => (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚠️</span>
              <div className="font-bold text-lg">Development Mode Active</div>
            </div>
            <div className="text-sm">
              All uploads are forced to <strong>DEMO mode</strong> and will go to demo folders in Cloudinary.
            </div>
            <div className="text-xs mt-2 p-2 bg-gray-100 rounded">
              <strong>To change:</strong> Edit backend files:
              <br />• adminController.js (lines 111, 317)
              <br />• eventController.js (lines 106, 199)
              <br />Change <code className="bg-gray-200 px-1 rounded">mode = 'demo'</code> back to original code
            </div>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              Got it!
            </button>
          </div>
        ),
        {
          duration: 10000,
          position: 'top-center',
          style: {
            maxWidth: '500px',
            padding: '16px',
          },
        }
      );
      
      // Mark as shown in localStorage
      localStorage.setItem('demoModeReminderShown', 'true');
    }
  }, []);
  const [isSettingsSidebarOpen, setIsSettingsSidebarOpen] = useState(false);
  const { dbSnapshot, mode, setMode } = useApiData();
  const { isNavbarOpen } = useNavbar();

  useEffect(() => {
    setInputMode("");
    setTable("");
    setFields([]);
    setFieldValues({});
    setRows("");
    setMessage("");
  }, [artistMenu]);

  // dbSnapshot is now provided by ApiDataContext

  useEffect(() => {
    if (dbSnapshot) {
      setTableOptions(Object.keys(dbSnapshot));
      // Set default table if not set
      if (!table) {
        const firstTable = Object.keys(dbSnapshot)[0];
        setTable(firstTable);
      }
    }
  }, [dbSnapshot, table]);

  // When table changes, update fields, rows, and initialize fieldValues to null for all fields
  useEffect(() => {
    if (dbSnapshot && table && dbSnapshot[table]) {
      // Set fields from dbSnapshot
      const newFields = dbSnapshot[table].fields || [];
      setFields(newFields);
      // Set rows as CSV string
      const records = dbSnapshot[table].records || [];
      if (records.length > 0 && dbSnapshot[table].fields) {
        const csvRows = records.map((record) =>
          dbSnapshot[table].fields.map((field) => record[field] ?? "").join(",")
        );
        setRows(csvRows.join("\n"));
      } else {
        setRows("");
      }

      async function insertFieldsValues() {
        // Utility: remove fields that are 'id' or end with '_id'
        function filterOutIdFields(fields) {
          return fields.filter(
            (field) => field !== "id" && !field.endsWith("_id")
          );
        }

        // Initialize fieldValues to empty string for filtered fields
        const filteredFields = await filterOutIdFields(newFields);
        const initialFieldValues = await filteredFields.reduce((acc, field) => {
          acc[field] = "";
          return acc;
        }, {});
        // Add boolean fields demos and activate, default to false

        initialFieldValues["demos"] = false;
        initialFieldValues["activate"] = false;
        initialFieldValues["featured_artists"] = false;
        initialFieldValues["is_active"] = false;
        initialFieldValues["promote_track"] = false;
        initialFieldValues["top_track"] = false;
        initialFieldValues["featured_track"] = false;
        // initialFieldValues["release_date"] = new Date().toISOString().split("T")[0];
        setFields(filteredFields);
        setFieldValues(initialFieldValues);
      }
      insertFieldsValues();
    }
  }, [dbSnapshot, table]);

  const tableFields = React.useMemo(() => {
    if (!dbSnapshot) return {};
    const fieldsObj = {};
    Object.keys(dbSnapshot).forEach((tableName) => {
      fieldsObj[tableName] = dbSnapshot[tableName].fields || [];
    });
    return fieldsObj;
  }, [dbSnapshot]);

  // Handle form submission
  const handleSubmit = async (e, modeArg = mode) => {
    e.preventDefault();

    // console.log("your fields", fieldValues);
    setMessage("");

    if (Array.isArray(fields) && fields.length > 0) {
      // Mode is available as modeArg --- this is your mode state variable
      // console.log("Current mode in handleSubmit:", modeArg);
      // console.log("Selected field values:", fieldValues);

      // Use FormData for file upload
      const formData = new FormData();
      // Only append field values for the selected table
      const tableFieldsSet = new Set(fields);
      Object.entries(fieldValues).forEach(([key, value]) => {
        if (tableFieldsSet.has(key)) {
          formData.append(key, value);
        }
      });

      try {
        const response = await axios.post(
          `/api/admin/records/${table}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "x-mode": modeArg,
            },
          }
        );
        const result = response.data;
        setMessage(
          result.message ||
            (result.success ? "Upload successful!" : "Upload failed.")
        );
      } catch (error) {
        setMessage(
          "Upload failed: " + (error.response?.data?.message || error.message)
        );
      }
    }
  };

  // Update a record in the selected table
  // async function handleUpdateRecord(table, id, updates) {
  //   try {
  //     const response = await fetch(`/api/admin/records/${table}/${id}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(updates),
  //     });
  //     const result = await response.json();
  //     setMessage(
  //       result.message ||
  //         (result.success ? "Update successful!" : "Update failed.")
  //     );
  //     return result;
  //   } catch (error) {
  //     setMessage("Update failed: " + error.message);
  //     return { success: false, error: error.message };
  //   }
  // }

  // // Delete a record from the selected table
  // async function handleDeleteRecord(table, id) {
  //   try {
  //     const response = await fetch(`/api/admin/records/${table}/${id}`, {
  //       method: "DELETE",
  //     });
  //     const result = await response.json();
  //     setMessage(
  //       result.message ||
  //         (result.success ? "Delete successful!" : "Delete failed.")
  //     );
  //     return result;
  //   } catch (error) {
  //     setMessage("Delete failed: " + error.message);
  //     return { success: false, error: error.message };
  //   }
  // }
  const navigate = useNavigate();
  // Logout handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/admin/login");
    } catch (error) {
      alert("Logout failed: " + error.message);
    }
  };

  return (
    <>
      {/* Settings Sidebar */}
      <AdminSettingsSidebar
        isOpen={isSettingsSidebarOpen}
        onClose={() => setIsSettingsSidebarOpen(false)}
      />

      <div className={`flex flex-col items-center justify-center min-h-screen bg-gray-50 pb-[10%] ${isNavbarOpen ? 'pt-[20rem]' : 'pt-[10rem]'}`}>
        {/* Top Navigation Bar */}
        <div className="w-full flex justify-between items-center pt-6 pb-2 px-8">
          {/* Settings Button */}
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold shadow flex items-center gap-2"
            onClick={() => setIsSettingsSidebarOpen(true)}
          >
            <span className="i-lucide-settings" />
            Settings
          </button>

          {/* Logout button */}
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-bold shadow"
            onClick={handleLogout}
          >
            Log Out Admin
          </button>
        </div>
        {/* Website Mode Toggle Button */}
        {/* <div className="w-full flex justify-end items-center px-8 mb-4">
          <button
            className="px-4 py-2 rounded font-bold shadow bg-indigo-600 text-white hover:bg-indigo-700"
            onClick={async () => {
              // Toggle local demo value and send in API call header
              const demoValue = window.confirm("Switch to LIVE mode? Click Cancel for DEMO mode.") ? 1 : 0;
              try {
                await axios.post(`${import.meta.env.VITE_API_URL}/api/website-mode`, {}, {
                  headers: { demo: demoValue }
                });
                alert(`Website mode updated to ${demoValue === 1 ? 'LIVE' : 'DEMO'}`);
              } catch (err) {
                alert("Failed to update website mode: " + (err.response?.data?.message || err.message));
              }
            }}
          >
            Toggle Website Mode
          </button>
        </div> */}
        <div className="mb-2 font-semibold">Current Mode: {mode}</div>
        <AdminSqlViewer
          table={table}
          fields={fields}
          rows={rows}
          dbSnapshot={dbSnapshot}
        />
        <div className="bg-white p-4 rounded shadow-md w-full max-w-lg mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="font-bold text-lg">Soul Felt Music Artist</label>
            <button
              className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold"
              onClick={() => setMode(mode === "live" ? "demo" : "live")}
            >
              {mode === "live" ? "Switch to Demo Mode" : "Switch to Live Mode"}
            </button>
          </div>
          <div
            className={`mb-4 text-center font-extrabold text-2xl ${
              mode === "live" ? "text-green-600" : "text-orange-500"
            }`}
          >
            {mode === "live" ? "LIVE MODE" : "DEMO MODE"}
          </div>

          <select
            value={artistMenu || ""}
            onChange={(e) => setArtistMenu(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="upload">Upload New Artist</option>
            <option value="search">Update Existing Records</option>
            <option value="events">Community Events</option>
            <option value="stats-settings">Stats Schedule Settings</option>
            <option value="website-settings">Website Settings</option>
            <option value="purchase-stats">Purchase Statistics</option>
          </select>
        </div>
        {artistMenu === "upload" && <UploadNewArtist mode={mode} />}
        {artistMenu === "search" && (
          <ExistingArtist
            inputMode={inputMode}
            setInputMode={setInputMode}
            table={table}
            setTable={setTable}
            fields={fields}
            setFields={setFields}
            tableFields={tableFields}
            tableOptions={tableOptions}
            fieldValues={fieldValues}
            setFieldValues={setFieldValues}
            rows={rows}
            setRows={setRows}
            message={message}
            handleSubmit={(e) => handleSubmit(e, mode)}
            artistMenu={artistMenu}
            dbSnapshot={dbSnapshot}
            mode={mode}
          />
        )}
        {artistMenu === "events" && <EventManagement />}
        {artistMenu === "stats-settings" && <StatsScheduleSettings />}
        {artistMenu === "website-settings" && <AdminSettings />}
        {artistMenu === "purchase-stats" && <PurchaseStats />}
      </div>
    </>
  );
}

export default AdminDashboard;
