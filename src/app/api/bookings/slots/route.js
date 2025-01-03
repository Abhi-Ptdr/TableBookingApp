import { NextResponse } from "next/server";

// Example bookings (Replace with database in production)
const bookings = [
  { id: "1", date: "2025-01-01", time: "10:00" },
  { id: "2", date: "2025-01-01", time: "11:30" },
  { id: "3", date: "2025-01-02", time: "12:00" },
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json(
      { message: "Date is required to fetch slots." },
      { status: 400 }
    );
  }

  const bookedSlots = bookings
    .filter((booking) => booking.date === date)
    .map((booking) => booking.time);

  return NextResponse.json({ date, bookedSlots });
}
