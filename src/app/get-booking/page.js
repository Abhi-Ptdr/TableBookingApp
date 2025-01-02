import GetBooking from "@/components/GetBooking";
import Link from "next/link"; // To navigate back to the homepage

export default function GetBookingPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Get Booking</h1>
      <GetBooking />

      {/* Back to Home button */}
      <div className="mt-6">
        <Link href="/" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
