# Table Booking System

## Overview

This is a Next.js project designed for managing restaurant table bookings. It allows users to book tables, view their bookings, and delete bookings. The system includes a calendar view for selecting dates, a timeline view for selecting time slots, and a form for entering booking details. The backend is powered by MongoDB for storing booking data.

## Features

- **Calendar View**: Users can select a date from a calendar to view available time slots.
- **Timeline View**: Displays available time slots for the selected date.
- **Booking Form**: Users can enter their details (name, contact, number of guests) to book a table.
- **Booking Management**:
  - **Get Booking**: Users can retrieve their booking details using their name and contact number.
  - **Delete Booking**: Users can delete their booking using the booking ID.
- **Confirmation Page**: Displays booking details after a successful booking and provides an option to delete the booking.
- **Responsive Design**: The application is fully responsive and works seamlessly on both desktop and mobile devices.

## Technologies Used

### Frontend:
- **Next.js**: A React framework for server-side rendering and static site generation.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **React Calendar**: A calendar component for selecting dates.

### Backend:
- **MongoDB**: A NoSQL database for storing booking data.
- **Next.js API Routes**: Used to handle backend logic and interact with the database.

### Other Libraries:
- **React**: A JavaScript library for building user interfaces.
- **MongoDB Node.js Driver**: Used to connect and interact with MongoDB.

## Getting Started

### Prerequisites
- **Node.js**: Ensure you have Node.js installed on your machine.
- **MongoDB**: Set up a MongoDB database and obtain the connection URI.

### Installation

1. Clone the Repository:

   ```bash
   git clone https://github.com/your-username/tablebooking.git
   cd tablebooking
   ```

2. Install Dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set Up Environment Variables:
   Create a `.env.local` file in the root directory and add your MongoDB URI:

   ```env
   MONGODB_URI=your_mongodb_uri
   ```

4. Run the Development Server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open the Application:
   Visit `http://localhost:3000` in your browser to view the application.

## Project Structure

- `src/app`: Contains the main application pages and API routes.
  - `api/bookings`: API routes for handling booking-related operations (create, read, delete).
  - `booking`: The booking page where users can select a date, time, and enter their details.
  - `confirmation`: Displays booking confirmation details.
  - `get-booking`: Allows users to retrieve their booking details.
  - `delete-booking`: Allows users to delete their booking.
- `src/components`: Contains reusable React components (e.g., CalendarView, TimelineView, BookingForm).
- `src/lib`: Contains utility functions (e.g., MongoDB connection setup).
- `src/styles`: Contains global and module-specific CSS files.

## API Endpoints

- **POST /api/bookings**: Create a new booking.
- **GET /api/bookings/slots**: Fetch booked slots for a specific date.
- **GET /api/bookings/[id]**: Fetch booking details by ID.
- **DELETE /api/bookings/[id]**: Delete a booking by ID.
- **POST /api/bookings/search**: Search for a booking by name and contact number.

## Usage

### Book a Table
1. Navigate to the booking page.
2. Select a date and time slot.
3. Enter your details and submit the form.

### View Booking Details
1. Go to the "Find Your Booking" section on the homepage.
2. Enter your name and contact number to retrieve your booking details.

### Delete a Booking
1. On the confirmation page, click the "Delete Booking" button.
2. Alternatively, go to the "Delete Booking" page and enter your booking ID.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (e.g., `git checkout -b feature/YourFeatureName`).
3. Commit your changes (e.g., `git commit -m 'Add some feature'`).
4. Push to the branch (e.g., `git push origin feature/YourFeatureName`).
5. Create a pull request.

## Contact Information

If you have any questions, suggestions, or feedback about this Project, feel free to reach out:

- **Name**: Abhishek Patidar
- **Email**: [your-email@example.com](mailto:abhipatidar253@gmail.com)
