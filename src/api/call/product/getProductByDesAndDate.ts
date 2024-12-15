import { BACKEND_URL } from "@/api/config";
import { endpoints } from "@/api/endpoints";
import { parseProduct } from "@/utils/parseProduct";

export const getProductByDesAndDate = async (
  destination_id: string,
  fromDate: string,
  toDate: string
) => {
  const response = await fetch(
    `${BACKEND_URL}${endpoints.PRODUCTS_SEARCH.URL}?provider=VIATOR`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: endpoints.PRODUCTS_SEARCH.METHOD,
      body: JSON.stringify({
        startDate: "2024-12-27T00:00:00.000Z",
        endDate: "2024-12-30T23:59:59.000Z",
        destinationId: "732",
        tags: null,
        flags: null,
        durationInMinutes: null,
        rating: null,
        sorting: null,
        currency: "USD",
        highestPrice: 0,
        lowestPrice: 0,
        page: 1,
        size: 10,
      }),
    }
  );

  const data = await response.json();

  return data.data.products;
};
