import { CheckCheck } from "lucide-react";

function ListItem({ text }: { text: string }) {
  return (
    <li className="font-light text-sm flex gap-2 items-start">
      <span className="flex">
        <CheckCheck className="text-primary" />
      </span>
      {text}
    </li>
  );
}

export default ListItem;
