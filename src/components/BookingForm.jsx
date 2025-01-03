"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BookingForm({ date, time }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    guests: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required.";
    }

    if (!/^\d{10}$/.test(formData.contact)) {
      errors.contact = "Contact number must be exactly 10 numeric characters.";
    }

    if (!formData.guests || formData.guests <= 0) {
      errors.guests = "Number of guests must be a positive number.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const bookingDetails = {
      ...formData,
      date,
      time,
    };

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingDetails),
      });

      const result = await response.json();

      if (response.ok) {
        // Redirect to the confirmation page with the booking ID
        router.push(
          `/confirmation?id=${result.booking.id}`
        );
      } else {
        alert(result.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
      <h2 className="text-lg font-bold">Enter Your Details:</h2>

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded w-full"
        required
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

      <input
        type="text"
        name="contact"
        placeholder="Your Contact Number"
        value={formData.contact}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded w-full"
        required
      />
      {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}

      <input
        type="number"
        name="guests"
        placeholder="Number of Guests"
        value={formData.guests}
        onChange={handleInputChange}
        className="p-2 border border-gray-300 rounded w-full"
        min="1"
        required
      />
      {errors.guests && <p className="text-red-500 text-sm">{errors.guests}</p>}

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit Booking
      </button>
    </form>
  );
}
