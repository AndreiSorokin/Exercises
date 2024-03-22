import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import notificationReducer from "./slices/notificationSlice";
import loginReducer from "./slices/loginSlice";
import blogReducer from "./slices/blogSlice";

const store = configureStore({
   reducer: {
      notification: notificationReducer,
      user: loginReducer,
      blogs: blogReducer
   }
})

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

store.subscribe(() => {
   const currentState = store.getState();
   const userInformation = currentState.user.user;
   const blogInformation = currentState.blogs.blogs;

   localStorage.setItem("userInformation", JSON.stringify(userInformation));
   localStorage.setItem("blogInformation", JSON.stringify(blogInformation));
})

export default store