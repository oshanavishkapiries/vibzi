"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon, Navigation, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { DestinationListProps, State } from "@/types";
import { useSuggestDestinationQuery } from "@/services/destinationSlice";

const DestinationList: React.FC<DestinationListProps> = ({
  destinations,
  onSelect,
  show,
}) => {
  return (
    <div
      className={`w-full ${
        destinations?.length > 0 && show ? `h-[300px]` : "h-[0px]"
      } rounded-xl overflow-hidden absolute left-0 right-0 top-0 z-[-1] px-3 bg-background shadow-md transition-all duration-500`}
    >
      {destinations?.slice(0, 5).map((item, index) => (
        <h1
          key={index}
          onClick={() => onSelect(item)}
          className={`flex items-center gap-2  p-2 hover:bg-gray-100 text-base font-semibold text-muted-foreground cursor-pointer ${
            index === 0 && "mt-[80px]"
          }`}
        >
          <Navigation className="text-muted-foreground w-4 h-4" /> {item.name}
        </h1>
      ))}
    </div>
  );
};

export function AdvanceSearch({}: //isCollepsed = false,
{
  isCollepsed?: boolean;
}) {
  const [state, setState] = useState<State>({
    date: undefined,
    destination: "",
    destinationId: "",
  });

  const [debouncedDestination, setDebouncedDestination] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedDestination(state.destination.trim());
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [state.destination]);

  const { data: destinationList = [], isFetching } = useSuggestDestinationQuery(
    debouncedDestination,
    {
      skip: !debouncedDestination,
    }
  );

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

  const handleSearch = () => {
    const from = state.date?.from ? format(state.date.from, "yyyy-MM-dd") : "";
    const to = state.date?.to ? format(state.date.to, "yyyy-MM-dd") : "";
    window.location.href = `/results?des=${state.destination}&des_id=${state.destinationId}&from=${from}&to=${to}`;
  };

  // === framer motion animation proparties === start
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
  // === framer motion animation proparties === end

  return (
    <motion.div
      className="w-full bg-background transition-all duration-500 flex flex-row gap-3 relative rounded-full p-2 border shadow-md border-gray-200"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="flex-grow relative" variants={childVariants}>
        <Input
          type="text"
          placeholder="Enter your destination"
          className={`py-6 rounded-full font-semibold text-muted-foreground`}
          value={state.destination}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          onChange={(e) =>
            setState((prev) => ({ ...prev, destination: e.target.value }))
          }
        />
      </motion.div>
      <motion.div className="flex gap-3" variants={childVariants}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant="outline"
              className={
                "w-full justify-start text-left font-normal py-6 rounded-full"
              }
            >
              <CalendarIcon className="text-muted-foreground" />

              {state.date?.from && (
                <span className="text-base font-semibold text-muted-foreground">
                  {state.date.to ? (
                    <>
                      {format(state.date.from, "LLL dd")} -{" "}
                      {format(state.date.to, "LLL dd")}
                    </>
                  ) : (
                    <>{format(state.date.from, "LLL dd")}</>
                  )}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0 rounded-2xl" align="center">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={state.date?.from}
              selected={state.date}
              onSelect={(range) =>
                setState((prev) => ({ ...prev, date: range }))
              }
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        <motion.div variants={childVariants}>
          <Button
            className={`py-6 rounded-full ${isFetching && "animate-pulse"}`}
            onClick={handleSearch}
          >
            <Search />
          </Button>
        </motion.div>
      </motion.div>
      <DestinationList
        destinations={destinationList.data}
        onSelect={(item) =>
          setState({
            destination: item.name,
            destinationId: item.destinationId,
            date: state.date,
          })
        }
        show={isInputFocused && debouncedDestination.length > 0}
      />
    </motion.div>
  );
}
