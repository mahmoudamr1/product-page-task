// components/ProductsSectionTitle.tsx
import React from "react";
import "./ProductsSectionTitle.css";

interface ProductsSectionTitleProps {
  title: string;
  actionText: string;
  onActionClick?: () => void;
}

const ProductsSectionTitle: React.FC<ProductsSectionTitleProps> = ({
  title,
  actionText,
  onActionClick,
}) => {
  return (
    <div className="main-product-section-title flex items-center justify-between gap-4 w-full">
      <div className="Related-Product">{title}</div>
      <div className="View-All cursor-pointer" onClick={onActionClick}>
        {actionText}
      </div>
    </div>
  );
};

export default ProductsSectionTitle;
