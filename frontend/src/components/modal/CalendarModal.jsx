import React, { useState } from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

const CalendarModal = ({ isOpen, onClose, onSelectDate }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // For year dropdown, show a range (e.g., 100 years back and 20 years forward)
  const yearRange = Array.from({ length: 121 }, (_, i) => today.getFullYear() - 100 + i);
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  if (!isOpen) return null;

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (day) => {
    const selectedDate = new Date(currentYear, currentMonth, day);
    onSelectDate && onSelectDate(selectedDate);
    onClose && onClose();
  };

  // Generate calendar grid
  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex justify-between items-center mb-4">
          <button onClick={handlePrevMonth} className="px-2 py-1">&#8592;</button>
          <div className="flex items-center gap-2">
            <select
              className="border rounded p-1"
              value={currentMonth}
              onChange={e => setCurrentMonth(Number(e.target.value))}
            >
              {monthNames.map((name, idx) => (
                <option key={name} value={idx}>{name}</option>
              ))}
            </select>
            <select
              className="border rounded p-1"
              value={currentYear}
              onChange={e => setCurrentYear(Number(e.target.value))}
            >
              {yearRange.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <button onClick={handleNextMonth} className="px-2 py-1">&#8594;</button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center font-bold text-gray-600">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, idx) =>
            day ? (
              <button
                key={idx}
                className="w-8 h-8 rounded hover:bg-blue-200 focus:bg-blue-400"
                onClick={() => handleDateClick(day)}
              >
                {day}
              </button>
            ) : (
              <div key={idx} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
