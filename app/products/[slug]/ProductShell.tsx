// components/product/ProductShell.tsx
"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import EmblaCarousel from "@/components/product/EmblaCarousel/EmblaCarousel";
import { Product } from "@/types/product";

import { fetchProductBySlug } from "@/lib/fetchProductBySlug";
import RightProduct from "@/components/product/RightProduct/RightProduct";

interface ProductShellProps {
  initialProduct?: Product;
}

const ProductShell: React.FC<ProductShellProps> = ({ initialProduct }) => {
  const { slug } = useParams() as { slug?: string };
  const [activeProduct, setActiveProduct] = useState<Product | undefined>(
    initialProduct
  );
  const [loading, setLoading] = useState(!initialProduct);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!initialProduct && slug) {
      setLoading(true);
      fetchProductBySlug(slug)
        .then((prod) => setActiveProduct(prod))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [initialProduct, slug]);

  if (loading) return <p>Loading…</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!activeProduct) return <p>Product not found</p>;

  const slides = useMemo(
    () => [activeProduct.thumb, ...(activeProduct.images || [])],
    [activeProduct]
  );

  return (
    <section
      id="product-main"
      className="overflow-hidden pt-6 px-4 lg:px-7 lg:pt-14 max-w-full"
    >
      <div className="container flex flex-col gap-6 xl:gap-10 max-w-full md:max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-full">
          <EmblaCarousel slides={slides} />
          <RightProduct product={activeProduct} />
        </div>
      </div>
    </section>
  );
};

export default ProductShell;
