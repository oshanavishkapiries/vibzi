import React from "react";
import AttractionsCard, { AttractionsCardSkelton } from "./AttractionsCard";


const AttractionsGrid = (props:any) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {props.products?.map((product:any, index:number) => (
        <AttractionsCard key={index} product={product} />
      ))}
    </div>
  );
};

export default AttractionsGrid;

export const AttractionsGridSkelton = () => {
  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 max-w-7xl mx-auto">
      {Array.from({ length: 15 }).map((_, index) => (
        <div key={`skeleton-${index}`} className="w-full">
          <AttractionsCardSkelton />
        </div>
      ))}
    </div>
  );
};
