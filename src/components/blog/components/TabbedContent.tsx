import React, { useState } from "react";

interface Tab {
  title: string;
  content: React.ReactNode;
}

interface TabbedContentProps {
  tabs: Tab[];
  activeTabIndex?: number;
}

export const TabbedContent: React.FC<TabbedContentProps> = ({ tabs, activeTabIndex = 0 }) => {
  const [activeTab, setActiveTab] = useState(activeTabIndex);

  return (
    <div>
      <div style={{ display: "flex", cursor: "pointer" }}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            style={{
              padding: "0.5em 1em",
              borderBottom: activeTab === index ? "2px solid #000" : "2px solid transparent",
            }}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </div>
        ))}
      </div>
      <div style={{ padding: "1em" }}>{tabs[activeTab].content}</div>
    </div>
  );
};
