import { Calendar, MapPin, Users, Upload } from "lucide-react";
import OptimizedImage from "@/components/common/OptimizedImage";
import { CircleDialog } from "./circle-dialog";
import { Button } from "@/components/ui/button";
//import { ShareTripDialog } from "./share-trip-dialog";
import { ImageUploadDialog } from "./image-upload-dialog";

interface ITravelCardProps {
  src: string;
  alt: string;
  title: string;
  dateRange: string;
  location: string;
}

const TravelCard = ({
  src,
  alt,
  title,
  dateRange,
  location,
}: ITravelCardProps) => {
  return (
    <>
      <div className="relative overflow-hidden rounded-lg">
        <div className="relative overflow-hidden rounded-lg h-[180px] md:h-[280px]">
          <OptimizedImage src={src} alt={alt} />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary via-transparent to-transparent" />

          <div className="absolute bottom-0 p-6 text-white w-full">
            <h2 className="text-2xl font-bold mb-3">{title}</h2>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Calendar className="w-4 h-4" />
                {dateRange}
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold">
                <MapPin className="w-4 h-4" />
                {location}
              </div>
            </div>

            <div className="absolute bottom-0 right-0 flex justify-end gap-2 p-6 max-md:hidden">
              <CircleDialog>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 rounded-full px-4 py-2 bg-white text-black border border-gray-300 shadow-sm hover:bg-gray-50"
                >
                  <Users className="w-4 h-4" />
                  <span className="font-medium">Circle</span>
                </Button>
              </CircleDialog>
              {/* <ShareTripDialog
                     tripName={title}
                     shareUrl={"www.tripadvisor.com"}
                    >
                     <Button
                       variant="outline"
                       className="rounded-full p-0 w-10 h-10 flex items-center justify-center bg-white text-black border border-gray-300 shadow-sm hover:bg-gray-50"
                     >
                       <Share2 className="w-5 h-5" />
                     </Button>
                    </ShareTripDialog> */}
              <ImageUploadDialog>
                <Button
                  variant="outline"
                  className="rounded-full p-0 w-10 h-10 flex items-center justify-center bg-white text-black border border-gray-300 shadow-sm hover:bg-gray-50"
                >
                  <Upload className="w-5 h-5" />
                </Button>
              </ImageUploadDialog>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-auto flex justify-center gap-3 items-center md:hidden p-3">
        <CircleDialog>
          <Button
            variant="outline"
            className="flex items-center gap-2 rounded-full px-4 py-2 bg-white text-black border border-gray-300 shadow-sm hover:bg-gray-50"
          >
            <Users className="w-4 h-4" />
            <span className="font-medium">Circle</span>
          </Button>
        </CircleDialog>
        {/* <ShareTripDialog tripName={title} shareUrl={"www.tripadvisor.com"}>
               <Button
                 variant="outline"
                 className="rounded-full p-0 w-10 h-10 flex items-center justify-center bg-white text-black border border-gray-300 shadow-sm hover:bg-gray-50"
               >
                 <Share2 className="w-5 h-5" />
               </Button>
              </ShareTripDialog> */}
        <ImageUploadDialog>
          <Button
            variant="outline"
            className="rounded-full p-0 w-10 h-10 flex items-center justify-center bg-white text-black border border-gray-300 shadow-sm hover:bg-gray-50"
          >
            <Upload className="w-5 h-5" />
          </Button>
        </ImageUploadDialog>
      </div>
    </>
  );
};

export default TravelCard;
