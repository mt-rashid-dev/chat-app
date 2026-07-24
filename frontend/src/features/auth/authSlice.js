import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      fullName: "",
      email: "",
      profilePic: ""
    },
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true
  },
  reducers: {
    setUser: (state, action) => {
      state.user.fullName = action.payload.fullName;
      state.user.email = action.payload.email;
      state.user.profilePic = action.payload.profilePic;
    },
    setIsCheckingAuth: (state, action) => {
      state.isCheckingAuth = action.payload;
    },
    resetUser: state => {
      state.user.fullName = "";
      state.user.email = "";
      state.user.profilePic = "";
    }
  }
});

export const { setUser, isSigningUp, isLoggingIn, isUpdatingProfile, setIsCheckingAuth, resetUser } = authSlice.actions;

export default authSlice.reducer;