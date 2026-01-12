import React, { useRef, useEffect } from "react";

function ArtistSearchForm({
  table,
  setTable,
  tableOptions = [],
  searchType,
  setSearchType,
  searchValue,
  setSearchValue,
  handleArtistSearch,
  artistResult,
  autoFocus = true, // default behavior but controllable
  onClearSearch,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]); // only refocus when the flag flips

  // console.log("you SearchType", searchType, searchValue);

  // Use the callback from parent to perform the search and update result
  // The actual search logic is handled in the parent (AdminDashboard)

  // Determine search type options based on table
  let searchTypeOptions = ["id"];
  if (["albums", "promotional_videos", "promotional_tracks", "tracks", "videos"].includes(table)) {
    searchTypeOptions = ["id", "title", "artist_id"];
  } else if (table === "artists") {
    searchTypeOptions = ["id", "name"];
  }

  return (
    <form
      onSubmit={handleArtistSearch}
      className="bg-white p-4 rounded shadow-md w-full max-w-lg mb-6"
    >
      <h2 className="text-xl font-bold mb-4 text-center">
        Search Table Record
      </h2>
      {/* Table Dropdown */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Select Table</label>
        <select
          value={table || ""}
          onChange={e => setTable(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="" disabled>
            Choose a table
          </option>
          {tableOptions.map(opt => (
            <option key={opt} value={opt}>
              {opt.charAt(0).toUpperCase() + opt.slice(1).replace(/_/g, ' ')}
            </option>
          ))}
        </select>
      </div>
      {/* Search Type and Value */}
      <div className="flex mb-4 gap-2">
        <select
          value={searchType}
          onChange={e => setSearchType(e.target.value)}
          className="p-2 border rounded"
        >
          {searchTypeOptions.map(opt => (
            <option key={opt} value={opt}>
              {opt.toUpperCase()}
            </option>
          ))}
        </select>
        <input
          ref={inputRef}
          type="text"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          placeholder={
            searchType === "id"
              ? `Enter ${table ? table.replace(/_/g, ' ') : ''} ID`
              : `Enter ${searchType.replace(/_/g, ' ')}`
          }
          className="w-full p-2 border rounded"
        />
        <button
          type="button"
          className="bg-gray-300 text-gray-800 px-3 py-2 rounded hover:bg-gray-400 font-semibold"
          onClick={() => {
            setSearchValue("");
            if (onClearSearch) onClearSearch();
          }}
          disabled={!searchValue}
        >
          Clear
        </button>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Search
      </button>
      {/* {artistResult && (
        <div className="mt-4 p-2 border rounded bg-gray-100">
          {artistResult.error ? (
            <span className="text-red-600">{artistResult.error}</span>
          ) : (
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(artistResult, null, 2)}
            </pre>
          )}
        </div>
      )} */}
    </form>
  );
}

export default ArtistSearchForm;
