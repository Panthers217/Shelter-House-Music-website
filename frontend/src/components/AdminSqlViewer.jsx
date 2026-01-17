import React, { useState, useEffect } from "react";
import { Disc3, Mic } from "lucide-react";
import axios from "axios";
import { useApiData } from "../context/ApiDataContext";
//Admin password: admin123
const user = {
  name: "Alex Thompson",
  role: "Music Data Analyst",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
};

function AdminSqlViewer({ dbSnapshot }) {
  const { refreshSqlViewerTableCount, triggerRefreshSqlViewerTable, showDemos, setShowDemos } = useApiData();
  // Always declare hooks at the top level
  const tableKeys = dbSnapshot && Object.keys(dbSnapshot);
  // If only artists table is present, default to it
  const defaultTable =
    tableKeys && (tableKeys.includes("artists") ? "artists" : tableKeys[0]);
  const [selectedTable, setSelectedTable] = useState(defaultTable);
  const [selectedFields, setSelectedFields] = useState(
    (dbSnapshot && dbSnapshot[defaultTable]?.fields?.slice(0, 3)) || []
  );

  // Search state
  const [searchType, setSearchType] = useState("");
  const [searchValue, setSearchValue] = useState("");

  // Modal state and handlers (must be at top level)
  const [modalOpen, setModalOpen] = useState(false);
  const [modalField, setModalField] = useState("");
  const [modalRecord, setModalRecord] = useState(null);
  const [modalAction, setModalAction] = useState("");
  const [modalValue, setModalValue] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [recordsState, setRecordsState] = useState([]);

  // Helper function to safely render cell values
  const renderCellValue = (value) => {
    if (value === null || value === undefined) {
      return "";
    }
    
    // If it's an object or array, stringify it for display
    if (typeof value === 'object') {
      try {
        return JSON.stringify(value);
      } catch (e) {
        return "[Complex Object]";
      }
    }
    
    // For primitive types, convert to string
    return String(value);
  };

  // Declare table, fields, records before using them in getFilteredRecords
  const table = dbSnapshot && selectedTable ? dbSnapshot[selectedTable] : null;
  const fields = table?.fields || [];
  const records = recordsState.length ? recordsState : table?.records || [];

  // Update selectedFields when selectedTable or dbSnapshot changes
  useEffect(() => {
    if (dbSnapshot && selectedTable && dbSnapshot[selectedTable]) {
      setSelectedFields(dbSnapshot[selectedTable].fields?.slice(0, 3) || []);
    }
  }, [selectedTable, dbSnapshot, ]);

  // If only artists table is present, force selection
  useEffect(() => {
    if (
      dbSnapshot &&
      Object.keys(dbSnapshot).length === 1 &&
      dbSnapshot.artists
    ) {
      setSelectedTable("artists");
    }
  }, [dbSnapshot, ]);

  // Search function for albums and artists
  const getFilteredRecords = () => {
    // First apply demo filter if enabled
    let filteredByDemo = records;
    if (showDemos) {
      filteredByDemo = records.filter((r) => {
        const demoValue = r.demos;
        // Check if demos field is 1, '1', 'Yes', 'yes', or true
        return demoValue === 1 || demoValue === '1' || 
               (typeof demoValue === 'string' && demoValue.toLowerCase() === 'yes') ||
               demoValue === true;
      });
    }
    
    if (!searchType || (searchType !== "all" && !searchValue)) return filteredByDemo;
    if (searchType === "all") {
      return filteredByDemo;
    }
    // If searchType matches a field in the table, filter by that field
    if (fields.includes(searchType)) {
      return filteredByDemo.filter((r) => {
        const value = r[searchType];
        if (value == null) return false;
        // Numeric search: exact match
        if (typeof value === "number" || searchType === "id") {
          return String(value) === String(searchValue);
        }
        // String search: case-insensitive substring
        return String(value)
          .toLowerCase()
          .includes(String(searchValue).toLowerCase());
      });
    }
    return filteredByDemo;
  };

  const filteredRecords = getFilteredRecords();

  // Render loading UI if dbSnapshot is not ready
  if (!dbSnapshot || !tableKeys || tableKeys.length === 0) {
    return (
      <div className="min-h-fit bg-white flex flex-col items-center py-8">
        <div className="w-full max-w-3xl flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <span>Music Database Viewer</span>
          </h1>
        </div>
        <div className="w-full max-w-3xl bg-white rounded-lg shadow p-6 flex gap-6 mb-6">
          <div className="w-full text-center text-gray-500">
            Loading database snapshot...
          </div>
        </div>
      </div>
    );
  }

  const handleFieldToggle = (field) => {
    setSelectedFields((fields) =>
      fields.includes(field)
        ? fields.filter((f) => f !== field)
        : [...fields, field]
    );
  };

  // Modal handlers
  const handleCellDoubleClick = (record, field) => {
    setModalRecord(record);
    setModalField(field);
    setModalAction("");
    setModalValue(record[field] || "");
    setAdminPassword("");
    setErrorMsg("");
    setModalOpen(true);
  };

  // Insert button handler: open blank form for all fields
  const handleInsertClick = () => {
    setModalRecord(null);
    setModalField("");
    setModalAction("insert");
    // Create blank values for all fields
    const blankValues = {};
    fields.forEach((f) => (blankValues[f] = ""));
    setModalValue(blankValues);
    setAdminPassword("");
    setErrorMsg("");
    setModalOpen(true);
  };

  const handleModalAction = (action) => {
    if (action === "insert") {
      handleInsertClick();
    } else {
      setModalAction(action);
      setErrorMsg("");
    }
  };

  const handleModalConfirm = async () => {
    // Simple password check (replace with real auth in production)
    if (adminPassword !== "admin123") {
      setErrorMsg("Incorrect administrator password.");
      return;
    }
    let updatedRecords = [...records];
    let apiUrl = "";
    let method = "POST";
    let body = {};
    try {
      if (modalAction === "update") {
        updatedRecords = updatedRecords.map((rec) =>
          rec === modalRecord ? { ...rec, [modalField]: modalValue } : rec
        );
        apiUrl = `/api/admin/records/${selectedTable}/${modalRecord.id}`;
        method = "PUT";
        body = { [modalField]: modalValue };
      } else if (modalAction === "delete") {
        updatedRecords = updatedRecords.filter((rec) => rec !== modalRecord);
        apiUrl = `/api/admin/records/${selectedTable}/${modalRecord.id}`;
        method = "DELETE";
      } else if (modalAction === "insert") {
        updatedRecords.push({ ...modalValue });
        apiUrl = `/api/admin/records/${selectedTable}`;
        method = "POST";
        body = { ...modalValue };
        // console.log("Inserting record:", body);
        // console.log("POST to:", apiUrl);
        // console.log("Selected table:", selectedTable);
      }
      // Make API call if apiUrl is set
      if (apiUrl) {
        if (method === "PUT") {
          await axios.put(apiUrl, body);
        } else if (method === "DELETE") {
          await axios.delete(apiUrl);
        } else if (method === "POST") {
          await axios.post(apiUrl, body);
        }
      }
    } catch (err) {
      setErrorMsg("API error: " + err.message);
      return;
    }
    setRecordsState(updatedRecords);
    setModalOpen(false);
    setModalRecord(null);
    setModalField("");
    setModalAction("");
    setModalValue("");
    setAdminPassword("");
    setErrorMsg("");
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalRecord(null);
    setModalField("");
    setModalAction("");
    setModalValue("");
    setAdminPassword("");
    setErrorMsg("");
  };

  return (
    <div className="min-h-fit bg-white flex flex-col items-center py-8">
      {/* Header */}
      <div className="w-full max-w-3xl flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <span>Music Database Viewer</span>
          </h1>
          <p className="text-sm text-gray-500">
            Explore recording artist database tables
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-right">
            <span className="block font-medium text-gray-700">{user.name}</span>
            <span className="block text-xs text-gray-400">{user.role}</span>
          </span>
          <img
            src={user.avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full border"
          />
        </div>
      </div>
      {/* Refresh Table Button and Demo Filter */}
      <div className="w-full max-w-3xl flex justify-end gap-3 mb-4">
        {/* <button
          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
            showDemos
              ? "bg-orange-600 text-white hover:bg-orange-700"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setShowDemos(!showDemos)}
          title={showDemos ? "Showing only demo records" : "Showing all records"}
        >
          {showDemos ? "✓ Demos Only" : "Show Demos"}
        </button> */}
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
          onClick={triggerRefreshSqlViewerTable}
        >
          Refresh Table
        </button>
      </div>
      {/* Main Card */}
      <div className="w-full max-w-3xl bg-white rounded-lg shadow p-6 flex gap-6 mb-6">
        {/* Select Table */}
        <div className="w-1/3">
        
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Table
          </label>
          <select
            className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none"
            value={selectedTable || ""}
            onChange={(e) => setSelectedTable(e.target.value)}
          >
            <option value="" disabled>
              Choose a table
            </option>
            {tableKeys.map((tableKey) => (
              <option key={tableKey} value={tableKey}>
                {tableKey}
              </option>
            ))}
          </select>
        </div>

        {/* Select Fields */}
        <div className="w-2/3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Fields
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Choose which columns to display from the {selectedTable} table
          </p>
          <div className="flex flex-wrap gap-2">
            {fields.map((field) => (
              <button
                key={field}
                className={`px-2 py-1 rounded text-xs border ${
                  selectedFields.includes(field)
                    ? "bg-gray-800 text-white border-gray-800"
                    : "bg-gray-100 text-gray-700 border-gray-300"
                }`}
                onClick={() => handleFieldToggle(field)}
              >
                {field}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-gray-400">
            {selectedFields.length} of {fields.length} fields selected
          </p>
        </div>
      </div>

      {/* Search Bar & Data Table */}
      <div className="w-full max-w-3xl bg-white rounded-lg shadow p-6">
        <div className="mb-4 flex gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Type
            </label>
            <select
              className="border rounded px-2 py-1 text-sm"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              disabled={!selectedTable}
            >
              <option value="">Select</option>
              <option value="all">All</option>
              {/* Dynamically list all field names for the selected table */}
              {fields.map((field) => (
                <option key={field} value={field}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search Value
            </label>
            <input
              className="border rounded px-2 py-1 text-sm"
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              disabled={!searchType}
              placeholder={
                searchType ? `Enter ${searchType}` : "Select search type"
              }
            />
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
            onClick={() => setSearchValue("")}
            disabled={!searchValue}
          >
            Clear
          </button>
        </div>
        <div className="mb-2 flex items-center gap-2">
          <span className="font-medium text-gray-700">{selectedTable}</span>
          <span className="text-xs text-gray-500">
            ({filteredRecords.length} rows)
          </span>
        </div>
        <p className="text-xs text-gray-500 mb-2">
          Displaying {selectedFields.length} columns from the {selectedTable}{" "}
          table
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded">
            <thead>
              <tr className="bg-gray-50">
                {selectedFields.map((field) => (
                  <th
                    key={field}
                    className="px-4 py-2 text-left text-xs font-semibold text-gray-700 border-b"
                  >
                    {field}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    {selectedFields.map((field) => (
                      <td
                        key={field}
                        className="px-4 py-2 text-sm text-gray-700 border-b cursor-pointer hover:bg-blue-50"
                        onDoubleClick={() => handleCellDoubleClick(row, field)}
                        title="Double click to manage record"
                      >
                        {renderCellValue(row[field])}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={selectedFields.length || 1}
                    className="text-center"
                  >
                    No records
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Modal for record actions */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 min-w-[320px] max-w-[90vw]">
              <h2 className="text-lg font-semibold mb-2">Manage Record</h2>
              <p className="mb-4 text-sm text-gray-600">
                What would you like to do with{" "}
                <span className="font-bold">{modalField}</span> of this record?
              </p>
              {!modalAction ? (
                <div className="flex gap-4 mb-4">
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    onClick={() => handleModalAction("delete")}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    onClick={() => handleModalAction("update")}
                  >
                    Update
                  </button>
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    onClick={handleInsertClick}
                  >
                    Insert
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleModalConfirm();
                  }}
                >
                  {modalAction === "update" && (
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Update Value
                      </label>
                      <input
                        className="border rounded px-2 py-1 w-full"
                        type="text"
                        value={modalValue}
                        onChange={(e) => setModalValue(e.target.value)}
                        required
                      />
                    </div>
                  )}
                  {modalAction === "insert" && (
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Insert New Record
                      </label>
                      {fields.map((f) => (
                        <div key={f} className="mb-2">
                          <label className="block text-xs text-gray-600 mb-1">
                            {f}
                          </label>
                          <input
                            className="border rounded px-2 py-1 w-full"
                            type="text"
                            value={modalValue[f] || ""}
                            onChange={(e) =>
                              setModalValue({
                                ...modalValue,
                                [f]: e.target.value,
                              })
                            }
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Administrator Password
                    </label>
                    <input
                      className="border rounded px-2 py-1 w-full"
                      type="password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      required
                    />
                  </div>
                  {errorMsg && (
                    <div className="text-red-600 text-sm mb-2">{errorMsg}</div>
                  )}
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      className="text-gray-500 hover:text-gray-700 text-sm"
                      onClick={handleModalClose}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminSqlViewer;
// End of AdminSqlViewer component
