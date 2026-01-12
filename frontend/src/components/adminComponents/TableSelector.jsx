import React, { useEffect, useState } from "react";
import UpdateArtistInfoModal from "../modal/UpdateArtistInfoModal";
import DeleteRecordModal from "../modal/DeleteRecordModal";

function TableSelector({
  table,
  setTable,
  tableOptions,
  searchResult,
  showUpdateModal,
  setShowUpdateModal,
  pendingUpdate,
  setPendingUpdate,
  editValues,
  setEditValues,
  updateLoading,
  updateError,
  updateSuccess,
  handleLocalSubmit,
  requiredFields,
  booleanFields,
  tableData,
  loading,
  error,
  isRestrictedField,
  handleDeleteRecord,
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteRecordId, setDeleteRecordId] = useState(null);

  // Filter tableData based on searchResult from ArtistSearchForm
  let filteredData = tableData;
  if (searchResult) {
    if (typeof searchResult === "object" && !searchResult.error) {
      filteredData = [searchResult];
    } else if (searchResult.error) {
      filteredData = [];
    }
  }

  return (
    <div className="mb-6 flex flex-col items-center w-full">
      <label className="mb-2 text-lg font-bold text-purple-700">
        Select Table to Update
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
              {opt.charAt(0).toUpperCase() + opt.slice(1).replace(/_/g, " ")}
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
      {/* Table Data Display */}
      <div className="w-full max-w-2xl">
        {/* Only show cards if a table is selected */}
        {table && (
          <>
            {loading && (
              <div className="text-purple-600 font-semibold">
                Loading table data...
              </div>
            )}
            {error && <div className="text-red-500 font-semibold">{error}</div>}
            {updateError && (
              <div className="text-red-500 font-semibold">{updateError}</div>
            )}
            {updateSuccess && (
              <div className="text-green-600 font-semibold">
                {updateSuccess}
              </div>
            )}
            {filteredData &&
              Array.isArray(filteredData) &&
              filteredData.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                  {filteredData.map((row, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-purple-200 rounded-xl shadow-lg p-6 flex flex-col gap-2 transition-transform transform hover:scale-105 hover:shadow-2xl"
                    >
                      <div className="flex flex-col gap-y-2">
                        {Object.entries(row).map(([field, value]) => (
                          <div key={field} className="flex flex-col mb-2">
                            <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-1">
                              {field.replace(/_/g, " ")}
                            </span>
                            <span className="text-base text-purple-900 break-words">
                              {value === null ||
                              value === undefined ||
                              String(value).trim() === ""
                                ? "null"
                                : String(value)}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-2 self-end">
                        <button
                          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 font-bold"
                          onClick={() => {
                            setPendingUpdate(row);
                            setEditValues(row);
                            setShowUpdateModal(true);
                          }}
                        >
                          Update
                        </button>
                        <button
                          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-bold"
                          onClick={() => {
                            setDeleteRecordId(row.id);
                            setShowDeleteModal(true);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            {filteredData &&
              Array.isArray(filteredData) &&
              filteredData.length === 0 && (
                <div className="text-gray-500 italic">
                  No records found for this table.
                </div>
              )}
          </>
        )}
        {/* Delete Modal */}
        <DeleteRecordModal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onDelete={() => {
            handleDeleteRecord(table, deleteRecordId);
            setShowDeleteModal(false);
          }}
          recordId={deleteRecordId}
        />
        {/* Update Modal */}
        <UpdateArtistInfoModal
          show={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          pendingUpdate={pendingUpdate}
          editValues={editValues}
          setEditValues={setEditValues}
          updateLoading={updateLoading}
          handleLocalSubmit={handleLocalSubmit}
          requiredFields={requiredFields}
          booleanFields={booleanFields}
          isRestrictedField={isRestrictedField}
        />
      </div>
    </div>
  );
}

export default TableSelector;