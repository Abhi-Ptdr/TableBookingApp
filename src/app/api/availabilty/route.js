import { NextResponse } from "next/server";

const availability = [
  { date: "2025-01-05", time: "18:00", slots: 5 },
  { date: "2025-01-05", time: "20:00", slots: 3 },
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  const available = availability.filter((slot) => slot.date === date);
  return NextResponse.json(available);
}
