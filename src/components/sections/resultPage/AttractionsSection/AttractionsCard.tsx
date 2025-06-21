import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import OptimizedImage from "@/components/common/OptimizedImage";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from "lucide-react";

interface ImageVariant {
  height: number;
  width: number;
  url: string;
}

interface AttractionImage {
  caption: string;
  variants: ImageVariant[];
  cover: boolean;
}

interface AttractionsCardProps {
  product: {
    attractionId: number;
    name: string;
    primaryDestinationId: number;
    description: string;
    destinationName: string;
    productsCount: number;
    reviews: {
      totalReviews: number;
      averageReviews: number;
    };
    images: AttractionImage[];
  };
}

const AttractionsCard: React.FC<AttractionsCardProps> = ({ product }) => {
  const imageUrl =
    product.images?.[0]?.variants?.find((variant) => variant.width === 480)
      ?.url || "https://via.placeholder.com/480x320";

  return (
    <div className="block">
      <Card className="shadow-none border-none cursor-pointer overflow-hidden h-full">
        <CardHeader className="relative p-0 w-full aspect-video">
          <OptimizedImage src={imageUrl} alt={product.name} />
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {product.reviews.totalReviews > 0 && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-primary text-primary" />

                  <span>{product.reviews.averageReviews.toFixed(1)}</span>
                </Badge>
              )}
              {product.reviews.totalReviews > 0 && (
                <span className="text-sm text-muted-foreground">
                  ({product.reviews.totalReviews.toLocaleString()} reviews)
                </span>
              )}
            </div>
          </div>
          <h3 className="font-semibold text-base line-clamp-2 mb-2">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 text-muted-foreground mb-2">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{product.destinationName}</span>
          </div>
          <div
            className="text-xs text-muted-foreground line-clamp-3"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AttractionsCard;

export const AttractionsCardSkelton = () => {
  return (
    <div className="block">
      <Card className="shadow-none border-none cursor-pointer overflow-hidden">
        {/* Image Skeleton */}
        <CardHeader className="relative p-0 w-full aspect-square bg-muted animate-pulse">
          <div className="w-full h-full bg-gray-300"></div>
        </CardHeader>
        {/* Content Skeleton */}
        <CardContent className="p-4 space-y-3">
          {/* Badge Skeleton */}
          <div className="flex items-center space-x-2">
            <Badge
              variant="secondary"
              className="w-16 h-6 bg-muted animate-pulse"
            ></Badge>
            <span className="text-sm bg-muted h-4 w-20 animate-pulse rounded"></span>
          </div>
          {/* Title Skeleton */}
          <div className="h-6 bg-muted animate-pulse rounded w-3/4"></div>
          {/* Price Skeleton */}
          <div className="h-5 bg-muted animate-pulse rounded w-1/2"></div>
          {/* Additional Text Skeleton */}
          <div className="h-4 bg-muted animate-pulse rounded w-2/3"></div>
        </CardContent>
      </Card>
    </div>
  );
};
