import type { Metadata } from "next";
import { Hind_Siliguri, Nunito } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/Components/CustomCursor";
import Navbar from "@/Components/Shared/Navbar";

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
  // আপনার বর্তমান Vercel ইউআরএল সেট করা হয়েছে
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

  // FIXME: আপনার public/ ফোল্ডারে এই আইকন ফাইলগুলো (.ico, .png) যুক্ত করতে হবে
  icons: {
    icon: "/favicon.ico", // TODO: আসল ফেভিকন যুক্ত করুন
    shortcut: "/favicon-16x16.png", // TODO: কাস্টম শর্টকাট আইকন যুক্ত করুন
    apple: "/apple-touch-icon.png", // TODO: অ্যাপল ডিভাইসের জন্য আইকন যুক্ত করুন
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://biswanath.vercel.app",
    title: "Biswanath Sarker | MERN Stack Developer",
    description:
      "Crafting modern, responsive, and user-friendly web applications with passion and precision.",
    siteName: "Biswanath Sarker Portfolio",

    // FIXME: সোশ্যাল শেয়ারিংয়ের ছবি। public/og-image.png নামের একটি ছবি তৈরি করে নিবেন
    images: [
      {
        url: "https://biswanath.vercel.app/og-image.png", // TODO: আসল OpenGraph ইমেজ ইউআরএল বা আপেক্ষিক পথ দিন
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

    // FIXME: টুইটার শেয়ারের ছবি। og-image এর একই ইমেজ ব্যবহার করতে পারেন
    images: ["https://biswanath.vercel.app/og-image.png"], // TODO: আসল টুইটার প্রিভিউ ইমেজ দিন

    // TODO: আপনার টুইটার হ্যান্ডেল থাকলে নিচে কমেন্ট আউট তুলে যুক্ত করুন
    // creator: "@your_twitter_username",
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
        <main className="h-screen grow flex justify-center overflow-y-scroll overflow-x-hidden scrollbar-none [&::-webkit-scrollbar]:hidden">
          {children}
        </main>
        <Navbar />
      </body>
    </html>
  );
}
