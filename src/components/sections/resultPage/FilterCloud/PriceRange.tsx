"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, DollarSign } from "lucide-react";

export interface PriceRangeProps {
  min?: number;
  max?: number;
  onChange?: (values: { min: number; max: number }) => void;
}

export function PriceRange({ min = 0, max = 1000, onChange }: PriceRangeProps) {
  const [minVal, setMinVal] = useState<number>(min);
  const [maxVal, setMaxVal] = useState<number>(max);
  const [open, setOpen] = useState<boolean>(false);
  const minThumbRef = useRef<HTMLInputElement>(null);
  const maxThumbRef = useRef<HTMLInputElement>(null);
  const rangeRef = useRef<HTMLDivElement>(null);

  const getPercent = (value: number): number => {
    return Math.round(((value - min) / (max - min)) * 100);
  };

  useEffect(() => {
    if (rangeRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(maxVal);

      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal, min, max]);

  const handleReset = () => {
    setMinVal(min);
    setMaxVal(max);
  };

  const handleApply = () => {
    onChange?.({ min: minVal, max: maxVal });
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-full shadow-md flex items-center">
          <DollarSign className="me-1" size={16} strokeWidth={2} aria-hidden="true" />
          Price
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
          <div className="flex justify-between">
            <span className="text-sm font-medium">Price Range</span>
            <span className="text-sm text-gray-500">
              ${minVal} - ${maxVal}
            </span>
          </div>

          {/* Custom Range Slider */}
          <div className="relative h-12 w-full">
            <div className="absolute top-5 h-1 w-full bg-gray-200 rounded">
              <div
                ref={rangeRef}
                className="absolute h-full bg-primary rounded"
              />
            </div>

            {/* Min thumb */}
            <input
              type="range"
              ref={minThumbRef}
              min={min}
              max={max}
              value={minVal}
              onChange={(e) => {
                const value = Math.min(Number(e.target.value), maxVal - 1);
                setMinVal(value);
              }}
              className="thumb thumb-left absolute w-full pointer-events-none appearance-none bg-transparent"
            />

            {/* Max thumb */}
            <input
              type="range"
              ref={maxThumbRef}
              min={min}
              max={max}
              value={maxVal}
              onChange={(e) => {
                const value = Math.max(Number(e.target.value), minVal + 1);
                setMaxVal(value);
              }}
              className="thumb thumb-right absolute w-full pointer-events-none appearance-none bg-transparent"
            />
          </div>

          <div className="flex justify-between gap-2">
            <Button variant="outline" className="w-1/2" onClick={handleReset}>
              Reset
            </Button>
            <Button className="w-1/2" onClick={handleApply}>
              Apply
            </Button>
          </div>
        </div>

        <style jsx>{`
          .thumb {
            height: 0;
            width: 100%;
            -webkit-appearance: none;
            pointer-events: none;
            position: absolute;
            height: 0;
            top: 50%;
            transform: translateY(-50%);
          }

          .thumb::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            height: 18px;
            width: 18px;
            background-color: white;
            border-radius: 50%;
            border: 2px solid #022f30;
            cursor: pointer;
            pointer-events: auto;
            margin-top: 0;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }

          .thumb::-moz-range-thumb {
            height: 18px;
            width: 18px;
            background-color: white;
            border-radius: 50%;
            border: 2px solid #022f30;
            cursor: pointer;
            pointer-events: auto;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }

          .thumb:active::-webkit-slider-thumb {
            background-color: #022f30;
          }

          .thumb:active::-moz-range-thumb {
            background-color: #022f30;
          }

          .thumb-left::-webkit-slider-thumb {
            transform: translateX(-8px);
          }

          .thumb-right::-webkit-slider-thumb {
            transform: translateX(8px);
          }
        `}</style>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

