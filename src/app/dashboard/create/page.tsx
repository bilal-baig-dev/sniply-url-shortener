import UrlShortener from "@/app/(components)/UrlShortener";
import Flex from "@/components/common/Flex";
import React from "react";

function CreateShortenLink() {
  return (
    <Flex className="flex flex-col w-full justify-center items-center max-w-2xl gap-2">
      <UrlShortener />
    </Flex>
  );
}

export default CreateShortenLink;
