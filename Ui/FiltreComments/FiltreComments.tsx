import React from "react";
import "./FiltreComments.css";
import DashedLine from "@/components/DashedLine/DashedLine";

interface FiltreCommentsProps {
  className?: string;
}

const FiltreComments: React.FC<FiltreCommentsProps> = ({ className }) => {
  return (
    <div className={className}>
      <div className="ReviewsFilter-container flex flex-col gap-3 gap-lg-4 p-4">
        <div className="ReviewsFilter">Reviews Filter</div>
        <DashedLine className="!py-1" />
        <div className="Rating">Rating</div>
        <div className="all-rate-stars">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-5 h-5 border-gray-400 rounded focus:ring-black"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default FiltreComments;
