import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid"; // Import uuid for generating unique IDs

// In-memory bookings (replace with a database in production)
const bookings = [
  { id: "1", name: "John Doe", contact: "1234567890", date: "2025-01-01", time: "10:00", guests: 2 },
  { id: "2", name: "Jane Doe", contact: "0987654321", date: "2025-01-02", time: "11:30", guests: 4 },
];

// Handle GET requests to fetch all bookings or specific booking by ID
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id"); // Retrieve specific booking by ID if provided

  if (id) {
    const booking = bookings.find((b) => b.id === id);
    if (!booking) {
      return NextResponse.json(
        { message: "Booking not found." },
        { status: 404 }
      );
    }
    return NextResponse.json(booking);
  }

  // Return all bookings if no ID is specified
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

  // Generate a unique ID for the booking
  const newBooking = {
    ...data,
    id: uuidv4(),
    date: data.date, // Already formatted as YYYY-MM-DD from the frontend
  };  

  bookings.push(newBooking);
  return NextResponse.json({
    message: "Booking created successfully!",
    booking: newBooking,
  });
}

// Handle DELETE requests to delete a booking
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "Booking ID is required." },
      { status: 400 }
    );
  }

  const bookingIndex = bookings.findIndex((b) => b.id === id);
  if (bookingIndex === -1) {
    return NextResponse.json(
      { message: "Booking not found." },
      { status: 404 }
    );
  }

  bookings.splice(bookingIndex, 1);
  return NextResponse.json({ message: "Booking deleted successfully." });
}
