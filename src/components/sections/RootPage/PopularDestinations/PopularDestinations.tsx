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
            key={destination.id}
            href={`/results?des=${destination.name}&des_id=${destination.destinationId}`}
            className="overflow-hidden"
          >
            <div className="w-full aspect-video">
              <OptimizedImage
                src={destination.imageUrl}
                alt={destination.name}
              />
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold">{destination.name}</h3>
              <p className="text-sm text-gray-600">{destination.type}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularDestinations;
