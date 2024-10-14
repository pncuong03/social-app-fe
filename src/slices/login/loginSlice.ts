import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { authLogin, logout } from "src/apis/auth";

export interface AuthState {
  accessToken: string;
}

const initialState: AuthState = {
  accessToken: "",
};

export const userLogin = createAsyncThunk<string, { username: string; password: string }>(
  "auth/login",
  async (params, thunkAPI) => {
    try {
      const response = await authLogin(params);

      return response.accessToken;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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
      });
  },
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
