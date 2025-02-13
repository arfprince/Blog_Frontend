// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import rootReducer from './rootSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    rootSlice: rootReducer,
  },
});

export default store;
