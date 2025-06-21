import React from "react";
import Image from "next/image";
import PlanCard from "./PlanCard";
import { ArrowLeftIcon, Loader2 } from "lucide-react";
import { Region } from "./EsimTabs";
import { useSearchPackagesMutation } from "@/store/api/esim/esimSlice";
import { EsimPackage } from "@/types/esim";

interface RegionDetailsProps {
  region: Region;
  onBack?: () => void;
}

const RegionDetails = ({ region, onBack }: RegionDetailsProps) => {
  const [searchPackages] = useSearchPackagesMutation();
  const [plans, setPlans] = React.useState<EsimPackage[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchPlans = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await searchPackages({
        title: null,
        provider: null,
        country: null,
        destination: null,
        packageType: "REGIONAL",
        region: region.name,
        userId: null,
        page: 0,
        size: 10,
      }).unwrap();

      setPlans(response.items || []);
    } catch (error) {
      console.error("Failed to fetch plans:", error);
    } finally {
      setIsLoading(false);
    }
  }, [region.name, searchPackages]);

  React.useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full flex items-center justify-center"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <Image
          src={region.imageUrl || "/placeholder.webp"}
          alt={`${region.name} icon`}
          width={32}
          height={32}
          className="rounded"
        />

        <h2 className="text-2xl font-semibold">{region.name}</h2>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RegionDetails;
