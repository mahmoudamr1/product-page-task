"use client";

import React, { useState, useEffect } from "react";
import "./FirstDiscount.css";

const FirstDiscount: React.FC = () => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      0
    );
    const diffMs = Math.max(endOfDay.getTime() - now.getTime(), 0);
    const totalSeconds = Math.floor(diffMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="container-first-discount flex gap-3 text-center items-center justify-center py-3 px-3">
      <div className="small-txt">Discount 10% for all products!</div>
      <span className="hour-txt">
        {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
      </span>{" "}
    </div>
  );
};

export default FirstDiscount;
