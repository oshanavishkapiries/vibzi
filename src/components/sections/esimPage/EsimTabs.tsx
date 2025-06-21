import React, { useCallback } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import RegionCard from "./RegionCard";
import CountryCard from "./CountryCard";
import CountryDetails from "./CountryDetails";
import RegionDetails from "./RegionDetails";
import GlobalDetails from "./GlobalDetails";
import { useSearchCountriesOrRegionsMutation } from "@/store/api/esim/esimSlice";
import { Loader2 } from "lucide-react";

export interface Country {
  id: string;
  name: string;
  imageUrl: string;
  type: string;
  description: string;
  isActive: boolean;
  [key: string]: any;
}

export interface Region {
  id: string;
  name: string;
  imageUrl: string;
  type: string;
  description: string | null;
  isActive: boolean;
  [key: string]: any;
}

const tabItems = [
  { value: "COUNTRY", label: "Local eSIMs" },
  { value: "REGION", label: "Regional eSIMs" },
  { value: "GLOBAL", label: "Global eSIMs" },
];

const EsimTabs = ({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (value: string) => void;
}) => {
  const [selectedCountry, setSelectedCountry] = React.useState<any>(null);
  const [selectedRegion, setSelectedRegion] = React.useState<any>(null);
  const [searchResults, setSearchResults] = React.useState<
    (Country | Region)[]
  >([]);

  const [searchCountriesOrRegions, { isLoading, error }] =
    useSearchCountriesOrRegionsMutation();

  const handleCountryClick = (country: Country) => {
    setSelectedCountry(country);
  };

  const handleRegionClick = (region: Region) => {
    setSelectedRegion(region);
  };

  const handleBack = () => {
    setSelectedCountry(null);
    setSelectedRegion(null);
  };

  console.log("selectedCountry ⚡⚡⚡⚡", selectedCountry);

  const handleSearch = useCallback(
    async (type: string, name: string | null = null) => {
      try {
        const response = await searchCountriesOrRegions({
          type,
          name,
          page: 0,
          size: 10,
        }).unwrap();

        if (response && response.items) {
          setSearchResults(response.items);
        }
      } catch (err) {
        console.error("Failed to search:", err);
      }
    },
    [searchCountriesOrRegions, setSearchResults],
  );

  React.useEffect(() => {
    if (activeTab === "COUNTRY") {
      handleSearch("COUNTRY");
    } else if (activeTab === "REGION") {
      handleSearch("REGION");
    }
  }, [activeTab, handleSearch]);

  return (
    <Tabs.Root
      value={activeTab}
      onValueChange={onTabChange}
      className="w-full max-w-7xl mx-auto"
    >
      <Tabs.List className="flex justify-center gap-2 border-b pb-3 mb-6">
        {tabItems.map((tab) => (
          <Tabs.Trigger
            key={tab.value}
            value={tab.value}
            className={`px-6 py-3 text-sm font-medium transition-colors rounded-full
              ${
                activeTab === tab.value
                  ? "text-gray-900 bg-gray-100"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
          >
            {tab.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <Tabs.Content value="COUNTRY" className="focus-visible:outline-none">
        {selectedCountry ? (
          <CountryDetails country={selectedCountry} onBack={handleBack} />
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Popular Countries
            </h2>
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="w-10 h-10 animate-spin" />
              </div>
            ) : error ? (
              <div className="text-center text-red-500 py-4">
                Error loading countries
              </div>
            ) : (
              <div>
                {searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {searchResults.map((country) => (
                      <CountryCard
                        key={country.id}
                        country={country as Country}
                        onClick={() => handleCountryClick(country as Country)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="w-full text-center text-gray-500 py-12">
                    No results found
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </Tabs.Content>

      <Tabs.Content value="REGION" className="focus-visible:outline-none">
        {selectedRegion ? (
          <RegionDetails region={selectedRegion} onBack={handleBack} />
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Regions</h2>
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="w-10 h-10 animate-spin" />
              </div>
            ) : error ? (
              <div className="text-center text-red-500 py-4">
                Error loading regions
              </div>
            ) : (
              <div>
                {searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {searchResults.map((region) => (
                      <RegionCard
                        key={region.id}
                        region={region as Region}
                        onClick={() => handleRegionClick(region as Region)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="w-full text-center text-gray-500 py-12">
                    No results found
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </Tabs.Content>

      <Tabs.Content value="GLOBAL" className="focus-visible:outline-none">
        <GlobalDetails />
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default EsimTabs;
