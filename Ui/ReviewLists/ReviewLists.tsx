// components/ReviewLists.tsx
"use client";

import React, { useState } from "react";
import "./ReviewLists.css";
import OneReview from "../OneReview/OneReview";

interface Review {
  review: string;
  date: string;
  person: string;
  likes: number;
}

interface ReviewListsProps {
  className?: string;
}

const ReviewLists: React.FC<ReviewListsProps> = ({ className = "" }) => {
  // مثال على بيانات المراجعات
  const allReviews: Review[] = [
    {
      review: "Amazing product!",
      date: "July 2, 2020 03:29 PM",
      person: "Darrell Steward",
      likes: 128,
    },
    {
      review: "Really enjoyed it.",
      date: "July 3, 2020 11:12 AM",
      person: "Jane Cooper",
      likes: 95,
    },
    {
      review: "Could be better.",
      date: "July 4, 2020 09:45 AM",
      person: "John Doe",
      likes: 42,
    },
    {
      review: "Exceeded expectations!",
      date: "July 5, 2020 08:30 PM",
      person: "Alice Smith",
      likes: 210,
    },
    {
      review: "Five stars!",
      date: "July 6, 2020 02:17 PM",
      person: "Bob Johnson",
      likes: 76,
    },
    {
      review: "Not what I expected.",
      date: "July 7, 2020 06:05 PM",
      person: "Carol King",
      likes: 33,
    },
    {
      review: "I love it!",
      date: "July 8, 2020 12:00 PM",
      person: "Eve Adams",
      likes: 189,
    },
    {
      review: "Works as advertised.",
      date: "July 9, 2020 10:25 AM",
      person: "Frank Lee",
      likes: 58,
    },
    // ...أضف المزيد إذا لزم الأمر
  ];

  const reviewsPerPage = 3;
  const totalPages = Math.ceil(allReviews.length / reviewsPerPage);

  const [currentPage, setCurrentPage] = useState(1);
  const start = (currentPage - 1) * reviewsPerPage;
  const end = start + reviewsPerPage;
  const currentReviews = allReviews.slice(start, end);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className={className}>
      <div className="flex flex-col gap-4 lg:gap-5">
        <div className="ReviewLists-txt">Review Lists</div>
        <div className="All-Reviews-filters-btns flex flex-wrap gap-3">
          <button className="filtre-Reviews-btn selected">All Reviews</button>
          <button className="filtre-Reviews-btn">With Photo & Video</button>
          <button className="filtre-Reviews-btn">With Description</button>
        </div>

        {/* عرض ٤ مراجعات فقط */}

        <div className="all-reviews-cards flex flex-col gap-4">
          {currentReviews.map((r, idx) => (
            <OneReview
              key={idx}
              {...r}
              showDivider={idx !== currentReviews.length - 1}
            />
          ))}
        </div>

        {/* الباجينيشن */}
        <div className="flex items-center justify-center gap-2 mt-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="btn-moving px-3 py-1 rounded border disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              className="rotate-[180deg]"
            >
              <path
                d="M8.95019 4.10946L15.4702 10.6295C16.2402 11.3995 16.2402 12.6595 15.4702 13.4295L8.9502 19.9495"
                stroke="#141414"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`btn-moving px-3 py-1 rounded border h-full ${
                page === currentPage
                  ? "!bg-black !text-white"
                  : "!bg-white !text-black"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="btn-moving px-3 py-1 rounded border disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
            >
              <path
                d="M8.95019 4.10946L15.4702 10.6295C16.2402 11.3995 16.2402 12.6595 15.4702 13.4295L8.9502 19.9495"
                stroke="#141414"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewLists;
