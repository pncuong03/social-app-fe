import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  friendInfo,
  getListFriend,
  getListRequest,
  getSearchListFriend,
  onAcceptRequestFriend,
  onDeleteFriend,
  onDeleteRequestSend,
  onRejectRequestFriend,
} from "src/apis/friend";
import { IFriend, IUser } from "src/types/user";

export interface FriendState {
  listRequest: IFriend[];
  listFriend: IFriend[];
  searchListFriend: IFriend[];
  infoFriend: IUser;
}

const initialState: FriendState = {
  listRequest: [],
  listFriend: [],
  searchListFriend: [],
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
    const data = await friendInfo(friendId);

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const fetchSearchListFriend = createAsyncThunk(
  "post/fetchSearchListFriend",
  async (search: string, thunkAPI) => {
    try {
      const data = await getSearchListFriend(search);

      return data.content;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchListFriend = createAsyncThunk("post/fetchListFriend", async (_, thunkAPI) => {
  try {
    const data = await getListFriend();

    return data.content;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const fetchListRequest = createAsyncThunk("post/fetchListRequest", async (_, thunkAPI) => {
  try {
    const data = await getListRequest();

    return data.content;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteFriend = createAsyncThunk("friend/deleteFriend", async (friendId: string, thunkAPI) => {
  try {
    await onDeleteFriend(friendId);

    thunkAPI.dispatch(unFriend(friendId));
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const acceptFriend = createAsyncThunk("friend/acceptFriend", async (id: string, thunkAPI) => {
  try {
    await onAcceptRequestFriend(id);

    thunkAPI.dispatch(acceptFriendRequest(id));
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const rejectFriend = createAsyncThunk("friend/rejectFriend", async (id: string, thunkAPI) => {
  try {
    await onRejectRequestFriend(id);

    thunkAPI.dispatch(rejectFriendRequest(id));
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteRequestSend = createAsyncThunk("friend/deleteRequestSend", async (receiverId: string, thunkAPI) => {
  try {
    await onDeleteRequestSend(receiverId);
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

      .addCase(fetchSearchListFriend.fulfilled, (state, action: PayloadAction<IFriend[]>) => {
        state.searchListFriend = action.payload;
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
