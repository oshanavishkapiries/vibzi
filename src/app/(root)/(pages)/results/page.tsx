"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SearchState } from "@/types";
import FoodandDrinkSection from "@/components/sections/resultPage/FoodandDrinkSection/FoodandDrinkSection";
import DestinatioDetails from "@/components/sections/resultPage/DestinationDetails/DestinatioDetails";
import { useRouter } from "next/navigation";
import FilterMenu from "@/components/sections/resultPage/FilterMenu";
import AttractionsSection from "@/components/sections/resultPage/AttractionsSection/AttractionsSection";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [state, setState] = useState<SearchState>({
    startDate: "",
    endDate: "",
    destinationId: "",
    page: 1,
    destination: "",
  });

  useEffect(() => {
    const destinationId = searchParams.get("des_id") || "";
    const startDate = searchParams.get("from") || "";
    const endDate = searchParams.get("to") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const destination = searchParams.get("des") || "";
    setState({ startDate, endDate, destinationId, page, destination });
  }, [searchParams]);

  const handlePageChange = (newPage: any) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="container px-3 mx-auto min-h-screen mb-8">
      <FilterMenu />
      <DestinatioDetails state={state} onPageChange={handlePageChange} />
      <FoodandDrinkSection state={state} />
      <AttractionsSection state={state} />
    </div>
  );
}
