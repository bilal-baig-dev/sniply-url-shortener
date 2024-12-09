"use client";
import { useEffect, useRef, useState } from "react";
import CollapseIcon from "../svgs/icon-minus";

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isOpen ? `${contentRef.current.scrollHeight}px` : "0px";
    }
  }, [isOpen]);
  const formattedAnswer = answer.replace(/\n/g, "<br />");

  return (
    <div className="border-t border-gray-200 cursor-pointer">
      <div className="flex justify-between items-center py-4 cursor-pointer " onClick={toggleAccordion}>
        <div className={`text-base select-none font-medium ${isOpen && "text-primary"}`}>{question}</div>
        <div className="transform transition-transform">
          <CollapseIcon isOpen={isOpen} />
        </div>
      </div>
      <div ref={contentRef} className={`overflow-hidden transition-max-height duration-300 ease-in-out`} style={{ maxHeight: "0px" }}>
        <div className="py-2 mb-4" dangerouslySetInnerHTML={{ __html: formattedAnswer }} />
      </div>
    </div>
  );
};

export default FAQItem;
