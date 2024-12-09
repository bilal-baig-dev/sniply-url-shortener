import Link from "next/link";
import React from "react";
import Logo from "./logo";

function HeaderLogo() {
  return (
    <Link href={"/"}>
      <div className="flex items-center">
        <Logo />
      </div>
    </Link>
  );
}

export default HeaderLogo;
