import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card, CardContent, CardHeader } from "@/components/ui/card"





const TravelGridCardSkeleton = () => {
    return (
        <Card className="overflow-hidden border-none shadow-none rounded-none">
            <CardHeader className="p-0">
                <AspectRatio ratio={5 / 3}>
                    <div className="w-full h-full bg-zinc-300 animate-pulse rounded-lg"></div>
                </AspectRatio>
            </CardHeader>

            <CardContent className="p-4">
                {/* <div className="flex items-center justify-start gap-3 mb-2">
                    <div className="h-4 w-10 bg-zinc-300 animate-pulse rounded"></div>
                    <div className="h-4 w-24 bg-zinc-300 animate-pulse rounded"></div>
                </div> */}
                <div className="h-5 w-3/4 bg-zinc-300 animate-pulse rounded"></div>
            </CardContent>

            {/* <CardFooter className="p-4 pt-0">
                <div className="h-4 w-1/2 bg-zinc-300 animate-pulse rounded"></div>
            </CardFooter> */}
        </Card>
    )
}

export default TravelGridCardSkeleton
