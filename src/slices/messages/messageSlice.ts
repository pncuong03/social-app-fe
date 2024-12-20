import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getListMemberChat,
  getListMessage,
  getMessageDetail,
  onAddMemberChat,
  onCreateGroupChat,
  onDeleteMemeberChat,
  onLeaveChat,
  onSearchChat,
} from "src/apis/message";
import { IChat, IMember } from "src/types/message";

export interface ISearchChat {
  id: string;
  name: string;
  img: string;
}
export interface MessageState {
  messages: IChat[];
  memberChat: IMember[];
  searchChat: ISearchChat[];
}

const initialState: MessageState = {
  messages: [],
  memberChat: [],
  searchChat: [],
};

export const fetchListMessage = createAsyncThunk("message/fetchListMessage", async (page: number, thunkAPI) => {
  try {
    const data = await getListMessage(page);

    return data.content;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const fetchMessageDetail = createAsyncThunk(
  "message/fetchMessageDetail",
  async ({ chatId, page }: { chatId: string; page: number }, thunkAPI) => {
    try {
      const data = await getMessageDetail(chatId, page);

      return data.content;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchMemberChat = createAsyncThunk("message/fetchMemberChat", async (groupId: string, thunkAPI) => {
  try {
    const data = await getListMemberChat(groupId);

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteMemeberChat = createAsyncThunk(
  "message/deleteMemeber",
  async ({ groupChatId, userId }: { groupChatId: string; userId: string }, thunkAPI) => {
    try {
      await onDeleteMemeberChat(groupChatId, userId);

      thunkAPI.dispatch(removeMemberChat(userId));
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const leaveChat = createAsyncThunk("message/leaveChat", async (chatId: string, thunkAPI) => {
  try {
    await onLeaveChat(chatId);
    thunkAPI.dispatch(leaveGroupChat(chatId));
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const fetchSearchChat = createAsyncThunk("message/fetchSearchChat", async (search: string, thunkAPI) => {
  try {
    const data = await onSearchChat(search);

    return data.content;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createGroupChat = createAsyncThunk(
  "message/createGroupChat",
  async (params: { name: string; userIds: string[] }, thunkAPI) => {
    try {
      await onCreateGroupChat(params);

      thunkAPI.dispatch(fetchListMessage(0));
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addMemberChat = createAsyncThunk(
  "message/addMemberChat",
  async (params: { groupChatId: string; userIds: string[] }, thunkAPI) => {
    try {
      await onAddMemberChat(params);

      thunkAPI.dispatch(fetchMemberChat(params.groupChatId));
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    clearMessageCount: (state, action: PayloadAction<string>) => {
      const index = state.messages.findIndex((message) => message.id === action.payload);

      if (index !== -1) {
        state.messages[index].messageCount = 0;
      }
    },

    leaveGroupChat: (state, action: PayloadAction<string>) => {
      const index = state.messages.findIndex((message) => message.id === action.payload);

      if (index !== -1) {
        state.messages.splice(index, 1);
      }
    },

    removeMemberChat: (state, action: PayloadAction<string>) => {
      const index = state.memberChat.findIndex((member) => member.id === action.payload);

      if (index !== -1) {
        state.memberChat.splice(index, 1);
      }
    },
    newListMessage: (state, action: PayloadAction<string>) => {
      const index = state.messages.findIndex((message) => message.id === action.payload);

      if (index !== -1) {
        state.messages[index].newestMessage = action.payload;
      }
    },

    // clearMessage: (state, action: PayloadAction<string>) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListMessage.fulfilled, (state, action: PayloadAction<IChat[]>) => {
        const newMessages = action.payload;

        const uniqueMessages = newMessages.filter(
          (newMessage) => !state.messages.some((existingMessage) => existingMessage.id === newMessage.id)
        );

        state.messages = [...state.messages, ...uniqueMessages];
      })

      .addCase(fetchMemberChat.fulfilled, (state, action: PayloadAction<IMember[]>) => {
        state.memberChat = action.payload;
      })

      .addCase(fetchSearchChat.fulfilled, (state, action: PayloadAction<ISearchChat[]>) => {
        state.searchChat = action.payload;
      });
  },
});

export const { clearMessageCount, leaveGroupChat, newListMessage, removeMemberChat } = messageSlice.actions;
export default messageSlice.reducer;
