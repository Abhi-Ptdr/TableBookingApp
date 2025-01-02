import { NextResponse } from "next/server";

const bookings = []; // Temporary storage, replace with DB in production

export async function GET() {
  return NextResponse.json(bookings);
}

export async function POST(request) {
  const data = await request.json();
  bookings.push(data);
  return NextResponse.json({ message: "Booking created successfully!", booking: data });
}
