import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";

type ReviewsProps = {
  reviews: any;
  isLoading?: boolean;
};

export default function Reviews({ reviews, isLoading }: ReviewsProps) {
  const totalReviews = reviews?.totalReviews;
  const averageReviews = reviews?.averageReviews;
  const ratings = reviews?.ratings || [];

  return (
    <>
      <div className="max-w-7xl mx-auto py-2 ">
        <Card className="max-w-3xl mx-auto shadow-none border-none">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {isLoading ? <Skeleton className="h-6 w-32" /> : "Reviews"}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-10 w-20" />
                <div className="flex gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-5 w-5 rounded-full" />
                  ))}
                </div>
                <Skeleton className="h-4 w-40" />
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex flex-col items-center sm:items-start">
                  <div className="text-4xl font-bold">
                    {averageReviews.toFixed(1)}
                  </div>
                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.round(averageReviews)
                            ? "fill-primary text-primary"
                            : "text-muted-foreground"
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    ({totalReviews} reviews)
                  </div>
                </div>
                <div className="w-full space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Total review count and overall rating based on Viator and
                    Tripadvisor reviews
                  </p>
                  {ratings.map((rating: any) => {
                    const percentage = (rating.count / totalReviews) * 100 || 0;
                    return (
                      <div
                        key={rating.stars}
                        className="grid grid-cols-12 items-center gap-2"
                      >
                        <div className="col-span-2 text-sm text-muted-foreground">
                          {rating.stars} stars
                        </div>
                        <div className="col-span-8">
                          <Progress value={percentage} className="h-2" />
                        </div>
                        <div className="col-span-2 text-sm text-muted-foreground text-right">
                          {rating.count}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
