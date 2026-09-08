import type { Metadata, Viewport } from "next";
import { Sansation, Didact_Gothic } from "next/font/google";
import Script from "next/script";
import { SiteBackground } from "@/components/custom/SiteBackground";
import { SmoothScroll } from "@/components/custom/SmoothScroll";
import "./globals.css";

const META_PIXEL_ID = "1773685510479099";

// Canonical marketing origin (no trailing slash). Keep this in sync with
// app/sitemap.ts and app/robots.ts.
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.auroraxp.io"
).replace(/\/$/, "");

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Aurora",
  alternateName: "Aurora XP",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/icon.png`,
  description:
    "Aurora XP connects lenders with carefully evaluated lending and investment opportunities, helping growing businesses access the capital they need through the Aurora Vault platform.",
  foundingDate: "2026",
  knowsAbout: [
    "Small business lending",
    "Peer-to-peer lending",
    "Digital asset lending",
    "USDT lending",
    "Investment vaults",
  ],
  sameAs: ["https://www.facebook.com/auroraxp.official"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: "Aurora XP",
  description:
    "Fund businesses, build tomorrow — Aurora XP connects lenders with vetted lending and investment opportunities.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-US",
};

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
  metadataBase: new URL(SITE_URL),
  title: "Aurora XP",
  description:
    "Aurora XP connects lenders with carefully evaluated lending and investment opportunities, helping growing businesses access the capital they need.",
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
        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <SmoothScroll />
        <SiteBackground />
        {children}
      </body>
    </html>
  );
}
