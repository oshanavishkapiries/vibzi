import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Banner() {
  return (
    <div className="w-full px-[60px] py-3">
      <div className="bg-primary/20 rounded-2xl p-4 flex items-center gap-8">
        <div className="relative w-1/3 h-52 flex-shrink-0">
          <Image
            src="https://media.cnn.com/api/v1/images/stellar/prod/230516112548-01-crossroads-maldives-aerial.jpg"
            alt="Aerial view of a beach with turquoise water"
            fill
            className="rounded-xl object-cover"
            priority
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold">
            Find best experiences on Vibzi
          </h1>
          <p className="text-gray-600 max-w-xl">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
          <Button 
            className="bg-[#004D40] hover:bg-[#00695C] text-white rounded-full px-8 font-medium"
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  )
}

