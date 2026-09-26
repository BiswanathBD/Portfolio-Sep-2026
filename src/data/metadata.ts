import type { Metadata } from "next";

export const portfolioMetadata: Metadata = {
  metadataBase: new URL("https://biswanath.vercel.app"),

  title: {
    default: "Biswanath Sarker | MERN Stack Developer",
    template: "%s | Biswanath Sarker",
  },

  description:
    "Portfolio of Biswanath Sarker — MERN Stack Web Developer specializing in React, Next.js, TypeScript, and modern UI/UX design.",

  keywords: [
    "Biswanath Sarker",
    "Biswanath",
    "Web Developer",
    "MERN Stack Developer",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Web Developer Bangladesh",
  ],

  authors: [
    {
      name: "Biswanath Sarker",
      url: "https://github.com/BiswanathBD",
    },
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
        url: "/seo/og-image.png",
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

    images: ["/seo/og-image.png"],
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

  verification: {
    google: "i0aRoegdik7oijpsT4HPl7FLYrUw3E8YpoeJASi9s-s",
  },
};
