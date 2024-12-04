"use client";

import Banner from "@/components/common/Banner";
import Header from "@/components/common/Header";
import { TravelCarousel } from "@/components/common/TravelCarousel";
import { travelData } from "@/mock/_travelData";
import { ITravelData } from "@/types";
import { useState } from "react";


export default function Home() {
  const [data, setdata] = useState<ITravelData[]>([])



  setTimeout(() => {
    setdata(travelData)
  }, 2000)

  return (
    <div className="container mx-auto min-h-screen">
      <Header />
      <TravelCarousel travelData={data} title={"Recent suggestions for you"} />
      <TravelCarousel travelData={data} title={"Trending on Vibzi"} />
      <Banner />
      <TravelCarousel travelData={data} title={"Recent suggestions for you"} />
      <TravelCarousel travelData={data} title={"Trending on Vibzi"} />
    </div>
  );
}
