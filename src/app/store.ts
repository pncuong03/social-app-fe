import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import friendSlice from "src/slices/friend/friendSlice";
import authReducer from "src/slices/login/loginSlice";
import postSlice from "src/slices/posts/postSlice";
import userSlice from "src/slices/user/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postSlice,
    friend: friendSlice,
    user: userSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
