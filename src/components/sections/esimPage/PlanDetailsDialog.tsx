"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
// import { SimCard } from "lucide-react";
import OptimizedImage from "@/components/common/OptimizedImage";
import { Globe, ArrowUpDown, Calendar, Tag, X, Info } from "lucide-react";
import TopUpPackages from "./TopUpPackages";
import Image from "next/image";
import Link from "next/link";

interface PlanDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  plan: any;
}

export default function PlanDetailsDialog({
  isOpen,
  onClose,
  plan,
}: PlanDetailsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border-none max-w-3xl w-full bg-white h-[95%] rounded-2xl p-0 overflow-y-auto scrollbar-hide flex flex-col">
        <DialogClose className="absolute right-4 top-4 z-50">
          <div className="rounded-full p-1 bg-white hover:bg-gray-100 transition-colors">
            <X className="h-5 w-5 text-gray-500" />
          </div>
        </DialogClose>

        {/* Plan Card Section */}
        <div className="w-full flex flex-col pt-8 bg-gradient-to-br from-[#058250] to-[#022f30]">
          <h2 className="text-2xl font-semibold text-center text-white">
            {plan?.packageName}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 ">
            {/* Image Card */}
            <div className="relative w-full  rounded-2xl shadow-lg overflow-hidden">
              <OptimizedImage src={plan?.imageUrl} alt={plan?.packageName} />
            </div>
            {/* Details Section */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex flex-col gap-4 w-full h-full justify-center">
                {/* Coverage */}
                <div className="flex items-center justify-between border-b border-white/20 pb-4">
                  <div className="flex items-center gap-2 text-white/80 uppercase text-xs tracking-widest">
                    <Globe className="w-5 h-5 text-white/80" />
                    Coverage
                  </div>
                  <div className="font-semibold text-lg text-white">
                    {plan?.coverage}
                  </div>
                </div>
                {/* Data */}
                <div className="flex items-center justify-between border-b border-white/20 pb-4">
                  <div className="flex items-center gap-2 text-white/80 uppercase text-xs tracking-widest">
                    <ArrowUpDown className="w-5 h-5 text-white/80" />
                    Data
                  </div>
                  <div className="font-semibold text-lg text-white">
                    {plan?.packageDetails?.data}
                  </div>
                </div>
                {/* Validity */}
                <div className="flex items-center justify-between border-b border-white/20 pb-4">
                  <div className="flex items-center gap-2 text-white/80 uppercase text-xs tracking-widest">
                    <Calendar className="w-5 h-5 text-white/80" />
                    Validity
                  </div>
                  <div className="font-semibold text-lg text-white">
                    {plan?.validity}
                  </div>
                </div>
                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white/80 uppercase text-xs tracking-widest">
                    <Tag className="w-5 h-5 text-white/80" />
                    Price
                  </div>
                  <div className="font-bold text-2xl text-white">
                    ${parseFloat(plan?.price).toFixed(2)} USD
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top-up Packages */}
        {plan?.topUpPackages && plan.topUpPackages.length > 0 && (
          <TopUpPackages packages={plan.topUpPackages} />
        )}

        {/* create element here */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Supported Countries */}
          <div className="bg-white rounded-xl shadow p-4 flex flex-col">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Supported Countries
            </h3>
            <div className="flex-1">
              {plan?.supportedCountries &&
              plan.supportedCountries.length > 0 ? (
                <div className="space-y-2">
                  {plan.supportedCountries.map(
                    (country: string, idx: number) => (
                      <div
                        key={country + idx}
                        className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2"
                      >
                        <span className="text-gray-700 font-medium">
                          {country}
                        </span>
                        {/* Flag: Use emoji fallback if needed */}
                        <span className="text-2xl ml-2">
                          {country === "Sri Lanka" ? (
                            <Image
                              src="https://flagcdn.com/32x24/lk.png"
                              alt="Sri Lanka flag"
                              width={32}
                              height={24}
                              className="w-8 h-6 object-cover rounded shadow"
                            />
                          ) : (
                            <span role="img" aria-label={country}>
                              🏳️
                            </span>
                          )}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              ) : (
                <div className="text-gray-400 text-center">
                  No supported countries listed.
                </div>
              )}
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-white rounded-xl shadow p-4 flex flex-col max-h-72 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Additional Information
            </h3>
            <div className="flex flex-col gap-3">
              {/* Network */}
              <div className="border-b pb-3 border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-500 uppercase font-semibold mb-1">
                  <Globe className="w-4 h-4" /> Network
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-700 font-medium">
                    {plan?.additionalInfo?.network || "-"}
                  </span>
                  {plan?.additionalInfo?.networkType && (
                    <span className="text-xs bg-gray-100 rounded px-2 py-0.5 text-gray-600 font-semibold">
                      {plan.additionalInfo.networkType}
                    </span>
                  )}
                </div>
              </div>
              {/* Plan Type */}
              <div className="border-b pb-3 border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-500 uppercase font-semibold mb-1">
                  <Tag className="w-4 h-4" /> Plan Type
                </div>
                <div className="text-gray-700 font-medium">
                  {plan?.additionalInfo?.planType || "-"}
                </div>
              </div>
              {/* Validity Policy */}
              <div className="border-b pb-3 border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-500 uppercase font-semibold mb-1">
                  <Calendar className="w-4 h-4" /> Validity Policy
                </div>
                <div className="text-gray-700 text-sm whitespace-pre-line">
                  {plan?.additionalInfo?.validityPolicy || "-"}
                </div>
              </div>
              {/* Other Info */}
              {plan?.additionalInfo?.otherInfo && (
                <div className="border-b pb-3 border-gray-100">
                  <div className="flex items-center gap-2 text-xs text-gray-500 uppercase font-semibold mb-1">
                    <Info className="w-4 h-4" /> Other Info
                  </div>
                  <div className="text-gray-700 text-sm whitespace-pre-line">
                    {plan.additionalInfo.otherInfo}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="sticky bottom-0 left-0 right-0">
          <div className="max-w-3xl w-full flex justify-between items-center px-6 py-4 bg-white shadow-lg rounded-t-2xl mx-auto">
            <div className="text-2xl font-bold text-gray-800">
              {plan?.price ? `$${parseFloat(plan.price).toFixed(2)} USD` : "-"}
            </div>
            <Link href={plan?.productUrl || ""} target="_blank">
              <button
                className="bg-gray-800 text-white font-bold text-lg rounded-lg px-12 py-3 shadow hover:bg-gray-700 transition-colors"
                type="button"
              >
                BUY
              </button>
            </Link>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
