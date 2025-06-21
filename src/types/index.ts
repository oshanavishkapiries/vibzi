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
  id: string;
  type: "activity" | "restaurant" | "hotel" | "flight" | "note";
  details: {
    title: string;
    customFields: {
      startTime?: string;
      endTime?: string;
      departureLocation?: string;
      arrivalLocation?: string;
      reservationNumber?: string;
      link?: string;
      note?: string;
      booked?: string;
      type?: string;
      departureTime?: string;
      arrivalTime?: string;
    };
  };
}

export interface AuthContextType {
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (
    username: string,
    password: string,
    email: string,
    givenName: string,
    familyName: string,
    birthdate: string,
    gender: string,
    phoneNumber: string
  ) => Promise<void>;
  verifyEmail: (email: string, code: string, resend?: boolean) => Promise<void>;
  forgotPassword: (email: string) => Promise<any>;
  resetPassword: (code: string, newPassword: string) => Promise<any>;
  googleSignIn: () => Promise<void>;
}

export interface MetaState {
  title: string;
  trip: {
    select_date: string;
    id: string;
    tripId: string;
    itinerary: any;
    isOwner: boolean;
  };
}

export * from "./auth";
export * from "./trip";
export * from "./meta";
