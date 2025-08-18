import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
  status: "idle",
  error: null,
};

const eventSlice = createSlice({
  name: "eventSlice",
  initialState,
  reducers: {
    setEvent: (state, action) => {
      state.events = action.payload;
    },
  },
});

export const { setEvent } = eventSlice.actions;
export default eventSlice.reducer;
