"use client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import React from "react";
import DashboardAccount from "./DashboardAccount";
import { LogOut } from "lucide-react";
import { logout } from "@/actions/auth";
import { useCustomToast } from "@/hooks/useCustomToast";
import { useRouter } from "next/navigation";

function DashboardSetting() {
  const router = useRouter();
  const { showToast } = useCustomToast();

  return (
    <DropdownMenuItem
      className="cursor-pointer"
      onClick={() => {
        logout();
        showToast({
          title: `Logout Successfully`,
          variant: "success",
          duration: 2000,
        });
        router.replace("/");
      }}
    >
      <LogOut className="mr-2 h-4 w-4" />
      <span>Log out</span>
    </DropdownMenuItem>
  );
}

export default DashboardSetting;
