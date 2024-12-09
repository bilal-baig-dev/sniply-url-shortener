import { appConfig } from "@/config/appConfig";
import { LinkIcon } from "lucide-react";

type LogoProps = {
  className?: string;
};
function Logo({ className }: LogoProps) {
  return (
    <div className={`w-24 justify-center items-center flex gap-2`}>
      <LinkIcon className="h-7 w-6 font-bold" />
      <span className="text-xl font-bold">{appConfig.appName}</span>
    </div>
  );
}

export default Logo;
