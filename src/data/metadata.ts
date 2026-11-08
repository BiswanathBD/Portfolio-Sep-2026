import type { Metadata } from "next";

export const portfolioMetadata: Metadata = {
  metadataBase: new URL("https://biswanathsarker.com"),
  applicationName: "Biswanath Sarker",

  title: {
    default: "Biswanath Sarker | MERN Stack Developer",
    template: "%s | Biswanath Sarker",
  },

  description:
    "MERN Stack Developer with hands-on experience building production-ready web applications using React, Next.js, TypeScript, and Node.js. Skilled in UI development, API integration, authentication, modern backend tools, technical SEO, and performance optimization.",

  keywords: [
    "Biswanath Sarker",
    "Biswanath",
    "MERN Stack Developer",
    "Full Stack Developer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "Express.js Developer",
    "Web Developer Bangladesh",
  ],

  authors: [
    {
      name: "Biswanath Sarker",
      url: "https://biswanathsarker.com",
    },
  ],

  creator: "Biswanath Sarker",
  publisher: "Biswanath Sarker",

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://biswanathsarker.com",
    title: "Biswanath Sarker | MERN Stack Developer",
    description:
      "MERN Stack Developer with hands-on experience building production-ready web applications using React, Next.js, TypeScript, and Node.js. Skilled in UI development, API integration, authentication, modern backend tools, technical SEO, and performance optimization.",
    siteName: "Biswanath Sarker",

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
      "MERN Stack Developer with hands-on experience building production-ready web applications using React, Next.js, TypeScript, and Node.js. Skilled in UI development, API integration, authentication, modern backend tools, technical SEO, and performance optimization.",
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
    // google: "i0aRoegdik7oijpsT4HPl7FLYrUw3E8YpoeJASi9s-s",
    google: "VL2H8b1HOAUsMVuzryfqdvg1QLTwrgJ1lhaM_HzdfFM",
  },
};