"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { Label } from "./label";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { Input } from "./input";

interface TimePickerProps {
  date?: Date;
  setDate: (date: Date) => void;
  label?: string;
}

export function TimePicker({ date, setDate, label }: TimePickerProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const [hour, setHour] = React.useState(date ? date.getHours() : 12);
  const [minute, setMinute] = React.useState(date ? date.getMinutes() : 0);
  const [meridiem, setMeridiem] = React.useState<"AM" | "PM">(
    date ? (date.getHours() >= 12 ? "PM" : "AM") : "PM",
  );

  const handleHourChange = (value: string) => {
    const hour = parseInt(value);
    if (isNaN(hour) || hour < 1 || hour > 12) return;
    setHour(hour);
    if (hour === 12) {
      const newDate = new Date();
      newDate.setHours(meridiem === "AM" ? 0 : 12);
      newDate.setMinutes(minute);
      setDate(newDate);
    } else {
      const newDate = new Date();
      newDate.setHours(meridiem === "AM" ? hour : hour + 12);
      newDate.setMinutes(minute);
      setDate(newDate);
    }
  };

  const handleMinuteChange = (value: string) => {
    const minute = parseInt(value);
    if (isNaN(minute) || minute < 0 || minute > 59) return;
    setMinute(minute);
    const newDate = new Date();
    if (hour === 12) {
      newDate.setHours(meridiem === "AM" ? 0 : 12);
    } else {
      newDate.setHours(meridiem === "AM" ? hour : hour + 12);
    }
    newDate.setMinutes(minute);
    setDate(newDate);
  };

  const handleMeridiemChange = () => {
    const newMeridiem = meridiem === "AM" ? "PM" : "AM";
    setMeridiem(newMeridiem);
    const newDate = new Date();
    if (hour === 12) {
      newDate.setHours(newMeridiem === "AM" ? 0 : 12);
    } else {
      newDate.setHours(newMeridiem === "AM" ? hour : hour + 12);
    }
    newDate.setMinutes(minute);
    setDate(newDate);
  };

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <Clock className="mr-2 h-4 w-4" />
            {date ? (
              date.toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })
            ) : (
              <span>Pick a time</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <div className="flex items-center gap-2 p-3">
            <Input
              ref={hourRef}
              className="w-16"
              value={hour.toString().padStart(2, "0")}
              onChange={(e) => handleHourChange(e.target.value)}
              max={12}
              min={1}
            />

            <span className="text-xl">:</span>
            <Input
              ref={minuteRef}
              className="w-16"
              value={minute.toString().padStart(2, "0")}
              onChange={(e) => handleMinuteChange(e.target.value)}
              max={59}
              min={0}
            />

            <Button
              variant="outline"
              className="w-16"
              onClick={handleMeridiemChange}
              type="button"
            >
              {meridiem}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
