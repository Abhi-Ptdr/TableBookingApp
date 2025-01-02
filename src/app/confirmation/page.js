"use client";

import { useSearchParams } from "next/navigation";

export default function ConfirmationPage() {
  const searchParams = useSearchParams();

  const name = searchParams.get("name");
  const contact = searchParams.get("contact");
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const guests = searchParams.get("guests");

  return (
    <div className="max-w-xl mx-auto mt-10 text-center">
      <h1 className="text-2xl font-bold mb-4">Booking Confirmed!</h1>
      <p className="mb-6">Thank you for your reservation, {name}.</p>
      <div className="border p-4 rounded bg-gray-100">
        <h2 className="font-bold mb-2">Reservation Details:</h2>
        <p>
          <strong>Date:</strong> {date}
        </p>
        <p>
          <strong>Time:</strong> {time}
        </p>
        <p>
          <strong>Guests:</strong> {guests}
        </p>
        <p>
          <strong>Contact:</strong> {contact}
        </p>
      </div>
      <button
        onClick={() => window.location.href = "/"}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Back to Home
      </button>
    </div>
  );
}
