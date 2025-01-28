import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Movie Database",
  description:
    "Discover detailed information about any movie, including cast, crew, release dates, genres, ratings, trailers, and reviews. Explore your favorite films in one place with our comprehensive movie database.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">  
      <body>
          <Navbar />
          {children}
          <Footer />
      </body>  
    </html>
  );
}
