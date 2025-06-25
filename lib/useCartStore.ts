// lib/useCartStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/types/product";

export interface CartItem {
  product: Product;
  selectedProps: Record<string, string>;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  toggleCart: () => void;
  addItem: (
    product: Product,
    selectedProps: Record<string, string>,
    quantity?: number
  ) => void;
  removeItem: (
    productId: string,
    selectedProps: Record<string, string>
  ) => void;
  clearCart: () => void;
  updateQuantity: (
    productId: string,
    selectedProps: Record<string, string>,
    delta: number
  ) => void;
}

/** مقارنة بسيطة بين كائنين من Record<string,string> */
const isSameProps = (
  a: Record<string, string>,
  b: Record<string, string>
): boolean => {
  const ka = Object.keys(a);
  const kb = Object.keys(b);
  if (ka.length !== kb.length) return false;
  return ka.every((key) => b[key] === a[key]);
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,

      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      addItem: (product, selectedProps, quantity = 1) =>
        set((state) => {
          const idx = state.items.findIndex(
            (i) =>
              i.product.id === product.id &&
              isSameProps(i.selectedProps, selectedProps)
          );
          if (idx !== -1) {
            // عنصر موجود: زوّد الكمية
            const items = [...state.items];
            items[idx] = {
              ...items[idx],
              quantity: items[idx].quantity + quantity,
            };
            return { items };
          }
          // عنصر جديد
          return {
            items: [...state.items, { product, selectedProps, quantity }],
          };
        }),

      removeItem: (productId, selectedProps) =>
        set((state) => ({
          items: state.items.filter(
            (i) =>
              !(
                i.product.id === productId &&
                isSameProps(i.selectedProps, selectedProps)
              )
          ),
        })),

      clearCart: () => set({ items: [] }),

      updateQuantity: (productId, selectedProps, delta) =>
        set((state) => {
          const items = state.items.map((i) => {
            if (
              i.product.id === productId &&
              isSameProps(i.selectedProps, selectedProps)
            ) {
              const newQty = i.quantity + delta;
              return {
                ...i,
                quantity: newQty > 0 ? newQty : i.quantity,
              };
            }
            return i;
          });
          return { items };
        }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
