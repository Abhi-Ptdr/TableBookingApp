"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.name || !formData.contact) {
      setError("Name and contact are required.");
      return;
    }

    try {
      // Send a request to fetch booking by name and contact
      const response = await fetch("/api/bookings/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Booking not found.");
        return;
      }

      // Redirect to the confirmation page with the booking details
      router.push(`/confirmation?id=${data.booking.id}`);
    } catch (err) {
      setError("Failed to fetch booking details.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 text-center">
      <h1 className="text-2xl font-bold mb-4">Find Your Booking</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded w-full"
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Your Contact Number"
          value={formData.contact}
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded w-full"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Get Booking Details
        </button>
      </form>

      {/* "Book Now" Button */}
      <div className="mt-6">
        <button
          onClick={() => router.push("/booking")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
