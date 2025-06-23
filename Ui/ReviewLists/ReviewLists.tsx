import React from "react";
interface ReviewListsProps {
  className?: string;
}

const ReviewLists: React.FC<ReviewListsProps> = ({ className }) => {
  return <div className={className}>ReviewLists</div>;
};

export default ReviewLists;
