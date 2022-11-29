import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:8080' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}
    `;
  }
  return req;
})

export const signUp = (formData) => API.post('/auth/register', formData);
export const signIn = (formData) => API.post('/auth/login', formData);


export const updateUser = (id, userData) => API.put(`/user/${id}`, userData);


export const createPost = (newPost) => API.post('/post', newPost);
export const getTimeLinePosts = (id) => API.get(`/post/${id}/timeline`);
export const likePost = (id, userId) => API.put(`post/${id}/like`, { userId: userId })