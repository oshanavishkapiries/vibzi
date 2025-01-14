"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Bed,
  File,
  MapPin,
  Plus,
  Ticket,
  Utensils,
  X,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const buttonItems = [
  { icon: Bed, label: "Place to stay" },
  { icon: Ticket, label: "Things to do" },
  { icon: Utensils, label: "Food & drink" },
  { icon: MapPin, label: "Transportation" },
  { icon: File, label: "Note" },
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
          <div className="mt-2 flex space-x-4 bg-white p-4">
            <Button onClick={toggleMenu} variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>
        ) : (
          <div className="mt-2 flex space-x-4 bg-white p-4">
            {buttonItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Tooltip key={index}>
                  <TooltipTrigger>
                    <Button variant="ghost" size="icon">
                      <Icon className="h-6 w-6" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>{item.label}</span>
                  </TooltipContent>
                </Tooltip>
              );
            })}

            <Tooltip>
              <TooltipTrigger>
                <Button variant="ghost" size="icon" onClick={toggleMenu}>
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
