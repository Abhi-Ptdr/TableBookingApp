import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, contact, date, time, guests } = data;

    if (!name || !contact || !date || !time || !guests) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("bookingApp");

    // Check if the slot is already booked
    const existingBooking = await db
      .collection("bookings")
      .findOne({ date, time });

    if (existingBooking) {
      return NextResponse.json(
        { message: "This slot is already booked." },
        { status: 409 }
      );
    }

    // Insert the new booking
    const result = await db.collection("bookings").insertOne({
      name,
      contact,
      date,
      time,
      guests,
    });

    // Return the booking ID
    return NextResponse.json({
      message: "Booking successful!",
      booking: {
        id: result.insertedId.toString(), // Convert ObjectId to string
        name,
        contact,
        date,
        time,
        guests,
      },
    });
  } catch (error) {
    console.error("Error adding booking:", error);
    return NextResponse.json(
      { message: "Error adding booking." },
      { status: 500 }
    );
  }
}
