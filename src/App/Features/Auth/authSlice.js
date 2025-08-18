import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  isAuthenticated: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    loading: (state) => {
      state.isLoading = !state.isLoading;
    },
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      state.isAuthenticated = true;
    },
    logOut: (state) => {
      state.token = null;
      localStorage.removeItem("token");
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logOut, loading } = authSlice.actions;
export default authSlice.reducer;
