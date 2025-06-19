"use client";

import React, { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { useProductStore } from "@/store/productStore";
import EmblaCarousel from "@/components/product/EmblaCarousel";
import { Product } from "@/types/product";

interface ProductShellProps {
  initialProduct?: Product;
}

const ProductShell: React.FC<ProductShellProps> = ({ initialProduct }) => {
  const { product, fetchProduct, loading, error } = useProductStore();
  const { slug } = useParams() as { slug?: string };

  useEffect(() => {
    if (!initialProduct && slug) {
      fetchProduct(slug);
    }
  }, [initialProduct, slug, fetchProduct]);

  // إما اللي وصل كـprop أو اللي في الـstore
  const activeProduct = initialProduct ?? product;

  // نتأكد من كل الحالات اللي ممكن activeProduct يكون فيها null أو undefined
  if (!activeProduct) {
    if (loading) {
      return <p>Loading…</p>;
    }
    if (error) {
      return <p>Error loading product</p>;
    }
    // غطينا كل الحالات: لو ما في loading ولا error كمان
    return <p>Product not found</p>;
  }

  // الآن TS ضامن أن activeProduct موجود
  const slides = useMemo(
    () => [activeProduct.thumb, ...(activeProduct.images ?? [])],
    [activeProduct.thumb, activeProduct.images]
  );

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <EmblaCarousel slides={slides} />

      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{activeProduct.name}</h1>
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: activeProduct.description }}
        />
        <p className="text-xl font-semibold">
          السعر: {activeProduct.sale_price || activeProduct.price} ج.م
        </p>
        <button className="px-6 py-2 bg-green-600 text-white rounded">
          {activeProduct.buy_now_text}
        </button>
      </div>
    </div>
  );
};

export default ProductShell;
