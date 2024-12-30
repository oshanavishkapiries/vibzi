"use client";

import Banner from "@/components/common/Banner";
import FAQSection from "@/components/common/FAQSection";
import PopularDestinations from "@/components/sections/RootPage/PopularDestinations/PopularDestinations";

export default function Home() {

  

  return (
    <>
      <div className="container px-3 mx-auto min-h-screen">
        <Banner />
        <PopularDestinations />
        <FAQSection />
      </div>
    </>
  );
}
