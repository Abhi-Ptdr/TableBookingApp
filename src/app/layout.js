import '../styles/globals.css';  // Correct path to your globals.css

export const metadata = {
  title: "Table Booking System",
  description: "Restaurant Table Booking Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 font-sans text-gray-800">
        {children}
      </body>
    </html>
  );
}
