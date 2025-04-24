"use client";

import { useRef, useState } from "react";
import {
  Globe,
  Database,
  Calendar,
  DollarSign,
  X,
  FileText,
  Clock,
  Network,
} from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TopUpPackages from "./TopUpPackages";

// Country code mapping helper
const countryToCode: { [key: string]: string } = {
  Singapore: "SG",
  "United States": "US",
  Canada: "CA",
  "United Kingdom": "GB",
  France: "FR",
  Germany: "DE",
  Australia: "AU",
  Japan: "JP",
  UAE: "AE",
  "South Africa": "ZA",
  // Add more mappings as needed
};

const getCountryCode = (country: string): string => {
  return countryToCode[country] || "UN"; // UN as fallback for unknown countries
};

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
  const [hasReadToBottom, setHasReadToBottom] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const content = contentRef.current;
    if (!content) return;

    const scrollPercentage =
      content.scrollTop / (content.scrollHeight - content.clientHeight);
    if (scrollPercentage >= 0.99 && !hasReadToBottom) {
      setHasReadToBottom(true);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex flex-col gap-0 p-0 max-h-[min(640px,80vh)] max-w-lg md:min-w-[55%] [&>button:last-child]:hidden">
        {/* Custom Close Button */}
        <DialogClose className="absolute right-4 top-4 z-50">
          <div className="rounded-full p-1 hover:bg-gray-100 transition-colors">
            <X className="h-5 w-5 text-gray-500" />
          </div>
        </DialogClose>

        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            {plan?.packageName}
          </DialogTitle>
          <div
            ref={contentRef}
            onScroll={handleScroll}
            className="overflow-y-auto scrollbar-hide"
          >
            <div className="p-6 flex flex-col gap-6">
              {/* Plan Card */}
              <div className="bg-primary-50 rounded-2xl p-6 flex flex-col md:flex-row gap-6">
                {/* Image Section */}
                <div className="w-full md:w-1/2">
                  <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-purple-900 to-orange-400 aspect-[1.8/1]">
                    <Image
                      src={plan?.imageUrl}
                      alt={`${plan?.packageName} eSIM Plan`}
                      className="w-full h-full object-cover"
                      width={500}
                      height={250}
                    />
                  </div>
                </div>

                {/* Details Grid */}
                <div className="w-full md:w-1/2 flex flex-col justify-center gap-4">
                  {/* Coverage */}
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 flex items-center">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-600">COVERAGE</span>
                      <span className="font-semibold">{plan?.coverage}</span>
                    </div>
                  </div>

                  {/* Data */}
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 flex items-center">
                      <Database className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-600">DATA</span>
                      <span className="font-semibold">{plan?.packageDetails?.data}</span>
                    </div>
                  </div>

                  {/* Validity */}
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 flex items-center">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-600">VALIDITY</span>
                      <span className="font-semibold">{plan?.validity}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 flex items-center">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-600">PRICE</span>
                      <span className="font-semibold">${plan?.price} USD</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top-up Packages */}
              {plan?.topUpPackages && plan.topUpPackages.length > 0 && (
                <TopUpPackages packages={plan.topUpPackages} />
              )}

              {/* Supported Countries */}
              <div className="bg-white rounded-lg shadow-sm border">
                <h3 className="font-semibold text-lg p-4 border-b">
                  Supported Countries
                </h3>
                <div className="p-4 max-h-[300px] overflow-y-auto custom-scrollbar">
                  {plan?.supportedCountries?.map(
                    (country: string, index: number) => {
                      // Get country code for flag (assuming country names are full names)
                      const countryCode = getCountryCode(country);
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between py-2 border-b last:border-0"
                        >
                          <span className="text-gray-700">{country}</span>
                          <Image
                            src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`}
                            alt={`${country} flag`}
                            className="w-8 h-auto object-contain"
                            width={32}
                            height={24}
                          />
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-white rounded-lg shadow-sm border">
                <h3 className="font-semibold text-lg p-4 border-b">
                  Additional Information
                </h3>
                <div className="divide-y max-h-[400px] overflow-y-auto custom-scrollbar">
                  {/* Network */}
                  <div className="flex items-center p-4">
                    <div className="flex-1 flex items-center gap-3">
                      <Network className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs text-gray-500 uppercase">
                          Network
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-700 truncate">
                            {plan?.additionalInfo?.network}
                          </span>
                          <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded flex-shrink-0">
                            5G
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Plan Type */}
                  <div className="flex items-center p-4">
                    <div className="flex-1 flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs text-gray-500 uppercase">
                          Plan Type
                        </span>
                        <span className="text-gray-700 truncate">
                          {plan?.additionalInfo?.planType}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Validity Policy */}
                  <div className="flex items-center p-4">
                    <div className="flex-1 flex items-center gap-3">
                      <Clock className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs text-gray-500 uppercase">
                          Validity Policy
                        </span>
                        <span className="text-gray-700 text-sm truncate">
                          {plan?.additionalInfo?.validityPolicy}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </DialogHeader>
        <DialogFooter className="border-t px-6 py-4 sm:items-center">
          <span className="text-foreground font-bold grow max-sm:text-center">
            USD&nbsp;{plan?.price}
          </span>

          <DialogClose asChild>
            <Button
              className="bg-primary text-white"
              type="button"
              disabled={!hasReadToBottom}
              onClick={() => {
                window.location.href = plan?.productUrl || "";
              }}
            >
              <DollarSign className="w-4 h-4 mr-2" /> BUY NOW
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
