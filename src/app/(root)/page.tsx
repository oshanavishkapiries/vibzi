"use client";

import Banner from "@/components/common/Banner";
import FAQSection from "@/components/common/FAQSection";
import FilterClaude from "@/components/common/FilterClaude";
import { TravelCarousel } from "@/components/common/TravelCarousel";
import { TravelGrid } from "@/components/common/TravelGrid";
import { filters } from "@/mock/_filterData";
import { travelData } from "@/mock/_travelData";
import { ITravelData } from "@/types";
import { useState } from "react";

export default function Home() {
  const [data, setdata] = useState<ITravelData[]>([]);

  setTimeout(() => {
    setdata(travelData);
  }, 2000);

  return (
    <>
      <div className="container mx-auto min-h-screen">
        <TravelCarousel
          travelData={data}
          title={"Recent suggestions for you"}
        />
        <TravelCarousel travelData={data} title={""}>
          <h1 className="scroll-m-20 text-2xl font-bold tracking-tight mb-3">
            Trending on Vibzi
          </h1>
        </TravelCarousel>
        <Banner />
        <TravelGrid travelData={data} title={""}>
          <h1 className="scroll-m-20 text-2xl font-bold tracking-tight mb-3">
            Popular Destinations
          </h1>
          <FilterClaude filters={filters} />
        </TravelGrid>
        <FAQSection />
      </div>
    </>
  );
}
