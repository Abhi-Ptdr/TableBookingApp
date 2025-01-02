import { NextResponse } from "next/server";

// Example bookings array (replace with a database in production)
const bookings = [
  { date: "2025-01-01", time: "10:00" },
  { date: "2025-01-01", time: "11:30" },
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json(
      { message: "Date is required to fetch available slots." },
      { status: 400 }
    );
  }

  // Define all possible time slots for a day
  const allSlots = [
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
  ];

  // Filter out slots already booked on the selected date
  const bookedSlots = bookings
    .filter((booking) => booking.date === date)
    .map((booking) => booking.time);

  const availableSlots = allSlots.filter((slot) => !bookedSlots.includes(slot));

  return NextResponse.json({ slots: availableSlots });
}
