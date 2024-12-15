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
  breadcrumbLinks: BreadcrumbLinkType[];
  title: string;
  reviews: number;
  rating: number;
  location: string;
};

export default function RecentSuggestions({
  breadcrumbLinks,
  title,
  reviews,
  rating,
  location,
}: RecentSuggestionsProps) {
  const { fullStars, halfStar, emptyStars } = calculateStarRatings(rating);

  return (
    <Card className="border-0 shadow-none py-2 px-[30px] md:px-[60px]">
      <CardContent className="p-0">
        <Breadcrumb className="mb-4">
          {breadcrumbLinks.map((link, index) => (
            <BreadcrumbItem key={index}>
              <BreadcrumbLink
                href={link.href}
                className={`text-sm text-muted-foreground hover:text-foreground ${
                  index == breadcrumbLinks.length - 1 ? "text-foreground" : ""
                }`}
              >
                {`${index !== 0 ? " / " : ""}${link.label}`}
              </BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array(fullStars)
                .fill(null)
                .map((_, i) => (
                  <Star
                    key={`full-${i}`}
                    className="w-4 h-4 fill-primary text-primary"
                  />
                ))}
              {halfStar && (
                <StarHalf className="w-4 h-4 fill-primary text-primary" />
              )}
              {Array(emptyStars)
                .fill(null)
                .map((_, i) => (
                  <Star
                    key={`empty-${i}`}
                    className="w-4 h-4 text-muted-foreground"
                  />
                ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {reviews} Reviews
            </span>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">{location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
