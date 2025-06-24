/* src/types/product.ts */

export interface Category {
  id: string;
  name: string;
  slug: string;
  thumb: string;
}

export interface VariationProp {
  id: string;
  name: string; // brown | 40 | …
  variation_id: string;
  value?: string; // URL للصورة لو type = image، أو كود لون لو type = color
}

export type VariationType = "image" | "button" | "color";

export interface Variation {
  id: string;
  name: string; // color | size …
  type: VariationType;
  props: VariationProp[];
}

export interface VariantVariationProp {
  id: string;
  variation: string; // "color"
  variation_prop: string; // "brown"
  product_variant_id: string;
}

export interface ProductVariant {
  id: string;
  price: number;
  sale_price: number;
  quantity: number;
  variation_props: VariantVariationProp[];
}

/* ---------- المنتج الكامل ---------- */

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  sale_price: number;
  description: string;
  thumb: string;
  images: string[];
  quantity: number;
  track_stock: boolean;

  variations: Variation[];
  variants: ProductVariant[];
  categories: Category[];

  buy_now_text: string;
}

/* ---------- لو حابب تضيف الـ Review ---------- */

export interface Review {
  id: string;
  user: { name: string; avatar?: string };
  rating: number; // 1‒5
  comment: string;
  created_at: string;
}
