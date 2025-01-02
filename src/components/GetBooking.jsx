"use client";

import { useState } from "react";

export default function GetBooking() {
  const [bookingId, setBookingId] = useState("");
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState("");

  const fetchBooking = async () => {
    try {
      const response = await fetch(`/api/bookings?id=${bookingId}`);
      const result = await response.json();

      if (!response.ok) {
        setError(result.message);
        setBooking(null);
        return;
      }

      setBooking(result);
      setError("");
    } catch (error) {
      setError("An unexpected error occurred.");
      setBooking(null);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Booking ID"
        value={bookingId}
        onChange={(e) => setBookingId(e.target.value)}
        className="p-2 border border-gray-300 rounded w-full"
      />
      <button
        onClick={fetchBooking}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Get Booking
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {booking && (
        <div className="border p-4 mt-4 rounded bg-gray-100">
          <h3 className="font-bold">Booking Details:</h3>
          <p><strong>ID:</strong> {booking.id}</p>
          <p><strong>Name:</strong> {booking.name}</p>
          <p><strong>Contact:</strong> {booking.contact}</p>
          <p><strong>Date:</strong> {booking.date}</p>
          <p><strong>Time:</strong> {booking.time}</p>
          <p><strong>Guests:</strong> {booking.guests}</p>
        </div>
      )}
    </div>
  );
}
