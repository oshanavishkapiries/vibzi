"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import TopUpPackageCard from "./TopUpPackageCard";

interface TopUpPackage {
  packageName: string;
  data: string;
  validity: string;
  price: string;
}

interface TopUpPackagesProps {
  packages: TopUpPackage[];
}

export default function TopUpPackages({ packages }: TopUpPackagesProps) {
  return (
    <div className="w-full px-[40px]">
      <h3 className="text-lg font-semibold mb-4">
        Available TopUp Packages&nbsp;
        {"("}
        {packages.length}
        {")"}
      </h3>
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {packages.map((pkg, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <TopUpPackageCard package={pkg} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
}
