import * as React from "react";
interface Props extends React.SVGProps<SVGSVGElement> {
  width?: string;
  height?: string;
  className?: string;
  isOpen?: boolean;
}

const CollapseIcon = ({ isOpen }: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-4 h-4 ml-auto fill-current cursor-pointer" viewBox="0 0 16 16">
      <rect width={16} height={2} y={7} className={`transform origin-center transition duration-200 ease-out ${isOpen ? "rotate-180" : ""}`} rx={1} />
      <rect
        width={16}
        height={2}
        y={7}
        className={`transform origin-center transition duration-200 ease-out rotate-90 ${isOpen ? "hidden" : ""}`}
        rx={1}
      />
    </svg>
  );
};

export default CollapseIcon;
