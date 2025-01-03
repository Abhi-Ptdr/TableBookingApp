"use client";

export default function TimelineView({ date, bookedSlots, onSlotSelect }) {
  const allSlots = [
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
  ];

  return (
    <div className="max-w-md mx-auto mt-6">
      <h2 className="text-lg font-bold">Select a Slot for {date}:</h2>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {allSlots.map((slot) => (
          <button
            key={slot}
            onClick={() => onSlotSelect(slot)}
            className={`px-4 py-2 rounded ${
              bookedSlots.includes(slot)
                ? "bg-red-500 text-white cursor-not-allowed" // Booked slots (red)
                : "bg-green-500 text-white hover:bg-green-600" // Available slots (green)
            }`}
            disabled={bookedSlots.includes(slot)} // Disable button for booked slots
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
}
