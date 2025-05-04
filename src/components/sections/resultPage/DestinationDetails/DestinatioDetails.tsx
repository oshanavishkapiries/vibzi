"use client";
import React, { useEffect, useState } from "react";
import Pagination from "../Pagination";
import {
  DEFAULT_SEARCH_PARAMS,
  DEFAULT_SEARCH_STATE_FREE_TEXT,
} from "@/constants/initStates";
import { parseDateToISO } from "@/utils/parseDateToISO";
import { useSearchProductsQuery } from "@/store/api/product/productSlice";
import { parseProduct } from "@/utils/parseProduct";
import DestinationGrid, { DestinationGridSkelton } from "./DestinationGrid";
import NotFound from "@/components/common/NotFound";

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
    page: props.state.page - 1,
    tags: props.state.categoryId ? [props.state.categoryId] : null,
    flags: props.state.flag ? [props.state.flag] : null,
    highestPrice: props.state.priceTo ? parseFloat(props.state.priceTo) : 0,
    lowestPrice: props.state.priceFrom ? parseFloat(props.state.priceFrom) : 0,
    durationInMinutes: props.state.duration
      ? {
          from: props.state.duration.split("-")[0],
          to: props.state.duration.split("-")[1],
        }
      : null,
    rating: props.state.rating
      ? {
          from: 1,
          to: props.state.rating,
        }
      : null,
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
    return <NotFound title="No Destination Found" />;
  }

  const destination = props?.state?.destination;

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-xl font-bold mb-4">
        {destination && `Things to Do in ${destination}`}
      </h2>
      <DestinationGrid products={allProducts} />
      <Pagination
        currentPage={props.state.page}
        totalCount={searchResults?.data?.products?.totalCount}
        onPageChange={props.onPageChange}
      />
    </div>
  );
};

export default DestinatioDetails;
