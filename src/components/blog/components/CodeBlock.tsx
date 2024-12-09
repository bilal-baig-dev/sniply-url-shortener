import React, { useState } from "react";

interface CodeBlockProps {
  language: string;
  children: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ language, children }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ position: "relative", backgroundColor: "#2d2d2d", padding: "1em", borderRadius: "5px" }}>
      <button
        onClick={handleCopy}
        style={{
          position: "absolute",
          top: "0.5em",
          right: "0.5em",
          backgroundColor: "#3a3a3a",
          color: "#fff",
          border: "none",
          borderRadius: "3px",
          padding: "0.5em",
          cursor: "pointer",
        }}
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <div style={{ whiteSpace: "pre", overflowX: "auto", color: "#f8f8f2" }}>
        <span>{children.trim()}</span>
      </div>
    </div>
  );
};
