import { CommonCard, CommonCardSkelton } from "@/components/common/CommonCard";
import React from "react";

const DestinationGrid = ({ products }: { products: any[] }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {products?.map((product, index) => (
        <div key={index} className="w-full">
          <CommonCard
            id={product.id}
            imageSrc={product.image_url}
            rating={product.rating}
            reviews={product.reviews}
            title={product.title}
            price={product.price}
          />
        </div>
      ))}
    </div>
  );
};

export default DestinationGrid;

export const DestinationGridSkelton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
      {Array.from({ length: 15 }).map((_, index) => (
        <div key={`skeleton-${index}`} className="w-full">
          <CommonCardSkelton />
        </div>
      ))}
    </div>
  );
};
