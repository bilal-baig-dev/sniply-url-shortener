"use client";
import React, { useEffect, useState } from "react";

function ScrollableHeader({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isScrolled, setIsScrolled] = useState(false);

  // Function to handle scroll event
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    handleScroll(); // Check scroll position immediately on mount
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`w-full py-12 h-16 top-0 z-40 flex items-center justify-center ${
        isScrolled
          ? "fixed left-0 right-0 dark:bg-background bg-white shadow-md backdrop-filter backdrop-blur-lg border-b light:border-gray-200"
          : "fixed"
      }`}
    >
      {children}
    </header>
  );
}

export default ScrollableHeader;
