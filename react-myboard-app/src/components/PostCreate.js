import React, { useState } from "react";
import ApiService from "../services/ApiService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostCreate = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  // const location = useLocation();
  // const boardId = location.state.boardId; // state에서 boardId를 가져 옴
  const boardId = useSelector((state) => state.boardState.boardId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      board_id: boardId, // 게시판 ID 포함: 서버가 기대하는 필드 명 확인
      user_name: userName,
      password: password,
      email: email,
      title: title,
      content: content,
    };

    try {
      const response = await ApiService.createPost(postData);
      console.log("Post created successfully: ", response.data);
      // navigate(`/board/${boardId}`); // 작성 완료 후 해당 게시판 게시글 목록 페이지로 이동
      navigate("/posts");
    } catch (error) {
      console.error("Error creating post : ", error);
    }
  };

  return (
    <div>
      <h3>게시글 작성</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>작성자 이름:</label>{" "}
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>비밀번호:</label>{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>이메일:</label>{" "}
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>제목:</label>{" "}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>내용:</label>{" "}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">작성하기</button>
      </form>
    </div>
  );
};

export default PostCreate;
