import HeaderLogo from "./common/HeaderLogo";
import ScrollableHeader from "./common/ScrollableHeader";
import ButtonLightDarkMode from "./common/ButtonLightDarkMode";
import NavMenu from "./NavMenu";
import { navMenu } from "@/lib/constants";
import MobileDrawer from "./common/MobileDrawer";
import React from "react";
import UserLogin from "./UserLogin";

function Header() {
  return (
    <React.Fragment>
      <ScrollableHeader>
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
          <HeaderLogo />
          <div className="hidden md:flex gap-2 md:gap-5">
            {" "}
            <NavMenu menu={navMenu} />
          </div>
          <div className="hidden md:flex gap-5">
            <UserLogin />
            <ButtonLightDarkMode />
          </div>

          {/* Mobile Menu Start */}
          <MobileDrawer navMenu={navMenu} />

          {/* Mobile Menu End */}
        </div>
      </ScrollableHeader>
    </React.Fragment>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

export default Header;
