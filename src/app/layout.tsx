import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kshitij Aghara - Director",
  description: "Portfolio of Kshitij Aghara, a Director of Photography based in India. Cinematic commercials, music videos, and narratives.",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://directorsaheb.com',
    title: "Kshitij Aghara - Director",
    description: "Cinematic commercials, music videos, and narratives potrayed by Kshitij Aghara.",
    siteName: "Kshitij Aghara",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
