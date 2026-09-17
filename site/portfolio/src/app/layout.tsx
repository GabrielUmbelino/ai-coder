import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description:
    "Senior Software Engineer with 13+ years building front-end systems for enterprise SaaS. React, TypeScript, Node.js. Currently at Upsiide (Dig Insights).",
  keywords: [
    "Gabriel Umbelino",
    "Senior Software Engineer",
    "Front-end Engineer",
    "React",
    "TypeScript",
    "Node.js",
    "Upsiide",
    "Dig Insights",
  ],
  authors: [{ name: profile.fullName, url: profile.linkedin }],
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    type: "profile",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} ${serif.variable}`}>
      <body className="antialiased">
        <div
          className="noise pointer-events-none fixed inset-0 z-[100] opacity-[0.022] mix-blend-overlay"
          aria-hidden
        />
        {children}
      </body>
    </html>
  );
}
