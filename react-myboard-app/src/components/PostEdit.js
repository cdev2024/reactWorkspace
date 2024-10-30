import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const PostEdit = () => {
  const { postId } = useParams();

  const post = useSelector((state) => state.postState.post);
  const boardId = useSelector((state) => state.boardState.boardId);

  return <div>boardId : {boardId}</div>;
};

export default PostEdit;
