"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SearchState } from "@/types";
import FoodandDrinkSection from "@/components/sections/resultPage/FoodandDrinkSection/FoodandDrinkSection";
import DestinatioDetails from "@/components/sections/resultPage/DestinationDetails/DestinatioDetails";
import { useRouter } from "next/navigation";
import AttractionsSection from "@/components/sections/resultPage/AttractionsSection/AttractionsSection";
import FilterCloud from "@/components/sections/resultPage/FilterCloud/FilterCloud";
import { AdvanceSearch } from "@/components/common/Header/AdvanceSearch";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [state, setState] = useState<SearchState>({
    startDate: "",
    endDate: "",
    destinationId: "",
    page: 1,
    destination: "",
    categoryId: "",
    priceFrom: "",
    priceTo: "",
    duration: "",
    rating: "",
    flag: "",
  });



  useEffect(() => {
    const destinationId = searchParams.get("des_id") || "";
    const startDate = searchParams.get("from") || "";
    const endDate = searchParams.get("to") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const destination = searchParams.get("des") || "";
    const categoryId = searchParams.get("cat") || "";
    const priceFrom = searchParams.get("pri_from") || "";
    const priceTo = searchParams.get("pri_to") || "";
    const duration = searchParams.get("dur") || "";
    const rating = searchParams.get("rat") || "";
    const flag = searchParams.get("flag") || "";

    setState({
      startDate,
      endDate,
      destinationId,
      page,
      destination,
      categoryId,
      priceFrom,
      priceTo,
      duration,
      rating,
      flag,
    });
  }, [searchParams]);

 

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="container px-3 mx-auto min-h-screen mb-8">
      <div className="flex flex-row justify-between items-center px-3 py-6 max-w-4xl mx-auto">
        <AdvanceSearch />
      </div>
      <FilterCloud />
      <DestinatioDetails state={state} onPageChange={handlePageChange} />
      <FoodandDrinkSection state={state} />
      <AttractionsSection state={state} />
    </div>
  );
}
