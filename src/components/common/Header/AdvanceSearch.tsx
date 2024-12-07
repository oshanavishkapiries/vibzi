"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Search } from "lucide-react";
import { DateRange } from "react-day-picker";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export function AdvanceSearch({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.15,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className={cn(
        "w-full lg:w-2/3 max-w-6xl transition-all duration-500 flex flex-row gap-3 shadow-lg rounded-full p-2",
        className
      )}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="flex-grow" variants={childVariants}>
        <Input
          type="text"
          placeholder="Enter your destination"
          className="py-6 rounded-full"
        />
      </motion.div>
      <motion.div className="flex gap-3" variants={childVariants}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-full md:min-w-[240px] justify-start text-left font-normal py-6 rounded-full",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {date?.from ? (
                date.to ? (
                  <span className="max-md:hidden">
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </span>
                ) : (
                  <span className="max-md:hidden">
                    {format(date.from, "LLL dd, y")}
                  </span>
                )
              ) : (
                <span className="max-md:hidden">When</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        <motion.div variants={childVariants}>
          <Link prefetch={true} href="/results">
          <Button className="py-6 rounded-full">
            <Search />
          </Button>
        </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
