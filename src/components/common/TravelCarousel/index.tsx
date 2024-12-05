import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ITravelData } from "@/types";
import { TravelCard } from "./travel-card";
import TravelCardSkeleton from "./travel-card-skeleton";

export function TravelCarousel({
  travelData,
  title,
}: {
  travelData: ITravelData[];
  title: string;
}) {
  const skeletonCards = Array.from({ length: 12 });

  return (
    <div className="w-full px-[60px] py-3">
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-3">
        {title}
      </h4>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="flex gap-2">
          {travelData.length === 0
            ? skeletonCards.map((_, index) => (
                <CarouselItem
                  key={`skeleton-${index}`}
                  className="w-full basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5  "
                >
                  <TravelCardSkeleton />
                </CarouselItem>
              ))
            : travelData.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="w-full basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <TravelCard
                    imageSrc={item.image_url}
                    rating={item.rating}
                    reviews={item.reviews}
                    title={item.title}
                    price={item.price}
                  />
                </CarouselItem>
              ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
