import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, Clock } from "lucide-react";
import { Label } from "@/components/ui/label";

const durationOptions = [
  { value: "0-60", label: "Up to 1 hour" },
  { value: "60-240", label: "1 to 4 hours" },
  { value: "240-1440", label: "4 hours to 1 day" },
  { value: "1440-4320", label: "1 to 3 days" },
];

interface DurationProps {
  value?: string;
  onChange?: (value: string) => void;
}

const Duration = ({ onChange }: DurationProps) => {
  const [open, setOpen] = React.useState(false);
  const [selectedDuration, setSelectedDuration] = React.useState<string>("");

  const handleCheckboxChange = (value: string) => {
    setSelectedDuration(value === selectedDuration ? "" : value);
    onChange?.(value === selectedDuration ? "" : value);
    setOpen(false); // Close dropdown after selection
  };

  const getButtonLabel = () => {
    if (!selectedDuration) return "Duration";
    return `Duration (${durationOptions.find((opt) => opt.value === selectedDuration)?.label})`;
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-full shadow-md">
          <Clock className="h-4 w-4 mr-2" />
          {getButtonLabel()}
          <ChevronDown
            className="-me-1 ms-2 opacity-60"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-4">
        <div className="space-y-4">
          {durationOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={option.value}
                checked={selectedDuration === option.value}
                onCheckedChange={() => handleCheckboxChange(option.value)}
              />

              <Label
                htmlFor={option.value}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Duration;
