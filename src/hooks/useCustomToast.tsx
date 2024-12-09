// hooks/useCustomToast.ts

import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, Info } from "lucide-react";
import React from "react";

type ToastType = "success" | "error" | "info" | "destructive";

const iconMap: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle className="w-5 h-5 text-green-500" />,
  error: <XCircle className="w-5 h-5 text-red-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
  destructive: <XCircle className="w-5 h-5 text-red-500" />, // Using error icon for destructive as well
};

interface ToastProps {
  variant: ToastType;
  title: string | React.ReactElement;
  description?: string | React.ReactElement;
  duration?: number;
}

export function useCustomToast() {
  const { toast } = useToast();

  const showToast = ({ variant, title, description, duration = 3000 }: ToastProps) => {
    toast({
      className: cn("top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"),
      title: (
        <div className="flex items-center gap-2 justify-center">
          {iconMap[variant]}
          <div className="flex items-center justify-center">
            <div className="text-sm font-semibold">{title}</div>
            {description && <div className="text-xs">{description}</div>}
          </div>
        </div>
      ) as any,
      duration,
    });
  };

  return { showToast };
}
