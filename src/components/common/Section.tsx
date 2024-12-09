import { cn } from "@/lib/utils";
import React from "react";

function Section({
  children,
  className = "",
  id = "",
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  id?: string;
}>) {
  return (
    <div id={id} className={cn(`w-full max-w-7xl mx-auto flex px-4 py-14`, className)}>
      {children}
    </div>
  );
}

export default Section;
