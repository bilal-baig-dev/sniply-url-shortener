"use client";
import { MoonStar, Sun } from "lucide-react";
import React, { useEffect, useState, useCallback } from "react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";

function ButtonLightDarkMode() {
  const { theme, setTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [setTheme, theme]);

  // Only render the component on the client side
  if (!isClient) {
    return null;
  }

  return (
    <Button variant="ghost" size="icon" className="p-2 hover:bg-transparent" onClick={handleTheme}>
      {theme === "dark" ? <MoonStar className="h-16 w-16 -rotate-90" /> : <Sun className="h-16 w-16" />}
    </Button>
  );
}

export default ButtonLightDarkMode;
