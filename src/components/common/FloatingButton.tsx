import { Button } from "@/components/ui/button"; // Shadcn UI Button component
import BuiltWithButton from "./BuiltWithButton";

const FloatingButton = () => {
  return (
    <div className="fixed bottom-8 right-8">
      <BuiltWithButton />
    </div>
  );
};

export default FloatingButton;
