import { MetaState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: MetaState = {
  title: "VIBZI",
  trip: {
    select_date: "",
    id: "",
    tripId: "",
    itinerary: {},
    isOwner: false,
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
    setitinerary: (state, action: PayloadAction<any>) => {
      state.trip.itinerary = action.payload;
    },
    setIsOwner: (state, action: PayloadAction<boolean>) => {
      state.trip.isOwner = action.payload;
    },
  },
});

export const { setTripDate } = metaSlice.actions;
export const { setTripId } = metaSlice.actions;
export const { setTrip_Id } = metaSlice.actions;
export const { setitinerary } = metaSlice.actions;
export const { setIsOwner } = metaSlice.actions;

export default metaSlice.reducer;
