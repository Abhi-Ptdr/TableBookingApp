"use client";

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar"; // React Calendar
import "react-calendar/dist/Calendar.css"; // Default styles for react-calendar

export default function CalendarView({ onDateSelect }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {
    fetchBookedSlots(selectedDate);
  }, [selectedDate]);

  const fetchBookedSlots = async (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    const response = await fetch(`/api/bookings/slots?date=${formattedDate}`);
    const data = await response.json();
    setBookedSlots(data.bookedSlots || []);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateSelect(date); // Pass selected date to parent
  };

  const disablePastDates = ({ date, view }) => {
    // Disable all dates before today
    if (view === "month") {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Remove time from today for comparison
      return date < today;
    }
    return false;
  };

  return (
    <div className="max-w-md mx-auto">
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileDisabled={disablePastDates} // Disable past dates
      />
      {/* <div className="mt-4">
        <h2 className="text-lg font-bold">Booked Slots:</h2>
        <ul>
          {bookedSlots.length > 0 ? (
            bookedSlots.map((slot, index) => (
              <li key={index} className="text-red-500">
                {slot}
              </li>
            ))
          ) : (
            <p className="text-green-500">All slots available</p>
          )}
        </ul>
      </div> */}
    </div>
  );
}
