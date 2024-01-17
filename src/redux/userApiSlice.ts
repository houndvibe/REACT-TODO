import { userProps } from "../types";
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      providesTags: (result = []) => [
        "User",
        ...result.map((item: userProps) => ({ type: "User", id: item.id })),
      ],
    }),
    addUser: builder.mutation({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: () => ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (arg) => [{ type: "User", id: arg.id }],
    }),
    editUser: builder.mutation({
      query: (editedUser) => ({
        url: `/users/${editedUser.id}`,
        method: "PATCH",
        body: editedUser,
      }),
      invalidatesTags: (editedUser) => [
        "User",
        { type: "User", id: editedUser.id },
      ],
    }),
    setCurrentUserId: builder.mutation({
      query: (id) => ({
        url: "/currentUser",
        method: "PUT",
        body: { id },
      }),
      async onQueryStarted(user, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          userApiSlice.util.updateQueryData(
            "getCurrentUserId",
            undefined,
            () => user,
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    getCurrentUserId: builder.query({
      query: () => "/currentUser",
      providesTags: (result) => ["User", { type: "User", id: result }],
      transformResponse: (responseData: { id: string }) => {
        return responseData.id;
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
  useSetCurrentUserIdMutation,
  useGetCurrentUserIdQuery,
} = userApiSlice;
