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

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the form data
    setFormData({ ...formData, [name]: value });

    // If the contact field, we apply real-time validation
    if (name === "contact") {
      // Allow only numeric characters (0-9) and restrict input length to 10 digits
      if (!/^\d{0,10}$/.test(value)) {
        setError("Contact number must be exactly 10 digits.");
      } else {
        setError(null); // Clear error if input is valid
      }
    }
  };

  // Block non-numeric input and restrict to 10 digits
  const handleContactKeyDown = (e) => {
    // Allow only numeric input and control key operations (backspace, delete, etc.)
    if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
      e.preventDefault();
    }

    // If the length exceeds 10 digits, prevent any further input
    if (formData.contact.length >= 10 && !["Backspace", "Delete"].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.name || !formData.contact) {
      setError("Name and contact are required.");
      return;
    }

    // Validate contact for exactly 10 digits
    if (!/^\d{10}$/.test(formData.contact)) {
      setError("Contact number must be exactly 10 digits.");
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
    <div className="max-w-xl mx-auto mt-10 text-center px-4 sm:px-6 md:px-8">

      <h1 className="text-2xl font-bold mb-4 pt-8">Welcome to Restaurant Booking</h1>
      <p className="text-sm mb-8">Book your table online with ease.</p>
        <button
          onClick={() => router.push("/booking")}
          className="mb-8 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-full sm:w-auto"
        >
          Book Now
        </button>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Find Your Booking</h2>
        <p className="text-sm mb-8">Already have a booking? Get details here..</p>

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
            onKeyDown={handleContactKeyDown} // Prevent non-numeric input and restrict to 10 digits
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
          {error && name === "contact" && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Get Booking Details
          </button>
        </form>
      </div>
    </div>
  );
}
