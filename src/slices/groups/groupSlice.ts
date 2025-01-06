import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getInfoGroup,
  getListGroup,
  getListJoinGroup,
  getMemberGroup,
  getPostGroup,
  getPostGroupPublic,
  onAddMemberGroup,
  onCreateGroup,
  onCreatePostGroup,
  onDeleteMember,
  onDeletePostGroup,
  onEditGroup,
  onEditPostGroup,
  onJoinAcceptGroup,
  onJoinRequestGroup,
  onLeaveGroup,
  onSearchGroup,
} from "src/apis/group";
import { IGroup, IMemberGroup } from "src/types/group";
import { IMember } from "src/types/message";
import { IPost } from "src/types/post";

export interface GroupState {
  listgroups: IGroup[];
  infoGroup: IGroup;
  memberGroup: IMember[];
  searchGroup: IGroup[];
  listPostGroup: IPost[];
  listJoinGroup: IMemberGroup[];
  listPostGroupPublic: IPost[];
}

const initialState: GroupState = {
  listgroups: [],
  infoGroup: {
    idGroup: 0,
    name: "",
    imageUrl: "",
    memberCount: 0,
  },
  memberGroup: [],
  searchGroup: [],
  listPostGroup: [],
  listJoinGroup: [],
  listPostGroupPublic: [],
};

export const fetchListGroup = createAsyncThunk("group/fetchListGroup", async (page: number, thunkAPI) => {
  try {
    const data = await getListGroup(page);

    return data.content;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const fetchInfoGroup = createAsyncThunk("group/fetchInfoGroup", async (groupId: number, thunkAPI) => {
  try {
    const data = await getInfoGroup(groupId);

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const fetchMemberGroup = createAsyncThunk(
  "group/fetchMemberGroup",
  async ({ groupId, page }: { groupId: number; page: number }, thunkAPI) => {
    try {
      const data = await getMemberGroup(groupId, page);

      return data.content;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchSearchGroup = createAsyncThunk("group/fetchSearchGroup", async (search: string, thunkAPI) => {
  try {
    const data = await onSearchGroup(search);

    return data.content;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createGroup = createAsyncThunk(
  "group/createGroup",
  async (params: { name: string; userIds: number[]; tagIds: number[] }, thunkAPI) => {
    try {
      await onCreateGroup(params);

      thunkAPI.dispatch(fetchListGroup(0));
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addMemberGroup = createAsyncThunk(
  "group/addMemberGroup",
  async (params: { groupId: number; userIds: number[] }, thunkAPI) => {
    try {
      await onAddMemberGroup(params);

      thunkAPI.dispatch(fetchMemberGroup({ groupId: params.groupId, page: 0 }));
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const leaveGroup = createAsyncThunk("group/leaveGroup", async (groupId: number, thunkAPI) => {
  try {
    await onLeaveGroup(groupId);

    thunkAPI.dispatch(decreaseMember(groupId));
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deleteMemberGroup = createAsyncThunk(
  "group/deleteMemberGroup",
  async ({ groupId, userId }: { groupId: number; userId: number }, thunkAPI) => {
    try {
      await onDeleteMember(groupId, userId);

      thunkAPI.dispatch(fetchMemberGroup({ groupId, page: 0 }));
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchPostGroup = createAsyncThunk(
  "group/fetchPostGroup",
  async ({ groupId, page }: { groupId: number; page: number }, thunkAPI) => {
    try {
      const data = await getPostGroup(groupId, page);

      return data.content;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchPostGroupPublic = createAsyncThunk("group/fetchPostGroupPublic", async (page: number, thunkAPI) => {
  try {
    const data = await getPostGroupPublic(page);

    return data.content;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createPostGroup = createAsyncThunk(
  "group/createPostGroup",
  async (params: { content: string; imageUrls: string[]; groupId: number }, thunkAPI) => {
    try {
      await onCreatePostGroup(params);

      thunkAPI.dispatch(clearPostGroup());
      thunkAPI.dispatch(fetchPostGroup({ groupId: params.groupId, page: 0 }));
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editPostGroup = createAsyncThunk(
  "group/editPostGroup",
  async (
    { postId, params }: { postId: number; params: { content: string; imageUrls: string[]; groupId: number } },
    thunkAPI
  ) => {
    try {
      await onEditPostGroup(params, postId);

      thunkAPI.dispatch(updatePostDetailGroup({ postId, ...params }));
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deletePostGroup = createAsyncThunk(
  "group/deletePostGroup",
  async ({ groupId, postId }: { groupId: any; postId: number }, thunkAPI) => {
    try {
      await onDeletePostGroup(groupId, postId);

      thunkAPI.dispatch(deletePostofGroup(postId));
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editGroup = createAsyncThunk(
  "group/editGroup",
  async (
    { groupId, params }: { groupId: number; params: { name: string; imageUrl: string; description: string } },
    thunkAPI
  ) => {
    try {
      await onEditGroup(params, groupId);

      thunkAPI.dispatch(fetchInfoGroup(groupId));
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchListJoinGroup = createAsyncThunk(
  "group/fetchListJoinGroup",
  async ({ groupId, page }: { groupId: number; page: number }, thunkAPI) => {
    try {
      const data = await getListJoinGroup(groupId, page);

      return data.content;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const joinRequestGroup = createAsyncThunk("group/joinRequestGroup", async (groupId: number, thunkAPI) => {
  try {
    await onJoinRequestGroup(groupId);

    thunkAPI.dispatch(fetchInfoGroup(groupId));
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const joinAcceptGroup = createAsyncThunk(
  "group/joinAcceptGroup",
  async ({ isAccept, groupId, userId }: { isAccept: boolean; groupId: number; userId: number }, thunkAPI) => {
    try {
      await onJoinAcceptGroup(isAccept, groupId, userId);
      thunkAPI.dispatch(fetchListJoinGroup({ groupId, page: 0 }));
      thunkAPI.dispatch(fetchMemberGroup({ groupId, page: 0 }));
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    decreaseMember: (state, action: PayloadAction<number>) => {
      state.infoGroup.memberCount -= action.payload;

      const groupId = action.payload;

      state.listgroups = state.listgroups.filter((group) => group.idGroup !== groupId);
    },

    clearPostGroup: (state) => {
      state.listPostGroup = [];
    },

    deletePostofGroup: (state, action: PayloadAction<number>) => {
      const postId = action.payload;

      state.listPostGroup = state.listPostGroup.filter((post: any) => post.id !== postId);
    },

    updatePostDetailGroup: (state, action: PayloadAction<{ postId: number; content: string; imageUrls: string[] }>) => {
      const { postId, content, imageUrls } = action.payload;

      const updatePost = (post: IPost | any) => {
        if (post) {
          Object.assign(post, {
            ...post,
            content,
            imageUrls,
          });
        }
      };

      const postOfGroup = state.listPostGroup.find((post) => post.id === postId);

      updatePost(postOfGroup);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListGroup.fulfilled, (state, action: PayloadAction<IGroup[]>) => {
        const newGroups = action.payload;

        const uniqueGroups = newGroups.filter(
          (group) => !state.listgroups.some((existingGroup) => existingGroup.idGroup === group.idGroup)
        );

        state.listgroups = [...state.listgroups, ...uniqueGroups];
      })

      .addCase(fetchInfoGroup.fulfilled, (state, action: PayloadAction<IGroup>) => {
        state.infoGroup = action.payload;
      })

      .addCase(fetchMemberGroup.fulfilled, (state, action: PayloadAction<IMember[]>) => {
        state.memberGroup = action.payload;
      })

      .addCase(fetchSearchGroup.fulfilled, (state, action: PayloadAction<IGroup[]>) => {
        state.searchGroup = action.payload;
      })

      .addCase(fetchPostGroup.fulfilled, (state, action: PayloadAction<IPost[]>) => {
        const newPosts = action.payload;

        const uniqueGroups = newPosts.filter(
          (post) => !state.listPostGroup.some((existingPost) => existingPost.id === post.id)
        );

        state.listPostGroup = [...state.listPostGroup, ...uniqueGroups];
      })

      .addCase(fetchListJoinGroup.fulfilled, (state, action: PayloadAction<IMemberGroup[]>) => {
        state.listJoinGroup = action.payload;
      })

      // .addCase(fetchPostGroupPublic.fulfilled, (state, action: PayloadAction<IPost[]>) => {
      //   const newPostGroupPublic = action.payload;

      //   const uniquePostGroupPublic = newPostGroupPublic.filter(
      //     (newPost) => !state.listPostGroupPublic.some((existingPost) => existingPost.id === newPost.id)
      //   );

      //   state.listPostGroupPublic = [...state.listPostGroupPublic, ...uniquePostGroupPublic];
      // });

      .addCase(fetchPostGroupPublic.fulfilled, (state, action: PayloadAction<IPost[]>) => {
        const newPostGroupPublic = action.payload;

        const uniquePostPublic = newPostGroupPublic.filter(
          (newPost) => !state.listPostGroupPublic.some((existingPost) => existingPost.id === newPost.id)
        );

        state.listPostGroupPublic = [...state.listPostGroupPublic, ...uniquePostPublic];
      });
  },
});

export const { decreaseMember, clearPostGroup, deletePostofGroup, updatePostDetailGroup } = groupSlice.actions;
export default groupSlice.reducer;
