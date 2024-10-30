import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./slices/boardSlice";
import postReducer from "./slices/postSlice";

const store = configureStore({
  reducer: {
    boardState: boardReducer, // 게시판 상태 관리
    postState: postReducer, // 게시글 상태 관리
  },
});

export default store;
