import { createSlice } from "@reduxjs/toolkit";

const boardSlide = createSlice({
  name: "boardState",
  initialState: {
    boardId: null,
  },
  reducers: {
    setBoardId(state, action) {
      state.boardId = action.payload;
    },
  },
});

export const { setBoardId } = boardSlide.actions;
export default boardSlide.reducer;
