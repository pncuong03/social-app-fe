import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createPost,
  getDetailPost,
  getPostofMe,
  getPostPublic,
  onComment,
  onDeleteComment,
  onDeletePost,
  onLike,
  onShare,
  onUnLike,
} from "src/apis/post";
import { IPost } from "src/types/post";

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

export const fetchPostMe = createAsyncThunk("post/fetchPostMe", async (_, thunkAPI) => {
  try {
    const accessToken = localStorage.getItem("ACCESS_TOKEN") || "";

    const data = await getPostofMe(accessToken);

    return data.content;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const fetchPostPublic = createAsyncThunk("post/fetchPostPublic", async (_, thunkAPI) => {
  try {
    const accessToken = localStorage.getItem("ACCESS_TOKEN") || "";

    const data = await getPostPublic(accessToken);

    return data.content;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const fetchDetailPost = createAsyncThunk("post/fetchDetailPost", async (postId: string, thunkAPI) => {
  try {
    const accessToken = localStorage.getItem("ACCESS_TOKEN") || "";

    const data = await getDetailPost(accessToken, postId);

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createPosts = createAsyncThunk("post/createPost", async (postData: FormData, thunkAPI) => {
  try {
    const accessToken = localStorage.getItem("ACCESS_TOKEN") || "";

    await createPost(postData, accessToken);
    thunkAPI.dispatch(fetchPostMe());
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const likePost = createAsyncThunk("post/likePost", async (postId: string, thunkAPI) => {
  try {
    const accessToken = localStorage.getItem("ACCESS_TOKEN") || "";

    await onLike(accessToken, postId);

    thunkAPI.dispatch(increaseLike(postId));
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const unLikePost = createAsyncThunk("post/unLikePost", async (postId: string, thunkAPI) => {
  try {
    const accessToken = localStorage.getItem("ACCESS_TOKEN") || "";

    await onUnLike(accessToken, postId);

    thunkAPI.dispatch(decreaseLike(postId));
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const sharePost = createAsyncThunk(
  "post/sharePost",
  async ({ content, state, postId }: { content: string; state: string; postId: string }, thunkAPI) => {
    try {
      const accessToken = localStorage.getItem("ACCESS_TOKEN") || "";

      await onShare(accessToken, { content, state, postId });
      thunkAPI.dispatch(increaseShare(postId));
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const commentPost = createAsyncThunk(
  "post/commentPost",
  async ({ postId, comment }: { postId: string; comment: string }, thunkAPI) => {
    try {
      const accessToken = localStorage.getItem("ACCESS_TOKEN") || "";

      await onComment(accessToken, postId, comment);
      thunkAPI.dispatch(fetchDetailPost(postId));
      thunkAPI.dispatch(increaseComment(postId));
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteComment = createAsyncThunk("post/deleteComment", async (commentId: string, thunkAPI) => {
  try {
    const accessToken = localStorage.getItem("ACCESS_TOKEN") || "";

    await onDeleteComment(accessToken, commentId);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deletePost = createAsyncThunk("post/deletePost", async (postId: string, thunkAPI) => {
  try {
    const accessToken = localStorage.getItem("ACCESS_TOKEN") || "";

    await onDeletePost(accessToken, postId);
    thunkAPI.dispatch(deletePostofMe(postId));
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    increaseLike: (state, action: PayloadAction<string>) => {
      const postId = action.payload;
      const postPublic = state.postOfPublic.find((post) => post.id === postId);
      const postOfMe = state.postOfMe.find((post) => post.id === postId);
      const postOfFriend = state.postOfFriend.find((post) => post.id === postId);

      if (postPublic) {
        postPublic.hasLike = true;
        postPublic.likeCount += 1;
      }

      if (postOfMe) {
        postOfMe.hasLike = true;
        postOfMe.likeCount += 1;
      }

      if (postOfFriend) {
        postOfFriend.hasLike = true;
        postOfFriend.likeCount += 1;
      }
    },

    decreaseLike: (state, action: PayloadAction<string>) => {
      const postId = action.payload;
      const postPublic = state.postOfPublic.find((post) => post.id === postId);
      const postOfMe = state.postOfMe.find((post) => post.id === postId);
      const postOfFriend = state.postOfFriend.find((post) => post.id === postId);

      if (postPublic) {
        postPublic.hasLike = false;
        postPublic.likeCount -= 1;
      }

      if (postOfMe) {
        postOfMe.hasLike = false;
        postOfMe.likeCount -= 1;
      }

      if (postOfFriend) {
        postOfFriend.hasLike = false;
        postOfFriend.likeCount -= 1;
      }
    },

    increaseShare: (state, action: PayloadAction<string>) => {
      const postId = action.payload;
      const postPublic = state.postOfPublic.find((post) => post.id === postId);
      const postOfMe = state.postOfMe.find((post) => post.id === postId);
      const postOfFriend = state.postOfFriend.find((post) => post.id === postId);

      if (postPublic) {
        postPublic.shareCount += 1;
      }

      if (postOfMe) {
        postOfMe.shareCount += 1;
      }

      if (postOfFriend) {
        postOfFriend.shareCount += 1;
      }
    },

    increaseComment: (state, action: PayloadAction<string>) => {
      const postId = action.payload;
      const postPublic = state.postOfPublic.find((post) => post.id === postId);
      const postOfMe = state.postOfMe.find((post) => post.id === postId);
      const postOfFriend = state.postOfFriend.find((post) => post.id === postId);

      if (postPublic) {
        postPublic.commentCount += 1;
      }

      if (postOfMe) {
        postOfMe.commentCount += 1;
      }

      if (postOfFriend) {
        postOfFriend.commentCount += 1;
      }
    },

    deletePostofMe: (state, action: PayloadAction<string>) => {
      const postId = action.payload;

      state.postOfMe = state.postOfMe.filter((post) => post.id !== postId);
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchPostMe.fulfilled, (state, action: PayloadAction<IPost[]>) => {
        state.postOfMe = action.payload;
      })

      .addCase(fetchPostPublic.fulfilled, (state, action: PayloadAction<IPost[]>) => {
        state.postOfPublic = action.payload;
      })

      .addCase(fetchDetailPost.fulfilled, (state, action: PayloadAction<IPost>) => {
        state.detailPost = action.payload;
      });
  },
});

export const { increaseLike, decreaseLike, increaseShare, increaseComment, deletePostofMe } = postSlice.actions;

export default postSlice.reducer;
