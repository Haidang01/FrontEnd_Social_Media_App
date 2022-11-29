import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from '../api';

export const createPost = createAsyncThunk(
  'user/createPost',
  async ({ newPost, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createPost(newPost);
      toast.success('Post created successfully');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
)
export const getTimeLinePosts = createAsyncThunk(
  'user/getTimeLinePosts',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getTimeLinePosts(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)
export const likePost = createAsyncThunk(
  'user/likePost',
  async ({ id, userId }, { rejectWithValue }) => {
    try {
      const response = await api.likePost(id, userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)
const postSlices = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    error: '',
    loading: false
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

  },
  extraReducers: {
    [createPost.pending]: (state, action) => {
      state.loading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts.push(action.payload);
    },
    [createPost.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    [getTimeLinePosts.pending]: (state, action) => {
      state.loading = true;
    },
    [getTimeLinePosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    [getTimeLinePosts.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  }
}
)
export const { setUser } = postSlices.actions;
export default postSlices.reducer;
