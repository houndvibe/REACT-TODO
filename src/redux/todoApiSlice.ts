import { userProps } from "../types";
import { apiSlice } from "./apiSlice";

export const todoApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todos",
      providesTags: (result = []) => [
        "Todo",
        ...result.map((item: userProps) => ({ type: "todo", id: item.id })),
      ],
    }),
  }),
});

export const { useGetTodosQuery } = todoApiSlice;
