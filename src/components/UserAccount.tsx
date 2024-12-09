"use client";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown, CreditCard, LayoutDashboard, LogOut } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { logout } from "@/actions/auth";
import Link from "next/link";

type UserAccountProps = {
  name: string | null | undefined;
  image: string | null | undefined;
};

function UserAccount({ name, image }: UserAccountProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      triggerRef.current &&
      contentRef.current &&
      !triggerRef.current.contains(event.target as Node) &&
      !contentRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div ref={triggerRef} className="bg-primary text-primary-foreground rounded-xl px-2 py-2 ">
      <Popover>
        <PopoverTrigger onClick={() => setIsOpen((prev) => !prev)}>
          <div className="cursor-pointer flex gap-2 items-center border-none rounded-lg px-2">
            <Avatar className="h-7 w-7 ">
              {image && <AvatarImage alt="User Profile Image" className="rounded-full ring-2 border-[2px] border-none" src={image} />}
              <AvatarFallback>{name?.[0]}</AvatarFallback>
            </Avatar>
            {name}
            <div className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}>
              <ChevronDown className="h-5 w-5 text-primary-foreground" />
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent ref={contentRef} align="start" className="p-0 mt-2">
          <div className="flex flex-col cursor-pointer">
            <Link href={"/dashboard"} className="flex items-center gap-3 pl-4 pr-3 py-4 hover:bg-gray-200 dark:hover:bg-zinc-800">
              <LayoutDashboard />
              <span>Dashoard</span>
            </Link>
            <div className="flex items-center gap-3 pl-4 pr-3 py-4 hover:bg-gray-200 dark:hover:bg-zinc-800" onClick={() => logout()}>
              <LogOut />
              <span>Logout</span>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default UserAccount;
