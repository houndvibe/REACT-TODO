import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userProps } from "../types";
import UsersPostService from "../services/userPostService";

interface usersState {
  users: userProps[];
}

const initialState: usersState = {
  users: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = [...action.payload];
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.users.push(action.payload);
    });
    builder.addCase(deleteUserById.fulfilled, (state, action) => {
      state.users = state.users.filter((user) => user.id != action.payload);
    });
  },
});

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  return (await UsersPostService.getUsers()) as userProps[];
});

export const addUser = createAsyncThunk(
  "users/addUser",
  async (userName: string) => {
    return (await UsersPostService.addUser(userName)) as userProps;
  },
);

export const deleteUserById = createAsyncThunk(
  "users/deleteUser",
  async (userId: string) => {
    return (await UsersPostService.deleteUserById(userId)) as string;
  },
);

export default usersSlice.reducer;
