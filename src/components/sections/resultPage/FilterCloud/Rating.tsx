import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, Star } from "lucide-react";
import { Label } from "@/components/ui/label";

const ratingOptions = [
  { value: "5", label: "5 stars" },
  { value: "4", label: "4 stars" },
  { value: "3", label: "3 stars" },
  { value: "2", label: "2 stars" },
  { value: "1", label: "1 star" },
];

interface RatingProps {
  value?: string;
  onChange?: (value: string) => void;
}

const Rating = ({ onChange }: RatingProps) => {
  const [open, setOpen] = React.useState(false);
  const [selectedRating, setSelectedRating] = React.useState<string>("");

  const handleCheckboxChange = (value: string) => {
    setSelectedRating(value === selectedRating ? "" : value);
    onChange?.(value === selectedRating ? "" : value);
    setOpen(false);
  };

  const getButtonLabel = () => {
    if (!selectedRating) return "Rating";
    return `${selectedRating} ${selectedRating === "1" ? "Star" : "Stars"}`;
  };

  const renderStars = (count: number) => {
    return Array(count)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          size={16}
          className="fill-yellow-400 text-yellow-400"
        />
      ));
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-full shadow-md">
          <Star size={16} className="mr-2" />
          {getButtonLabel()}
          <ChevronDown
            className="-me-1 ms-2 opacity-60"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-4">
        <div className="space-y-4">
          {ratingOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={option.value}
                checked={selectedRating === option.value}
                onCheckedChange={() => handleCheckboxChange(option.value)}
              />

              <Label
                htmlFor={option.value}
                className="flex items-center space-x-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <span className="flex">
                  {renderStars(parseInt(option.value))}
                </span>
              </Label>
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Rating;
