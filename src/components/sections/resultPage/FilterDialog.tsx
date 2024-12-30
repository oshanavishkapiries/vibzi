"use client"

import * as React from "react"
import { Filter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function FilterDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] bg-gray-50">
        <DialogHeader>
          <DialogTitle>Filter Options</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Duration Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium leading-none">Duration</h3>
            <div className="space-y-2">
              {[
                "Up to 1 hour",
                "1 to 4 hours",
                "4 hours to 1 day",
                "1 to 3 days",
              ].map((duration) => (
                <div key={duration} className="flex items-center space-x-2">
                  <Checkbox id={duration.toLowerCase().replace(/\s+/g, "-")} />
                  <Label
                    htmlFor={duration.toLowerCase().replace(/\s+/g, "-")}
                    className="text-sm"
                  >
                    {duration}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Rating Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium leading-none">Rating</h3>
            <RadioGroup defaultValue="five-stars">
              <div className="space-y-2">
                {[
                  { id: "five-stars", label: "★★★★★", value: "5" },
                  { id: "four-stars", label: "★★★★☆ & up", value: "4" },
                  { id: "three-stars", label: "★★★☆☆ & up", value: "3" },
                ].map((rating) => (
                  <div key={rating.id} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={rating.id}
                      id={rating.id}
                      className="border-muted"
                    />
                    <Label htmlFor={rating.id} className="text-sm text-green-600">
                      {rating.label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Specials Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium leading-none">Specials</h3>
            <div className="space-y-2">
              {[
                "Deals & Discounts",
                "Free Cancellation",
                "Likely to Sell Out",
                "Skip-The-Line",
                "Private Tour",
                "New on Viator",
              ].map((special) => (
                <div key={special} className="flex items-center space-x-2">
                  <Checkbox id={special.toLowerCase().replace(/\s+/g, "-")} />
                  <Label
                    htmlFor={special.toLowerCase().replace(/\s+/g, "-")}
                    className="text-sm"
                  >
                    {special}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

