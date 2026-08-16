import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    users: [],
    selectedUser: null
  },
  reducers: {
    setUser: (state, action) => {
      state.users = [...action.payload];
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    }
  }
});

export const { setSelectedUser } = chatSlice.actions;

export default chatSlice.reducer;