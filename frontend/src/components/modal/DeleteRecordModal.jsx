import React, { useState } from "react";

export default function DeleteRecordModal({
  show,
  onClose,
  onDelete,
  recordId,
}) {
  const [inputId, setInputId] = useState("");
  const [error, setError] = useState("");

  if (!show) return null;

  const handleConfirm = (e) => {
    e.preventDefault();
    if (inputId !== String(recordId)) {
      setError("ID does not match. Please enter the correct ID to confirm deletion.");
      return;
    }
    setError("");
    onDelete();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative">
        <h3 className="text-xl font-bold mb-4 text-center text-red-700">
          Confirm Delete Record
        </h3>
        <p className="mb-4 text-center text-gray-700">
          To confirm deletion, please type the record's ID (<span className="font-mono font-bold">{recordId}</span>) below:
        </p>
        <form onSubmit={handleConfirm}>
          <input
            type="text"
            className="w-full border rounded px-3 py-2 mb-2"
            placeholder="Enter ID to confirm"
            value={inputId}
            onChange={(e) => setInputId(e.target.value)}
            autoFocus
          />
          {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 font-semibold"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-bold"
            >
              Confirm Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
