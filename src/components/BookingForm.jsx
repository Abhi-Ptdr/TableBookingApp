"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // For redirecting to confirmation page

export default function BookingForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    date: "",
    time: "",
    guests: "",
  });

  const [availableSlots, setAvailableSlots] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (formData.date) {
      fetchAvailableSlots(formData.date);
    }
  }, [formData.date]);

  const fetchAvailableSlots = async (date) => {
    try {
      const response = await fetch(`/api/bookings/available-slots?date=${date}`);
      const data = await response.json();
      if (data.slots) {
        setAvailableSlots(data.slots);
      } else {
        setAvailableSlots([]);
      }
    } catch (error) {
      console.error("Error fetching available slots:", error);
      setAvailableSlots([]);
    }
  };

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
    }

    // Guests validation
    if (!formData.guests || formData.guests <= 0) {
      errors.guests = "Number of guests must be a positive number.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   if (!validateForm()) return;
  
  //   try {
  //     const response = await fetch("/api/bookings", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(formData),
  //     });
  
  //     const result = await response.json();
  
  //     if (!response.ok) {
  //       // Show the specific error message sent by the backend
  //       alert(result.message);
  //       return;
  //     }
  
  //     if (result.message && result.booking) {
  //       // Redirect to confirmation page on successful booking
  //       const { name, contact, date, time, guests } = result.booking;
  //       router.push(
  //         `/confirmation?name=${encodeURIComponent(name)}&contact=${encodeURIComponent(
  //           contact
  //         )}&date=${encodeURIComponent(date)}&time=${encodeURIComponent(
  //           time
  //         )}&guests=${encodeURIComponent(guests)}`
  //       );
  //     }
  //   } catch (error) {
  //     // Handle network or unexpected errors
  //     console.error("An unexpected error occurred:", error);
  //     alert("An unexpected error occurred. Please try again.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  
    const result = await response.json();
  
    if (response.status === 400) {
      // Show the specific error message sent by the backend
      alert(result.message);
      return;
    }
  
    if (result.message && result.booking) {
      const { id, name, contact, date, time, guests } = result.booking;
      // Redirect to the confirmation page with query parameters including id
      router.push(
        `/confirmation?id=${encodeURIComponent(id)}&name=${encodeURIComponent(name)}&contact=${encodeURIComponent(contact)}&date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}&guests=${encodeURIComponent(guests)}`
      );
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
    const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
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
        <select
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded w-full"
          required
        >
          <option value="" disabled>
            Select Time Slot
          </option>
          {availableSlots.length > 0 ? (
            availableSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))
          ) : (
            <option disabled>No available slots</option>
          )}
        </select>
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
