"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function BackButton({ url, text, className = "" }: { url: string; text: string; className?: string }) {
  const router = useRouter();
  return (
    <Button
      className={cn(
        `cursor-pointer px-3 py-2  flex justify-center items-center gap-1 bg-primary text-primary-foreground w-auto rounded-lg hover:bg-primary/90 transition-colors duration-300`,
        className
      )}
      onClick={() => router.push(url)}
    >
      <MoveLeft className="h-4" /> {text}
    </Button>
  );
}

export default BackButton;
