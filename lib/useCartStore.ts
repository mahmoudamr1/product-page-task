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
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isCartOpen: false,
      toggleCart: () => set((s) => ({ isCartOpen: !s.isCartOpen })),
      addItem: (product, selectedProps, quantity = 1) =>
        set((state) => {
          // find existing line by product + exact same props
          const idx = state.items.findIndex(
            (i) =>
              i.product.id === product.id &&
              JSON.stringify(i.selectedProps) === JSON.stringify(selectedProps)
          );
          if (idx !== -1) {
            const items = [...state.items];
            items[idx].quantity += quantity;
            return { items };
          }
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
                JSON.stringify(i.selectedProps) ===
                  JSON.stringify(selectedProps)
              )
          ),
        })),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
