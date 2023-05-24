import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./features/userSlice";
import AdminReducer from "./features/adminSlice";

export default configureStore({
  reducer: {
    login: LoginReducer,
    admin: AdminReducer,
  },
});
