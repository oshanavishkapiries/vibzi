import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Banner() {
  return (
    <div className="w-full ">
      <div className="w-full bg-[#EDEFEF] p-4 rounded-lg shadow-md flex flex-col md:flex-row gap-4 items-center">
        <div className="w-full h-full lg:w-1/3">
          <Image
            src="/banner_img.jpg"
            alt="banner img"
            className="rounded-lg object-cover w-full h-full"
            width={500}
            height={500}
          />
        </div>
        <div className="w-full lg:w-2/3 flex flex-col justify-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Effortless Travel Planning at Your Fingertips!
          </h2>
          <p className="text-gray-600 my-3 mr-8">
            Flights, hotels, itineraries, transport, packing lists, and more
            Vibzi keeps your entire trip in sync so you can focus
            on the adventure
          </p>
          <Link href="/my-trips">
            <Button variant="default" className="self-start rounded-full">
              Plan Your Trip
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
