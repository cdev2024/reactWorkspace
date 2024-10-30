import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiService from "../../services/ApiService";

// 게시글 상세 정보 가져오기
export const fetchPostDetails = createAsyncThunk(
  "post/fetchPostDetails",
  async ({ postId, password }, { rejectWithValue }) => {
    try {
      const response = await ApiService.fetchPostDetails(postId, password);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 게시글 업데이트
export const updatePost = createAsyncThunk(
  "post/updatePost",
  async ({ postId, postData }, { rejectWithValue }) => {
    try {
      const response = await ApiService.updatePost(postId, postData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 게시글 삭제
export const deletePost = createAsyncThunk(
  "post/deletePost",
  async ({ postId, password }, { rejectWithValue }) => {
    try {
      await ApiService.deletePost(postId, password);
      return postId; // 성공시 삭제된 postId 반환
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    post: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setPost: (state, action) => {
      state.post = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.post = action.payload;
      })
      .addCase(fetchPostDetails.rejected, (state, action) => {
        state.status = "failed";
        state.post = action.payload;
      })
      .addCase(updatePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.post = action.payload;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = "failed";
        state.post = action.payload;
      })
      .addCase(deletePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.post = null; // 삭제 후 게시글 초기화
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = "failed";
        state.post = action.payload;
      });
  },
});

export const { setPost } = postSlice.actions;
export default postSlice.reducer;
