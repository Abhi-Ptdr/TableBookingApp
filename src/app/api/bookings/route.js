import { NextResponse } from "next/server";

// Simulated in-memory storage for bookings (replace with a database in production)
const bookings = [
  { date: "2025-01-01", time: "10:00" },
  { date: "2025-01-01", time: "11:30" },
];

// Handle GET requests to fetch all bookings
export async function GET() {
  return NextResponse.json(bookings);
}

// Handle POST requests to create a booking
export async function POST(request) {
  const data = await request.json();

  // Validate required fields
  if (!data.name || !data.contact || !data.date || !data.time || !data.guests) {
    return NextResponse.json(
      { message: "All fields are required." },
      { status: 400 }
    );
  }

  // Check if the slot is already booked
  const isSlotBooked = bookings.some(
    (booking) => booking.date === data.date && booking.time === data.time
  );

  if (isSlotBooked) {
    return NextResponse.json(
      { message: "This slot is already booked. Please select a different slot." },
      { status: 400 }
    );
  }

  // Save the booking
  bookings.push(data);
  return NextResponse.json({
    message: "Booking created successfully!",
    booking: data,
  });
}

// Handle DELETE requests (optional, for deleting a booking)
export async function DELETE(request) {
  const { date, time } = await request.json();

  const bookingIndex = bookings.findIndex(
    (booking) => booking.date === date && booking.time === time
  );

  if (bookingIndex === -1) {
    return NextResponse.json(
      { message: "Booking not found." },
      { status: 404 }
    );
  }

  bookings.splice(bookingIndex, 1);
  return NextResponse.json({ message: "Booking deleted successfully." });
}
