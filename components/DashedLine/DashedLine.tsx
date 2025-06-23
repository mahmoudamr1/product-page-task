// components/DashedLine.tsx
import React from "react";
import "./DashedLine.css";

interface DashedLineProps {
  className?: string;
}

const DashedLine: React.FC<DashedLineProps> = ({ className = "" }) => {
  return (
    <section
      id="dashed-line"
      className={`flex items-center justify-center w-full py-10 lg:py-20 max-w-full md:max-w-screen-xl mx-auto ${className}`}
    >
      <div className={`dashed-line w-full`} />
    </section>
  );
};

export default DashedLine;
