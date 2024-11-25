import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getInfoGroup,
  getListGroup,
  getMemberGroup,
  getPostGroup,
  onAddMemberGroup,
  onCreateGroup,
  onCreatePostGroup,
  onDeleteMember,
  onDeletePostGroup,
  onEditPostGroup,
  onLeaveGroup,
  onSearchGroup,
} from "src/apis/group";
import { IGroup } from "src/types/group";
import { IMember } from "src/types/message";
import { IPost } from "src/types/post";

export interface GroupState {
  listgroups: IGroup[];
  infoGroup: IGroup;
  memberGroup: IMember[];
  searchGroup: IGroup[];
  listPostGroup: IPost[];
}

const initialState: GroupState = {
  listgroups: [],
  infoGroup: {
    idGroup: 0,
    name: "",
    memberCount: 0,
  },
  memberGroup: [],
  searchGroup: [],
  listPostGroup: [],
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

export const deleteMember = createAsyncThunk(
  "group/deleteMember",
  async (params: { groupId: number; userIds: number }, thunkAPI) => {
    try {
      await onDeleteMember(params);
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

export const createPostGroup = createAsyncThunk(
  "group/createPostGroup",
  async (params: { content: string; imageUrls: string[]; groupId: number }, thunkAPI) => {
    try {
      await onCreatePostGroup(params);

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
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deletePostGroup = createAsyncThunk(
  "group/deletePostGroup",
  async ({ groupId, postId }: { groupId: number; postId: number }, thunkAPI) => {
    try {
      await onDeletePostGroup(groupId, postId);
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
      });
  },
});

export const { decreaseMember } = groupSlice.actions;
export default groupSlice.reducer;
