import React from "react";
import { Button } from "../ui/button";
import LogoSvgIcon from "../svgs/icon-saaspack";
import Link from "next/link";
import SaaSPackLogoIcon from "../svgs/icon-logo";

function BuiltWithButton() {
  return (
    <Link href={"https://saaspack.app/"} className="block">
      <Button className="flex items-center px-4 py-4 gap-1 rounded-lg" variant={"outline"}>
        Built With
        <span className="flex items-center">
          <SaaSPackLogoIcon className="w-24" />
          {/* <LogoSvgIcon className="w-6" />
          SaaSPack */}
        </span>
      </Button>
    </Link>
  );
}

export default BuiltWithButton;
