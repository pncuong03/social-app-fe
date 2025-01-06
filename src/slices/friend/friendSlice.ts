import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  userInfo,
  getListFriend,
  getListRequest,
  getSearchListFriend,
  onAcceptRequestFriend,
  onDeleteFriend,
  onDeleteRequestSend,
  onRejectRequestFriend,
  onSendRequesFriend,
  getListImage,
} from "src/apis/friend";
import { IFriend, Image, IUserInfo, StateUser } from "src/types/user";

export interface FriendState {
  listRequest: IFriend[];
  listFriend: IFriend[];
  searchListFriend: IFriend[];
  userInfo: IUserInfo;
  imageofUser: Image[];
}

const initialState: FriendState = {
  listRequest: [],
  listFriend: [],
  searchListFriend: [],
  userInfo: {
    id: 0,
    chatId: 0,
    mutalFriends: 0,
    totalFriends: 0,
    fullName: "",
    imageUrl: "",
    imageBackground: "",
    description: "",
    state: StateUser.STRANGER,
  },
  imageofUser: [],
};

export const fetchUserInfo = createAsyncThunk("auth/fetchUserInfo", async (friendId: number, thunkAPI) => {
  try {
    const data = await userInfo(friendId);

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

export const sendRequestFriend = createAsyncThunk("friend/sendRequestFriend", async (id: string, thunkAPI) => {
  try {
    await onSendRequesFriend(id);
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

export const fetchListImage = createAsyncThunk("friend/fetchListImage", async (userId: number, thunkAPI) => {
  try {
    const data = await getListImage(userId);

    return data.content;
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
    clearUserInfo: (state) => {
      state.userInfo = initialState.userInfo;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchUserInfo.fulfilled, (state, action: PayloadAction<IUserInfo>) => {
        state.userInfo = action.payload;
      })

      .addCase(fetchSearchListFriend.fulfilled, (state, action: PayloadAction<IFriend[]>) => {
        state.searchListFriend = action.payload;
      })

      .addCase(fetchListFriend.fulfilled, (state, action: PayloadAction<IFriend[]>) => {
        state.listFriend = action.payload;
      })

      .addCase(fetchListRequest.fulfilled, (state, action: PayloadAction<IFriend[]>) => {
        state.listRequest = action.payload;
      })

      .addCase(fetchListImage.fulfilled, (state, action: PayloadAction<Image[]>) => {
        state.imageofUser = action.payload;
      });
  },
});

export const { rejectFriendRequest, acceptFriendRequest, unFriend, clearUserInfo } = friendSlice.actions;

export default friendSlice.reducer;
