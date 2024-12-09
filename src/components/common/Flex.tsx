import React from "react";

type FlexProps = {
  className?: string;
  children: React.ReactNode;
};

function Flex({ className, children }: FlexProps) {
  return <div className={`flex ${className}`}>{children}</div>;
}

export default Flex;
