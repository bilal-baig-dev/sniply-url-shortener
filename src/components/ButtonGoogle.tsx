import React from "react";
import { Button } from "./ui/button";
import { CustomButtonProps } from "@/interfaces";
import GoogleIcon from "./svgs/icon-google";
import { login } from "@/actions/auth";

function ButtonGoogle(props: CustomButtonProps) {
  return (
    <form
      action={async () => {
        "use server";
        await login("google");
      }}
    >
      <Button variant={"outline"} {...props} className="w-full flex bg-card hover:text-white">
        <div className="flex gap-2 items-center">
          <GoogleIcon width="20" height="20" />
          {props.text ? props.text : "Sign in with Google"}
        </div>
      </Button>
    </form>
  );
}

export default ButtonGoogle;
