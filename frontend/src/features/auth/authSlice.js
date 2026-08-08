import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { axiosInstance } from "../../utils/axiosInstance";

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  const res = await axiosInstance.get("/auth/check");
  return {
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
    isCheckingAuth: true
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
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
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.isCheckingAuth = false;
      })
  }
});

export const { setUser, resetUser } = authSlice.actions;

export default authSlice.reducer;