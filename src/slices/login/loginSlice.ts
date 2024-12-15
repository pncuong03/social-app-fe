import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { authLogin, authRegister, logout, myInfo } from "src/apis/auth";
import { IUser } from "src/types/user";

export interface AuthState {
  accessToken: string;
  user: IUser;
}

const initialState: AuthState = {
  accessToken: "",
  user: {
    id: "",
    fullName: "",
    imageUrl: "",
    backgroundUrl: "",
    birthday: "",
    gender: "",
    description: "",
  },
};

export const userLogin = createAsyncThunk<string, { username: string; password: string }>(
  "auth/login",
  async (params, thunkAPI) => {
    try {
      const response = await authLogin(params);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userRegister = createAsyncThunk<
  string,
  { fullName: string; username: string; password: string; birthday: string }
>("auth/register", async (params, thunkAPI) => {
  try {
    const response = await authRegister(params);

    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const fetchMyInfo = createAsyncThunk("auth/fetchMyInfo", async (_, thunkAPI) => {
  try {
    const data = await myInfo();

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => {
      logout();
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(userLogin.fulfilled, (state, action: PayloadAction<string>) => {
        toast.success("Login successful");
        state.accessToken = action.payload;
      })

      .addCase(userLogin.rejected, (state) => {
        toast.error("Username or password is incorrect");
        state.accessToken = "";
      })

      .addCase(userRegister.fulfilled, (state, action: PayloadAction<string>) => {
        toast.success("Register successful");
        state.accessToken = action.payload;
      })

      .addCase(userRegister.rejected, (state) => {
        toast.error("Username already exists");
        state.accessToken = "";
      })

      .addCase(fetchMyInfo.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
      });
  },
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
