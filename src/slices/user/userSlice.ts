import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUser, onEditInfo } from "src/apis/user";
import { ISearchUser } from "src/types/user";
import { fetchMyInfo } from "../login/loginSlice";

export interface UserState {
  searchUser: ISearchUser[];
}

const initialState: UserState = {
  searchUser: [],
};

export const fetchUser = createAsyncThunk("post/fetchUser", async (search: string, thunkAPI) => {
  try {
    const data = await getUser(search);

    return data.content;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const editInfo = createAsyncThunk(
  "post/editInfo",
  async (
    params: {
      fullName: string;
      birthdayString: string;
      gender: string;
      work: string;
      description: string;
      live: string;
      imageUrl: string;
    },
    thunkAPI
  ) => {
    try {
      await onEditInfo(params);

      thunkAPI.dispatch(fetchMyInfo());
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearSearchUser: (state) => {
      state.searchUser = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<ISearchUser[]>) => {
      state.searchUser = action.payload;
    });
  },
});

export const { clearSearchUser } = userSlice.actions;
export default userSlice.reducer;
