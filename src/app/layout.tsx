import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const lemonMilk = localFont({
  src: [
    {
      path: "../../public/fonts/LEMONMILK-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/LEMONMILK-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/LEMONMILK-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/LEMONMILK-Light.otf",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-lemon-milk",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
  },
  icons: {
    icon: '/camera.gif',
  },
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
        className={`${lemonMilk.variable} ${poppins.variable} antialiased font-sans`}
      >
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
