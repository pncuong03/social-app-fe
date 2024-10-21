import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  friendInfo,
  getListFriend,
  getListRequest,
  onAcceptRequestFriend,
  onDeleteFriend,
  onDeleteRequestSend,
  onRejectRequestFriend,
} from "src/apis/friend";
import { IFriend, IUser } from "src/types/user";

export interface FriendState {
  listRequest: IFriend[];
  infoFriend: IUser;
  listFriend: IFriend[];
}

const initialState: FriendState = {
  listRequest: [],
  listFriend: [],
  infoFriend: {
    id: "",
    fullName: "",
    imageUrl: "",
    backgroundUrl: "",
    birthday: "",
    gender: "",
    description: "",
    state: "",
  },
};

export const fetchInfoFriend = createAsyncThunk("auth/fetchInfoFriend", async (friendId: string, thunkAPI) => {
  try {
    const accessToken = localStorage.getItem("ACCESS_TOKEN") || "";

    const data = await friendInfo(accessToken, friendId);

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const fetchListFriend = createAsyncThunk("post/fetchListFriend", async (_, thunkAPI) => {
  try {
    const accessToken = localStorage.getItem("ACCESS_TOKEN") || "";

    const data = await getListFriend(accessToken);

    return data.content;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const fetchListRequest = createAsyncThunk("post/fetchListRequest", async (_, thunkAPI) => {
  try {
    const accessToken = localStorage.getItem("ACCESS_TOKEN") || "";

    const data = await getListRequest(accessToken);

    return data.content;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteFriend = createAsyncThunk("friend/deleteFriend", async (friendId: string, thunkAPI) => {
  try {
    const accessToken = localStorage.getItem("ACCESS_TOKEN") || "";

    await onDeleteFriend(accessToken, friendId);

    thunkAPI.dispatch(unFriend(friendId));
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const acceptFriend = createAsyncThunk("friend/acceptFriend", async (id: string, thunkAPI) => {
  try {
    const accessToken = localStorage.getItem("ACCESS_TOKEN") || "";

    await onAcceptRequestFriend(accessToken, id);

    thunkAPI.dispatch(acceptFriendRequest(id));
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const rejectFriend = createAsyncThunk("friend/rejectFriend", async (id: string, thunkAPI) => {
  try {
    const accessToken = localStorage.getItem("ACCESS_TOKEN") || "";

    await onRejectRequestFriend(accessToken, id);

    thunkAPI.dispatch(rejectFriendRequest(id));
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteRequestSend = createAsyncThunk("friend/deleteRequestSend", async (receiverId: string, thunkAPI) => {
  try {
    const accessToken = localStorage.getItem("ACCESS_TOKEN") || "";

    await onDeleteRequestSend(accessToken, receiverId);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const friendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    rejectFriendRequest: (state, action: PayloadAction<string>) => {
      state.listRequest = state.listRequest.filter((friend) => friend.id !== action.payload);
    },
    acceptFriendRequest: (state, action: PayloadAction<string>) => {
      state.listRequest = state.listRequest.filter((friend) => friend.id !== action.payload);
    },
    unFriend: (state, action: PayloadAction<string>) => {
      state.listFriend = state.listFriend.filter((friend) => friend.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchInfoFriend.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.infoFriend = action.payload;
      })

      .addCase(fetchListFriend.fulfilled, (state, action: PayloadAction<IFriend[]>) => {
        state.listFriend = action.payload;
      })

      .addCase(fetchListRequest.fulfilled, (state, action: PayloadAction<IFriend[]>) => {
        state.listRequest = action.payload;
      });
  },
});

export const { rejectFriendRequest, acceptFriendRequest, unFriend } = friendSlice.actions;

export default friendSlice.reducer;
