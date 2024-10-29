import React from "react";
import BoardList from "./components/BoardList";
import BoardCreate from "./components/BoardCreate";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import PostCreate from "./components/PostCreate";
import { Router, Routes, Route } from "react-router-dom";
import PostEdit from "./components/PostEdit";

const App = () => {
  return (
    <div>
      <h1>익명 질문 게시판</h1>
      <Routes>
        {/* 게시판 목록 페이지 */}
        <Route path="/" element={<BoardList />} />
        <Route path="/boards" element={<BoardList />} />
        {/* 게시판 생성 페이지 */}
        <Route path="/create-board" element={<BoardCreate />} />

        {/* 게시글 목록 페이지 : boardId를 URL 경로에서 전달 */}
        {/* <Route path="/board/:boardId" element={<PostList />} /> */}
        <Route path="/posts" element={<PostList />} />

        {/* 게시글 상세 페이지 (게시글 아이디 전달) */}
        <Route path="/post/:id" element={<PostDetail />} />

        {/* 게시글 작성 페이지 */}
        <Route path="/create-post" element={<PostCreate />} />

        {/* 게시글 수정 페이지 */}
        <Route path="/edit-post/:id" element={<PostEdit />} />
      </Routes>
    </div>
  );
};

export default App;
