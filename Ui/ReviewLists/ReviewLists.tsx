import React from "react";
import "./ReviewLists.css";
import OneReview from "../OneReview/OneReview";

interface ReviewListsProps {
  className?: string;
}

const ReviewLists: React.FC<ReviewListsProps> = ({ className }) => {
  return (
    <div className={className}>
      <div className="flex flex-col gap-4 lg:gap-5">
        <div className="ReviewLists-txt">Review Lists</div>
        <div className="All-Reviews-filters-btns  flex flex-wrap gap-3 ">
          <button className="filtre-Reviews-btn selected">All Reviews</button>
          <button className="filtre-Reviews-btn">With Photo & Video</button>
          <button className="filtre-Reviews-btn">With Description</button>
        </div>
        <OneReview
          review="This is amazing product I have."
          date="July 2, 2020 03:29 PM"
          person="Darrell Steward"
          likes={128}
        />
        <OneReview
          review="This is amazing product I have."
          date="July 2, 2020 03:29 PM"
          person="Darrell Steward"
          likes={128}
        />
        <OneReview
          review="This is amazing product I have."
          date="July 2, 2020 03:29 PM"
          person="Darrell Steward"
          likes={128}
        />
        <OneReview
          review="This is amazing product I have."
          date="July 2, 2020 03:29 PM"
          person="Darrell Steward"
          likes={128}
        />
      </div>
    </div>
  );
};

export default ReviewLists;
