import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  const params = await context.params; // Await the `params` object
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { message: "Booking ID is required." },
      { status: 400 }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db("bookingApp");

    // Convert the ID string to ObjectId
    const booking = await db.collection("bookings").findOne({ _id: new ObjectId(id) });

    if (!booking) {
      return NextResponse.json(
        { message: "Booking not found." },
        { status: 404 }
      );
    }

    // Add the `id` field back to the response
    booking.id = booking._id.toString();
    delete booking._id;

    return NextResponse.json({ booking });
  } catch (error) {
    console.error("Error fetching booking by ID:", error);
    return NextResponse.json(
      { message: "Error fetching booking details." },
      { status: 500 }
    );
  }
}
