import type { Metadata, Viewport } from "next";
import { Manrope, Didact_Gothic } from "next/font/google";
import { SiteBackground } from "@/components/custom/SiteBackground";
import { SmoothScroll } from "@/components/custom/SmoothScroll";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const didactGothic = Didact_Gothic({
  variable: "--font-didact-gothic",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aurora — Placeholder Title",
  description: "Placeholder description for the Aurora landing page.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${didactGothic.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col overflow-x-hidden"
        suppressHydrationWarning
      >
        <SmoothScroll />
        <SiteBackground />
        {children}
      </body>
    </html>
  );
}
