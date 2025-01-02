import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to Table Booking</h1>
      <p className="text-lg mb-8">Book your table online with ease.</p>
      <Link
        href="/booking"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Book Now
      </Link>
    </main>
  );
}
