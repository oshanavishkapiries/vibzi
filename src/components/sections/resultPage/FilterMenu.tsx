"use client";

import * as React from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown } from "lucide-react";

export default function FilterMenu() {
  const [priceRange, setPriceRange] = React.useState([1, 100]);
  const [timeOfDay, setTimeOfDay] = React.useState<string[]>([]);
  const [languages, setLanguages] = React.useState<string[]>([]);

  const categories = [
    "Art and culture",
    "Entertainment",
    "Food and drink",
    "Sports",
    "Tours",
    "Sightseeing",
    "Wellness",
    "Sports",   
  ];

  const timeSlots = [
    { id: "morning", label: "Morning", description: "Starts before 12 pm" },
    { id: "afternoon", label: "Afternoon", description: "Starts after 12 pm" },
    { id: "evening", label: "Evening", description: "Starts after 5 pm" },
  ];

  const languageOptions = [
    "English",
    "French",
    "German",
    "Japanese",
    "Italian",
    "Russian",
    "Spanish",
    "Chinese (Simplified)",
    "Arabic",
    "Hindi",
    "Portuguese",
    "Turkish",
    "Indonesian",
    "Dutch",
    "Korean",
    "Bengali",
  ];

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              Price <ChevronDown className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4 p-2">
              <p className="text-sm text-muted-foreground">
                The average price of an experience is $50.
              </p>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={100}
                min={1}
                step={1}
              />
              <div className="flex justify-between">
                <div className="text-sm">
                  Minimum
                  <div className="text-lg font-bold">${priceRange[0]}</div>
                </div>
                <div className="text-sm text-right">
                  Maximum
                  <div className="text-lg font-bold">${priceRange[1]}+</div>
                </div>
              </div>
              <div className="flex justify-between pt-4">
                <Button variant="ghost" onClick={() => setPriceRange([1, 100])}>
                  Clear
                </Button>
                <Button>Save</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              Time of day <ChevronDown className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4 p-2">
              {timeSlots.map((slot) => (
                <div key={slot.id} className="flex items-start space-x-2">
                  <Checkbox
                    id={slot.id}
                    checked={timeOfDay.includes(slot.id)}
                    onCheckedChange={(checked) => {
                      setTimeOfDay(
                        checked
                          ? [...timeOfDay, slot.id]
                          : timeOfDay.filter((t) => t !== slot.id)
                      );
                    }}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor={slot.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {slot.label}
                    </label>
                    <p className="text-sm text-muted-foreground">
                      {slot.description}
                    </p>
                  </div>
                </div>
              ))}
              <div className="flex justify-between pt-4">
                <Button variant="ghost" onClick={() => setTimeOfDay([])}>
                  Clear
                </Button>
                <Button>Save</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              Language offered <ChevronDown className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4 p-2">
                {languageOptions.map((language) => (
                  <div key={language} className="flex items-center space-x-2">
                    <Checkbox
                      id={language}
                      checked={languages.includes(language)}
                      onCheckedChange={(checked) => {
                        setLanguages(
                          checked
                            ? [...languages, language]
                            : languages.filter((l) => l !== language)
                        );
                      }}
                    />
                    <label
                      htmlFor={language}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {language}
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="flex justify-between p-4 border-t">
              <Button variant="ghost" onClick={() => setLanguages([])}>
                Clear
              </Button>
              <Button>Save</Button>
            </div>
          </PopoverContent>
        </Popover>

        <ScrollArea className="w-px flex-1">
          <div className="flex space-x-2">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </ScrollArea>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              Filters <ChevronDown className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
             no content
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
