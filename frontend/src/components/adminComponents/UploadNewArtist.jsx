import ConfirmModeModal from "../modal/ConfirmModeModal";
import React, { useState, useEffect, useMemo } from "react";
import InputFields from "./InputFields";
import SelectFields from "./SelectFields";
import MultipleInputFields from "./MultipleInputFields";
import { useArtistFormValidation } from "../../hooks/useArtistFormValidation";
import { useApiData } from "../../context/ApiDataContext";
import axios from "axios";
import { useUserLogin } from '../../hooks/useUserLogin.js';
import { toast } from 'react-hot-toast';
function UploadNewArtist() {
  const { mode } = useApiData();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingSubmitEvent, setPendingSubmitEvent] = useState(null);
  const [inputMode, setInputMode] = useState("");
  const [fieldValues, setFieldValues] = useState({});
  const [table, setTable] = useState("");
  const [fields, setFields] = useState([]);
  const [rows, setRows] = useState("");
  const [message, setMessage] = useState("");
  const [tableOptions, setTableOptions] = useState([]);
  const { dbSnapshot,} = useApiData();
  const { requiredFields, booleanFields, handleLocalSubmit, validateIdFields } = useArtistFormValidation(fields, fieldValues, handleUploadNewRecord);

  // Reset form to initial state
  const resetForm = () => {
    setInputMode("");
    setFieldValues({});
    setTable("");
    setFields([]);
    setRows("");
   
  };

   // Handle form submission Api call
  const { user } = useUserLogin();
  async function handleUploadNewRecord(e, values, modeArg) {
    e.preventDefault();
    setMessage("");
    // Handle single record upload (values is an object)
    if (values && typeof values === "object" && !Array.isArray(values)) {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        // Format date fields
        let v = value;
        if (key === "release_date" && typeof v === "string" && v.includes("T")) {
          v = v.split("T")[0];
        }
        formData.append(key, v);
      });
      try {
        // console.log("modeArg:", mode);
        // console.log("Submitting single record:", Object.fromEntries(formData.entries()));
        if (!user || !user.getIdToken) {
          throw new Error("You must be logged in as an admin to upload records.");
        }
        const token = await user.getIdToken();
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-mode": modeArg,
            "Authorization": `Bearer ${token}`,
          },
        };
        const response = await axios.post(
          `/api/admin/records/${table}`,
          formData,
          config
        );
        const result = response.data;
        if (result.success) {
          toast.success(result.message || "Upload successful!");
          resetForm();
        } else {
          toast.error(result.message || "Upload failed.");
        }
      } catch (error) {
        toast.error("Upload failed: " + (error.response?.data?.message || error.message));
      }
      return;
    }
    if (Array.isArray(values) && values.length > 0) {
      const formData = new FormData();
      const tableFieldsSet = new Set(values);
      Object.entries(fieldValues).forEach(([key, value]) => {
        if (tableFieldsSet.has(key)) {
          formData.append(key, value);
        }
      });
      try {
        // console.log("Submitting single record:", Object.fromEntries(formData.entries()));
        if (!user || !user.getIdToken) {
          throw new Error("You must be logged in as an admin to upload records.");
        }
        const token = await user.getIdToken();
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-mode": modeArg,
            "Authorization": `Bearer ${token}`,
          },
        };
        const response = await axios.post(
          `/api/admin/records/${table}`,
          formData,
          config
        );
        const result = response.data;
        if (result.success) {
          toast.success(result.message || "Upload successful!");
        } else {
          toast.error(result.message || "Upload failed.");
        }
      } catch (error) {
        toast.error("Upload failed: " + (error.response?.data?.message || error.message));
      }
    }
  }

  // Removed duplicate destructuring


  // Set table options and default table when dbSnapshot changes
  useEffect(() => {
    if (dbSnapshot) {
      const tables = Object.keys(dbSnapshot);
      setTableOptions(tables);
      if (!table && tables.length > 0) {
        setTable(tables[0]);
      }
    }
  }, [dbSnapshot, table]);

  // When table changes, update fields and fieldValues
  useEffect(() => {
    if (dbSnapshot && table && dbSnapshot[table]) {
        // Remove only 'id' and fields ending with '_public_identifier'
        const newFields = (dbSnapshot[table].fields || []).filter(
          (field) => field !== "id" && !field.endsWith("_public_identifier")
        );
      setFields(newFields);
      // Initialize fieldValues
      const initialFieldValues = {};
      newFields.forEach((field) => {
        initialFieldValues[field] = "";
      });
      // Set default boolean fields to false
      [
        "demos",
        "activate",
        "is_active",
        "promote_track",
        "top_track",
        "featured_track",
      ].forEach((field) => {
        if (newFields.includes(field)) initialFieldValues[field] = false;
      });
      setFieldValues(initialFieldValues);
      // Set rows as CSV string for multiple input
      const records = dbSnapshot[table].records || [];
      if (records.length > 0 && dbSnapshot[table].fields) {
          const csvRows = records.map((record) =>
            dbSnapshot[table].fields
              .filter((field) => field !== "id" && !field.endsWith("_public_identifier"))
              .map((field) => record[field] ?? "")
              .join(",")
          );
        setRows(csvRows.join("\n"));
      } else {
        setRows("");
      }
    }
  }, [dbSnapshot, table]);

  // Memoize table fields for SelectFields
  const tableFields = useMemo(() => {
    if (!dbSnapshot) return {};
    const fieldsObj = {};
    Object.keys(dbSnapshot).forEach((tableName) => {
      fieldsObj[tableName] = dbSnapshot[tableName].fields || [];
    });
    return fieldsObj;
  }, [dbSnapshot]);

 

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          setPendingSubmitEvent(e);
          setShowConfirmModal(true);
        }}
        className="bg-white p-8 rounded shadow-md w-full max-w-lg"
      >
      <h2 className="text-2xl font-bold mb-6 text-center">
        Admin Dashboard: Upload Artist Data
      </h2>
        {/* Choose Input Mode */}
        <label className="block mb-2 font-semibold">Choose Input Mode</label>
        <select
          value={inputMode || ""}
          onChange={(e) => setInputMode(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        >
          <option value="" disabled>
            Choose an option
          </option>
          <option value="single">Single input</option>
          <option value="multiple">Multiple input (csv or json)</option>
        </select>

        {/* Select Table */}
        {inputMode && (
          <div className="mb-6 flex flex-col items-center w-full">
            <label className="mb-2 text-lg font-bold text-purple-700">
              Select Table
            </label>
            <div className="relative w-full max-w-xs mb-4">
              <select
                value={table || ""}
                onChange={(e) => setTable(e.target.value)}
                className="block w-full px-4 py-2 pr-8 text-base border-2 border-purple-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white text-purple-900 font-semibold appearance-none transition duration-200"
              >
                <option value="" disabled>
                  Choose a table
                </option>
                {tableOptions.map((opt) => (
                  <option key={opt} value={opt} className="text-purple-800">
                    {opt.charAt(0).toUpperCase() +
                      opt.slice(1).replace(/_/g, " ")}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-purple-700">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </div>
          </div>
        )}
        {/* Select Fields: Only visible if inputMode is 'single' and a table is selected */}
        {inputMode === "single" && table && (
          <SelectFields
            table1={table}
            fields1={fields}
            setFields1={setFields}
            tableFields1={tableFields}
          />
        )}
        {/* Render input boxes for each selected field using a single InputFields component */}
        {inputMode === "single" && fields.length > 0 && (
          <div className="mb-4">
            <InputFields
              fields={fields}
              fieldValues={fieldValues}
              setFieldValues={setFieldValues}
              requiredFields={requiredFields}
              booleanFields={booleanFields}
              validateIdFields={validateIdFields}
            />
          </div>
        )}
        {/* CSV rows input */}
        {inputMode === "multiple" && (
          <MultipleInputFields rows={rows} setRows={setRows} />
        )}
        {/* Submit button only visible if input is visible */}
        {((inputMode === "single" && fields.length > 0) ||
          inputMode === "multiple") && (
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Upload
          </button>
        )}
        {message && (
          <div className="mt-4 text-center text-blue-600">{message}</div>
        )}
      </form>
      <ConfirmModeModal
        show={showConfirmModal}
        onConfirm={() => {
          setShowConfirmModal(false);
          if (pendingSubmitEvent) {
            // Always use the latest mode from context
            handleLocalSubmit(pendingSubmitEvent, "upload", undefined, undefined,mode );
            setPendingSubmitEvent(null);
          }
        }}
        onCancel={() => {
          setShowConfirmModal(false);
          setPendingSubmitEvent(null);
        }}
      />
    </>
  );
}

export default UploadNewArtist;
