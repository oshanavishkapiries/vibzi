import React from "react";
import Image from "next/image";
import * as Tabs from "@radix-ui/react-tabs";
import PlanCard from "./PlanCard";
import { ArrowLeftIcon } from "lucide-react";

interface CountryDetailsProps {
  country: {
    code: string;
    name: string;
    flag: string;
  };
  onBack?: () => void;
}

const mockDataPlans = [
  {
    name: "Ella",
    image: "/images/ella-card.webp",
    coverage: "Sri Lanka",
    data: "1 GB",
    validity: "7 Days",
    price: "$4.50 USD",
  },
  {
    name: "Ella",
    image: "/images/ella-card.webp",
    coverage: "Sri Lanka",
    data: "2 GB",
    validity: "15 Days",
    price: "$5.50 USD",
  },
  {
    name: "Ella",
    image: "/images/ella-card.webp",
    coverage: "Sri Lanka",
    data: "3 GB",
    validity: "30 Days",
    price: "$6.50 USD",
  },
];

const mockComboPlans = [
  {
    name: "Ella+",
    image: "/images/ella-card.webp",
    coverage: "Sri Lanka",
    data: "1 GB",
    calls: "10 Mins",
    texts: "10 SMS",
    validity: "7 Days",
    price: "$5.50 USD",
  },
  {
    name: "Ella+",
    image: "/images/ella-card.webp",
    coverage: "Sri Lanka",
    data: "2 GB",
    calls: "20 Mins",
    texts: "20 SMS",
    validity: "15 Days",
    price: "$7.00 USD",
  },
  {
    name: "Ella+",
    image: "/images/ella-card.webp",
    coverage: "Sri Lanka",
    data: "3 GB",
    calls: "30 Mins",
    texts: "30 SMS",
    validity: "30 Days",
    price: "$8.50 USD",
  },
];

const CountryDetails = ({ country, onBack }: CountryDetailsProps) => {
  const [planType, setPlanType] = React.useState("data");

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
          src={"/placeholder.webp"}
          alt={`${country.name} flag`}
          width={32}
          height={24}
          className="rounded"
        />
        <h2 className="text-2xl font-semibold">{country.name}</h2>
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
              className={`rounded-md px-6 py-2 text-sm font-medium transition-colors
                ${
                  planType === "data" ? "bg-white shadow" : "hover:bg-gray-50"
                }`}
            >
              Data
            </Tabs.Trigger>
            <Tabs.Trigger
              value="combo"
              className={`rounded-md px-6 py-2 text-sm font-medium transition-colors
                ${
                  planType === "combo" ? "bg-white shadow" : "hover:bg-gray-50"
                }`}
            >
              Data / Calls / Texts
            </Tabs.Trigger>
          </div>
        </Tabs.List>

        <Tabs.Content value="data" className="focus-visible:outline-none">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockDataPlans.map((plan, index) => (
              <PlanCard key={index} plan={plan} type="data" />
            ))}
          </div>
        </Tabs.Content>

        <Tabs.Content value="combo" className="focus-visible:outline-none">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockComboPlans.map((plan, index) => (
              <PlanCard key={index} plan={plan} type="combo" />
            ))}
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default CountryDetails;
