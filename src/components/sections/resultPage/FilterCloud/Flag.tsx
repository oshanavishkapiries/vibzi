import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ChevronDown, FlagIcon } from "lucide-react";
import React, { useState } from "react";

type FlagType =
  | "FREE_CANCELLATION"
  | "ALL_SALES_FINAL"
  | "SKIP_THE_LINE"
  | "PRIVATE_TOUR"
  | "SPECIAL_OFFER"
  | "LIKELY_TO_SELL_OUT";

interface FlagProps {
  value?: string;
  onChange: (value: FlagType) => void;
}

const Flag: React.FC<FlagProps> = ({ onChange }) => {
  const [selectedFlag, setSelectedFlag] = useState<FlagType | null>(null);

  const FLAGS: FlagType[] = [
    "FREE_CANCELLATION",
    "ALL_SALES_FINAL",
    "SKIP_THE_LINE",
    "PRIVATE_TOUR",
    "SPECIAL_OFFER",
    "LIKELY_TO_SELL_OUT",
  ];

  const handleFlagChange = (value: FlagType) => {
    setSelectedFlag(value);
    onChange(value);
  };

  const formatLabel = (key: FlagType): string => {
    return key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.toLowerCase().slice(1))
      .join(" ");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-full shadow-md">
          <FlagIcon className="h-4 w-4 mr-2" />
          {selectedFlag ? formatLabel(selectedFlag) : "Flag"}
          <ChevronDown
            className="-me-1 ms-2 opacity-60"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-4">
        <RadioGroup
          value={selectedFlag ?? undefined}
          onValueChange={handleFlagChange}
          className="space-y-4"
        >
          {FLAGS.map((flag) => (
            <div key={flag} className="flex items-center space-x-2">
              <RadioGroupItem value={flag} id={flag} />
              <Label
                htmlFor={flag}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {formatLabel(flag)}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Flag;
