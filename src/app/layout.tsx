import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#0d9488",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://vettalk-vg5a.vercel.app"),
  title: "VetTalk (24*7) | Talk to a Vet from Home",
  description:
    "Online veterinary consultation for dogs and cats on WhatsApp at Flat ₹200. Connect with licensed veterinarians 24*7.",
  keywords: [
    "VetTalk 24*7",
    "online vet consultation",
    "vet on whatsapp",
    "dog doctor online india",
    "cat veterinary consultation",
    "telehealth pet care india",
  ],
  authors: [{ name: "VetTalk (24*7)" }],
  openGraph: {
    title: "VetTalk (24*7) | Talk to a Vet from Home",
    description:
      "Online veterinary consultation for dogs and cats on WhatsApp at Flat ₹200. Connect with licensed veterinarians 24*7.",
    url: "https://vettalk-vg5a.vercel.app",
    type: "website",
    locale: "en_IN",
    siteName: "VetTalk (24*7)",
    images: [
      {
        url: "/images/vettalk-hero-banner.jpg",
        width: 1024,
        height: 535,
        alt: "VetTalk (24*7) - Talk to a Licensed Vet from Home for Flat ₹200",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VetTalk (24*7) | Online Veterinary Consultation",
    description:
      "Online veterinary consultation for dogs and cats on WhatsApp at Flat ₹200. Connect with licensed veterinarians 24*7.",
    images: ["/images/vettalk-hero-banner.jpg"],
  },
  icons: {
    icon: "/images/vettalk-logo.jpg",
    shortcut: "/images/vettalk-logo.jpg",
    apple: "/images/vettalk-logo.jpg",
  },
};

import { MetaPixel } from "@/components/MetaPixel";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50 antialiased`}>
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
