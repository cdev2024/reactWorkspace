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

  createPost(postData) {
    return axios.post(`${API_BASE_URL}/post`, postData);
  },

  fetchPostDetails(postId, password) {
    return axios.post(`${API_BASE_URL}/post/view`, {
      post_id: postId,
      password: password,
    });
  },
};

export default ApiService;
