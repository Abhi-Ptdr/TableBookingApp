import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json(
      { message: "Date is required to fetch slots." },
      { status: 400 }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db("bookingApp");

    // Fetch all bookings for the specified date
    const bookings = await db.collection("bookings").find({ date }).toArray();
    const bookedSlots = bookings.map((booking) => booking.time);

    return NextResponse.json({ bookedSlots });
  } catch (error) {
    console.error("Error fetching booked slots:", error);
    return NextResponse.json(
      { message: "Error fetching booked slots." },
      { status: 500 }
    );
  }
}
