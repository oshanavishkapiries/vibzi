import React from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Country } from "./EsimTabs";

interface CountryCardProps {
  country: Country;
  onClick?: () => void;
}

const CountryCard = ({ country, onClick }: CountryCardProps) => {
  console.log(country);
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3">
        <div className="relative w-8 h-6">
          <Image
            src={country.imageUrl || "/placeholder.webp"}
            alt={`${country.name} flag`}
            sizes="100vw"
            fill
            className="object-cover rounded"
          />
        </div>
        <span className="text-gray-800 font-medium">{country.name}</span>
      </div>
      <ChevronDown className="w-5 h-5 text-gray-400" />
    </button>
  );
};

export default CountryCard;
