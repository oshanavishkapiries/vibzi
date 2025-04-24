import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import PlanCard from "./PlanCard";
import { Loader2 } from "lucide-react";
import { useSearchPackagesMutation } from "@/store/api/esim/esimSlice";
import { EsimPackage } from "@/types/esim";

const GlobalDetails = () => {
  const [planType, setPlanType] = React.useState("data");
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

      <Tabs.Root
        value={planType}
        onValueChange={setPlanType}
        className="space-y-6"
      >
        <Tabs.List className="flex justify-center">
          <div className="inline-flex rounded-lg bg-gray-100 p-1">
            <Tabs.Trigger
              value="data"
              className={`w-[150px] rounded-md px-6 py-2 text-sm font-medium transition-colors
                ${
                  planType === "data" ? "bg-white shadow" : "hover:bg-gray-50"
                }`}
            >
              Data
            </Tabs.Trigger>
            <Tabs.Trigger
              value="combo"
              className={`w-[150px] rounded-md px-6 py-2 text-sm font-medium transition-colors
                ${
                  planType === "combo" ? "bg-white shadow" : "hover:bg-gray-50"
                }`}
            >
              Triple Blaster
            </Tabs.Trigger>
          </div>
        </Tabs.List>

        <Tabs.Content value="data" className="focus-visible:outline-none">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <PlanCard key={plan.id} plan={plan} type="data" />
              ))}
            </div>
          )}
        </Tabs.Content>

        <Tabs.Content value="combo" className="focus-visible:outline-none">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <PlanCard key={plan.id} plan={plan} type="combo" />
              ))}
            </div>
          )}
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default GlobalDetails; 