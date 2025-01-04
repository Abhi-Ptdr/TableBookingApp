"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

// Main component wrapping the child in Suspense
export default function DeleteBookingPage() {
  return (
    <Suspense fallback={<p>Deleting booking...</p>}>
      <DeleteBookingDetails />
    </Suspense>
  );
}

// Child component to handle the logic of deleting booking
function DeleteBookingDetails() {
  const searchParams = useSearchParams();  // To read query parameters
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const bookingId = searchParams.get("id");  // Extract the booking ID from query params

  useEffect(() => {
    const deleteBooking = async () => {
      if (!bookingId) {
        setError("Booking ID is missing.");
        return;
      }

      try {
        const response = await fetch(`/api/bookings/${bookingId}`, {
          method: "DELETE",
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to delete booking.");
        }

        setMessage(data.message);
      } catch (err) {
        setError(err.message);
      }
    };

    deleteBooking();
  }, [bookingId]);

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!message) {
    return (
      <div className="max-w-xl mx-auto mt-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Deleting...</h1>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 text-center">
      <h1 className="text-2xl font-bold mb-4 pt-8">Delete Booking</h1>
      <p className="text-green-500">{message}</p>
      <button
        onClick={() => window.location.href = "/"}
        className="mt-6 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        Back to Home
      </button>
    </div>
  );
}
