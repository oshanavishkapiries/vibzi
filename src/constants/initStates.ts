export const DEFAULT_SEARCH_PARAMS = {
  startDate: new Date().toISOString().split("T")[0],
  endDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0],
  destinationId: "",
  tags: null,
  flags: null,
  durationInMinutes: null,
  rating: null,
  sorting: null,
  currency: "USD",
  highestPrice: 0,
  lowestPrice: 0,
  page: 1,
  size: 15,
};

export const DEFAULT_SEARCH_STATE_FREE_TEXT = {
  startDate: new Date().toISOString().split("T")[0],
  endDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0],
  searchQuery: "",
  products: true,
  attraction: false,
  destination: true,
  page: 1,
  size: 15,
};
