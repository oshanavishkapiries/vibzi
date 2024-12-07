import { Star } from 'lucide-react'
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import OptimizedImage from "./OptimizedImage"


interface TravelCardProps {
  imageSrc: string
  rating: number
  reviews: number
  title: string
  price: string
}

export function TravelCard({ imageSrc, rating, reviews, title, price }: TravelCardProps) {
  return (
    <Card className="overflow-hidden border-none shadow-none rounded-none cursor-pointer">
      <CardHeader className="p-0">
        <AspectRatio ratio={3 / 4}>
          <OptimizedImage
            src={imageSrc}
            alt={title}
          />
        </AspectRatio>
      </CardHeader>

      <CardContent className="p-4 ps-0">
        <div className="flex items-center justify-start gap-3 mb-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-primary text-primary" />
            <span>{rating.toFixed(2)}</span>
          </Badge>
          <span className="text-sm text-muted-foreground">({reviews.toLocaleString()} reviews)</span>
        </div>
        <h3 className="font-semibold text-md truncate">{title}</h3>
      </CardContent>

      <CardFooter className="p-4 pt-0 ps-0">
        <p className="text-sm">
          from <span className="font-semibold">{price.toLocaleString()}</span> / Person
        </p>
      </CardFooter>

    </Card>
  )
}

