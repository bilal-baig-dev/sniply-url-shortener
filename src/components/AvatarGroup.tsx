import { avatars } from "@/lib/constants";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

function AvatarGroup() {
  return (
    <div className="flex -space-x-2 overflow-hidden">
      {avatars.map((el, index) => {
        return (
          <div className="inline-block h-12 w-12" key={el}>
            <Avatar className="h-12 w-12">
              <AvatarImage className="rounded-full ring-2 border-[2px] border-white dark:border-card object-cover" src={el} />
              <AvatarFallback></AvatarFallback>
            </Avatar>
          </div>
        );
      })}
    </div>
  );
}

export default AvatarGroup;
