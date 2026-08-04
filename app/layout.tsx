import type { Metadata, Viewport } from "next";
import { Sansation, Didact_Gothic } from "next/font/google";
import { SiteBackground } from "@/components/custom/SiteBackground";
import { SmoothScroll } from "@/components/custom/SmoothScroll";
import "./globals.css";

const sansation = Sansation({
  variable: "--font-sansation",
  weight: ["300", "400", "700"],
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
      className={`${sansation.variable} ${didactGothic.variable} h-full antialiased`}
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
