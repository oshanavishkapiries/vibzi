"use client";

import Banner from "@/components/common/Home/Banner";
import Faq from "@/components/common/Home/Faq";
import { AdvanceSearch } from "@/components/common/Header/AdvanceSearch";
import Carosel from "@/components/sections/RootPage/Carosel";
import PopularDestinations from "@/components/sections/RootPage/PopularDestinations/PopularDestinations";

export default function Home() {
  return (
    <div className="min-h-screen w-full relative">
      <div className="w-full h-auto relative z-0">
        <div className="bg-black/30 w-full h-full absolute top-0 left-0 z-10 flex flex-col space-y-5 justify-center items-center p-3">
          <h1 className="text-white text-5xl font-bold">
            Find your next destination.
          </h1>
          <div className="h-auto w-full  lg:w-2/5  justify-center items-center">
            <AdvanceSearch />
          </div>
        </div>
        <Carosel />
      </div>
      <div className="container p-3 max-w-7xl mx-auto min-h-screen">
        {/* <PopularDestinations /> */}
        <Banner />
        <PopularDestinations />
        <Faq />
      </div>
    </div>
  );
}
