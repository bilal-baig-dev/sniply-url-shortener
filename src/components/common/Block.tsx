import { cn } from "@/lib/utils";
import React from "react";

function Block({
  children,
  id,
  className = "",
}: Readonly<{
  children: React.ReactNode;
  id?: string;
  className?: string;
}>) {
  return (
    <section className={cn(`py-16 px-6`, className)} id={id}>
      {children}
    </section>
  );
}

export default Block;
