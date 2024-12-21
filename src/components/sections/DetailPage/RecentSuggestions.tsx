import { Star, StarHalf } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { calculateStarRatings } from "@/utils/rating";

type BreadcrumbLinkType = {
  href: string;
  label: string;
};

type RecentSuggestionsProps = {
  breadcrumbLinks?: BreadcrumbLinkType[];
  title?: string;
  reviews?: string;
  rating?: string;
  location?: string;
  isLoading?: boolean;
};

export default function RecentSuggestions({
  breadcrumbLinks = [],
  title = "",
  reviews = "",
  rating = "",
  location = "",
  isLoading = false,
}: RecentSuggestionsProps) {
  const { fullStars, halfStar, emptyStars } = calculateStarRatings(
    parseInt(rating)
  );

  return (
    <Card className="border-0 shadow-none py-2 px-[30px] md:px-[60px]">
      <CardContent className="p-0">
        {!isLoading && (
          <Breadcrumb className="mb-4">
            {breadcrumbLinks.map((link, index) => (
              <BreadcrumbItem key={index}>
                <BreadcrumbLink href={link.href}>{link.label}</BreadcrumbLink>
              </BreadcrumbItem>
            ))}
          </Breadcrumb>
        )}

        {!isLoading && (
          <>
            <h1 className="text-2xl font-semibold mb-4">{title}</h1>
            <div className="flex items-center gap-4">
              <div className="flex">
                {[...Array(fullStars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
                {halfStar && (
                  <StarHalf className="w-4 h-4 fill-primary text-primary" />
                )}
                {[...Array(emptyStars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-muted-foreground" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {reviews} reviews
              </span>
              <span className="text-sm text-muted-foreground">{location}</span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
