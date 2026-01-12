import React from "react";

function MultipleInputFields({ rows, setRows }) {
  return (
    <textarea
      placeholder="Rows (CSV, one row per line)\nExample: 1,Test Album,2025-01-01"
      value={rows}
      onChange={(e) => setRows(e.target.value)}
      className="w-full p-2 mb-4 border rounded"
      rows={6}
      required
    />
  );
}

export default MultipleInputFields;
