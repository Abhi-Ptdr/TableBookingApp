"use client";

import { useState } from "react";

export default function DeleteBooking() {
  const [bookingId, setBookingId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const deleteBooking = async () => {
    try {
      const response = await fetch(`/api/bookings?id=${bookingId}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (!response.ok) {
        setError(result.message);
        setMessage("");
        return;
      }

      setMessage(result.message);
      setError("");
    } catch (error) {
      setError("An unexpected error occurred.");
      setMessage("");
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
        onClick={deleteBooking}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Delete Booking
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {message && <p className="text-green-500 mt-4">{message}</p>}
    </div>
  );
}
