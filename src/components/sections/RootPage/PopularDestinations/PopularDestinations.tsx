"use client";
import OptimizedImage from "@/components/common/OptimizedImage";
import { usePopularDestinationQuery } from "@/services/destinationSlice";
import Link from "next/link";
import React from "react";

interface IDestination {
  id: string;
  destinationId: string;
  name: string;
  type: string;
  destinationUrl: string;
  imageUrl: string;
}

const PopularDestinations = () => {
  const {
    data: destinationList,
    isError,
    isFetching,
  } = usePopularDestinationQuery({});

  if (isError || isFetching || !(destinationList.length > 0)) {
    return <></>;
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Popular Destinations</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {destinationList.map((destination: IDestination) => (
          <Link
          prefetch={true}
            key={destination.id}
            href={`/results?des=${destination.name}&des_id=${destination.destinationId}`}
            className="relative overflow-hidden group rounded-lg"
          >
            <div className="w-full aspect-video">
              <OptimizedImage
                src={destination.imageUrl}
                alt={destination.name}
              
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300"></div>
              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                <h3 className="text-lg font-semibold text-white">{destination.name}</h3>
                <p className="text-sm text-gray-200">{destination.type}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularDestinations;
