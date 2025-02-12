"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bed, File, MapPin, Plus, Ticket, Utensils, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import * as Sheet from "./sheet";

const buttonItems = [
  { icon: Bed, label: "Place to stay", sheet: Sheet.AddPlaceToStay },
  { icon: Ticket, label: "Things to do", sheet: Sheet.ThingsToDo },
  { icon: Utensils, label: "Food & drink", sheet: Sheet.AddFoodAndDrink },
  { icon: MapPin, label: "Transportation", sheet: Sheet.AddTransportation },
  { icon: File, label: "Note", sheet: Sheet.AddNote },
];

const ItineraryAdd: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <TooltipProvider>
      <div className="relative">
        {!isOpen ? (
          <div className="flex space-x-4 p-4 pl-0">
            <Button
              onClick={toggleMenu}
              variant="outline"
              className="gap-2 rounded-full border border-primary min-w-[80px]"
            >
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>
        ) : (
          <div className="mt-2 flex space-x-4 p-4 bg-white">
            {buttonItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <item.sheet>
                      <Button
                        variant="ghost"
                        className="rounded-full border border-primary"
                        size="icon"
                      >
                        <Icon className="h-6 w-6" />
                      </Button>
                    </item.sheet>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>{item.label}</span>
                  </TooltipContent>
                </Tooltip>
              );
            })}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={toggleMenu}
                >
                  <X className="h-6 w-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <span>Close</span>
              </TooltipContent>
            </Tooltip>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

export default ItineraryAdd;
