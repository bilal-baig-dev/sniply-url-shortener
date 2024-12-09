"use client"; // Mark this as a client component

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";
import Link from "next/link";
import { getSession } from "@/actions/auth"; // Adjust the path as necessary

function ViewAnalytics({ id }: { id: string }) {
  const [session, setSession] = useState<any>(null); // Replace `any` with your session type if known

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData);
    };

    fetchSession();
  }, []);

  return (
    <Button disabled={!session} title={!session ? "Please log in to see analytics." : ""}>
      <Link href={`/dashboard/analytics/${id}`} className="flex gap-1">
        <BarChart3 className="h-4 w-4" />
        {session ? "View Analytics" : "Login to view analytics"}
      </Link>
    </Button>
  );
}

export default ViewAnalytics;
