"use client";
import React, { useEffect, useState } from "react";
import Pagination from "../Pagination";
import {
  DEFAULT_SEARCH_PARAMS,
  DEFAULT_SEARCH_STATE_FREE_TEXT,
} from "@/constants/initStates";
import { parseDateToISO } from "@/utils/parseDateToISO";
import { useSearchProductsQuery } from "@/services/productSlice";
import { parseProduct } from "@/utils/parseProduct";
import DestinationGrid, { DestinationGridSkelton } from "./DestinationGrid";

const DestinatioDetails = (props: any) => {
  const [allProducts, setAllProducts] = useState<any[]>([]);

  const queryParams = {
    ...DEFAULT_SEARCH_PARAMS,
    startDate: parseDateToISO(
      props.state.startDate || DEFAULT_SEARCH_PARAMS.startDate
    ),
    endDate: parseDateToISO(
      props.state.endDate || DEFAULT_SEARCH_PARAMS.endDate
    ),
    destinationId: props.state.destinationId,
    searchQuery: props.state.destination,
    page: props.state.page - 1,
  };

  const queryParamsFreeText = {
    ...DEFAULT_SEARCH_STATE_FREE_TEXT,
    startDate: parseDateToISO(
      props.state.startDate || DEFAULT_SEARCH_STATE_FREE_TEXT.startDate
    ),
    endDate: parseDateToISO(
      props.state.endDate || DEFAULT_SEARCH_STATE_FREE_TEXT.endDate
    ),
    searchQuery: props.state.destination,
    page: props.state.page,
  };

  const {
    data: searchResults,
    isFetching,
    isError,
  } = useSearchProductsQuery(
    props.state.destinationId ? queryParams : queryParamsFreeText
  );

  useEffect(() => {
    const parsedProducts = parseProduct(searchResults);
    setAllProducts(parsedProducts);
  }, [searchResults]);

  if (isFetching) {
    return <DestinationGridSkelton />;
  }

  if (isError || !(allProducts.length > 0)) {
    return <></>;
  }

  const destination = props?.state?.destination;
  return (
    <div className="food-drink-section">
      <h2 className="text-2xl font-bold mb-4">{ destination && `Things to Do in ${destination}`}</h2>
      <DestinationGrid products={allProducts} />
      <Pagination
        currentPage={props.state.page}
        totalPages={searchResults?.data?.totalCount || 1}
        onPageChange={props.onPageChange}
      />
    </div>
  );
};

export default DestinatioDetails;
