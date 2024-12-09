"use client";
import { NavMenuProps } from "@/interfaces";
import Link from "next/link";
import React from "react";
import { Separator } from "./ui/separator";
import ButtonPurchase from "./ButtonPurchase";
import { appConfig } from "@/config/appConfig";

function NavMenu({ menu, onNavLinkClick, isSideBar }: NavMenuProps & { onNavLinkClick?: () => void }) {
  const handleScroll = (id: string) => {
    const waitlistSection = document.getElementById(id);
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <>
      {menu?.map(({ id = "", text, url = "" }) => {
        return (
          <React.Fragment key={text}>
            <Link
              className="flex w-full items-center whitespace-nowrap  hover:underline hover:text-primary"
              href={id ? `#${id}` : url}
              {...(id && {
                onClick: () => {
                  onNavLinkClick && onNavLinkClick();
                  handleScroll(id as string);
                },
              })}
            >
              {text}
            </Link>
            {isSideBar && <Separator className="md:hidden" />}
          </React.Fragment>
        );
      })}
      {isSideBar && (
        <div className="md:hidden mt-4">
          <Link href={"/login"}>
            <ButtonPurchase rounded />
          </Link>
        </div>
      )}
      {/* <Link
        className="flex w-full items-center py-2 text-base  hover:underline hover:text-primary"
        href="#waitlist"
        onClick={() => handleScroll("waitlist")}
      >
        Pricing
      </Link>
      <Link className="flex w-full items-center py-2 text-base  hover:underline hover:text-primary" href="#">
        Testimonial
      </Link>
      <Link className="flex w-full items-center py-2 text-base  hover:underline hover:text-primary" href="/blog">
        Blog
      </Link> */}
    </>
  );
}

export default NavMenu;
