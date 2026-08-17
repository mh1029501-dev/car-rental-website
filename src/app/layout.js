import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const outfit = Outfit({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata = {
  title: {
    default: "CarRental — Premium Car Rentals in Pakistan",
    template: "%s | CarRental",
  },
  description: "Rent a car easily and affordably with CarRental. Browse our premium fleet of vehicles and book your ride in minutes. Serving Lahore and across Pakistan.",
  keywords: ["car rental", "rent a car", "Lahore car rental", "Pakistan car hire", "affordable rentals"],
  openGraph: {
    title: "CarRental — Premium Car Rentals",
    description: "Experience premium car rentals with CarRental. Easy booking, competitive prices, and a wide fleet.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className={outfit.className}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}