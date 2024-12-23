import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import OptimizedImage from "@/components/common/TravelCarousel/OptimizedImage";

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
    product.images?.[0]?.variants?.find((variant: any) => variant.width === 200)?.url ||
    "https://via.placeholder.com/200";

  return (
    <a
      href={product.productUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <Card className="shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
        <CardHeader className="relative p-0 w-full aspect-square">
          <OptimizedImage
            src={imageUrl}
            alt={product.title}
          />
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <span className="text-green-600 font-medium">
              ★ {product.reviews.averageReviews.toFixed(1)}
            </span>
            <span className="ml-2 text-muted-foreground">
              ({product.reviews.totalReviews.toLocaleString()})
            </span>
          </div>
          <h3 className="font-semibold text-lg line-clamp-2 mb-2 truncate">
            {product.title}
          </h3>
          <p className="text-base font-medium">
            From {product.pricing.currency} {product.pricing.summary.price}
          </p>
          <p className="text-sm text-muted-foreground">
            Price varies by group size
          </p>
        </CardContent>
      </Card>
    </a>
  );
};

export default ProductCard;
