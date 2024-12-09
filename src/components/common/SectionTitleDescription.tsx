import React from "react";

type SectionTitleDescriptonProps = {
  title: string;
  description: string;
};

function SectionTitleDescription({ title, description }: SectionTitleDescriptonProps) {
  return (
    <div className="justify-center items-center p-4 flex flex-col">
      <h2 className="text-3xl font-bold mb-4 text-center">{title}</h2>
      <p className="mb-12 max-w-2xl text-center">{description}</p>
    </div>
  );
}

export default SectionTitleDescription;
