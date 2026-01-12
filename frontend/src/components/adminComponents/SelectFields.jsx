import React from "react";

function SelectFields({ table1, fields1, setFields1, tableFields1 }) {
  // Utility: remove fields that are 'id' or end with '_id'
  function filterOutIdFields(fields) {
    return fields.filter((field) => field !== "id" && !field.endsWith("_id"));
  }
  const filteredFields =
    table1 && tableFields1[table1]
      ? filterOutIdFields(tableFields1[table1])
      : [];
  return (
    <div>
      <label className="block mb-2 font-semibold">Select Fields</label>
      <select
        multiple
        value={fields1 && fields1.length > 0 ? fields1 : [""]}
        onChange={(e) => {
          const selected = Array.from(
            e.target.selectedOptions,
            (opt) => opt.value
          );
          // If 'all' is selected, select all filtered fields
          if (selected.includes("all")) {
            setFields1(filteredFields);
          } else {
            setFields1(selected);
          }
        }}
        className="w-full p-2 mb-4 border rounded h-32"
        required
      >
        <option value="all">Select All</option>
        {filteredFields.map((field) => (
          <option key={field} value={field}>
            {field}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectFields;
