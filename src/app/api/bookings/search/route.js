import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, contact } = await request.json();

    if (!name || !contact) {
      return NextResponse.json(
        { message: "Name and contact are required." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("bookingApp");

    // Search for the booking using name and contact
    const booking = await db.collection("bookings").findOne({ name, contact });

    if (!booking) {
      return NextResponse.json(
        { message: "Booking not found." },
        { status: 404 }
      );
    }

    // Convert MongoDB ObjectId to string and return booking details
    booking.id = booking._id.toString();
    delete booking._id;

    return NextResponse.json({ booking });
  } catch (error) {
    console.error("Error searching for booking:", error);
    return NextResponse.json(
      { message: "Error searching for booking." },
      { status: 500 }
    );
  }
}
