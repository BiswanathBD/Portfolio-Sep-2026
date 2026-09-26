import { Hind_Siliguri, Nunito } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/Components/Shared/CustomCursor";
import GlobalBackground from "@/Components/Shared/GlobalBackground";
import SmoothScroll from "@/utils/SmoothScroll";
import SideNavbar from "@/Components/SideNavbar";
import TopNavbar from "@/Components/TopNavbar";
import Footer from "@/Components/Sections/Footer";
import { portfolioMetadata } from "@/data/metadata";

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

export const metadata = portfolioMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Google Site Name Schema Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Biswanath Sarker",
    alternateName: "Biswanath",
    url: "https://biswanath.vercel.app",
  };

  return (
    <html
      lang="en"
      className={`${nunito.variable} ${hindSiliguri.variable} antialiased w-full overflow-hidden scrollbar-none`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex flex-col sm:flex-row justify-between font-sans bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        <CustomCursor />
        <GlobalBackground />
        <SmoothScroll />

        {/* Mobile top nav */}
        <header className="sm:hidden">
          <TopNavbar />
        </header>

        {/* main page */}
        <main className="flex-1 overflow-x-clip scrollbar-none space-y-8 lg:space-y-16">
          {children}
          <section id="footer">
            <Footer />
          </section>
        </main>

        {/* desktop side nav */}
        <header className="hidden sm:block">
          <SideNavbar />
        </header>
      </body>
    </html>
  );
}
