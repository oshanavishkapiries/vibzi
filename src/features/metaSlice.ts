import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfo {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

interface MetaState {
  title: string;
  user: UserInfo | null;
  trip: {
    select_date: string;
    id: string;
    tripId: string;
    itinerary: any;
  };
}

const initialState: MetaState = {
  title: "VIBZI",
  user: null,
  trip: {
    select_date: "",
    id: "",
    tripId: "",
    itinerary: {},
  },
};

export const metaSlice = createSlice({
  name: "meta",
  initialState,
  reducers: {
    setTripDate: (state, action: PayloadAction<string>) => {
      state.trip.select_date = action.payload;
    },
    setTripId: (state, action: PayloadAction<string>) => {
      state.trip.id = action.payload;
    },
    setTrip_Id: (state, action: PayloadAction<string>) => {
      state.trip.tripId = action.payload;
    },
    setitinerary:(state, action: PayloadAction<any>) => {
      state.trip.itinerary = action.payload;
    },
    setUser: (state, action: PayloadAction<UserInfo | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setTripDate } = metaSlice.actions;
export const { setTripId } = metaSlice.actions;
export const { setTrip_Id } = metaSlice.actions;
export const { setitinerary } = metaSlice.actions;
export const { setUser } = metaSlice.actions;

export default metaSlice.reducer;
