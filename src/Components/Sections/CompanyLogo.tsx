"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface CompanyLogoProps {
  src: string;
  alt: string;
  url?: string;
  companyName: string;
}

export const CompanyLogoFallback: React.FC<{
  name: string;
  className?: string;
}> = ({ name, className = "" }) => {
  // Extract initials, e.g. "Rise Together" -> "RT"
  const initials =
    name
      .split(" ")
      .map((word) => word[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "RT";

  return (
    <div
      className={`flex size-full items-center justify-center rounded-full bg-linear-to-br from-primary/20 via-accent/20 to-primary/10 text-foreground font-black tracking-wider border border-border-color ${className}`}
      aria-label={`${name} logo fallback`}
    >
      <div className="flex flex-col items-center justify-center select-none text-center">
        <span className="text-xl sm:text-3xl lg:text-4xl font-extrabold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
          {initials}
        </span>
        <span className="text-[8px] sm:text-[10px] font-semibold tracking-widest text-foreground/70 uppercase mt-0.5">
          {name}
        </span>
      </div>
    </div>
  );
};

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  src,
  alt,
  url,
  companyName,
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isError, setIsError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = () => {
    // If external URL fails, fall back to local cached image
    if (currentSrc !== "/assets/rise-together.png") {
      setCurrentSrc("/assets/rise-together.png");
    } else {
      setIsError(true);
    }
  };

  const content = (
    <div className="relative flex size-20 sm:size-36 lg:size-48 items-center justify-center rounded-full border border-border-color p-2 shadow-[0_0_90px_var(--color-border-color)] backdrop-blur-xl transition-all duration-500 group-hover/logo:scale-105 group-hover/logo:border-primary/50 group-hover/logo:shadow-[0_0_100px_var(--color-border-color)]">
      <div className="pointer-events-none absolute inset-0 rounded-full bg-primary/5 blur-xl group-hover/logo:bg-primary/15 transition-colors duration-500" />

      {/* Fallback View (Instant paint / when error occurs) */}
      {(!isLoaded || isError) && (
        <div className="absolute inset-2 z-10 flex items-center justify-center">
          <CompanyLogoFallback name={companyName} />
        </div>
      )}

      {/* Actual Logo Image */}
      {!isError && (
        <Image
          src={currentSrc}
          alt={alt}
          width={192}
          height={192}
          priority
          sizes="(max-width: 640px) 80px, (max-width: 1024px) 144px, 192px"
          className={`relative z-10 size-full rounded-full object-cover transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
        />
      )}

      {/* Subtle External Link Badge on Hover */}
      {url && (
        <div className="pointer-events-none absolute bottom-1 right-1 z-20 flex size-5 sm:size-7 items-center justify-center rounded-full border border-border-color bg-background/80 text-primary opacity-0 shadow-md backdrop-blur-md transition-all duration-300 group-hover/logo:opacity-100 group-hover/logo:scale-110">
          <ExternalLink className="size-2.5 sm:size-3.5" />
        </div>
      )}
    </div>
  );

  if (!url) {
    return <div className="group/logo relative">{content}</div>;
  }

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group/logo relative block cursor-pointer"
      title={`Visit ${companyName} website (${url})`}
      aria-label={`Visit ${companyName} website`}
    >
      {content}
    </Link>
  );
};

export default CompanyLogo;

