import React, { useEffect, useState } from "react";
import ApiService from "../services/ApiService";
import {
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setBoardId } from "../store/slices/boardSlice";

const BoardList = () => {
  const [boards, setBoards] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //컴포넌트가 마운트될 때 데이터를 불러오기
  useEffect(() => {
    const loadBoards = async () => {
      try {
        const response = await ApiService.fetchBoards();
        console.log(response.data);
        setBoards(response.data);
      } catch (error) {
        console.error("Error fetching boards: ", error);
      }
    };

    loadBoards();
  }, []);

  const handleBoardClick = (boardId) => {
    dispatch(setBoardId(boardId));
    navigate("/posts");
    //navigate(`/board/${boardId}`);
  };

  return (
    <Container>
      <Typography variant="h4">게시판 목록</Typography>
      <List>
        {boards.map((board) => (
          <ListItem
            key={board.board_id}
            button="true"
            onClick={() => handleBoardClick(board.board_id)}
          >
            <ListItemText primary={board.board_name} />
          </ListItem>
        ))}
      </List>

      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/create-board"
      >
        새 게시판 추가
      </Button>
    </Container>
  );
};

export default BoardList;
