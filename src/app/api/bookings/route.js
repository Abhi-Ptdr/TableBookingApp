import { NextResponse } from "next/server";

const bookings = []; // Temporary in-memory storage (replace with DB in production)

export async function GET() {
  return NextResponse.json(bookings);
}

export async function POST(request) {
  const data = await request.json();

  // Basic validation for required fields
  if (!data.name || !data.contact || !data.date || !data.time || !data.guests) {
    return NextResponse.json(
      { message: "All fields are required!" },
      { status: 400 }
    );
  }

  bookings.push(data);
  return NextResponse.json({
    message: "Booking created successfully!",
    booking: data,
  });
}
