// src/redux/rootSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  
    blogs: [],
    singleDetailedBlog: {},
    userFavouriteBlogs: [],
    usersLikedBlogs: [],
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
    setUserFavouriteBlogs: (state, action) => {
      state.userFavouriteBlogs = action.payload;
    },
    setUsersLikedBlogs: (state, action) => {
      state.allUsersLikedBlogs = action.payload;
    },
  },
});

export const {
  setBlogs,
  setSingleDetailedBlog,
  setUserFavouriteBlogs,
  setUsersLikedBlogs,
} = rootSlice.actions;



export default rootSlice.reducer;