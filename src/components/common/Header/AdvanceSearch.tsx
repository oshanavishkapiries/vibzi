"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon, Map, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { getDestination } from "@/api/call/getDestination";
import { Destination, DestinationListProps, State } from "@/types";

const DestinationList: React.FC<DestinationListProps> = ({
  destinations,
  onSelect,
  show,
}) => {
  return (
    <div
      className={`w-full ${
        destinations.length > 0 && show ? "h-[200px]" : "h-[0px]"
      } rounded-md overflow-hidden mt-3 absolute bg-background shadow-md transition-all duration-500`}
    >
      {destinations.slice(0, 5).map((item) => (
        <h1
          key={item.destinationId}
          onClick={() => onSelect(item)}
          className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
        >
          <Map /> {item.name}
        </h1>
      ))}
    </div>
  );
};

export function AdvanceSearch({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [state, setState] = useState<State>({
    date: undefined,
    destination: "",
    destinationId: "",
  });
  const [destinationList, setDestinationList] = useState<Destination[]>([]);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [isInputFocused, setIsInputFocused] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const { date, destination } = state;

  useEffect(() => {
    const des = searchParams.get("des");
    const fromDate = searchParams.get("from");
    const toDate = searchParams.get("to");

    if (des || fromDate || toDate) {
      setState((prev) => ({
        ...prev,
        destination: des || "",
        date:
          fromDate && toDate
            ? { from: new Date(fromDate), to: new Date(toDate) }
            : undefined,
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    if (!destination.trim()) return;

    if (debounceTimeout) clearTimeout(debounceTimeout);

    setDebounceTimeout(
      setTimeout(async () => {
        const res = await getDestination(destination);
        setDestinationList(res.data);
      }, 500)
    );
  }, [destination]);

  const handleSearch = () => {
    const from = date?.from ? format(date.from, "yyyy-MM-dd") : "";
    const to = date?.to ? format(date.to, "yyyy-MM-dd") : "";
    router.push(
      `/results?des=${state.destination}&des_id=${state.destinationId}&from=${from}&to=${to}`
    );
  };

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
      <motion.div className="flex-grow relative" variants={childVariants}>
        <Input
          type="text"
          placeholder="Enter your destination"
          className="py-6 rounded-full"
          value={state.destination}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          onChange={(e) =>
            setState((prev) => ({ ...prev, destination: e.target.value }))
          }
        />
        <DestinationList
          destinations={destinationList}
          onSelect={(item) =>
            setState({
              destination: item.name,
              destinationId: item.destinationId,
              date: state.date,
            })
          }
          show={isInputFocused}
        />
      </motion.div>
      <motion.div className="flex gap-3" variants={childVariants}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant="outline"
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
              onSelect={(range) =>
                setState((prev) => ({ ...prev, date: range }))
              }
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        <motion.div variants={childVariants}>
          <Button className="py-6 rounded-full" onClick={handleSearch}>
            <Search />
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
