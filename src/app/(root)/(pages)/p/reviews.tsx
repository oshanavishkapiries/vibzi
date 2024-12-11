import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";

export default function Reviews() {
  const ratings = [
    { stars: 5, count: 2697, percentage: (2697 / 2963) * 100 },
    { stars: 4, count: 194, percentage: (194 / 2963) * 100 },
    { stars: 3, count: 37, percentage: (37 / 2963) * 100 },
    { stars: 2, count: 24, percentage: (24 / 2963) * 100 },
    { stars: 1, count: 11, percentage: (11 / 2963) * 100 },
  ];

  return (
    <div className="max-w-7xl mx-auto py-2 px-[30px] md:px-[60px]">
      <Card className="max-w-3xl mx-auto shadow-none border-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Reviews</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex flex-col items-center sm:items-start">
              <div className="text-4xl font-bold">5.0</div>
              <div className="flex gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-primary text-primary"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                (2,963 reviews)
              </div>
            </div>
            <div className="w-full space-y-3">
              <p className="text-sm text-muted-foreground">
                Total review count and overall rating based on Viator and
                Tripadvisor reviews
              </p>
              {ratings.map((rating) => (
                <div
                  key={rating.stars}
                  className="grid grid-cols-12 items-center gap-2"
                >
                  <div className="col-span-2 text-sm text-muted-foreground">
                    {rating.stars} stars
                  </div>
                  <div className="col-span-8">
                    <Progress value={rating.percentage} className="h-2" />
                  </div>
                  <div className="col-span-2 text-sm text-muted-foreground text-right">
                    {rating.count}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
