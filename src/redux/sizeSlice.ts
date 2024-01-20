import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const sizeSlice = createSlice({
  name: "appSize",
  initialState: {
    compact: false,
  },
  reducers: {
    setIsAppCompact: (state, action) => {
      state.compact = action.payload;
    },
  },
});

export const selectIsAppSizeCompact = (state: RootState) => state.size.compact;
export const { setIsAppCompact } = sizeSlice.actions;

export default sizeSlice.reducer;
