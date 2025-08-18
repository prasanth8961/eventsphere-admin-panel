import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  status: "idle",
  error: null,
};

const categorySlice = createSlice({
  name: "eventSlice",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.events = action.payload;
    },
  },
});

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;
