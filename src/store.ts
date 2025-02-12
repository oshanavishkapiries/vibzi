import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './services/apiSlice';
import { apiSlice1 } from './services/apiSlice';
import metaReducer from './features/metaSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [apiSlice1.reducerPath]: apiSlice1.reducer,
    meta: metaReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, apiSlice1.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;