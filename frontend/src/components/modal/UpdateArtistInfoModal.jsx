import React, { useState } from "react";
import { useEffect } from "react";
import InputFields from "../adminComponents/InputFields";
import DeleteRecordModal from "./DeleteRecordModal";
import ConfirmModeModal from "./ConfirmModeModal";

export default function UpdateArtistInfoModal({
  show,
  onClose,
  pendingUpdate,
  editValues,
  setEditValues,
  updateLoading,
  handleLocalSubmit,
  requiredFields,
  booleanFields,
  isRestrictedField,
  handleDeleteRecord,
  table,
}) {

  const [demosValue, setDemosValue] = useState(null);
  // Debugging: Log the 'demos' field whenever editValues changes
  useEffect(() => {
    if (editValues && typeof editValues === 'object' && 'demos' in editValues) {
      setDemosValue(editValues.demos);
    }
  }, [editValues]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [submitEvent, setSubmitEvent] = useState(null);
  if (!show || !pendingUpdate) return null;
  // Get the currently visible fields
  const visibleFields = Object.keys(editValues);
  // Create a filtered values object
  const filteredValues = {};
  visibleFields.forEach((field) => {
    filteredValues[field] = editValues[field];
  });
  const recordId = editValues.id;
  // Removed duplicate useState declarations

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitEvent(e);
    setShowConfirmModal(true);
  };

  const handleConfirmUpdate = (selectedMode) => {
    setShowConfirmModal(false);
    if (submitEvent) {
      // Pass the selected mode from the modal to handleLocalSubmit
      handleLocalSubmit(submitEvent, "update", visibleFields, filteredValues, selectedMode);
      setSubmitEvent(null);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 ">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-[30rem] w-full relative overflow-y-auto max-h-[80%]">
          <h3 className="text-xl font-bold mb-4 text-center text-purple-700">
            Edit Record Before Update
          </h3>
          <form onSubmit={handleFormSubmit}>
            <InputFields
              fields={visibleFields}
              fieldValues={editValues}
              setFieldValues={setEditValues}
              requiredFields={requiredFields}
              booleanFields={booleanFields}
              isRestrictedField={isRestrictedField}
            />
            <div className="flex justify-between gap-4 mt-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 font-semibold"
                onClick={onClose}
                disabled={updateLoading}
              >
                Cancel
              </button>
              
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-bold"
                disabled={updateLoading}
              >
                {updateLoading ? "Updating..." : "Confirm Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ConfirmModeModal
        show={showConfirmModal}
        onChangeMode={() => {}}
        onConfirm={handleConfirmUpdate}
        onCancel={() => setShowConfirmModal(false)}
        demosValue={demosValue}
      />
      <DeleteRecordModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={() => {
          handleDeleteRecord(table, recordId);
          setShowDeleteModal(false);
          onClose();
        }}
        recordId={recordId}
      />
    </>
  );
}