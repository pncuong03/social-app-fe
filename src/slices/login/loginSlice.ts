import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const loginSlice = createSlice({
  name: "login",
  initialState: {},
  reducers: {
    reset: () => initialState,
  },
  extraReducers: () => {
    //
  },
});

export const { reset } = loginSlice.actions;

export default loginSlice.reducer;
