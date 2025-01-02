"use client";

import BookingForm from "@/components/BookingForm";

export default function BookingPage() {
  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Book a Table</h1>
      <BookingForm />
    </div>
  );
}
