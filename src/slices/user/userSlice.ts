import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUser } from "src/apis/user";
import { ISearchUser } from "src/types/user";

export interface UserState {
  searchUser: ISearchUser[];
}

const initialState: UserState = {
  searchUser: [],
};

export const fetchUser = createAsyncThunk("post/fetchPostMe", async (search: string, thunkAPI) => {
  try {
    const data = await getUser(search);

    return data.content;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<ISearchUser[]>) => {
      state.searchUser = action.payload;
    });
  },
});

export default userSlice.reducer;
