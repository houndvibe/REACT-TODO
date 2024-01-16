import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: () => ({}),
});
