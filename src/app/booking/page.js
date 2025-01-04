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
    <div className="max-w-full sm:max-w-4xl mx-auto px-4 sm:px-6 md:px-8 mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Book Your Slot</h1>

      {/* Calendar and Timeline Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Calendar View */}
        <div className="flex justify-center">
          <CalendarView onDateSelect={handleDateSelect} />
        </div>

        {/* Timeline View - Always Visible */}
        <div className="flex justify-center">
          <TimelineView
            date={selectedDate ? selectedDate.toDateString() : "No Date Selected"} // Show placeholder if no date
            bookedSlots={selectedDate ? bookedSlots : []} // Pass empty booked slots if no date is selected
            onSlotSelect={handleSlotSelect}
          />
        </div>
      </div>

      {/* Booking Form */}
      {selectedSlot && (
        <div className="mt-8">
          <BookingForm
            date={formatDate(selectedDate)} // Pass formatted date
            time={selectedSlot}
          />
        </div>
      )}
    </div>
  );
}
