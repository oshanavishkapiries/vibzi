import Image from "next/image"
import { Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function TripPlanner() {
  const dates = ["13", "14", "15", "16", "17", "18", "19"]

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Trips</h1>
        <Button variant="outline" className="gap-2">
          <Plus className="h-4 w-4" />
          Create a new trip
        </Button>
      </div>

      <div className="relative overflow-hidden rounded-lg">
        <div className="relative h-[200px] md:h-[300px]">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1maf4RQdLuFTjvrWcOa0xoEJUdQdUE.png"
            alt="Vietnam coastline"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">Trip to Vietnam</h2>
            <p className="text-sm">Jan 13 - Jan 20</p>
          </div>
        </div>
      </div>

      <Input 
        placeholder="What is this about? (optional)" 
        className="max-w-md"
      />

      <Tabs defaultValue="itinerary" className="w-full">
        <TabsList>
          <TabsTrigger value="checklist">Checklist</TabsTrigger>
          <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
          <TabsTrigger value="attachments">Attachments</TabsTrigger>
        </TabsList>
        <TabsContent value="itinerary" className="space-y-6">
          <div className="flex gap-2 overflow-x-auto py-4">
            {dates.map((date) => (
              <Button
                key={date}
                variant="outline"
                className="rounded-full min-w-[80px]"
              >
                Jan {date}
              </Button>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Monday, Jan 13</h3>
            <div className="grid gap-4">
              {[1, 2].map((i) => (
                <Card key={i} className="p-4">
                  <div className="flex gap-4">
                    <div className="relative h-20 w-32 flex-shrink-0">
                      <Image
                        src="/placeholder.svg"
                        alt="The Grand Palace"
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">The Grand Palace</h4>
                      <p className="text-sm text-muted-foreground">
                        {i === 1 ? "This is" : "ThisDescri..."}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

