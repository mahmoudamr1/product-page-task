"use client";

import React, { useMemo, useCallback } from "react";
import Image from "next/image";
import { useCartStore, CartItem } from "@/lib/useCartStore";
import "./Cart.css";
import DashedLine from "../DashedLine/DashedLine";

interface CartProps {
  toggleCart: () => void;
}

const Cart: React.FC<CartProps> = ({ toggleCart }) => {
  // الحصول على بيانات السلة من الـ store بشكل منفصل لتجنب إعادة التحديث المتكرر
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  // حساب المجموع الفرعي وإجمالي العناصر مع استخدام useMemo للحفظ
  const subtotal = useMemo(
    () =>
      items.reduce((sum: number, item: CartItem) => {
        const unitPrice = item.product.sale_price ?? item.product.price;
        return sum + unitPrice * item.quantity;
      }, 0),
    [items]
  );

  const totalItems = useMemo(
    () => items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0),
    [items]
  );

  // مسح جميع العناصر
  const handleClearAll = useCallback(() => {
    clearCart();
  }, [clearCart]);

  // إزالة عنصر منفرد
  const handleRemoveItem = useCallback(
    (id: string, props: Record<string, string>) => {
      removeItem(id, props);
    },
    [removeItem]
  );

  // تعديل كمية عنصر بزيادة أو نقصان
  const handleQuantityChange = useCallback(
    (item: CartItem, delta: number) => {
      updateQuantity(item.product.id, item.selectedProps, delta);
    },
    [updateQuantity]
  );

  return (
    <div className="navbar-collapse !w-[75%] !max-w-[400px] bg-white shadow-lg">
      <div className="flex flex-col gap-3 px-4 py-3 h-full overflow-hidden">
        {/* زر إغلاق السلة */}
        <button
          className="close-navbar flex p-2"
          onClick={toggleCart}
          aria-label="إغلاق السلة"
        >
          <Image src="/close-nav.png" alt="Close cart" fill />
        </button>

        {/* حالة السلة الفارغة */}
        {items.length === 0 ? (
          <p className="text-center text-gray-500">سلة التسوق فارغة</p>
        ) : (
          <div className="flex flex-col justify-between relative overflow-y-auto h-full">
            {/* قائمة العناصر */}
            <ul className="flex flex-col overflow-y-auto">
              {items.map((item: CartItem) => {
                const unitPrice = item.product.sale_price ?? item.product.price;
                const itemTotal = unitPrice * item.quantity;
                const key = `${item.product.id}-${Object.entries(item.selectedProps)
                  .map(([k, v]) => `${k}:${v}`)
                  .join(",")}`;
                return (

                  <li key={key} className="flex flex-col gap-3 ">
                    {/* صف العنصر */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex gap-3">
                        <Image
                          src={item.product.thumb}
                          alt={item.product.name}
                          width={68}
                          height={68}
                          className="object-cover rounded"
                        />
                        <div className="flex flex-col">
                          <p className="font-semibold">{item.product.name}</p>
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

                      {/* زر إزالة العنصر */}
                      <button
                        className="text-red-500 text-sm"
                        onClick={() => handleRemoveItem(item.product.id, item.selectedProps)}
                        aria-label="إزالة هذا العنصر"
                      >
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 24 24"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                          className="close-icon"
                        >
                          <path d="M12 3c-4.963 0-9 4.038-9 9s4.037 9 9 9 9-4.038 9-9-4.037-9-9-9zm0 16c-3.859 0-7-3.14-7-7s3.141-7 7-7 7 3.14 7 7-3.141 7-7 7zM12.707 12l2.646-2.646c.194-.194.194-.512 0-.707-.195-.194-.513-.194-.707 0l-2.646 2.646-2.646-2.647c-.195-.194-.513-.194-.707 0-.195.195-.195.513 0 .707l2.646 2.647-2.646 2.646c-.195.195-.195.513 0 .707.097.098.225.147.353.147s.256-.049.354-.146l2.646-2.647 2.646 2.646c.098.098.226.147.354.147s.256-.049.354-.146c.194-.194.194-.512 0-.707z" />
                        </svg>
                      </button>
                    </div>

                    {/* التحكم بالكمية */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center border border-gray-400">
                        <button
                          className="p-3 cursor-pointer disabled:opacity-50"
                          onClick={() => handleQuantityChange(item, -1)}
                          disabled={item.quantity <= 1}
                          aria-label="إنقاص الكمية"
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
                        <div className="w-px h-full bg-gray-400" />
                        <span className="px-4">{item.quantity}</span>
                        <div className="w-px h-full bg-gray-400" />
                        <button
                          className="p-3 cursor-pointer"
                          onClick={() => handleQuantityChange(item, 1)}
                          aria-label="زيادة الكمية"
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
                        Total: {itemTotal.toLocaleString()}
                      </p>
                    </div>

                    <DashedLine className="!py-2 " />
                  </li>


                );
              })}
            </ul>

            {/* ملخص السلة */}
            <div className="sticky bottom-0 z-10 bg-white py-3 flex flex-col gap-4 border-t-2 border-dashed border-gray-400">
              <div className="flex items-center justify-between">
                <p className="text-gray-600">{totalItems} : Items </p>
                <p className="font-bold">Cart Total: $ {subtotal.toLocaleString()}</p>
              </div>
              <button
                className="w-full bg-red-500 text-white py-2 rounded cursor-pointer"
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
