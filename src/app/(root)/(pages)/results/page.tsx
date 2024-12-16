"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import TravelPortalGrid from "@/components/common/TravelPortalGrid";
import FilterClaude from "@/components/common/FilterClaude";
import { useSearchProductsQuery } from "@/services/productSlice";
import { filters } from "@/mock/_filterData";
import { SearchState } from "@/types";
import { parseDateToISO } from "@/utils/parseDateToISO";
import { DEFAULT_SEARCH_PARAMS } from "@/constants/initStates";
import { parseProduct } from "@/utils/parseProduct";
import { useInView } from "react-intersection-observer";
import TravelCardSkeleton from "@/components/common/TravelCarousel/travel-card-skeleton";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const { ref, inView } = useInView();

  const [state, setState] = useState<SearchState>({
    startDate: "",
    endDate: "",
    destinationId: "",
  });

  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState<any[]>([]);

  useEffect(() => {
    const destinationId = searchParams.get("des_id") || "";
    const startDate = searchParams.get("from") || "";
    const endDate = searchParams.get("to") || "";
    setState({ startDate, endDate, destinationId });
  }, [searchParams]);

  const queryParams = {
    ...DEFAULT_SEARCH_PARAMS,
    startDate: parseDateToISO(
      state.startDate || DEFAULT_SEARCH_PARAMS.startDate
    ),
    endDate: parseDateToISO(state.endDate || DEFAULT_SEARCH_PARAMS.endDate),
    destinationId: state.destinationId,
    page,
    size: 10,
  };

  const {
    data: searchResults,
    isFetching,
    isError,
  } = useSearchProductsQuery(queryParams);

  useEffect(() => {
    if (searchResults) {
      const parsedProducts = parseProduct(searchResults);

      setAllProducts((prev) =>
        page === 1 ? parsedProducts : [...prev, ...parsedProducts]
      );
    }
  }, [searchResults, page]);

  useEffect(() => {
    if (inView && !isFetching) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, isFetching]);

  return (
    <div className="container mb-8 mx-auto min-h-screen">
      <FilterClaude className="mx-[30px] md:mx-[60px]" filters={filters} />

      {!isError ? (
        <TravelPortalGrid travelData={allProducts} title={``} />
      ) : (
        <div className="w-full px-[30px] md:px-[60px] py-3">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-3">
            No results found
          </h4>
        </div>
      )}

      <div
        ref={ref}
        className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-[30px] md:px-[60px] py-3"
      >
        {isFetching &&
          Array.from({ length: 10 }).map((_, index) => (
            <div key={`skeleton-${index}`} className="w-full">
              <TravelCardSkeleton />
            </div>
          ))}
      </div>
    </div>
  );
}
