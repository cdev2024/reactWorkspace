import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const ApiService = {
  fetchBoards() {
    return axios.get(`${API_BASE_URL}/board/all`);
  },

  createBoard(boardData) {
    return axios.post(`${API_BASE_URL}/board`, boardData);
  },

  fetchPosts() {
    return axios.get(`${API_BASE_URL}/post/all`);
  },

  //특정 boardId에 대한 게시글 목록을 가져옴
  fetchPostsByBoardId(boardId) {
    return axios.get(`${API_BASE_URL}/post/${boardId}`);
  },

  createPost(postData) {
    return axios.post(`${API_BASE_URL}/post`, postData);
  },

  fetchPostDetails(postId, password) {
    return axios.post(`${API_BASE_URL}/post/view`, {
      post_id: postId,
      password: password,
    });
  },

  // 게시글 삭제 API 호출
  deletePost(postId, password) {
    return axios.post(`${API_BASE_URL}/post/delete`, {
      post_id: postId, // 서버에서 기대하는 post_id
      password: password, // 비밀번호 전달
    });
  },

  // 게시글 수정 API 호출
  updatePost(postId, postData) {
    return axios.put(`${API_BASE_URL}/post/${postId}`, postData);
  },
};

export default ApiService;
