"use client";

import React, { useState } from "react";
import ProductGrid from "./ProductGrid";
import Pagination from "./Pagination";
import { DEFAULT_SEARCH_PARAMS } from "@/constants/initStates";
import { parseDateToISO } from "@/utils/parseDateToISO";
import { useSearchProductsQuery } from "@/services/productSlice";
import TravelGridCardSkeleton from "@/components/common/TravelGrid/travel-grid-card-skeleton";

const FoodAndDrinkSection = (props: any) => {
  const [page, setPage] = useState(1);

  const queryParams = {
    ...DEFAULT_SEARCH_PARAMS,
    startDate: parseDateToISO(
      props.state.startDate || DEFAULT_SEARCH_PARAMS.startDate
    ),
    endDate: parseDateToISO(
      props.state.endDate || DEFAULT_SEARCH_PARAMS.endDate
    ),
    destinationId: props.state.destinationId,
    page: page - 1,
    tags: [21911],
  };

  const {
    data: searchResults,
    isFetching,
    isError,
  } = useSearchProductsQuery(queryParams);

  if (isFetching) {
    return (
      <>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 15 }).map((_, index) => (
            <div key={`skeleton-${index}`} className="w-full">
              <TravelGridCardSkeleton />
            </div>
          ))}
        </div>
      </>
    );
  }

  if (isError || !searchResults?.data?.products?.length) {
    return <div></div>;
  }

  return (
    <div className="food-drink-section">
      <h2 className="text-2xl font-bold mb-4">Food and Drink Experiences</h2>
      <ProductGrid products={searchResults.data.products} />
      <Pagination
        currentPage={page}
        totalPages={searchResults.data.totalCount}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
};

export default FoodAndDrinkSection;
