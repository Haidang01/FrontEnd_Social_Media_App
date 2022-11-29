import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api.js'
export const login = createAsyncThunk(
  'auth/login',
  async ({ formData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signIn(formData);
      toast.success('Login Successfully');
      navigate('/home');
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });
export const register = createAsyncThunk(
  'auth/register',
  async ({ formData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signUp(formData);
      toast.success('Register Successfully');
      navigate('/');
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });
export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async ({ id, userData, toast }, { rejectWithValue }) => {
    try {
      const response = await api.updateUser(id, userData);
      toast.success('Update User Successfully');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  });

const authSlices = createSlice({
  name: 'user',
  initialState: {
    user: null,
    error: '',
    loading: false
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state, action) => {
      state.user = null;
      localStorage.clear();
    }
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload.other;
      localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
    },
    [login.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    },
    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
    },
    [register.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    },
    [updateUser.pending]: (state, action) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
    },
    [updateUser.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    }
  }
}
)
export const { setUser, setLogout } = authSlices.actions;
export default authSlices.reducer;