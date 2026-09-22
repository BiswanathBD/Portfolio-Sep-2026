import type { Metadata } from "next";
import { Hind_Siliguri, Nunito } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/Components/CustomCursor";
import Navbar from "@/Components/Shared/Navbar";
import GlobalBackground from "@/Components/GlobalBackground";
import SmoothScroll from "@/utils/SmoothScroll";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://biswanath.vercel.app"),
  title: {
    default: "Biswanath Sarker | MERN Stack Developer",
    template: "%s | Biswanath Sarker",
  },
  description:
    "Portfolio of Biswanath Sarker — MERN Stack Web Developer specializing in React, Next.js, TypeScript, and modern UI/UX design.",
  keywords: [
    "Biswanath Sarker",
    "Portfolio",
    "MERN Stack Developer",
    "Full Stack Developer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Tailwind CSS",
    "Web Developer Bangladesh",
  ],
  authors: [
    { name: "Biswanath Sarker", url: "https://github.com/BiswanathBD" },
  ],
  creator: "Biswanath Sarker",
  alternates: {
    canonical: "https://biswanath.vercel.app",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://biswanath.vercel.app",
    title: "Biswanath Sarker | MERN Stack Developer",
    description:
      "Crafting modern, responsive, and user-friendly web applications with passion and precision.",
    siteName: "Biswanath Sarker Portfolio",
    images: [
      {
        url: "https://biswanath.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Biswanath Sarker Portfolio Overview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Biswanath Sarker | MERN Stack Developer",
    description:
      "Crafting modern, responsive, and user-friendly web applications with passion and precision.",
    images: ["https://biswanath.vercel.app/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${hindSiliguri.variable} antialiased`}
    >
      <body className="h-screen overflow-hidden flex justify-between font-sans bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        <CustomCursor />
        <GlobalBackground />

        <SmoothScroll>{children}</SmoothScroll>
        <Navbar />
      </body>
    </html>
  );
}
