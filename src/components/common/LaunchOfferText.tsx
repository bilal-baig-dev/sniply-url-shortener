import { Gift, WandSparkles } from "lucide-react";
import { Card } from "../ui/card";

type LaunchOfferTextProps = {
  title: string;
  description: string;
};
function LaunchOfferText({ title, description }: LaunchOfferTextProps) {
  return (
    <Card className="gap-2 border-none flex items-center py-2 justify-center bg-none shadow-none  rounded-2xl ">
      <WandSparkles className=" animate-pulse" />
      <span className="text-xs sm:text-lg text-start font-medium">
        <span className=" whitespace-nowrap text-xs sm:text-lg">{title}</span> {description}
      </span>
    </Card>
  );
}

export default LaunchOfferText;
