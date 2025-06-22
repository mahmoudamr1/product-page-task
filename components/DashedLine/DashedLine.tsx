import React from "react";
import "./DashedLine.css";

const DashedLine = () => {
  return (
    <section
      id="dashed-line"
      className="flex items-center justify-center w-full py-10 lg:py-20 max-w-full md:max-w-screen-xl mx-auto "
    >
      <div className="dashed-line w-full"></div>
    </section>
  );
};

export default DashedLine;
