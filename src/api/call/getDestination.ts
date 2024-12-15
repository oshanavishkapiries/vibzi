import { BACKEND_URL } from "@/api/config";
import { endpoints } from "@/api/endpoints";

export const getDestination = async (searchText: string) => {
  const response = await fetch(
    `${BACKEND_URL}${endpoints.DESTINATION_BY_TEXT.URL}?text=${searchText}`,
    {
      headers: {},
      method: endpoints.DESTINATION_BY_TEXT.METHOD,
      
    }
  );

  const data = await response.json();

  return data;
};
