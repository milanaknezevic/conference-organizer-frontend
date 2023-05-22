import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./features/loginSlice";

export default configureStore({
  reducer: {
    login: LoginReducer,
  },
});
