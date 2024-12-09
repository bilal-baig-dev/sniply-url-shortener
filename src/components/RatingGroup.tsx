import React from "react";
import RatingIcon from "./svgs/icon-rating";

function RatingGroup() {
  return (
    <div className="flex item-start">
      {Array.from(Array(5).keys()).map((el, index) => {
        return <RatingIcon className="w-6 fill-primary" key={el} />;
      })}
    </div>
  );
}

export default RatingGroup;
