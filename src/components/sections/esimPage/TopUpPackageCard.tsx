"use client";

import { Database, Calendar, DollarSign } from "lucide-react";

interface TopUpPackage {
  packageName: string;
  data: string;
  validity: string;
  price: string;
}

interface TopUpPackageCardProps {
  package: TopUpPackage;
}

export default function TopUpPackageCard({ package: pkg }: TopUpPackageCardProps) {
  return (
    <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-primary/20 rounded-2xl p-6 h-full">
      {/* Static gradient overlay */}
      
      <div className="relative flex flex-col gap-4 z-10">
        {/* Package Name */}
        <h4 className="font-semibold text-lg">{pkg.packageName}</h4>
        
        {/* Data */}
        <div className="flex items-center gap-4">
          <div className="w-6 h-6 flex items-center">
            <Database className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-600">DATA</span>
            <span className="font-semibold">{pkg.data}</span>
          </div>
        </div>
        
        {/* Validity */}
        <div className="flex items-center gap-4">
          <div className="w-6 h-6 flex items-center">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-600">VALIDITY</span>
            <span className="font-semibold">{pkg.validity}</span>
          </div>
        </div>
        
        {/* Price */}
        <div className="flex items-center gap-4">
          <div className="w-6 h-6 flex items-center">
            <DollarSign className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-600">PRICE</span>
            <span className="font-semibold">${pkg.price} USD</span>
          </div>
        </div>
      </div>
    </div>
  );
} 