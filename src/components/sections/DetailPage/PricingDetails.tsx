import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PricingDetailsProps {
  price: string;
  currency: string;
  perPerson: boolean;
  cancellationPolicy: string;
  cancellationDetail: string;
  poweredByLogo: string;
  loading: boolean;
  productLink: string;
  className?: string;
}

const PricingDetails: React.FC<PricingDetailsProps> = ({
  price,
  currency,
  perPerson,
  cancellationPolicy,
  cancellationDetail,
  poweredByLogo,
  loading,
  productLink,
  className,
}) => {
  if (loading) {
    return (
      <div
        className={`w-full space-y-6 p-4 rounded-xl border bg-card text-card-foreground shadow ${className}`}
      >
        <div className="space-y-2">
          <div className="h-5 bg-gray-300 rounded w-3/4 animate-pulse"></div>
          <div className="h-5 bg-gray-300 rounded w-1/2 animate-pulse"></div>
        </div>
        <div className="h-5 bg-gray-300 rounded animate-pulse"></div>
        <div className="h-5 bg-gray-300 rounded animate-pulse"></div>
        <div className="flex justify-center items-center gap-2">
          <div className="h-5 bg-gray-300 rounded w-32 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full space-y-6 p-4 rounded-xl border bg-card text-card-foreground shadow ${className}`}
    >
      {/* Pricing Section */}
      <div className="space-y-2">
        <div className="flex flex-col items-baseline gap-1">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-semibold">from {currency}</span>
            <span className="text-3xl font-bold">
              {Number(price).toFixed(2)}
            </span>
          </div>

          {perPerson && (
            <span className="text-base text-muted-foreground">per person</span>
          )}
        </div>
      </div>

      {/* Button */}
      <Link target="_blank" href={productLink}>
        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white mt-3 py-6 text-lg font-medium">
          Check Availability
        </Button>
      </Link>

      {/* Cancellation Policy */}
      <div className="bg-emerald-50 p-4 rounded-lg">
        <div className="flex gap-2">
          <Check className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />

          <div>
            <span className="font-medium underline">{cancellationPolicy}</span>{" "}
            <span className="text-muted-foreground">{cancellationDetail}</span>
          </div>
        </div>
      </div>

      {/* Powered By */}
      <div className="flex justify-center items-center gap-2">
        <h2>Powered by</h2>
        <Image
          src={poweredByLogo}
          alt="Powered by Logo"
          width={180}
          height={50}
          className="w-[50px]"
        />
      </div>
    </div>
  );
};

export default PricingDetails;
