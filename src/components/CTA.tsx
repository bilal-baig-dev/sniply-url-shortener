import { Crown } from "lucide-react";

function CTA({ title, description, btn }: { title: string; description: string; btn: React.ReactElement }) {
  return (
    <div className="flex h-[500px] justify-center items-center border-t">
      <div className="w-full h-full gap-5 flex flex-col relative bg-cover bg-center justify-center items-center px-12 py-12">
        <div className="absolute inset-0 dark:bg-card opacity-70"></div>
        <h1 className="relative text-4xl md:text-5xl text-primary font-bold mb-2 text-center z-10">
          <span className="font-extrabold whitespace-normal  xl:whitespace-nowrap">{title}</span>
          <Crown className="absolute -top-8 md:-top-20 -right-4 w-8 h-8 md:w-16 md:h-16" />
        </h1>
        <span className="font-light z-10 text-xl text-center">{description}</span>

        <div className="w-64 mt-5 z-10 flex justify-center items-center lg:items-start">{btn}</div>
      </div>
    </div>
  );
}

export default CTA;
