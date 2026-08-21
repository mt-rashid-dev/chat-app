import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    users: [],
    selectedUser: null,
    messages: []
  },
  reducers: {
    setUser: (state, action) => {
      state.users = [...action.payload];
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = [...action.payload];
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    }
  }
});

export const { setSelectedUser } = chatSlice.actions;

export default chatSlice.reducer;