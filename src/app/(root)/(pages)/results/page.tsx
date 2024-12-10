"use client";

import TravelPortalGrid from "@/components/common/TravelPortalGrid";
import { useState } from "react";
import { ITravelData } from "@/types";
import { TravelGrid } from "@/components/common/TravelGrid";
import FilterClaude from "@/components/common/FilterClaude";
import { filters } from "@/mock/_filterData";
import { resultData } from "@/mock/_resultData";

export default function ResultsPage() {
  const [data, setdata] = useState<ITravelData[]>([]);

  setTimeout(() => {
    setdata(resultData);
  }, 2000);

  return (
    <div className="container mx-auto min-h-screen">
      <TravelPortalGrid
        travelData={data.slice(0, 10)}
        title={"2,000 Things to Do in Bangkok"}
      />
      <TravelPortalGrid travelData={data.slice(10, 20)} title={""}>
        <h1 className="scroll-m-20 text-2xl font-bold tracking-tight mb-3">
          Food & Drinks
        </h1>
        <FilterClaude filters={filters} />
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-3">
          80 Places for Food & Drinks
        </h4>
      </TravelPortalGrid>
      <TravelGrid travelData={data?.slice(10, 15)} title={""}>
        <h1 className="scroll-m-20 text-2xl font-bold tracking-tight mb-3">
          Attractions
        </h1>
        <FilterClaude filters={filters} />
      </TravelGrid>
      <TravelPortalGrid travelData={data.slice(19, 25)} title={""}>
        <h1 className="scroll-m-20 text-2xl font-bold tracking-tight mb-3">
          Near by destinations
        </h1>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-3">
          50 near by destinations
        </h4>
      </TravelPortalGrid>
    </div>
  );
}
