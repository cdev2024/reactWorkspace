import React, { useEffect, useState } from "react";
import ApiService from "../services/ApiService";
import Post from "./Post";
import { useNavigate } from "react-router-dom";
import { Button, Container, List, ListItem, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const PostList = () => {
  // const { boardId } = useParams(); // boardId를 URL에서 받아오기
  const boardId = useSelector((state) => state.boardState.boardId);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await ApiService.fetchPostsByBoardId(boardId); //전체 게시글 가져오는 API 호출
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };

    loadPosts();
  }, [boardId]);

  const handleCreatePost = (boardId) => {
    //navigate.apply(`/create-post`, { state: { boardId } });
    navigate("/create-post");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        게시글 목록
      </Typography>
      <List>
        {posts.map((post) => (
          <ListItem key={post.id}>
            <Post post={post} />
          </ListItem>
        ))}
      </List>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleCreatePost(boardId)}
        sx={{ mb: 2 }}
      >
        게시글 작성
      </Button>
    </Container>
  );
};

export default PostList;
