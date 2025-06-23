// components/OneReview.tsx
import React from "react";
import OneStar from "../OneStar/OneStar";
import Image from "next/image";
import "./OneReview.css";
import DashedLine from "@/components/DashedLine/DashedLine";

interface OneReviewProps {
  /** نص المراجعة */
  review: string;
  /** تاريخ ووقت المراجعة */
  date: string;
  /** اسم الشخص */
  person: string;
  /** عدد اللايكات (الإعجابات) */
  likes: number;
}

const OneReview: React.FC<OneReviewProps> = ({
  review,
  date,
  person,
  likes,
}) => {
  return (
    <div className="flex flex-col gap-2 lg:gap-3">
      <div className="flex gap-1 flex-nowrap">
        <OneStar />
        <OneStar />
        <OneStar />
        <OneStar />
        <OneStar />
      </div>
      <div className="flex flex-col gap-2">
        <div className="review-txt">{review}</div>
        <div className="review-date">{date}</div>
      </div>
      <div className="flex items-center justify-between">
        <div className="img-name-container flex gap-2 items-center">
          <Image
            src="/person-1.png"
            alt={person}
            fill
            className="person-image !relative"
          />
          <div className="person-name-txt">{person}</div>
        </div>
        <div className="flex gap-3 justify-end">
          <div className="likes-count-container flex gap-1 items-center justify-center py-2 px-3">
            {/* Thumbs up icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
            >
              <path
                d="M8.39014 18.5193V8.35927C8.39014 7.95927 8.51014 7.56927 8.73014 7.23927L11.4601 3.17927C11.8901 2.52927 12.9601 2.06927 13.8701 2.40927C14.8501 2.73927 15.5001 3.83927 15.2901 4.81927L14.7701 8.08927C14.7301 8.38927 14.8101 8.65927 14.9801 8.86927C15.1501 9.05927 15.4001 9.17927 15.6701 9.17927H19.7801C20.5701 9.17927 21.2501 9.49927 21.6501 10.0593C22.0301 10.5993 22.1001 11.2993 21.8501 12.0093L19.3901 19.4993C19.0801 20.7393 17.7301 21.7493 16.3901 21.7493H12.4901C11.8201 21.7493 10.8801 21.5193 10.4501 21.0893L9.17014 20.0993C8.68014 19.7293 8.39014 19.1393 8.39014 18.5193Z"
                fill="#141414"
              />
              <path
                d="M5.21 6.40918H4.18C2.63 6.40918 2 7.00918 2 8.48918V18.5492C2 20.0292 2.63 20.6292 4.18 20.6292H5.21C6.76 20.6292 7.39 20.0292 7.39 18.5492V8.48918C7.39 7.00918 6.76 6.40918 5.21 6.40918Z"
                fill="#141414"
              />
            </svg>
            <div className="likes-num">{likes}</div>
          </div>
          {/* Second icon (e.g. thumbs down) */}
          <div className="likes-count-container flex gap-1 items-center justify-center py-2 px-3 !w-14">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
            >
              <path
                d="M7.47998 5.67933L10.58 3.27933C10.98 2.87933 11.88 2.67933 12.48 2.67933H16.28C17.48 2.67933 18.78 3.57933 19.08 4.77933L21.48 12.0793C21.98 13.4793 21.08 14.6793 19.58 14.6793H15.58C14.98 14.6793 14.48 15.1793 14.58 15.8793L15.08 19.0793C15.28 19.9793 14.68 20.9793 13.78 21.2793C12.98 21.5793 11.98 21.1793 11.58 20.5793L7.47998 14.4793"
                stroke="#0B0F0E"
                strokeWidth="1.5"
                strokeMiterlimit="10"
              />
              <path
                d="M2.37988 5.67939V15.4794C2.37988 16.8794 2.97988 17.3794 4.37988 17.3794H5.37988C6.77988 17.3794 7.37988 16.8794 7.37988 15.4794V5.67939C7.37988 4.27939 6.77988 3.77939 5.37988 3.77939H4.37988C2.97988 3.77939 2.37988 4.27939 2.37988 5.67939Z"
                stroke="#0B0F0E"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <DashedLine className="!py-2" />
    </div>
  );
};

export default OneReview;
