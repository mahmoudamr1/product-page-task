// components/Cart/Cart.tsx
"use client";

import React from "react";
import Image from "next/image";
import { useCartStore, CartItem } from "@/lib/useCartStore";
import "./Cart.css";
import DashedLine from "../DashedLine/DashedLine";

interface CartProps {
  toggleCart: () => void;
}

const Cart: React.FC<CartProps> = ({ toggleCart }) => {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);

  // حذف جميع العناصر
  const handleClearAll = () => {
    items.forEach((item) => removeItem(item.product.id, item.selectedProps));
  };

  // حساب المجموع الفرعي والعدد الكلي
  const subtotal = items.reduce((sum, item) => {
    const unitPrice = item.product.sale_price ?? item.product.price;
    return sum + unitPrice * item.quantity;
  }, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="navbar-collapse !w-[75%] !max-w-[400px] bg-white shadow-lg">
      <div className="flex flex-col gap-3 px-4 py-3 h-full overflow-hidden">
        {/* زر الإغلاق */}
        <div className="close-navbar flex px-2 py-2" onClick={toggleCart}>
          <Image src="/close-nav.png" alt="Close cart" fill />
        </div>

        {/* محتويات السلة */}
        {items.length === 0 ? (
          <p className="text-center text-gray-500">سلة التسوق فارغة</p>
        ) : (
          <div className="flex flex-col justify-between  relative overflow-y-auto">
            <div className="flex flex-col overflow-hidden ">
              <div className="flex flex-col overflow-y-auto">
                {items.map((item: CartItem, idx: number) => {
                  const unitPrice =
                    item.product.sale_price ?? item.product.price;
                  const itemTotal = unitPrice * item.quantity;
                  return (
                    <React.Fragment key={idx}>
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-4 justify-between">
                          {/* الصورة */}
                          <div className="flex gap-3">
                            <img
                              src={item.product.thumb}
                              alt={item.product.name}
                              className="max-w-17 max-h-17 w-full h-full object-cover rounded"
                            />
                            <div className="flex flex-col">
                              <div className="flex-1">
                                {/* الاسم */}
                                <p className="font-semibold">
                                  {item.product.name}
                                </p>

                                {/* المتغيرات المختارة */}
                                {item.selectedProps && (
                                  <div className="text-sm text-gray-600 flex flex-col gap-1">
                                    {Object.entries(item.selectedProps).map(
                                      ([variation, value]) => (
                                        <span key={variation}>
                                          {variation}: {value}
                                        </span>
                                      )
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* زر إزالة عنصر */}
                          <button
                            className="text-red-500 text-sm"
                            onClick={() =>
                              removeItem(item.product.id, item.selectedProps)
                            }
                          >
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth="0"
                              version="1.2"
                              baseProfile="tiny"
                              viewBox="0 0 24 24"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                              className="close-icon"
                            >
                              <path d="M12 3c-4.963 0-9 4.038-9 9s4.037 9 9 9 9-4.038 9-9-4.037-9-9-9zm0 16c-3.859 0-7-3.14-7-7s3.141-7 7-7 7 3.14 7 7-3.141 7-7 7zM12.707 12l2.646-2.646c.194-.194.194-.512 0-.707-.195-.194-.513-.194-.707 0l-2.646 2.646-2.646-2.647c-.195-.194-.513-.194-.707 0-.195.195-.195.513 0 .707l2.646 2.647-2.646 2.646c-.195.195-.195.513 0 .707.097.098.225.147.353.147s.256-.049.354-.146l2.646-2.647 2.646 2.646c.098.098.226.147.354.147s.256-.049.354-.146c.194-.194.194-.512 0-.707l-2.647-2.647z" />
                            </svg>
                          </button>
                        </div>
                        <div className="flex justify-between gap-3 items-center">
                          <div className="flex items-center border-gray-400 border-1">
                            <button
                              className="self-stretch p-3"
                              onClick={() =>
                                addItem(item.product, item.selectedProps, -1)
                              }
                              disabled={item.quantity <= 1}
                            >
                              <svg
                                stroke="#f02d34"
                                fill="#f02d34"
                                strokeWidth="0"
                                viewBox="0 0 1024 1024"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z" />
                              </svg>
                            </button>
                            <div className="self-stretch w-px bg-gray-400"></div>
                            <span className="px-4">{item.quantity}</span>
                            <div className="self-stretch w-px bg-gray-400"></div>
                            <button
                              className="self-stretch p-3"
                              onClick={() =>
                                addItem(item.product, item.selectedProps, 1)
                              }
                            >
                              <svg
                                stroke="#31a831"
                                fill="#31a831"
                                strokeWidth="0"
                                viewBox="0 0 1024 1024"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8Z" />
                                <path d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8Z" />
                              </svg>
                            </button>
                          </div>

                          <p className="mt-1 text-sm font-medium">
                            Total : {itemTotal.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <DashedLine className="!py-2 last:hidden" />
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            <div className="sticky bottom-0 z-10 bg-white py-3 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-gray-600"> {totalItems} : Items</p>
                <p className="font-bold">
                  Cart Total: ${subtotal.toLocaleString()}
                </p>
              </div>
              <button
                className="w-full bg-red-500 text-white py-2 rounded"
                onClick={handleClearAll}
              >
                إزالة الكل
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
