import React from "react";
import SectionTitleDescription from "./common/SectionTitleDescription";
import Block from "./common/Block";

type FHighlightsItem = {
  title: string;
  description: string;
  icon: string | any;
};

type FeatureHighlightsProps = {
  highlights: FHighlightsItem[];
  title: string;
  description: string;
};

const FeatureHighlights = ({ highlights, title, description }: FeatureHighlightsProps) => {
  return (
    <Block id="how-it-works">
      <div className="max-w-5xl mx-auto text-center">
        <SectionTitleDescription title={title} description={description} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((highlight) => (
            <div key={highlight.title} className="flex flex-col items-center">
              <div className="rounded-full p-4 text-5xl">
                <span className="flex items-center justify-center h-16 w-16">
                  <highlight.icon className="w-10 h-10" />
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{highlight.title}</h3>
              <p className=" text-center">{highlight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Block>
  );
};

export default FeatureHighlights;
