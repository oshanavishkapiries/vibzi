"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Bed, Car, File, Plus, Ticket, Utensils, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import * as Sheet from "./sheet";

const buttonItems = [
  { icon: Bed, label: "Place to stay", sheet: Sheet.AddPlaceToStay },
  { icon: Ticket, label: "Things to do", sheet: Sheet.ThingsToDo },
  { icon: Utensils, label: "Food & drink", sheet: Sheet.AddFoodAndDrink },
  { icon: Car, label: "Transportation", sheet: Sheet.AddTransportation },
  { icon: File, label: "Note", sheet: Sheet.AddNote },
];

const ItineraryAdd: React.FC<{ initmode: number }> = ({ initmode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (initmode === 0) {
      setIsOpen(true);
    }
    if (initmode > 0) {
      setIsOpen(false);
    }
  }, [initmode]);

  return (
    <TooltipProvider>
      <div className="relative">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="closed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="flex space-x-4 p-4 pl-0"
            >
              <Button
                onClick={toggleMenu}
                variant="outline"
                className="gap-2 rounded-full border border-primary min-w-[80px]"
              >
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="mt-2 flex space-x-4 p-4 bg-white"
            >
              {buttonItems.map((item, index) => {
                const Icon = item.icon;
                const SheetComponent = item.sheet;
                return (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Tooltip>
                      <SheetComponent>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            className="rounded-full border border-primary p-2"
                            size="icon"
                          >
                            <Icon className="h-6 w-6" />
                          </Button>
                        </TooltipTrigger>
                      </SheetComponent>
                      <TooltipContent>
                        <p>{item.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  </motion.div>
                );
              })}

              {initmode > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: buttonItems.length * 0.05 }}
                >
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
                      <p>Close</p>
                    </TooltipContent>
                  </Tooltip>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </TooltipProvider>
  );
};

export default ItineraryAdd;
