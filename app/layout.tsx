import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import { profile } from "@/data/profile";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: profile.siteTitle,
  description: profile.siteDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-netflix-black text-white font-body antialiased">
        {children}
      </body>
    </html>
  );
}
