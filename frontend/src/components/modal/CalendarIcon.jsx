import React from "react";

export const CalendarIcon = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 focus:outline-none"
    tabIndex={-1}
    aria-label="Open calendar"
    style={{ background: "none", border: "none", padding: 0, margin: 0 }}
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3.75 7.5h16.5M4.5 21h15a1.5 1.5 0 001.5-1.5V6.75a1.5 1.5 0 00-1.5-1.5h-15a1.5 1.5 0 00-1.5 1.5v12.75A1.5 1.5 0 004.5 21z" />
    </svg>
  </button>
);

export default CalendarIcon;
