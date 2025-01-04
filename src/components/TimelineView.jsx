"use client";

export default function TimelineView({ date, bookedSlots, onSlotSelect }) {
  const allSlots = [
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
  ];

  if (date === "No Date Selected") {
    return <p>Please select a date to view available slots.</p>;
  }

  const today = new Date();
  const isToday = date === today.toDateString(); // Check if the selected date is today

  // Filter slots if the date is today
  const filteredSlots = allSlots.filter((slot) => {
    if (!isToday) return true; // All slots are valid for other days

    const [slotHours, slotMinutes] = slot.split(":").map(Number);
    const nowHours = today.getHours();
    const nowMinutes = today.getMinutes();

    // Include only future slots
    return (
      slotHours > nowHours ||
      (slotHours === nowHours && slotMinutes > nowMinutes)
    );
  });

  return (
    <div className="max-w-md mx-auto mt-6">
      <h2 className="text-lg font-bold">Select a Slot for {date}:</h2>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {filteredSlots.map((slot) => (
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
        {filteredSlots.length === 0 && (
          <p className="text-red-500 col-span-3">No available slots.</p>
        )}
      </div>
    </div>
  );
}
