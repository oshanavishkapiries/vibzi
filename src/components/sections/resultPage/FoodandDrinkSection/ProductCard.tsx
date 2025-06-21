import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import OptimizedImage from "@/components/common/OptimizedImage";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface ProductCardProps {
  product: {
    title: string;
    images: any[];
    pricing: {
      summary: { price: number };
      currency: string;
    };
    reviews: {
      totalReviews: number;
      averageReviews: number;
    };
    productUrl: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const imageUrl =
    product.images?.[0]?.variants?.find((variant: any) => variant.width === 200)
      ?.url || "https://via.placeholder.com/200";

  return (
    <a
      href={product.productUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <Card className="shadow-none border-none cursor-pointer overflow-hidden">
        <CardHeader className="relative p-0 w-full aspect-square">
          <OptimizedImage src={imageUrl} alt={product.title} />
        </CardHeader>
        <CardContent className="p-4 ps-1">
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-primary text-primary" />

              <span>{product.reviews.averageReviews.toFixed(1)}</span>
            </Badge>
            <span className="text-sm text-muted-foreground">
              ({product.reviews.totalReviews.toLocaleString()} reviews)
            </span>
          </div>
          <h3 className="font-semibold text-base line-clamp-2 mb-2 truncate">
            {product.title}
          </h3>
          <p className="text-sm font-medium">
            From {product.pricing.currency} {product.pricing.summary.price}
          </p>
          <p className="text-xs text-muted-foreground">
            Price varies by group size
          </p>
        </CardContent>
      </Card>
    </a>
  );
};

export default ProductCard;

export const ProductCardSkelton = () => {
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
