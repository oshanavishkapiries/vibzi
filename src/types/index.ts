import { DateRange } from "react-day-picker";

export interface IParseProductDeatils {
  title: string;
  productCode: string;
  description: string;
  language: string;
  timeZone: string;
  productUrl: string;
  reviews: {
    totalReviews: string;
    averageReviews: string;
    ratings: {
      stars: number;
      count: number;
    }[];
  };
  images: { small: string; big: string }[];
  inclusions: string[];
  exclusions: string[];
  additionalInfo: string[];
  pricing: {
    price: string;
    priceNote: string;
    cancellationPolicy: string;
    cancellationDetail: string;
  };
  bookingProvider: {
    logoSrc: string;
    name: string;
    bookNowButtonLabel: string;
    poweredByLogoSrc: string;
  };
}

export type Destination = {
  name: string;
  destinationId: string;
};

export type State = {
  date: DateRange | undefined;
  destination: string;
  destinationId: string;
};

export type DestinationListProps = {
  destinations: Destination[];
  onSelect: (item: Destination) => void;
  show: boolean;
};

export interface SearchState {
  startDate: string;
  endDate: string;
  destinationId: string;
  page: number;
  destination: string;
  categoryId?: string;
  priceFrom?: string;
  priceTo?: string;
  duration?: string;
  rating?: string;
  flag?: string;
}

export interface TimelineItem {
  type: "activity" | "restaurant" | "hotel" | "flight" | "note";
  dates?: string;
  details: {
    title: string;
    customFields: any;
  };
}

