import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./slices/boardSlice";

const store = configureStore({
  reducer: {
    boardState: boardReducer, // 게시판 상태 관리
  },
});

export default store;
