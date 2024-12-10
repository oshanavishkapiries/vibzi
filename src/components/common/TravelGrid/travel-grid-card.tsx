/* eslint-disable @typescript-eslint/no-unused-vars */
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import OptimizedImage from "./OptimizedImage";
import Link from "next/link";

interface TravelCardProps {
  imageSrc: string;
  rating: number;
  reviews: number;
  title: string;
  price: string;
}

export function TravelGridCard({
  imageSrc,
  rating,
  reviews,
  title,
  price,
}: TravelCardProps) {
  return (
    <Link href={"/p/"}>
      <Card className="overflow-hidden border-none shadow-none rounded-none cursor-pointer">
        <CardHeader className="p-0">
          <AspectRatio ratio={5 / 3}>
            <OptimizedImage src={imageSrc} alt={title} />
          </AspectRatio>
        </CardHeader>

        <CardContent className="p-4">
          <h3 className="font-semibold text-md truncate">{title}</h3>
        </CardContent>
      </Card>
    </Link>
  );
}
