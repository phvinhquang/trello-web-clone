import { createSlice } from "@reduxjs/toolkit";

const boardsSlice = createSlice({
  name: "boards",
  initialState: [],
  reducers: {
    update(state, action) {
      return action.payload;
    },

    addBoard(state, action) {
      state.push(action.payload);
    },
  },
});

export const boardsActions = boardsSlice.actions;

export default boardsSlice;
