import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../utils/axiosInstance";
import { connectSocket } from "../../utils/socket";

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  const res = await axiosInstance.get("/auth/check");
  return {
    _id: res.data._id,
    fullName: res.data.fullName,
    email: res.data.email,
    profilePic: res.data.profilePic,
    createdAt: res.data.createdAt
  };
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    onlineUsers: [],
    isCheckingAuth: true
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    resetUser: state => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isCheckingAuth = false;
        connectSocket(action.payload._id);
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.isCheckingAuth = false;
      })
  }
});

export const { setUser, setOnlineUsers, resetUser } = authSlice.actions;

export default authSlice.reducer;