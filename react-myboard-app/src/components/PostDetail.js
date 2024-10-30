import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ApiService from "../services/ApiService";
import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { deletePost } from "../store/slices/postSlice";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState(""); // "edit" 또는 "delete"
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation(); // 비밀번호 상태 가져오기
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

  //게시글 상세 정보 가져오기
  const fetchPostDetails = useCallback(
    async (password) => {
      try {
        const response = await ApiService.fetchPostDetails(id, password);
        setPost(response.data);
      } catch (error) {
        setErrorMessage("Error fetching post details");
        console.error("Error fetching post details: ", error);
      }
    },
    [id]
  );

  //게시글 불러오기
  useEffect(() => {
    if (location.state && location.state.password && id) {
      fetchPostDetails(location.state.password);
    }
  }, [id, location.state, fetchPostDetails]);

  // 수정/삭제 버튼 클릭 시 모달 열기
  const handleActionClick = (type) => {
    setActionType(type);
    setShowModal(true); //모달창 표시
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // 모달에서 확인버튼 눌렀을 때 처리
  const handleSubmit = async () => {
    setErrorMessage("");
    try {
      //삭제
      if (actionType === "delete") {
        // await ApiService.deletePost(id, password);
        // navigate(`/board/${post.board_id}`); // 삭제 후 게시글 목록으로 이동
        const resultAction = await dispatch(
          deletePost({ postId: id, password })
        );
        if (deletePost.fulfilled.match(resultAction)) {
          navigate("/posts"); // 삭제 후 게시글 목록으로 이동
        } else {
          setErrorMessage("삭제에 실패했습니다. 다시 시도해주세요.");
        }
      }
      //수정
      else if (actionType === "edit") {
        // 수정 페이지로 이동 (비밀번호와 boardId를 상태로 전달)
        navigate(`/edit-post/${id}`, {
          state: { password },
        });
      }
    } catch (error) {
      console.error("Error deleting or editing post: ", error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {post.title}
      </Typography>
      <Typography variant="body1">작성자: {post.user_name} </Typography>
      <Typography variant="body1">
        작성일: {new Date(post.posted_at).toLocaleDateString()}
      </Typography>
      <Typography variant="body2"> {post.content} </Typography>

      <Grid container spacing={2}>
        <Grid item>
          <Button
            onClick={() => {
              handleActionClick("edit");
            }}
          >
            수정하기
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={() => {
              handleActionClick("delete");
            }}
          >
            삭제하기
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            onClick={() => navigate(`/board/${post.board_id}`)}
          >
            목록으로 가기 {location.state.boardId}
          </Button>
        </Grid>
      </Grid>

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
    </Container>
  );
};

export default PostDetail;
