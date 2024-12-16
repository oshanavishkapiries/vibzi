"use client";
import { breadcrumbLinks } from "@/mock/_breadcrumbLinks";
import { travelData } from "@/mock/_travelData";
import TourDetails from "../../../../components/sections/DetailPage/tour-details";
import Reviews from "../../../../components/sections/DetailPage/reviews";
import BentoGrid from "../../../../components/sections/DetailPage/BentoGrid";
import RecentSuggestions from "@/components/sections/DetailPage/RecentSuggestions";
import ImageGallery from "@/components/sections/DetailPage/ImageGallery";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useProductByIdQuery } from "@/services/productSlice";

const P = () => {
  const searchParams = useSearchParams();

  const [state, setState] = useState<any>({
    id: "",
  });

  useEffect(() => {
    const id = searchParams.get("id") || "";
    setState({ id });
  }, [searchParams]);

  const { data: ProductData } = useProductByIdQuery(state.id);

  console.log(ProductData);

  const pricing = {
    price: "$76.10",
    priceNote: "per person",
    cancellationPolicy: "Free cancellation + Unlimited reschedule",
    cancellationDetail:
      "up to 24 hours before the experience starts (local time)",
  };

  const bookingProvider = {
    logoSrc: "https://shorturl.at/i9EFb",
    name: "Viator",
    bookNowButtonLabel: "Reserve Now",
    poweredByLogoSrc: "https://shorturl.at/i9EFb",
  };

  return (
    <div className="container mx-auto min-h-screen mb-3">
      <RecentSuggestions
        breadcrumbLinks={breadcrumbLinks}
        title="Recent suggestions for you"
        reviews={250}
        rating={5}
        location="Bangkok, Thailand"
      />
      <ImageGallery
        images={travelData.slice(0, 10).map((item) => ({
          src: item.image_url,
          alt: item.title || "Travel image",
        }))}
        pricing={pricing}
        bookingProvider={bookingProvider}
      />
      <TourDetails textData={ProductData}/>
      <BentoGrid />
      <Reviews />
    </div>
  );
};

export default P;
