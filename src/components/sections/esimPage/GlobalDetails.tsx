import React from "react";
import PlanCard from "./PlanCard";
import { Loader2 } from "lucide-react";
import { useSearchPackagesMutation } from "@/store/api/esim/esimSlice";
import { EsimPackage } from "@/types/esim";

const GlobalDetails = () => {
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
        packageType: "GLOBAL",
        region: null,
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
  }, [searchPackages]);

  React.useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-center gap-3">
        <h2 className="text-2xl font-semibold">Global eSIM Plans</h2>
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

export default GlobalDetails;
