import React from "react";
import Flex from "@/components/common/Flex";
import QRCodeGenerator from "../(components)/QRCodeGenerator";

function CreateQRCodes() {
  return (
    <Flex className="flex flex-col w-full justify-center items-center max-w-4xl gap-2">
      <QRCodeGenerator />
    </Flex>
  );
}

export default CreateQRCodes;
