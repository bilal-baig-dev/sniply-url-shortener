"use client";
import React from "react";
import { CustomButtonProps } from "@/interfaces";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import Spinner from "./common/Spinner";

function SubmitButton(props: CustomButtonProps) {
  return <ButtonSignin type="submit" size={"lg"} {...props} />;
}
function ButtonSignin(props: CustomButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button {...props}>
      {pending ? (
        <>
          <Spinner /> {props.text}
        </>
      ) : (
        props.text
      )}
    </Button>
  );
}

export { ButtonSignin, SubmitButton };
