"use client";

import { useState } from "react";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    date: "",
    time: "",
    guests: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    const currentDate = new Date();

    // Name validation
    if (!formData.name.trim()) {
      errors.name = "Name is required.";
    }

    // Contact validation
    if (!/^\d{10}$/.test(formData.contact)) {
      errors.contact = "Contact number must be exactly 10 numeric characters.";
    }

    // Date validation
    if (!formData.date) {
      errors.date = "Date is required.";
    } else {
      const selectedDate = new Date(formData.date);
      if (selectedDate < currentDate.setHours(0, 0, 0, 0)) {
        errors.date = "Please select a future date.";
      }
    }

    // Time validation
    if (!formData.time) {
      errors.time = "Time is required.";
    } else {
      const selectedDateTime = new Date(`${formData.date}T${formData.time}`);
      if (formData.date === currentDate.toISOString().split("T")[0]) {
        // If it's today's date, validate time
        const currentTime = currentDate.toTimeString().split(" ")[0];
        if (formData.time <= currentTime) {
          errors.time = "Please select a future time.";
        }
      }
    }

    // Guests validation
    if (!formData.guests || formData.guests <= 0) {
      errors.guests = "Number of guests must be a positive number.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    if (result.message) {
      alert(result.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "contact") {
      // Allow only numeric input and max length of 10
      if (/^\d{0,10}$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleContactKeyDown = (e) => {
    // Allow backspace, delete, and navigation keys
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ];
    if (!allowedKeys.includes(e.key) && isNaN(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded w-full"
          required
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div>
        <input
          type="text"
          name="contact"
          placeholder="Your Contact Number"
          value={formData.contact}
          onChange={handleChange}
          onKeyDown={handleContactKeyDown}
          className="p-2 border border-gray-300 rounded w-full"
          required
        />
        {errors.contact && (
          <p className="text-red-500 text-sm">{errors.contact}</p>
        )}
      </div>

      <div>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded w-full"
          min={new Date().toISOString().split("T")[0]} // Set minimum date to today
          required
        />
        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
      </div>

      <div>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded w-full"
          required
        />
        {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
      </div>

      <div>
        <input
          type="number"
          name="guests"
          placeholder="Number of Guests"
          value={formData.guests}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded w-full"
          min="1"
          required
        />
        {errors.guests && (
          <p className="text-red-500 text-sm">{errors.guests}</p>
        )}
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}
