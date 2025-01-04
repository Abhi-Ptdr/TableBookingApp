import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// GET method to fetch booking details by ID
export async function GET(request, { params }) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { message: "Booking ID is required." },
      { status: 400 }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db("bookingApp");

    // Fetch booking by ID from MongoDB
    const booking = await db.collection("bookings").findOne({ _id: new ObjectId(id) });

    if (!booking) {
      return NextResponse.json(
        { message: "Booking not found." },
        { status: 404 }
      );
    }

    // Convert MongoDB ObjectId to string for frontend use
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

// DELETE method to delete booking by ID
export async function DELETE(request, { params }) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { message: "Booking ID is required." },
      { status: 400 }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db("bookingApp");

    // Delete the booking from MongoDB
    const result = await db.collection("bookings").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Booking not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Booking deleted successfully." });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return NextResponse.json(
      { message: "Error deleting booking." },
      { status: 500 }
    );
  }
}
