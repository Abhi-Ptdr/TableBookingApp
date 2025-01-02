"use client";

import { useState } from "react";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    guests: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    alert(result.message);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="p-2 border border-gray-300 rounded"
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
        className="p-2 border border-gray-300 rounded"
      />
      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        required
        className="p-2 border border-gray-300 rounded"
      />
      <input
        type="number"
        name="guests"
        placeholder="Number of Guests"
        value={formData.guests}
        onChange={handleChange}
        required
        className="p-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}
