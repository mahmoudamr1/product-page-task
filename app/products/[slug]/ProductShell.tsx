"use client";

import React, { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { useProductStore } from "@/store/productStore";
import EmblaCarousel from "@/components/product/EmblaCarousel/EmblaCarousel";
import { Product } from "@/types/product";
import RightProduct from "@/components/product/RightProduct/RightProduct";

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
    <section
      id="product-main"
      className=" overflow-hidden pt-6 px-4 lg:px-7 lg:pt-14 max-w-full"
    >
      <div className="container flex flex-col gap-6 xl:gap-10 max-w-full md:max-w-screen-xl mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-full">
          <EmblaCarousel slides={slides} />
          <RightProduct />
        </div>
      </div>
    </section>
  );
};

export default ProductShell;
