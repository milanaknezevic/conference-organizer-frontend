import { configureStore } from "@reduxjs/toolkit";
import LoginReducer from "./features/userSlice";
import AdminReducer from "./features/adminSlice";
import OrganizatorReducer from "./features/organizatorSlice";
export default configureStore({
  reducer: {
    login: LoginReducer,
    admin: AdminReducer,
    organizator: OrganizatorReducer,
  },
});
