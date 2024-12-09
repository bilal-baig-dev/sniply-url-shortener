import { getSession } from "@/actions/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

async function DashboardAccount() {
  const session = await getSession();

  return (
    <div className="cursor-pointer flex gap-2 items-center border-none rounded-lg px-2">
      <Avatar className="h-7 w-7 ">
        {session?.user?.image && (
          <AvatarImage alt="User Profile Image" className="rounded-full ring-2 border-[2px] border-none" src={session?.user?.image} />
        )}
        <AvatarFallback>{session?.user?.name?.[0] || session?.user?.email?.[0]}</AvatarFallback>
      </Avatar>
    </div>
  );
}

export default DashboardAccount;
