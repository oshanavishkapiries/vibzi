"use client";

import Banner from "@/components/common/Banner";
import FAQSection from "@/components/common/FAQSection";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { TravelCarousel } from "@/components/common/TravelCarousel";
import { TravelGrid } from "@/components/common/TravelGrid";
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
      <Header />
      <div className="container mx-auto min-h-screen">
        <TravelCarousel
          travelData={data}
          title={"Recent suggestions for you"}
        />
        <TravelCarousel travelData={data} title={"Trending on Vibzi"} />
        <Banner />
        <TravelGrid travelData={data} title={"Popular Destinations"} />
        <FAQSection />
      </div>
      <Footer />
    </>
  );
}
