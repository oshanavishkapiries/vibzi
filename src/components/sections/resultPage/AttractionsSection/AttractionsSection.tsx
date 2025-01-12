"use client";

import React, { useState } from "react";

import Pagination from "../Pagination";
import { DEFAULT_SEARCH_STATE_FREE_TEXT } from "@/constants/initStates";
import { parseDateToISO } from "@/utils/parseDateToISO";
import { useSearchProductsQuery } from "@/services/productSlice";
import AttractionsGrid, { AttractionsGridSkelton } from "./AttractionsGrid";

const AttractionsSection = (props: any) => {
  const [page, setPage] = useState(1);

  const queryParamsFreeText = {
    ...DEFAULT_SEARCH_STATE_FREE_TEXT,
    startDate: parseDateToISO(
      props.state.startDate || DEFAULT_SEARCH_STATE_FREE_TEXT.startDate
    ),
    endDate: parseDateToISO(
      props.state.endDate || DEFAULT_SEARCH_STATE_FREE_TEXT.endDate
    ),
    searchQuery: props.state.destination,
    page: page,
    attraction: true,
    destination: false,
  };

  const {
    data: searchResults,
    isFetching,
    isError,
  } = useSearchProductsQuery(queryParamsFreeText);

  if (isFetching) {
    return <AttractionsGridSkelton />;
  }

  if (isError || !(searchResults?.data?.attractions?.results?.length > 0)) {
    return <></>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Attractions</h2>
      <AttractionsGrid products={searchResults.data.attractions.results} />
      <Pagination
        currentPage={page}
        totalCount={searchResults?.data?.attractions?.totalCount}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
};

export default AttractionsSection;
