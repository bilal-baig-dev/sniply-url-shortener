import React from "react";
import { Skeleton } from "../ui/skeleton";

function Shimmer() {
  return (
    <div className="flex gap-5 w-full flex-col items-center">
      <Skeleton className="h-16 w-16 rounded-full" />
      <div className="space-y-1 w-full">
        <Skeleton className="h-4  w-full" />
        <Skeleton className="h-4  w-full" />
        <Skeleton className="h-4  w-full" />
        <Skeleton className="h-4  w-full" />
      </div>
    </div>
  );
}

export default Shimmer;
