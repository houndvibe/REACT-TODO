import { userProps } from "../types";
import { apiSlice } from "./apiSlice";

export const todoApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todos",
      providesTags: (result = []) => [
        "Todo",
        ...result.map((item: userProps) => ({ type: "Todo", id: item.id })),
      ],
    }),
    addTodo: builder.mutation({
      query: (newTodo) => ({
        url: "/todos",
        method: "POST",
        body: newTodo,
      }),
      invalidatesTags: () => ["Todo"],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (arg) => [{ type: "Todo", id: arg.id }],
    }),
    editTodo: builder.mutation({
      query: (editedTodo) => ({
        url: `/todos/${editedTodo.id}`,
        method: "PATCH",
        body: editedTodo,
      }),
      invalidatesTags: (editedTodo) => [
        "Todo",
        { type: "Todo", id: editedTodo.id },
      ],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
} = todoApiSlice;
