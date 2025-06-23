// components/SummaryComments.tsx
import React from "react";
import OneStar from "../OneStar/OneStar";
import "./SummaryComments.css";

const SummaryComments: React.FC = () => {
  const ratingValue = 4.5;
  const size = 80; // قطر الدائرة
  const thickness = 6; // سماكة الحافة
  const degrees = (ratingValue / 5) * 360;

  return (
    <div className="SummaryComments grid grid-cols-12 gap-5 py-6 pe-3 ps-4 lg:p-6">
      <div className="lg:col-span-4 col-span-12">
        <div className="flex gap-4 items-center">
          {/* دائرة التقييم */}
          <div
            style={{
              position: "relative",
              width: size,
              height: size,
            }}
          >
            {/* الحلقة الملونة */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: `conic-gradient(#F59E0B ${degrees}deg, #E5E7EB ${degrees}deg)`,
              }}
            />
            {/* الدائرة الداخلية البيضاء والنص */}
            <div
              style={{
                position: "absolute",
                inset: thickness,
                borderRadius: "50%",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: size * 0.2,
                color: "#374151",
              }}
            >
              {ratingValue.toFixed(1)}
            </div>
          </div>

          <div className="flex flex-col items-start justify-center">
            <div className="flex gap-1 flex-nowrap">
              <OneStar />
              <OneStar />
              <OneStar />
              <OneStar />
              <OneStar />
            </div>
            <div className="flex from-reviews">from 1.25k reviews</div>
          </div>
        </div>
      </div>
      <div className="rating-charts-container lg:col-span-8 col-span-12 grid gap-3">
        <div className="grid grid-cols-12 gap-x-3 lg:gap-x-4 gap-y-6 items-center">
          <div className="col-span-2">
            <div className="flex items-center justify-end gap-1 flex-nowrap ">
              <div className="rate-num">5.0</div>
              <OneStar />
            </div>
          </div>
          <div className="col-span-8">
            <div className="w-full h-2 bg-[#E4E9EE] rounded-full overflow-hidden">
              <div className="h-full bg-black" style={{ width: "80%" }} />
            </div>
          </div>

          <div className="comments-num col-span-2 flex items-center justify-start">
            2823
          </div>
        </div>
        <div className="grid grid-cols-12 gap-x-3 lg:gap-x-4 gap-y-6 items-center">
          <div className="col-span-2">
            <div className="flex items-center justify-end gap-1 flex-nowrap">
              <div className="rate-num">4.0</div>
              <OneStar />
            </div>
          </div>
          <div className="col-span-8">
            <div className="w-full h-2 bg-[#E4E9EE] rounded-full overflow-hidden">
              <div className="h-full bg-black" style={{ width: "80%" }} />
            </div>
          </div>

          <div className="comments-num col-span-2 flex items-center justify-start">
            38
          </div>
        </div>
        <div className="grid grid-cols-12 gap-x-3 lg:gap-x-4 gap-y-6 items-center">
          <div className="col-span-2">
            <div className="flex items-center justify-end gap-1 flex-nowrap">
              <div className="rate-num">3.0</div>
              <OneStar />
            </div>
          </div>
          <div className="col-span-8">
            <div className="w-full h-2 bg-[#E4E9EE] rounded-full overflow-hidden">
              <div className="h-full bg-black" style={{ width: "80%" }} />
            </div>
          </div>

          <div className="comments-num col-span-2 flex items-center justify-start">
            4
          </div>
        </div>
        <div className="grid grid-cols-12 gap-x-3 lg:gap-x-4 gap-y-6 items-center">
          <div className="col-span-2">
            <div className="flex items-center justify-end gap-1 flex-nowrap">
              <div className="rate-num">2.0</div>
              <OneStar />
            </div>
          </div>
          <div className="col-span-8">
            <div className="w-full h-2 bg-[#E4E9EE] rounded-full overflow-hidden">
              <div className="h-full bg-black" style={{ width: "80%" }} />
            </div>
          </div>

          <div className="comments-num col-span-2 flex items-center justify-start">
            0
          </div>
        </div>
        <div className="grid grid-cols-12 gap-x-3 lg:gap-x-4 gap-y-6 items-center">
          <div className="col-span-2">
            <div className="flex items-center justify-end gap-1 flex-nowrap">
              <div className="rate-num">1.0</div>
              <OneStar />
            </div>
          </div>
          <div className="col-span-8">
            <div className="w-full h-2 bg-[#E4E9EE] rounded-full overflow-hidden">
              <div className="h-full bg-black" style={{ width: "80%" }} />
            </div>
          </div>

          <div className="comments-num col-span-2 flex items-center justify-start">
            0
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryComments;
