/* eslint-disable react/no-unescaped-entities */

import { Clock, Phone, Globe, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type TourDetailsProps = {
  textData: any;
  isLoading?: boolean;
};

export default function TourDetails({ textData, isLoading }: TourDetailsProps) {
  return (
    <div className="max-w-7xl mx-auto space-y-6 py-2 px-[30px] md:px-[60px]">
      {/* Tour Quick Info */}
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        {isLoading ? (
          <>
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-32" />
          </>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{textData.timeZone || "Duration unknown"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>Mobile Ticket</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>Offered in: {textData.language || "Unknown"}</span>
            </div>
          </>
        )}
      </div>

      {/* Overview */}
      <Card className="shadow-none border-none">
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
              <p>{textData.description || "No description available"}</p>
              {textData.additionalInfo &&
                textData.additionalInfo.length > 0 && (
                  <ul className="space-y-2 list-disc pl-6">
                    {textData.additionalInfo.map(
                      (info: string, index: number) => (
                        <li key={index}>{info}</li>
                      )
                    )}
                  </ul>
                )}
            </>
          )}
        </CardContent>
      </Card>

      {/* What's Included */}
      <Card className="shadow-none border-none">
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {/* Inclusions Section */}
            <div>
              {textData?.inclusions.length > 0 && (
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
                          )
                        )}
                  </div>
                </>
              )}
            </div>

            {/* Exclusions Section */}
            <div>
              {textData?.exclusions.length > 0 && (
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
                          )
                        )}
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Meeting and Pickup */}
      {/* <Card className="shadow-none border-none">
        <CardHeader>
          <CardTitle>Meeting and Pickup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {isLoading ? (
            <Skeleton className="h-16 w-full" />
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="font-semibold">Meeting Point</h3>
                <p>{textData?.meetingPoint || "Location unavailable"}</p>
                <Button variant="outline" className="mt-2">
                  Open in Google Maps
                </Button>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">End Point</h3>
                <p>{textData?.endPoint || "Location unavailable"}</p>
                <Button variant="outline" className="mt-2">
                  Open in Google Maps
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card> */}

      {/* What to Expect */}
      {/* <Card className="shadow-none border-none">
        <CardHeader>
          <CardTitle>What to Expect</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <>
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </>
          ) : (
            <p>{textData?.whatToExpect || "Details unavailable"}</p>
          )}
        </CardContent>
      </Card> */}
    </div>
  );
}
