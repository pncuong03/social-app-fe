import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getListMessage, getMessageDetail } from "src/apis/message";
import { IMessage } from "src/types/message";

export interface MessageState {
  accessToken: string;
  messages: IMessage[];
  messagesDetail: IMessage[];
}

const initialState: MessageState = {
  accessToken: "",
  messages: [],
  messagesDetail: [],
};

export const fetchListMessage = createAsyncThunk("message/fetchListMessage", async (_, thunkAPI) => {
  try {
    const accessToken = localStorage.getItem("ACCESS_TOKEN") || "";

    const data = await getListMessage(accessToken);

    return data.content;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const fetchMessageDetail = createAsyncThunk("message/fetchMessageDetail", async (chatId: string, thunkAPI) => {
  try {
    const accessToken = localStorage.getItem("ACCESS_TOKEN") || "";

    const data = await getMessageDetail(accessToken, chatId);

    return data.content;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    newMessage: (state, action: PayloadAction<IMessage>) => {
      state.messagesDetail.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListMessage.fulfilled, (state, action: PayloadAction<IMessage[]>) => {
        state.messages = action.payload;
      })

      .addCase(fetchMessageDetail.fulfilled, (state, action: PayloadAction<IMessage[]>) => {
        state.messagesDetail = action.payload;
      });
  },
});

export const { newMessage } = messageSlice.actions;
export default messageSlice.reducer;
