// src/redux/rootSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  
    blogs: JSON.parse(localStorage.getItem("blogs")) || {},
    singleDetailedBlog: {},
    allUsersFavouriteBlogs: JSON.parse(localStorage.getItem("allUsersFavouriteBlogs")) || {},
    allUsersLikedBlogs: JSON.parse(localStorage.getItem("allUsersLikedBlogs")) || {},
};

const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload;
      localStorage.setItem("blogs", JSON.stringify(state.blogs));
    },
    setSingleDetailedBlog: (state, action) => {
      state.singleDetailedBlog = action.payload;
    },
    setAllUsersFavouriteBlogs: (state, action) => {
      state.allUsersFavouriteBlogs = action.payload;
      localStorage.setItem("allUsersFavouriteBlogs", JSON.stringify(state.allUsersFavouriteBlogs));
    },
    setAllUsersLikedBlogs: (state, action) => {
      state.allUsersLikedBlogs = action.payload;
      localStorage.setItem("allUsersLikedBlogs", JSON.stringify(state.allUsersLikedBlogs));
    },
  },
});

export const {
  setBlogs,
  setSingleDetailedBlog,
  setAllUsersFavouriteBlogs,
  setAllUsersLikedBlogs,
} = rootSlice.actions;



export default rootSlice.reducer;