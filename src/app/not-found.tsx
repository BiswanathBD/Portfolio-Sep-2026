import type { Metadata } from "next";
import NotFoundClient from "@/Components/Shared/NotFoundClient";

export const metadata: Metadata = {
  title: "404 | Page Not Found",
  description: "The requested page could not be found.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return <NotFoundClient />;
}

