// components/ui/FirstDiscount/FirstDiscount.tsx
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

  // نُهيّئ الساعة إلى 00:00:00 كي يكون نفس المحتوى على الخادم والعميل
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // عند أول تحميل في المتصفح نحسب القيمة الحقيقية
    setMounted(true);
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="container-first-discount flex gap-3 text-center items-center justify-center py-3 px-3">
      <div className="small-txt">Discount 10% for all products!</div>
      {/* قبل التحميل نُظهر "--:--:--" ثم نستبدله بعد mount */}
      <span className="hour-txt" suppressHydrationWarning>
        {mounted
          ? `${pad(timeLeft.hours)}:${pad(timeLeft.minutes)}:${pad(
              timeLeft.seconds
            )}`
          : "--:--:--"}
      </span>
    </div>
  );
};

export default FirstDiscount;
