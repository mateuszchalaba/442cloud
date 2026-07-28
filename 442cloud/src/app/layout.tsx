import type { Metadata, Viewport } from "next";
import { Oxanium, Inter } from "next/font/google";
import "./globals.css";

const oxanium = Oxanium({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-oxanium",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://442cloud.com"),
  title: {
    default: "442 Cloud — Engineering your digital victory",
    template: "%s | 442 Cloud",
  },
  description:
    "442 Cloud delivers Salesforce & Agentforce implementations with the precision of a perfect 4-4-2. Structure, balance and strategy that turn your business goals into results.",
  keywords: [
    "442 Cloud",
    "Salesforce",
    "Agentforce",
    "Salesforce implementation",
    "CRM consulting",
    "Experience Cloud",
    "Service Cloud",
  ],
  authors: [{ name: "442 Cloud" }],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    type: "website",
    title: "442 Cloud — Engineering your digital victory",
    description:
      "A winning Salesforce strategy designed to strengthen your team, streamline your play and elevate your results.",
    siteName: "442 Cloud",
    images: [{ url: "/slides/first.png", width: 1376, height: 768, alt: "442 Cloud" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "442 Cloud — Engineering your digital victory",
    description:
      "Salesforce & Agentforce implementations built on the precision of a perfect 4-4-2.",
    images: ["/slides/first.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#04070f",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${oxanium.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
