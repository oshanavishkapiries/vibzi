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
import { useSuggestDestinationQuery } from "@/services/product/destinationSlice";
import { useRouter } from "next/navigation";

export function AdvanceSearch({}: { isCollepsed?: boolean }) {
  const [state, setState] = useState<State>({
    date: undefined,
    destination: "",
    destinationId: "",
  });

  const [debouncedDestination, setDebouncedDestination] = useState("");
  const [isForcus, setForcus] = useState(false);
  const [isClicked, setClicked] = useState(false);
  const [error, setError] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedDestination(state.destination.trim());
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [state.destination]);

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

  const { data: destinationList = [], isFetching } = useSuggestDestinationQuery(
    debouncedDestination,
    {
      skip: !debouncedDestination,
    }
  );

  const handleSearch = (e: any) => {
    if (!e.key || e.key === "Enter") {
      if (!state.destination.trim()) {
        setError(true);
        return;
      }
      setError(false);
      const from = state.date?.from
        ? format(state.date.from, "yyyy-MM-dd")
        : "";
      const to = state.date?.to ? format(state.date.to, "yyyy-MM-dd") : "";
      const searchURL = `/results?des=${state.destination}&des_id=${state.destinationId}&from=${from}&to=${to}`;
      router.push(searchURL);
    }
  };

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
          placeholder="Search destination"
          className={`py-6 rounded-full font-semibold text-muted-foreground ${
            error ? "border-red-500 focus:ring-red-500" : ""
          }`}
          value={state.destination}
          onChange={(e) => {
            setState((prev) => ({ ...prev, destination: e.target.value }));
            setClicked(false);
            setError(false);
          }}
          onFocus={() => {
            setForcus(true);
            setError(false);
          }}
          onBlur={() =>
            setTimeout(() => {
              setForcus(false);
            }, 500)
          }
          onKeyDown={handleSearch}
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
        onSelect={(item: any) => {
          setState({
            destination: item.name,
            destinationId: item.destinationId,
            date: state.date,
          });
          setClicked(true);
        }}
        show={
          destinationList?.data?.length &&
          !isClicked &&
          isForcus &&
          state.destination.length > 0
        }
      />
    </motion.div>
  );
}

const DestinationList: React.FC<DestinationListProps> = ({
  destinations,
  onSelect,
  show,
}) => {
  if (!show) return null;
  return (
    <div
      className={`w-full h-auto
      } rounded-xl overflow-hidden absolute top-[80px] left-0 right-0 z-[-1] p-3 bg-background shadow-md transition-all duration-500`}
    >
      {destinations?.slice(0, 5).map((item, index) => (
        <h1
          key={index}
          onClick={() => onSelect(item)}
          className={`flex items-center gap-2 p-2 hover:bg-gray-100 text-base font-semibold text-muted-foreground cursor-pointer`}
        >
          <Navigation className="text-muted-foreground w-4 h-4" /> {item.name}
        </h1>
      ))}
    </div>
  );
};

// aniamtion variants
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
