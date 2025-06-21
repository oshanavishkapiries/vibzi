"use client";
import TourDetails from "@/components/sections/DetailPage/tour-details";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useProductByIdQuery } from "@/store/api/product/productSlice";
import { parseProductDeatils } from "@/utils/parseProductDeatils";
import Reviews from "@/components/sections/DetailPage/reviews";
import VillaCard from "@/components/sections/DetailPage/detailsHero/VillaCard";
import { AdvanceSearch } from "@/components/common/Header/AdvanceSearch";

const DetailPage = () => {
  const searchParams = useSearchParams();

  const [state, setState] = useState<any>({
    id: "",
  });

  useEffect(() => {
    const id = searchParams.get("id") || "";
    setState({ id });
  }, [searchParams]);

  const { data: Product } = useProductByIdQuery(state.id);
  const ProductData = Product ? parseProductDeatils(Product) : null;

  return (
    <div className="container px-3 mx-auto min-h-screen mb-3">
      <div className="flex flex-row justify-between items-center p-3 lg:hidden">
        <AdvanceSearch />
      </div>
      <VillaCard isLoading={!ProductData} data={ProductData} />

      <TourDetails isLoading={!ProductData} textData={ProductData} />

      <Reviews isLoading={!ProductData} reviews={ProductData?.reviews} />
    </div>
  );
};

export default DetailPage;
