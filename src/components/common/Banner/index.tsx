import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Banner() {
  return (
    <div className="w-full ">
      <div className="w-full bg-primary/25 p-4 rounded-lg shadow-md flex flex-col md:flex-row gap-4 items-center">
        <div className="w-full h-full lg:w-1/3">
          <Image
            src="https://t3.ftcdn.net/jpg/03/82/24/44/360_F_382244401_FNIivSDbE7ojw5sT70WYVgmFsw2R7DHD.webp"
            alt="banner img"
            className="rounded-lg object-cover w-full h-full"
            width={500}
            height={500}
          />
        </div>
        <div className="w-full lg:w-2/3 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            Find best experiences on Vibzi
          </h2>
          <p className="text-gray-600 my-3 mr-8">
            Beaches are made up of a variety of materials, including sand, pebbles, rocks, seashell fragments, seaweed
            Beaches are made up of a variety of materials
          </p>
          <Button variant="default" className="self-start rounded-full">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  )
}

