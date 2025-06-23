// components/ui/SoldRating.tsx
import React from "react";
import "./SoldRating.css";

export interface SoldRatingProps extends React.HTMLAttributes<HTMLDivElement> {
  soldText: string;
  ratingText: string;
}

const SoldRating: React.FC<SoldRatingProps> = ({
  className = "",
  soldText,
  ratingText,
  ...divProps
}) => {
  return (
    <div
      {...divProps}
      className={`${className} flex items-center justify-center lg:gap-3 gap-2`}
    >
      <div className="after-discount-price flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
        >
          <path
            d="M13.7299 3.53943L15.4899 7.05943C15.7299 7.54943 16.3699 8.01943 16.9099 8.10943L20.0999 8.63943C22.1399 8.97943 22.6199 10.4594 21.1499 11.9194L18.6699 14.3994C18.2499 14.8194 18.0199 15.6294 18.1499 16.2094L18.8599 19.2794C19.4199 21.7094 18.1299 22.6494 15.9799 21.3794L12.9899 19.6094C12.4499 19.2894 11.5599 19.2894 11.0099 19.6094L8.01991 21.3794C5.87991 22.6494 4.57991 21.6994 5.13991 19.2794L5.84991 16.2094C5.97991 15.6294 5.74991 14.8194 5.32991 14.3994L2.84991 11.9194C1.38991 10.4594 1.85991 8.97943 3.89991 8.63943L7.08991 8.10943C7.61991 8.01943 8.25991 7.54943 8.49991 7.05943L10.2599 3.53943C11.2199 1.62943 12.7799 1.62943 13.7299 3.53943Z"
            fill="#FFA439"
          />
        </svg>

        <div className="rating">{ratingText}</div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="6"
        height="7"
        viewBox="0 0 6 7"
        fill="none"
      >
        <circle cx="3" cy="3.02905" r="3" fill="#E0E0E0" />
      </svg>
      <div className="numper-sold">{soldText}</div>
    </div>
  );
};

export default SoldRating;
