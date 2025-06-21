/* eslint-disable react/no-unescaped-entities */

import { Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import PricingDetails from "./PricingDetails";
import { IParseProductDeatils } from "@/types";

type TourDetailsProps = {
  textData: IParseProductDeatils | null;
  isLoading?: boolean;
};

export default function TourDetails({ textData, isLoading }: TourDetailsProps) {
  return (
    <div className="max-w-7xl mx-auto space-y-6 py-2 ">
      <div className="flex flex-row">
        <div className="w-full">
          <PricingDetails
            className="lg:hidden"
            price={textData?.pricing?.price || ""}
            currency={textData?.pricing?.priceNote || ""}
            perPerson={true}
            productLink={textData?.productUrl || ""}
            cancellationPolicy={textData?.pricing?.cancellationPolicy || ""}
            cancellationDetail={textData?.pricing?.cancellationDetail || ""}
            poweredByLogo={"https://shorturl.at/tGcTe"}
            loading={!textData}
          />

          {/* Overview */}
          <Card className="shadow-none border-none rounded-none">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <>
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                </>
              ) : (
                <>
                  <p>{textData?.description || "No description available"}</p>
                  {textData?.additionalInfo &&
                    textData?.additionalInfo.length > 0 && (
                      <ul className="space-y-2 list-disc pl-6">
                        {textData.additionalInfo.map(
                          (info: string, index: number) => (
                            <li key={index}>{info}</li>
                          ),
                        )}
                      </ul>
                    )}
                </>
              )}
            </CardContent>
          </Card>
          {/* What's Included */}
          <Card className="shadow-none border-none rounded-none">
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Inclusions Section */}
                <div>
                  {textData?.inclusions.length && (
                    <>
                      <h3 className="font-semibold text-lg mb-2">Inclusions</h3>
                      <div className="grid gap-2">
                        {isLoading
                          ? Array.from({ length: 4 }).map((_, index) => (
                              <Skeleton key={index} className="h-4 w-64" />
                            ))
                          : textData.inclusions.map(
                              (item: string, index: number) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2"
                                >
                                  <Check className="h-4 w-4 text-green-500" />

                                  <span>{item}</span>
                                </div>
                              ),
                            )}
                      </div>
                    </>
                  )}
                </div>

                {/* Exclusions Section */}
                <div>
                  {textData?.exclusions?.length && (
                    <>
                      <h3 className="font-semibold text-lg mb-2">Exclusions</h3>
                      <div className="grid gap-2">
                        {isLoading
                          ? Array.from({ length: 4 }).map((_, index) => (
                              <Skeleton key={index} className="h-4 w-64" />
                            ))
                          : textData.exclusions.map(
                              (item: string, index: number) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2"
                                >
                                  <X className="h-4 w-4 text-red-500" />

                                  <span>{item}</span>
                                </div>
                              ),
                            )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-1 w-2/5 hidden lg:block relative">
          <PricingDetails
            className={`top-[280px] left-0 sticky transform -translate-y-[15%]`}
            price={textData?.pricing?.price || ""}
            currency={textData?.pricing?.priceNote || ""}
            perPerson={true}
            productLink={textData?.productUrl || ""}
            cancellationPolicy={textData?.pricing?.cancellationPolicy || ""}
            cancellationDetail={textData?.pricing?.cancellationDetail || ""}
            poweredByLogo={"https://shorturl.at/tGcTe"}
            loading={!textData}
          />
        </div>
      </div>
    </div>
  );
}
