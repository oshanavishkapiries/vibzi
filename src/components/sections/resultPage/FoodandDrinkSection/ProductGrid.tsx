import React from "react";
import ProductCard, { ProductCardSkelton } from "./ProductCard";

const ProductGrid = ({ products }: { products: any[] }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {products?.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;

export const ProductGridSkelton = () => {
  return (
    <div className="grid gap-4 grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 max-w-7xl mx-auto">
      {Array.from({ length: 15 }).map((_, index) => (
        <div key={`skeleton-${index}`} className="w-full">
          <ProductCardSkelton />
        </div>
      ))}
    </div>
  );
};
