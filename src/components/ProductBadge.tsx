import Link from "next/link";
import LaurelLeftWreath from "./svgs/icon-left-laurel";
import LaurelRightWreath from "./svgs/icon-right-laurel";

type ProductBadeProps = {
  title: string;
  subtitle?: string;
  url?: string;
};

function ProductBadge({ title, subtitle = "", url = "/" }: ProductBadeProps) {
  return (
    <Link href={url}>
      <div className="flex w-72 cursor-pointer ">
        <LaurelLeftWreath className="w-8 fill-base-content/40 rotate-12 fill-[#4B587C] dark:fill-[#D1D1D1]" />
        <div className="group flex flex-col items-center justify-center ">
          <div className="font-bold text-sm text-[#4B587C] dark:text-[#D1D1D1] whitespace-nowrap">{title}</div>
          <div className="font-bold text-sm text-[#4B587C] dark:text-[#D1D1D1] whitespace-nowrap">{subtitle}</div>
        </div>
        <LaurelRightWreath className="w-8 fill-base-content/40 -rotate-12 fill-[#4B587C] dark:fill-[#D1D1D1]" />
      </div>
    </Link>
  );
}

export default ProductBadge;
