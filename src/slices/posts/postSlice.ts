import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  onCreatePost,
  getDetailPost,
  getPostofMe,
  getPostofFriend,
  onComment,
  onCreateImage,
  onDeleteComment,
  onDeletePost,
  onLike,
  onShare,
  onUnLike,
  getPostofUser,
  onEditPost,
} from "src/apis/post";
import { IPost } from "src/types/post";

export interface PostState {
  postFriends: IPost[];
  postOfMe: IPost[];
  postOfUser: IPost[];
  detailPost: IPost;
}

const initialPost: IPost = {
  id: 0,
  userId: 0,
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
  group: {},
  groupId: 0,
};

const initialState: PostState = {
  postFriends: [],
  postOfMe: [],
  postOfUser: [],
  detailPost: initialPost,
};

export const fetchPostofMe = createAsyncThunk("post/fetchPostofMe", async (page: number, thunkAPI) => {
  try {
    const data = await getPostofMe(page);

    return data.content;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const fetchPostPublic = createAsyncThunk("post/fetchPostPublic", async (page: number, thunkAPI) => {
  try {
    const data = await getPostofFriend(page);

    return data.content;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const fetchPostUser = createAsyncThunk(
  "post/fetchPostUser",
  async ({ userId, page }: { userId: number; page: number }, thunkAPI) => {
    try {
      const data = await getPostofUser(userId, page);

      return data.content;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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
      thunkAPI.dispatch(clearPostOfMe());
      thunkAPI.dispatch(fetchPostofMe(0));
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
      thunkAPI.dispatch(increaseComment(postId));

      thunkAPI.dispatch(fetchDetailPost(postId));
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

export const editPost = createAsyncThunk(
  "post/editPost",
  async (
    { postId, params }: { postId: number; params: { content: string; state: string; imageUrls: string[] } },
    thunkAPI
  ) => {
    try {
      await onEditPost(postId, params);

      thunkAPI.dispatch(updatePostDetail({ postId, ...params }));
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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
      const postPublic = state.postFriends.find((post) => post.id === postId);
      const postOfMe = state.postOfMe.find((post) => post.id === postId);
      const postOfFriend = state.postOfUser.find((post) => post.id === postId);

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
      const postPublic = state.postFriends.find((post: any) => post.id === postId);
      const postOfMe = state.postOfMe.find((post: any) => post.id === postId);
      const postOfFriend = state.postOfUser.find((post: any) => post.id === postId);

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
      const postPublic = state.postFriends.find((post: any) => post.id === postId);
      const postOfMe = state.postOfMe.find((post: any) => post.id === postId);
      const postOfFriend = state.postOfUser.find((post: any) => post.id === postId);

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
      const postPublic = state.postFriends.find((post: any) => post.id === postId);
      const postOfMe = state.postOfMe.find((post: any) => post.id === postId);
      const postOfFriend = state.postOfUser.find((post: any) => post.id === postId);

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

    decreaseComment: (state, action: PayloadAction<number>) => {
      const postId = action.payload;
      const postPublic = state.postFriends.find((post: any) => post.id === postId);
      const postOfMe = state.postOfMe.find((post: any) => post.id === postId);
      const postOfFriend = state.postOfUser.find((post: any) => post.id === postId);

      if (postPublic) {
        postPublic.commentCount -= 1;
      }

      if (postOfMe) {
        postOfMe.commentCount -= 1;
      }

      if (postOfFriend) {
        postOfFriend.commentCount -= 1;
      }
    },

    updatePostDetail: (
      state,
      action: PayloadAction<{ postId: number; content: string; imageUrls: string[]; state: string }>
    ) => {
      const { postId, content, imageUrls, state: newState } = action.payload;

      const updatePost = (post: IPost | any) => {
        if (post) {
          Object.assign(post, {
            ...post,
            content,
            state: newState,
            imageUrls,
          });
        }
      };

      const postOfMe = state.postOfMe.find((post) => post.id === postId);

      updatePost(postOfMe);
    },

    clearPostOfMe: (state) => {
      state.postOfMe = [];
    },

    clearPostOfUser: (state) => {
      state.postOfUser = [];
    },

    clearDetailPost: (state) => {
      state.detailPost = initialPost;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchPostofMe.fulfilled, (state, action: PayloadAction<IPost[]>) => {
        const newPosts = action.payload;

        const uniquePosts = newPosts.filter(
          (newPost) => !state.postOfMe.some((existingPost) => existingPost.id === newPost.id)
        );

        state.postOfMe = [...state.postOfMe, ...uniquePosts];
      })

      .addCase(fetchPostPublic.fulfilled, (state, action: PayloadAction<IPost[]>) => {
        const newPostPublic = action.payload;

        const uniquePostPublic = newPostPublic.filter(
          (newPost) => !state.postFriends.some((existingPost) => existingPost.id === newPost.id)
        );

        state.postFriends = [...state.postFriends, ...uniquePostPublic];
      })

      .addCase(fetchPostUser.fulfilled, (state, action: PayloadAction<IPost[]>) => {
        const newPostPublic = action.payload;

        const uniquePostPublic = newPostPublic.filter(
          (newPost) => !state.postOfUser.some((existingPost) => existingPost.id === newPost.id)
        );

        state.postOfUser = [...state.postOfUser, ...uniquePostPublic];
      })

      .addCase(fetchDetailPost.fulfilled, (state, action: PayloadAction<IPost>) => {
        state.detailPost = action.payload;
      });
  },
});

export const {
  increaseLike,
  decreaseLike,
  increaseShare,
  increaseComment,
  deletePostofMe,
  updatePostDetail,
  clearPostOfMe,
  clearPostOfUser,
  clearDetailPost,
  decreaseComment,
} = postSlice.actions;

export default postSlice.reducer;
