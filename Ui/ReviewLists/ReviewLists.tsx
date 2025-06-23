import React from "react";
import "./ReviewLists.css";

interface ReviewListsProps {
  className?: string;
}

const ReviewLists: React.FC<ReviewListsProps> = ({ className }) => {
  return (
    <div className={className}>
      <div className="flex flex-col gap-4 lg:gap-6">
        <div className="ReviewLists-txt">Review Lists</div>
        <div className="All-Reviews-filters-btns  flex flex-wrap gap-3 ">
          <button className="filtre-Reviews-btn selected">All Reviews</button>
          <button className="filtre-Reviews-btn">With Photo & Video</button>
          <button className="filtre-Reviews-btn">With Description</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewLists;
