import { configureStore } from "@reduxjs/toolkit";
import boardsSlice from "./boards-slice";

const store = configureStore({
  reducer: {
    boards: boardsSlice.reducer,
  },
});

export default store;
