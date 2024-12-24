"use client";
import TourDetails from "../../../../components/sections/DetailPage/tour-details";
import BentoGrid from "../../../../components/sections/DetailPage/BentoGrid";
import RecentSuggestions from "@/components/sections/DetailPage/RecentSuggestions";
import ImageGallery from "@/components/sections/DetailPage/ImageGallery";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useProductByIdQuery } from "@/services/productSlice";
import { parseProductDeatils } from "@/utils/parseProductDeatils";
import Reviews from "@/components/sections/DetailPage/reviews";

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
      <RecentSuggestions
        isLoading={!ProductData}
        breadcrumbLinks={[]}
        title={ProductData?.title}
        reviews={ProductData?.reviews.totalReviews}
        rating={ProductData?.reviews.averageReviews}
        location={ProductData?.timeZone}
      />
      <ImageGallery
        images={ProductData?.images}
        pricing={ProductData?.pricing}
        bookingProvider={ProductData?.bookingProvider}
        productUrl={ProductData?.productUrl}
        isLoading={!ProductData}
      />
      <TourDetails isLoading={!ProductData} textData={ProductData} />
      <BentoGrid isLoading={!ProductData} images={ProductData?.images} />;
      <Reviews isLoading={!ProductData} reviews={ProductData?.reviews} />
    </div>
  );
};

export default DetailPage;
