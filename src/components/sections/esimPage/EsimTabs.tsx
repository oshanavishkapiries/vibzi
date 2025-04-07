import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { regions } from "./regions";
import RegionCard from "./RegionCard";
import CountryCard from "./CountryCard";
import CountryDetails from "./CountryDetails";
import { countries } from "./countries";

const tabItems = [
  { value: "local", label: "Local eSIMs" },
  { value: "regional", label: "Regional eSIMs" },
  { value: "global", label: "Global eSIMs" },
];

const EsimTabs = ({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (value: string) => void;
}) => {
  const [selectedCountry, setSelectedCountry] = React.useState<
    (typeof countries)[0] | null
  >(null);

  const handleCountryClick = (country: (typeof countries)[0]) => {
    setSelectedCountry(country);
  };

  const handleBack = () => {
    setSelectedCountry(null);
  };

  return (
    <Tabs.Root
      value={activeTab}
      onValueChange={onTabChange}
      className="w-full max-w-7xl mx-auto"
    >
      <Tabs.List className="flex justify-center gap-2 border-b mb-8">
        {tabItems.map((tab) => (
          <Tabs.Trigger
            key={tab.value}
            value={tab.value}
            className={`px-6 py-3 text-sm font-medium transition-colors
              ${
                activeTab === tab.value
                  ? "text-gray-900 border-b-2 border-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
          >
            {tab.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <>
        <Tabs.Content value="local" className="focus-visible:outline-none">
          {selectedCountry ? (
            <CountryDetails country={selectedCountry} onBack={handleBack} />
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Popular Countries
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {countries.map((country) => (
                  <CountryCard
                    key={country.code}
                    country={country}
                    onClick={() => handleCountryClick(country)}
                  />
                ))}
              </div>
            </>
          )}
        </Tabs.Content>

        <Tabs.Content value="regional" className="focus-visible:outline-none">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Regions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {regions.map((region) => (
                <RegionCard
                  key={region.id}
                  region={region}
                  onClick={() => console.log(`Selected region: ${region.name}`)}
                />
              ))}
            </div>
          </div>
        </Tabs.Content>

        <Tabs.Content value="global" className="focus-visible:outline-none">
          <div className="text-center text-gray-500 py-12">
            Global eSIM plans coming soon...
          </div>
        </Tabs.Content>
      </>
    </Tabs.Root>
  );
};

export default EsimTabs;
