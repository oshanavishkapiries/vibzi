"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import OptimizedImage from "@/components/common/TravelCarousel/OptimizedImage";


interface ImageGalleryProps {
  images: {
    src: string;
    alt: string;
  }[];
  pricing: {
    price: string;
    priceNote: string;
    cancellationPolicy: string;
    cancellationDetail: string;
  };
  bookingProvider: {
    logoSrc: string;
    name: string;
    bookNowButtonLabel: string;
    poweredByLogoSrc: string;
  };
}

export default function ImageGallery({
  images,
  pricing,
  bookingProvider,
}: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = React.useState(0);

  const maxThumbnails = images.length > 5 ? 4 : 5;
  const showMoreCount = images.length - maxThumbnails;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[100px_1fr_300px] lg:gap-6 py-2 px-[30px] md:px-[60px]">
      {/* Thumbnail sidebar */}
      <div className="order-2 flex gap-2 overflow-auto lg:order-1 lg:flex-col lg:overflow-visible p-1">
        {images.slice(0, maxThumbnails).map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={cn(
              "relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md lg:h-[100px] lg:w-[100px]",
              selectedImage === index &&
                "ring-2 ring-offset-2 ring-offset-gray-700 ring-white"
            )}
          >
            <OptimizedImage src={image.src} alt={image.alt} />
          </button>
        ))}
        {showMoreCount > 0 && (
          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-black/50 lg:h-[100px] lg:w-[100px]">
            <div
              className="absolute inset-0 flex items-center justify-center text-xl font-medium text-white bg-black/70"
              onClick={() => setSelectedImage(maxThumbnails)}
            >
              +{showMoreCount}
            </div>
          </div>
        )}
      </div>

      {/* Main image */}
      <div className="relative order-1 w-full h-full min-h-[400px] overflow-hidden rounded-lg lg:order-2">
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-500 ease-in-out",
            "opacity-100"
          )}
        >
          <OptimizedImage
            key={images[selectedImage].src}
            src={images[selectedImage].src}
            alt={images[selectedImage].alt}
          />
        </div>
      </div>

      {/* Booking card */}
      <Card className="order-3">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Powered By</p>
              <Image
                src={bookingProvider.poweredByLogoSrc}
                alt={bookingProvider.name}
                width={120}
                height={40}
                className="dark:invert"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline justify-between">
                <div className="space-y-1">
                  <p className="text-2xl font-semibold">From {pricing.price}</p>
                  <p className="text-sm text-muted-foreground">
                    {pricing.priceNote}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Prices vary by group size
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 p-6 pt-0">
          <div className="space-y-2 flex flex-row gap-2 items-center">
            <p className="text-sm font-semibold">Book this item on</p>
            <Image
              src={bookingProvider.logoSrc}
              alt={bookingProvider.name}
              width={100}
              height={30}
              className="h-3 w-auto"
            />
          </div>
          <Button className="w-full bg-[#004F32] hover:bg-[#004F32]/90">
            {bookingProvider.bookNowButtonLabel}
          </Button>
          <div className="space-y-2 rounded-lg bg-muted/50 p-4">
            <p className="font-medium">{pricing.cancellationPolicy}</p>
            <p className="text-sm text-muted-foreground">
              {pricing.cancellationDetail}
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
