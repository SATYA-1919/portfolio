import type { Metadata } from "next";
import { Space_Grotesk, Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/data";
import { ROBOT_SCENE_URL } from "@/lib/robot";
import { Background } from "@/components/Background";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif-instrument",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-jb",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: profile.name,
  description: profile.tagline,
  keywords: [
    "Satyaki Tirumal",
    "Full-Stack Developer",
    "Mobile Developer",
    "Next.js",
    "React",
    "Flutter",
    "AI",
  ],
  authors: [{ name: profile.name }],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    type: "website",
    url: "/",
    siteName: profile.name,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: `${profile.name} — portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    images: ["/og.jpg"],
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='24' fill='%23f4f4f2'/><text x='50' y='72' font-size='62' font-weight='700' font-family='Arial' fill='%230a0a0a' text-anchor='middle'>S</text></svg>",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${grotesk.variable} ${instrument.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://prod.spline.design" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://prod.spline.design" />
        {/* Static robot poster paints instantly while the live scene loads. */}
        <link rel="preload" href="/robot-hero.webp" as="image" media="(min-width: 1025px)" />
        {/* The 1.35 MB scene is only rendered on desktop — don't fetch it on phones. */}
        <link
          rel="preload"
          href={ROBOT_SCENE_URL}
          as="fetch"
          crossOrigin="anonymous"
          media="(min-width: 1025px)"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: profile.name,
              jobTitle: profile.role,
              url: profile.siteUrl,
              email: `mailto:${profile.email}`,
              address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressCountry: "IN" },
              sameAs: [profile.socials.github, profile.socials.linkedin],
            }),
          }}
        />
        <Background />
        <div className="app">{children}</div>
      </body>
    </html>
  );
}
