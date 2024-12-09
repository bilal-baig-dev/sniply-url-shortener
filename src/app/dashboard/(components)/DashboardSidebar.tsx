"use client";
import { logout } from "@/actions/auth";
import Logo from "@/components/common/logo";
import { useCustomToast } from "@/hooks/useCustomToast";
import { Link2, FileSpreadsheet, LogOutIcon, QrCode } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function DashboardSidebar() {
  const router = useRouter();
  const { showToast } = useCustomToast();
  return (
    <div className="flex h-full flex-col">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <Logo />
        </Link>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        <Link href="/dashboard/create" className="flex items-center space-x-2 rounded-lg p-2 dark:hover:text-black hover:bg-gray-100">
          <Link2 className="h-5 w-5" />
          <span>Create Link</span>
        </Link>
        <Link href="/dashboard/qrcodes" className="flex items-center space-x-2 rounded-lg p-2 dark:hover:text-black hover:bg-gray-100">
          <QrCode className="h-5 w-5" />
          <span>QR Codes</span>
        </Link>
        <Link href="/dashboard/urls" className="flex items-center space-x-2 rounded-lg p-2 dark:hover:text-black hover:bg-gray-100">
          <FileSpreadsheet className="h-5 w-5" />
          <span>Your URLs</span>
        </Link>
        <div
          onClick={() => {
            logout();
            showToast({
              title: `Logout Successfully`,
              variant: "success",
              duration: 2000,
            });
            router.replace("/");
          }}
          className="flex cursor-pointer items-center space-x-2 rounded-lg p-2 dark:hover:text-black hover:bg-gray-100"
        >
          <LogOutIcon className="h-5 w-5" />
          <span>Logout</span>
        </div>
      </nav>
    </div>
  );
}

export default DashboardSidebar;
