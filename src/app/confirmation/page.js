// "use client";

// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function ConfirmationPage() {
//   const searchParams = useSearchParams(); // To read query parameters
//   const [bookingDetails, setBookingDetails] = useState(null);
//   const [error, setError] = useState(null);

//   const bookingId = searchParams.get("id"); // Extract the booking ID from query params

//   useEffect(() => {
//     const fetchBookingDetails = async () => {
//       if (!bookingId) {
//         setError("Booking ID is missing.");
//         return;
//       }

//       try {
//         const response = await fetch(`/api/bookings/${bookingId}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch booking details.");
//         }
//         const data = await response.json();
//         setBookingDetails(data.booking);
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     fetchBookingDetails();
//   }, [bookingId]);

//   if (error) {
//     return (
//       <div className="max-w-xl mx-auto mt-10 text-center">
//         <h1 className="text-2xl font-bold mb-4">Error</h1>
//         <p className="text-red-500">{error}</p>
//         <button
//           onClick={() => window.location.href = "/"}
//           className="mt-6 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//         >
//           Back to Home
//         </button>
//       </div>
//     );
//   }

//   if (!bookingDetails) {
//     return (
//       <div className="max-w-xl mx-auto mt-10 text-center">
//         <h1 className="text-2xl font-bold mb-4">Loading...</h1>
//       </div>
//     );
//   }

//   const { id, name, contact, date, time, guests } = bookingDetails;

//   return (
//     <div className="max-w-xl mx-auto mt-10 text-center">
//       <h1 className="text-2xl font-bold mb-4">Booking Confirmed!</h1>
//       <p className="mb-6">Thank you for your reservation, {name}.</p>
//       <div className="border p-4 rounded bg-gray-100">
//         <h2 className="font-bold mb-2">Reservation Details:</h2>
//         <p><strong>Booking ID:</strong> {id}</p>
//         <p><strong>Name:</strong> {name}</p>
//         <p><strong>Contact:</strong> {contact}</p>
//         <p><strong>Date:</strong> {date}</p>
//         <p><strong>Time:</strong> {time}</p>
//         <p><strong>Guests:</strong> {guests}</p>
//       </div>

//       {/* Button for Delete Booking */}
//       <div className="mt-6 space-y-4">
//         <button
//           onClick={() => window.location.href = `/delete-booking?id=${id}`}
//           className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//         >
//           Delete Booking
//         </button>
//       </div>

//       {/* Back to Home button */}
//       <button
//         onClick={() => window.location.href = "/"}
//         className="mt-6 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
//       >
//         Back to Home
//       </button>
//     </div>
//   );
// }

"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ConfirmationPage() {
  const searchParams = useSearchParams(); // To read query parameters
  const [bookingDetails, setBookingDetails] = useState(null);
  const [error, setError] = useState(null);

  const bookingId = searchParams.get("id"); // Extract the booking ID from query params

  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (!bookingId) {
        setError("Booking ID is missing.");
        return;
      }

      try {
        const response = await fetch(`/api/bookings/${bookingId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch booking details.");
        }
        const data = await response.json();
        setBookingDetails(data.booking);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!bookingDetails) {
    return (
      <div className="max-w-xl mx-auto mt-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
      </div>
    );
  }

  const { id, name, contact, date, time, guests } = bookingDetails;

  return (
    <div className="max-w-xl mx-auto mt-10 text-center px-4 sm:px-6 md:px-8">
      <h1 className="text-2xl font-bold mb-4">Booking Confirmed!</h1>
      <p className="mb-6">Thank you for your reservation, {name}.</p>
      <div className="border p-4 rounded bg-gray-100">
        <p><strong>Booking ID:</strong> {id}</p>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Contact:</strong> {contact}</p>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Time:</strong> {time}</p>
        <p><strong>Guests:</strong> {guests}</p>
      </div>

      {/* Button for Delete Booking */}
      <div className="mt-6 space-y-4">
        <button
          onClick={() => window.location.href = `/delete-booking?id=${id}`}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete Booking
        </button>
      </div>

      {/* Back to Home button */}
      <button
        onClick={() => window.location.href = "/"}
        className="mt-6 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 w-full sm:w-auto"
      >
        Back to Home
      </button>
    </div>
  );
}

