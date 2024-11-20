import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import friendSlice from "src/slices/friend/friendSlice";
import groupSlice from "src/slices/groups/groupSlice";
import authReducer from "src/slices/login/loginSlice";
import messageSlice from "src/slices/messages/messageSlice";
import notificationSlice from "src/slices/notification/notificationSlice";
import postSlice from "src/slices/posts/postSlice";
import userSlice from "src/slices/user/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postSlice,
    friend: friendSlice,
    user: userSlice,
    message: messageSlice,
    notification: notificationSlice,
    group: groupSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
