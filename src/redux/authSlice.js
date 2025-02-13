import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  currentSessionUser: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.currentSessionUser = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.currentSessionUser = {};
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
