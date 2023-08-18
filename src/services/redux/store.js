import { configureStore } from "@reduxjs/toolkit";
import { weatherApi } from "./weatherApi";
import weatherReducer from "./slice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
});
