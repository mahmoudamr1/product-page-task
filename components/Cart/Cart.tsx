//components/Cart/Cart.tsx

import React from "react";
import Image from "next/image";
import { useCartStore, CartItem } from "@/lib/useCartStore";

interface CartProps {
  toggleCart: () => void;
}

const Cart: React.FC<CartProps> = ({ toggleCart }) => {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div className="navbar-collapse !w-[75%] bg-white shadow-lg">
      <div className="flex flex-col gap-4 px-4 py-3">
        {/* Close button */}
        <div className="close-navbar flex px-2 py-2" onClick={toggleCart}>
          <Image src="/close-nav.png" alt="" fill />
        </div>

        {/* Cart contents */}
        {items.length === 0 ? (
          <p className="text-center text-gray-500">سلة التسوق فارغة</p>
        ) : (
          items.map((item: CartItem, idx: number) => (
            <div
              key={idx}
              className="flex items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0"
            >
              {/* Thumbnail */}
              <img
                src={item.product.thumb}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded"
              />

              <div className="flex-1">
                {/* Name */}
                <p className="font-semibold">{item.product.name}</p>

                {/* Selected variations */}
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

                {/* Quantity controls */}
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
                    onClick={() => addItem(item.product, item.selectedProps, 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Remove */}
              <button
                className="text-red-500 text-sm"
                onClick={() => removeItem(item.product.id, item.selectedProps)}
              >
                إزالة
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Cart;
