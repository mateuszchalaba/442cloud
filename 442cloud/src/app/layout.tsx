import type { Metadata } from "next";
import { Oxanium } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "442 Cloud",
  description: "442 Cloud Official Website",
  icons: {
    icon: "/favicon.ico",
  },
};

const oxanium = Oxanium({
  subsets: ["latin"],
  weight: ["400", "700"], // możesz dodać więcej wag jak chcesz
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* TYLKO OXANIUM, bez Tailwinda, bez variable */}
      <body className={`${oxanium.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
