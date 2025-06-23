import React from "react";
import "./FiltreComments.css";
import DashedLine from "@/components/DashedLine/DashedLine";
import SoldRating from "../SoldRating/SoldRating";

interface FiltreCommentsProps {
  className?: string;
}

const FiltreComments: React.FC<FiltreCommentsProps> = ({ className }) => {
  return (
    <div className={className}>
      <div className="ReviewsFilter-container flex flex-col gap-3 gap-lg-4 p-6 ">
        <div className="ReviewsFilter">Reviews Filter</div>
        <DashedLine className="!py-1" />
        <div className="Rating">Rating</div>
        <div
          className="all-rate-stars flex
        flex-col gap-3"
        >
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="min-w-6 min-h-6 h-6 w-6 border-gray-400 rounded accent-black  focus:ring-black"
            />
            <SoldRating
              className="justify-start"
              soldText="800 Review"
              ratingText="5"
            />
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="min-w-6 min-h-6 h-6 w-6 border-gray-400 rounded accent-black  focus:ring-black"
            />
            <SoldRating
              className="justify-start"
              soldText="800 Review"
              ratingText="5"
            />
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="min-w-6 min-h-6 h-6 w-6 border-gray-400 rounded accent-black  focus:ring-black"
            />
            <SoldRating
              className="justify-start"
              soldText="800 Review"
              ratingText="5"
            />
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="min-w-6 min-h-6 h-6 w-6 border-gray-400 rounded accent-black  focus:ring-black"
            />
            <SoldRating
              className="justify-start"
              soldText="800 Review"
              ratingText="5"
            />
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="min-w-6 min-h-6 h-6 w-6 border-gray-400 rounded accent-black  focus:ring-black"
            />
            <SoldRating
              className="justify-start"
              soldText="800 Review"
              ratingText="5"
            />
          </label>
        </div>
        <DashedLine className="!py-1" />
        <div className="Rating">Review Topics</div>

        <div
          className="all-rate-stars flex
        flex-col gap-3"
        >
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="min-w-6 min-h-6 h-6 w-6 border-gray-400 rounded accent-black  focus:ring-black"
            />
            <div className="Product-Quality">Product Quality</div>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="min-w-6 min-h-6 h-6 w-6 border-gray-400 rounded accent-black  focus:ring-black"
            />
            <div className="Product-Quality">Seller Services</div>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="min-w-6 min-h-6 h-6 w-6 border-gray-400 rounded accent-black  focus:ring-black"
            />
            <div className="Product-Quality">Product Price</div>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="min-w-6 min-h-6 h-6 w-6 border-gray-400 rounded accent-black  focus:ring-black"
            />
            <div className="Product-Quality">Shipment</div>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="min-w-6 min-h-6 h-6 w-6 border-gray-400 rounded accent-black  focus:ring-black"
            />
            <div className="Product-Quality">Match with Description</div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FiltreComments;
