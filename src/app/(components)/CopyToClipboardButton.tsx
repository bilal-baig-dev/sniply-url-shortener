"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Copy } from "lucide-react";
import { useCustomToast } from "@/hooks/useCustomToast";

interface CopyButtonProps {
  textToCopy: string;
}

export default function CopyToClipBoardButton({ textToCopy }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const { showToast } = useCustomToast();

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    showToast({
      title: "Copied to clipboard",
      variant: "success",
      duration: 3000,
    });
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" onClick={copyToClipboard}>
            <Copy className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{copied ? "Copied!" : "Copy to clipboard"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
