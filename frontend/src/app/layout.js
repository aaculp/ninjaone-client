"use client";

import localFont from "next/font/local";
import { Inter } from "next/font/google";

import "./globals.css";
import { NinajaOneProvider } from "@/state/context";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const inter = Inter({
  weight: ["400", "700"],
  subsets: ["latin"],
});
";z?"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
        id="root"
      >
        <NinajaOneProvider>{children}</NinajaOneProvider>
      </body>
    </html>
  );
}
