import React from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { Region } from "./EsimTabs";

interface RegionCardProps {
  region: Region;
  onClick?: () => void;
}

const RegionCard = ({ region, onClick }: RegionCardProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 group"
    >
      <div className="flex items-center gap-4">
        <div className="relative w-8 h-8 grayscale group-hover:grayscale-0 transition-all duration-200">
          <Image
            src={"/placeholder.webp"}
            alt={`${region.imageUrl} icon`}
            width={32}
            height={32}
            className="object-contain"
          />
        </div>
        <span className="text-gray-800 font-medium text-lg">{region.name}</span>
      </div>
      <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-200 group-hover:translate-y-0.5" />
    </button>
  );
};

export default RegionCard;
