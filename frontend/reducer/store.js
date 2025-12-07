// reducer/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice"; 
import taskReducer from "../slices/taskSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    tasks: taskReducer, 
  },
});


export default store;
