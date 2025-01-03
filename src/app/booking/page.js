"use client";

import React, { useState } from "react";
import CalendarView from "@/components/CalendarView";
import TimelineView from "@/components/TimelineView";
import BookingForm from "@/components/BookingForm";

// Helper function to format the date
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleDateSelect = async (date) => {
    setSelectedDate(date);
    setSelectedSlot(null); // Reset the slot if the date changes

    const formattedDate = formatDate(date); // Format the date as YYYY-MM-DD
    const response = await fetch(`/api/bookings/slots?date=${formattedDate}`);
    const data = await response.json();
    console.log("Booked Slots Data:", data); // Log to verify data

    // Ensure data.bookedSlots is an array of time slots
    setBookedSlots(data.bookedSlots || []);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Book Your Slot</h1>

      {/* Calendar View */}
      <CalendarView onDateSelect={handleDateSelect} />

      {/* Timeline View with Color-Coding for Slots */}
      {selectedDate && (
        <TimelineView
          date={selectedDate.toDateString()}
          bookedSlots={bookedSlots} // Pass booked slots here
          onSlotSelect={handleSlotSelect}
        />
      )}

      {/* Booking Form */}
      {selectedSlot && (
        <BookingForm
          date={formatDate(selectedDate)} // Pass formatted date
          time={selectedSlot}
        />
      )}
    </div>
  );
}
