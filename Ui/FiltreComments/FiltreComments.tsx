import React from "react";

interface FiltreCommentsProps {
  className?: string;
}

const FiltreComments: React.FC<FiltreCommentsProps> = ({ className }) => {
  return <div className={className}>FiltreComments</div>;
};

export default FiltreComments;
