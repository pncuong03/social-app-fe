import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getListNotification } from "src/apis/notification";
import { INotification } from "src/types/notification";

export interface NotificationState {
  notifications: INotification[];
}

const initialState: NotificationState = {
  notifications: [],
};

export const fetchListNotification = createAsyncThunk(
  "notification/fetchListNotification",
  async (page: number, thunkAPI) => {
    try {
      const data = await getListNotification(page);

      return data.content;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchListNotification.fulfilled, (state, action: PayloadAction<INotification[]>) => {
      state.notifications = [...state.notifications, ...action.payload];
    });
  },
});

export default notificationSlice.reducer;
