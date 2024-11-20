import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  onCreatePost,
  getDetailPost,
  getPostofMe,
  getPostPublic,
  onComment,
  onCreateImage,
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
  id: 0,
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

export const fetchPostMe = createAsyncThunk("post/fetchPostMe", async (page: number, thunkAPI) => {
  try {
    const data = await getPostofMe(page);

    return data.content;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const fetchPostPublic = createAsyncThunk("post/fetchPostPublic", async (page: number, thunkAPI) => {
  try {
    const data = await getPostPublic(page);

    return data.content;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const fetchDetailPost = createAsyncThunk("post/fetchDetailPost", async (postId: number, thunkAPI) => {
  try {
    const data = await getDetailPost(postId);

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createPosts = createAsyncThunk(
  "post/createPost",
  async (params: { content: string; state: string; imageUrls: string[] }, thunkAPI) => {
    try {
      await onCreatePost(params);
      thunkAPI.dispatch(fetchPostMe(0));
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const likePost = createAsyncThunk("post/likePost", async (postId: number, thunkAPI) => {
  try {
    await onLike(postId);

    thunkAPI.dispatch(increaseLike(postId));
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const unLikePost = createAsyncThunk("post/unLikePost", async (postId: number, thunkAPI) => {
  try {
    await onUnLike(postId);

    thunkAPI.dispatch(decreaseLike(postId));
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const sharePost = createAsyncThunk(
  "post/sharePost",
  async ({ postId, params }: { postId: number; params: { content: string; state: string } }, thunkAPI) => {
    try {
      await onShare(postId, params);
      thunkAPI.dispatch(increaseShare(postId));
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const commentPost = createAsyncThunk(
  "post/commentPost",
  async ({ postId, comment }: { postId: number; comment: string }, thunkAPI) => {
    try {
      await onComment(postId, comment);
      thunkAPI.dispatch(fetchDetailPost(postId));
      thunkAPI.dispatch(increaseComment(postId));
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteComment = createAsyncThunk("post/deleteComment", async (commentId: number, thunkAPI) => {
  try {
    await onDeleteComment(commentId);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deletePost = createAsyncThunk("post/deletePost", async (postId: number, thunkAPI) => {
  try {
    await onDeletePost(postId);
    thunkAPI.dispatch(deletePostofMe(postId));
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createImage = createAsyncThunk("post/createImage", async (image: FormData, thunkAPI) => {
  try {
    const data = await onCreateImage(image);

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    increaseLike: (state, action: PayloadAction<number>) => {
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

    decreaseLike: (state, action: PayloadAction<number>) => {
      const postId = action.payload;
      const postPublic = state.postOfPublic.find((post: any) => post.id === postId);
      const postOfMe = state.postOfMe.find((post: any) => post.id === postId);
      const postOfFriend = state.postOfFriend.find((post: any) => post.id === postId);

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

    increaseShare: (state, action: PayloadAction<number>) => {
      const postId = action.payload;
      const postPublic = state.postOfPublic.find((post: any) => post.id === postId);
      const postOfMe = state.postOfMe.find((post: any) => post.id === postId);
      const postOfFriend = state.postOfFriend.find((post: any) => post.id === postId);

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

    increaseComment: (state, action: PayloadAction<number>) => {
      const postId = action.payload;
      const postPublic = state.postOfPublic.find((post: any) => post.id === postId);
      const postOfMe = state.postOfMe.find((post: any) => post.id === postId);
      const postOfFriend = state.postOfFriend.find((post: any) => post.id === postId);

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

    deletePostofMe: (state, action: PayloadAction<number>) => {
      const postId = action.payload;

      state.postOfMe = state.postOfMe.filter((post: any) => post.id !== postId);
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchPostMe.fulfilled, (state, action: PayloadAction<IPost[]>) => {
        // const sortedPosts = action.payload.slice().sort((a, b) => {
        //   return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        // });

        state.postOfMe = [...state.postOfMe, ...action.payload];
      })

      .addCase(fetchPostPublic.fulfilled, (state, action: PayloadAction<IPost[]>) => {
        // const sortedPosts = action.payload.slice().sort((a, b) => {
        //   return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        // });

        state.postOfPublic = [...state.postOfPublic, ...action.payload];
      })

      .addCase(fetchDetailPost.fulfilled, (state, action: PayloadAction<IPost>) => {
        state.detailPost = action.payload;
      });
  },
});

export const { increaseLike, decreaseLike, increaseShare, increaseComment, deletePostofMe } = postSlice.actions;

export default postSlice.reducer;
