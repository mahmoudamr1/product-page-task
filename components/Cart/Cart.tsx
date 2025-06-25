// components/Cart/Cart.tsx
"use client";

import React from "react";
import Image from "next/image";
import { useCartStore, CartItem } from "@/lib/useCartStore";
import "./Cart.css";

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
      <div className="flex flex-col gap-4 px-4 py-3 h-full">
        {/* زر الإغلاق */}
        <div className="close-navbar flex px-2 py-2" onClick={toggleCart}>
          <Image src="/close-nav.png" alt="Close cart" fill />
        </div>

        {/* محتويات السلة */}
        {items.length === 0 ? (
          <p className="text-center text-gray-500">سلة التسوق فارغة</p>
        ) : (
          <>
            {items.map((item: CartItem, idx: number) => {
              const unitPrice = item.product.sale_price ?? item.product.price;
              const itemTotal = unitPrice * item.quantity;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0"
                >
                  {/* الصورة */}
                  <img
                    src={item.product.thumb}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />

                  <div className="flex-1">
                    {/* الاسم */}
                    <p className="font-semibold">{item.product.name}</p>

                    {/* المتغيرات المختارة */}
                    {item.selectedProps && (
                      <div className="text-sm text-gray-600">
                        {Object.entries(item.selectedProps).map(
                          ([variation, value]) => (
                            <span key={variation} className="mr-2">
                              {variation}: {value}
                            </span>
                          )
                        )}
                      </div>
                    )}

                    {/* وحدة التحكم في الكمية */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        className="px-2 py-1 border rounded"
                        onClick={() =>
                          addItem(item.product, item.selectedProps, -1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        –
                      </button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <button
                        className="px-2 py-1 border rounded"
                        onClick={() =>
                          addItem(item.product, item.selectedProps, 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    {/* المجموع الخاص بالعنصر */}
                    <p className="mt-1 text-sm font-medium">
                      EGP: {itemTotal.toLocaleString()}
                    </p>
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
              );
            })}{" "}
            {/* <=== هنا غيرنا من '}))}' لـ '})}' */}
            {/* الملخص الكلي للسلة */}
            <div className="mt-4 border-t pt-4 flex items-center justify-between">
              <p className="text-gray-600"> {totalItems} : Items</p>
              <p className="font-bold">
                Cart Total: ${subtotal.toLocaleString()}
              </p>
            </div>
            {/* زر إزالة الكل */}
            <button
              className="mt-4 w-full bg-red-500 text-white py-2 rounded"
              onClick={handleClearAll}
            >
              إزالة الكل
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
