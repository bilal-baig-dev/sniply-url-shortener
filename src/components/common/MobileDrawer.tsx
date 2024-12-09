"use client";
import { NavItem } from "@/interfaces";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import NavMenu from "../NavMenu";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import ButtonLightDarkMode from "./ButtonLightDarkMode";
import HeaderLogo from "./HeaderLogo";

type MobileDrawerProps = {
  navMenu: NavItem[];
};

const MobileDrawer = ({ navMenu }: MobileDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavLinkClick = () => {
    setIsOpen(false); // Close the sheet when a nav link is clicked
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <div className="md:hidden flex gap-1 items-center">
        <ButtonLightDarkMode />
        <SheetTrigger asChild>
          <Button
            className="md:hidden hover:bg-transparent"
            size="icon"
            variant="ghost"
            onClick={() => setIsOpen(!isOpen)} // Toggle the sheet
          >
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
      </div>
      <SheetContent side="left" className="bg-card">
        <HeaderLogo />
        <div className="grid gap-3 text-sm py-6  mt-3">
          <NavMenu isSideBar menu={navMenu} onNavLinkClick={handleNavLinkClick} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileDrawer;
