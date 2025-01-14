import Image from "next/image";
import { Star } from "lucide-react";
import { IParseProductDeatils } from "@/types";
import ShowAllImage from "./ShowAllImage";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import TicketInfo from "./TicketInfo";

const VillaCard: React.FC<{
  data: IParseProductDeatils | null;
  isLoading: boolean;
}> = ({ data, isLoading }) => {
  return (
    <div className="max-w-7xl mx-auto p-4 space-y-4">
      {/* Title */}
      <h1 className="text-xl md:text-2xl font-semibold">
        {isLoading ? (
          <div className="h-6 bg-gray-300 rounded-md w-3/4 animate-pulse"></div>
        ) : (
          data?.title
        )}
      </h1>

      {/* Image Gallery */}
      <div className="relative">
        <PhotoProvider>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
            {/* Main large image */}
            <div className="md:col-span-2 row-span-2 relative min-h-[300px]">
              {isLoading ? (
                <div className="h-full bg-gray-300 rounded-lg animate-pulse"></div>
              ) : (
                <PhotoView src={data?.images[0]?.big}>
                  <Image
                    src={data?.images[0]?.big || "/placeholder.svg"}
                    alt={data?.images[0]?.big || "Villa exterior"}
                    className="rounded-lg object-cover hover:opacity-90 transition-opacity cursor-pointer"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </PhotoView>
              )}
            </div>

            {/* Additional Images */}
            {isLoading
              ? Array(4)
                  .fill(null)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="hidden md:block relative aspect-[4/3] bg-gray-300 rounded-lg animate-pulse"
                    ></div>
                  ))
              : data?.images.slice(1, 5).map((image, index) => (
                  <PhotoView key={index} src={image.big}>
                    <div className="hidden md:block relative aspect-[4/3] cursor-pointer">
                      <Image
                        src={image.big}
                        alt={`Image ${index + 1}`}
                        className="rounded-lg object-cover hover:opacity-90 transition-opacity"
                        fill
                        sizes="25vw"
                      />
                    </div>
                  </PhotoView>
                ))}
          </div>
        </PhotoProvider>

        {!isLoading && <ShowAllImage images={data?.images} />}
      </div>

      <TicketInfo />

      {/* Details Section */}
      <div className="space-y-2">
        <h2 className="text-xl font-medium">
          {isLoading ? (
            <div className="h-5 bg-gray-300 rounded-md w-2/3 animate-pulse"></div>
          ) : (
            `${data?.timeZone}`
          )}
        </h2>

        <div className="flex items-center gap-2">
          {isLoading ? (
            <div className="h-4 bg-gray-300 rounded-md w-1/4 animate-pulse"></div>
          ) : (
            <>
              <Star className="h-4 w-4 fill-current" />
              <span className="font-medium">
                {data?.reviews?.averageReviews
                  ? parseFloat(data?.reviews?.averageReviews).toFixed(1)
                  : 0}
              </span>
              <span className="text-muted-foreground underline cursor-pointer">
                {data?.reviews?.totalReviews} reviews
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VillaCard;
