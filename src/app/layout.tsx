import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import "./globals.css";

const inter = Nunito({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "TurboSnail",
  description:
    "Snails are slow and Sluggish But they are Courageuos and Never Tired",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} linear-gradient antialiased`}>
        {children}
      </body>
    </html>
  );
}
