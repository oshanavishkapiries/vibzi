"use client";

import React, { useState } from "react";
import ProductGrid, { ProductGridSkelton } from "./ProductGrid";
import Pagination from "../Pagination";
import { DEFAULT_SEARCH_PARAMS } from "@/constants/initStates";
import { parseDateToISO } from "@/utils/parseDateToISO";
import { useSearchProductsQuery } from "@/services/productSlice";

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

  const { data: searchResults, isFetching , isError } =
    useSearchProductsQuery(queryParams);

  if (isFetching) {
    return <ProductGridSkelton />;
  }

  if(isError || !(searchResults?.data?.products?.results?.length > 0)){
    return <></>;
  }



  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Food and Drink Experiences</h2>
      <ProductGrid products={searchResults.data.products.results} />
      <Pagination
        currentPage={page}
        totalCount={searchResults?.data?.products?.totalCount}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
};

export default FoodAndDrinkSection;
