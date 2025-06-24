// app/products/[slug]/page.tsx
import React from "react";
import Head from "next/head";
import { fetchProductBySlug } from "@/lib/fetchProductBySlug";
import ProductShell from "./ProductShell";
import FirstDiscount from "@/components/FirstDiscount/FirstDiscount";
import Header from "@/components/Header/Header";
import ProductSection1 from "@/components/ProductSection1/ProductSection1";
import DashedLine from "@/components/DashedLine/DashedLine";
import ReviewSection from "@/components/ReviewSection/ReviewSection";
import ProductSection2 from "@/components/ProductSection2/ProductSection2";
import Footer from "@/components/Footer/Footer";

interface Props {
  params: { slug: string };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = params;

  // 1. Fetch the product
  let product;
  try {
    product = await fetchProductBySlug(slug);
  } catch (err) {
    throw new Error(`Failed to load product for slug "${slug}": ${err}`);
  }

  // 2. Build image URLs
  const BASE_URL = "https://app.easy-orders.net";
  const formattedProduct = {
    ...product,
    thumb: product.thumb.startsWith("http")
      ? product.thumb
      : `${BASE_URL}${product.thumb}`,
    images: product.images.map((img) =>
      img.startsWith("http") ? img : `${BASE_URL}${img}`
    ),
    description: product.description || "", // Ensure description is a string
  };

  return (
    <>
      <Head>
        <title>{product.name} | My Store</title>
      </Head>
      <FirstDiscount />
      <Header />
      <ProductShell initialProduct={formattedProduct} />
      <DashedLine />
      <ProductSection1 />
      <DashedLine />
      <ReviewSection />
      <DashedLine />
      <ProductSection2 />
      <Footer />
    </>
  );
}
