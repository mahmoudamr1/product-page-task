// store/productStore.ts
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Product } from "@/types/product";
import { fetchProductBySlug } from "@/lib/api";

interface ProductStore {
  product: Product | null;
  loading: boolean;
  error: string | null;

  fetchProduct: (slug: string) => Promise<void>;
}

export const useProductStore = create<ProductStore>()(
  immer((set) => ({
    product: null,
    loading: false,
    error: null,

    fetchProduct: async (slug) => {
      set({ loading: true, error: null });
      try {
        const res = await fetchProductBySlug(slug);
        set({ product: res, loading: false });
      } catch (err: any) {
        set({ error: err.message, loading: false });
      }
    },
  }))
);
