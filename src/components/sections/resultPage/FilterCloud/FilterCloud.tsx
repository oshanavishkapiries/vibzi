import { Button } from "@/components/ui/button";
import { PriceRange } from "./PriceRange";
import Duration from "./Duration";
import Rating from "./Rating";
import Flag from "./Flag";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { FilterX } from "lucide-react";

const FilterCloud = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tags = [
    { id: 21910, name: "Art & Culture" },
    { id: 11935, name: "Entertainment" },
    { id: 21647, name: "Sports" },
    { id: 12519, name: "Tours" },
    { id: 21913, name: "Sightseeing" },
  ];

  const createQueryString = useCallback(
    (params: Record<string, string | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, value);
        }
      });

      return newSearchParams.toString();
    },
    [searchParams],
  );

  const handlePriceChange = ({ min, max }: { min: number; max: number }) => {
    const queryString = createQueryString({
      pri_from: min.toString(),
      pri_to: max.toString(),
    });
    router.push(`/results?${queryString}`);
  };

  const handleDurationChange = (value: string) => {
    const queryString = createQueryString({
      dur: value,
    });
    router.push(`/results?${queryString}`);
  };

  const handleRatingChange = (value: string) => {
    const queryString = createQueryString({
      rat: value,
    });
    router.push(`/results?${queryString}`);
  };

  const handleFlagChange = (value: string) => {
    const queryString = createQueryString({
      flag: value,
    });
    router.push(`/results?${queryString}`);
  };

  const handleCategoryClick = (categoryId: number) => {
    const queryString = createQueryString({
      cat: categoryId.toString(),
    });
    router.push(`/results?${queryString}`);
  };
  const handleResetFilters = () => {
    const queryString = createQueryString({
      pri_from: null,
      pri_to: null,
      dur: null,
      rat: null,
      flag: null,
      cat: null,
    });
    router.push(`/results?${queryString}`);
  };

  useEffect(() => {}, [searchParams]);

  return (
    <>
      <div className="w-full h-auto py-4 flex flex-wrap gap-2 justify-center items-center">
        <PriceRange
          min={Number(searchParams?.get("pri_from")) || 0}
          max={Number(searchParams?.get("pri_to")) || 1000}
          onChange={handlePriceChange}
        />

        <Duration
          value={searchParams?.get("dur") || undefined}
          onChange={handleDurationChange}
        />

        <Rating
          value={searchParams?.get("rat") || undefined}
          onChange={handleRatingChange}
        />

        <Flag
          value={searchParams?.get("flag") || undefined}
          onChange={handleFlagChange}
        />

        {tags.map((tag) => (
          <Button
            variant="outline"
            key={tag.id}
            className={`m-1 rounded-full shadow-md ${
              searchParams?.get("cat") === tag.id.toString()
                ? "bg-primary text-primary-foreground"
                : ""
            }`}
            onClick={() => handleCategoryClick(tag.id)}
          >
            {tag.name}
          </Button>
        ))}

        <Button
          onClick={handleResetFilters}
          variant="outline"
          className="m-1 rounded-full shadow-md"
        >
          <FilterX
            className="me-1"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          Reset All Filters
        </Button>
      </div>
    </>
  );
};

export default FilterCloud;
