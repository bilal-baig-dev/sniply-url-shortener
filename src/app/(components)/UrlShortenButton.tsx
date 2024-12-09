"use-client";
import Spinner from "@/components/common/Spinner";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";

function ShortenURLButton({ isEdit = false }: { isEdit?: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className="flex items-center justify-center gap-3" type="submit">
      {pending ? (
        <Spinner />
      ) : (
        <>
          {isEdit ? "Update Shorten URL" : "Create Shorten URL"}
          <MoveRight className="h-4 w-4 animate-moveArrowRight" />
        </>
      )}
    </Button>
  );
}

export default ShortenURLButton;
