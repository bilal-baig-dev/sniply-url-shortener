"use client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import Spinner from "./common/Spinner";
type ButtonPurchaseProps = {
  rounded?: boolean;
  priceID?: string;
};
function SubmitButton({ rounded }: { rounded: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button
      size={"sm"}
      className={`
          ${rounded ? "rounded-full" : "rounded-xl"}
          w-full  text-base font-semibold p-6 md:p-8 group md:flex items-center bg-primary transition duration-500 ease-in-out transform hover:scale-105  focus:outline-none`}
      type="submit"
    >
      {pending ? <Spinner /> : null}
      Get Started
    </Button>
  );
}
function ButtonPurchase({ rounded = false, priceID }: ButtonPurchaseProps) {
  const router = useRouter();
  return (
    <form
      action={async () => {
        router.push("https://saaspack.app/");
      }}
      className="flex w-full"
    >
      <SubmitButton rounded={rounded} />
    </form>
  );
}

export default ButtonPurchase;
