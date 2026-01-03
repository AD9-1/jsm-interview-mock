import type { Metadata } from "next";
import { Montagu_Slab } from "next/font/google";
import { Mona_Sans } from "next/font/google";
import "./globals.css";

const montaguSlab = Montagu_Slab({
  variable: "--font-montagu-slab",
  subsets: ["latin"],
});

const monaSans = Mona_Sans({
  variable: "--font-monaSans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Interview Preparation",
  description: "An AI powered platform for preparing interviews",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scheme-dark">
      <body
        className={`${montaguSlab.className} antialiased bg-[url('/pattern1.jpg')] bg-cover`}
      >
        {children}
      </body>
    </html>
  );
}
