const API_BASE = "/api";

export async function fetchBookings() {
  const response = await fetch(`${API_BASE}/bookings`);
  return response.json();
}

export async function checkAvailability(date) {
  const response = await fetch(`${API_BASE}/availability?date=${date}`);
  return response.json();
}
