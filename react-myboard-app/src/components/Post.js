import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchPostDetails } from "../store/slices/postSlice";

const Post = ({ post }) => {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 모달 스타일
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };

  // 게시글 클릭 시 모달 창 표시
  const handleClick = () => {
    setShowModal(true);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // 비밀번호 제출
  const handleSubmit = async () => {
    setErrorMessage(""); //오류메시지 초기화
    try {
      // await ApiService.fetchPostDetails(post.id, password);
      // // 비밀번호가 맞으면 게시글 상세 페이지로 이동
      // navigate(`/post/${post.id}`, {
      //   state: { password },
      // });
      const resultAction = await dispatch(
        fetchPostDetails({ postId: post.id, password })
      );
      if (fetchPostDetails.fulfilled.match(resultAction)) {
        navigate(`/post/${post.id}`, { state: { password } });
      } else {
        setErrorMessage("비밀번호가 잘못되었습니다.다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Error fetching post details: ", error);
      setErrorMessage("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Box>
      <Typography variant="body2" onClick={handleClick}>
        {post.title} | 작성자: {post.user_name} | 작성일:{" "}
        {new Date(post.posted_at).toLocaleDateString()}
      </Typography>

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>
            비밀번호를 입력하세요
          </Typography>
          <TextField
            type="password"
            label="비밀번호"
            fullWidth
            value={password}
            onChange={handlePasswordChange}
            error={!!errorMessage}
            helperText={errorMessage}
          />
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              확인
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowModal(false)}
            >
              취소
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Post;
