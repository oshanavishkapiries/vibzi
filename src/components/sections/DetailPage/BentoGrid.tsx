"use client";
import OptimizedImage from "@/components/common/OptimizedImage";
import { Skeleton } from "@/components/ui/skeleton";
import "react-photo-view/dist/react-photo-view.css";
import { PhotoProvider, PhotoView } from "react-photo-view";

type BentoGridProps = {
  images: { small: string; big: string }[] | undefined;
  isLoading?: boolean;
};

export default function BentoGrid({ images, isLoading }: BentoGridProps) {
  return (
    <div className="max-w-7xl mx-auto " id="TravelerPhotos">
      <h2 className="text-lg font-semibold mb-4">Traveler Photos</h2>
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <PhotoProvider>
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="relative aspect-video overflow-hidden rounded-md"
                >
                  <Skeleton className="h-full w-full" />
                </div>
              ))
            : images?.map((image, index) => (
                <PhotoView key={index} src={image.big}>
                  <div
                    className={`relative aspect-video overflow-hidden rounded-md ${
                      index === 0 ? "col-span-2 row-span-2" : ""
                    }`}
                  >
                    <OptimizedImage
                      src={image.big}
                      alt={`Traveler photo ${index + 1}`}
                    />
                  </div>
                </PhotoView>
              ))}
        </PhotoProvider>
      </div>
    </div>
  );
}
