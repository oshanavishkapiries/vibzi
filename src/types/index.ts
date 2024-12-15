import { DateRange } from "react-day-picker";

export type ITravelData = {
  image_url: string;
  title: string;
  sub_title: string;
  price: string;
  rating: number;
  reviews: number;
};

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
