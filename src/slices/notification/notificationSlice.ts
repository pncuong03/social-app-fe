import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getEventNoti, getListNotification } from "src/apis/notification";
import { INotiCount, INotification } from "src/types/notification";

export interface NotificationState {
  notifications: INotification[];
  notiCount: INotiCount;
}

const initialState: NotificationState = {
  notifications: [],
  notiCount: {
    messageCount: 0,
    notificationCount: 0,
  },
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

export const fetchEventNotification = createAsyncThunk("notification/fetchEventNotification", async (_, thunkAPI) => {
  try {
    const data = await getEventNoti();

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    clearNoti: (state) => {
      state.notiCount.notificationCount = 0;
    },

    addNoti: (
      state,
      action: PayloadAction<{ createdAt: string; fullName: string; imageUrl: string; userId: number; type: string }>
    ) => {
      const newNotification: INotification = {
        id: Date.now(),
        type: "",
        userId: action.payload.userId,
        interacId: 0,
        groupId: 0,
        interactType: action.payload.type,
        postId: 0,
        hasSeen: false,
        createdAt: action.payload.createdAt,
        interact: {
          id: action.payload.userId,
          fullName: action.payload.fullName,
          imageUrl: action.payload.imageUrl,
        },
        group: { id: 0, name: "" },
        post: { id: 0, content: "" },
      };

      state.notifications = [newNotification, ...state.notifications];
    },

    clearAllNoti: (state) => {
      state.notifications = [];
      state.notiCount.notificationCount += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListNotification.fulfilled, (state, action: PayloadAction<INotification[]>) => {
        const newNoti = action.payload;

        const uniqueMessages = newNoti.filter(
          (newMessage) => !state.notifications.some((existingNoti) => existingNoti.id === newMessage.id)
        );

        state.notifications = [...state.notifications, ...uniqueMessages];
      })

      .addCase(fetchEventNotification.fulfilled, (state, action: PayloadAction<INotiCount>) => {
        state.notiCount = action.payload;
      });
  },
});

export const { clearNoti, addNoti, clearAllNoti } = notificationSlice.actions;
export default notificationSlice.reducer;
