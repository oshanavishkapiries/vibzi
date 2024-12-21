"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import TravelPortalGrid from "@/components/common/TravelPortalGrid";
import { useSearchProductsQuery } from "@/services/productSlice";
import { SearchState } from "@/types";
import { parseDateToISO } from "@/utils/parseDateToISO";
import { DEFAULT_SEARCH_PARAMS } from "@/constants/initStates";
import { parseProduct } from "@/utils/parseProduct";
import Pagination from "@/components/sections/resultPage/Pagination";

export default function ResultsPage() {
  const searchParams = useSearchParams();

  const [state, setState] = useState<SearchState>({
    startDate: "",
    endDate: "",
    destinationId: "",
    page: 1
  });

  const [allProducts, setAllProducts] = useState<any[]>([]);

  useEffect(() => {
    const destinationId = searchParams.get("des_id") || "";
    const startDate = searchParams.get("from") || "";
    const endDate = searchParams.get("to") || "";
    const page = parseInt(searchParams.get("page") || "1");
    setState({ startDate, endDate, destinationId, page });
  }, [searchParams]);

  const queryParams = {
    ...DEFAULT_SEARCH_PARAMS,
    startDate: parseDateToISO(
      state.startDate || DEFAULT_SEARCH_PARAMS.startDate
    ),
    endDate: parseDateToISO(state.endDate || DEFAULT_SEARCH_PARAMS.endDate),
    destinationId: state.destinationId,
    page: state.page - 1 
  };

  const {
    data: searchResults,
    isFetching,
    isError,
  } = useSearchProductsQuery(queryParams);

  useEffect(() => {
    if (searchResults) {
      const parsedProducts = parseProduct(searchResults);
      setAllProducts(parsedProducts);
    }
    if (isFetching) {
      setAllProducts([]);
    }
  }, [searchResults, isFetching]);

  const router = useRouter();
  const handlePageChange = (newPage : any) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="container mb-8 mx-auto min-h-screen">
    {!isError ? (
      <>
        <TravelPortalGrid travelData={allProducts} title={``} />
        <Pagination
          currentPage={state.page}
          totalPages={searchResults?.data?.totalCount || 1}
          onPageChange={handlePageChange}
        />
      </>
    ) : (
      <div className="w-full px-[30px] md:px-[60px] py-3">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-3">
          No results found
        </h4>
      </div>
    )}
  </div>
  );
}
