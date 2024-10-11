import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost } from "src/types/post";
import { axiosInstance } from "src/utilities/services/initRequest";

export interface PostState {
  postOfPublic: IPost[];
  postOfMe: IPost[];
  postOfFriend: IPost[];
  detailPost: IPost;
}

const initialPost: IPost = {
  id: "",
  userId: "",
  state: "",
  fullName: "",
  imageUrl: "",
  createdAt: "",
  content: "",
  imageUrls: [],
  shareId: "",
  sharePost: {} as IPost,
  likeCount: 0,
  commentCount: 0,
  shareCount: 0,
  comments: [] || null,
  hasLike: false,
  type: "",
};

const initialState: PostState = {
  postOfPublic: [],
  postOfMe: [],
  postOfFriend: [],
  detailPost: initialPost,
};

export const fetchPostOfMe = createAsyncThunk("post/fetchPostOfMe", async (_, thunkAPI) => {
  try {
    const accessToken = localStorage.getItem("ACCESS_TOKEN") || "";
    const auth = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const data = await axiosInstance.get(`/post/list/me`, auth);

    return data.data.content;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const fetchPostPublic = createAsyncThunk("post/fetchPostPublic", async (_, thunkAPI) => {
  try {
    const accessToken = localStorage.getItem("ACCESS_TOKEN") || "";
    const auth = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const data = await axiosInstance.get("/post/list/friends", auth);

    return data.data.content;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    deletePostofMe: (state, action: PayloadAction<string>) => {
      const postId = action.payload;

      state.postOfMe = state.postOfMe.filter((post) => post.id !== postId);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPostOfMe.fulfilled, (state, action: PayloadAction<IPost[]>) => {
      state.postOfMe = action.payload;
    });

    builder.addCase(fetchPostPublic.fulfilled, (state, action: PayloadAction<IPost[]>) => {
      state.postOfPublic = action.payload;
    });
  },
});

export const { deletePostofMe } = postSlice.actions;

export default postSlice.reducer;
