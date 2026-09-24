"use client";

import React, { useEffect, useState } from "react";

interface ResponsiveScrollAreaProps {
  children: React.ReactNode;
  className?: string;
}

const ResponsiveScrollArea = ({
  children,
  className = "",
}: ResponsiveScrollAreaProps) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleChange = () => {
      setIsDesktop(mediaQuery.matches);
    };

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <main
      {...(isDesktop ? { "data-lenis-prevent": true } : {})}
      className={className}
    >
      {children}
    </main>
  );
};

export default ResponsiveScrollArea;
