import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import dateNow from "../utils/date/dateNow";

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://weatherapi-com.p.rapidapi.com/",
    headers: {
      "X-RapidAPI-Key": "8062fabb12msh2d6d6c774d06b10p14e8ddjsnf6f4900b422f",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  }),
  endpoints: (build) => ({
    getForecast: build.query({
      query: (body) => `forecast.json?q=${body.city}&days=${body.dateDiff}`,
    }),
    getPreviousWeather: build.query({
      query: (body) =>
        `history.json?q=${body.city}&dt=${
          body.date
        }&lang=en&end_dt=${dateNow()}`,
    }),
  }),
});

export const { useGetForecastQuery, useGetPreviousWeatherQuery } = weatherApi;
