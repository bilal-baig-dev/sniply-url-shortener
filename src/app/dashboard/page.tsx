import Flex from "@/components/common/Flex";
import React from "react";
import UrlShortener from "../(components)/UrlShortener";

function Dashboard() {
  return (
    <Flex className="flex flex-col w-full justify-center items-center max-w-2xl gap-2">
      <UrlShortener />
    </Flex>
  );
}

export default Dashboard;
