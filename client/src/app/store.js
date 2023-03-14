import { configureStore } from "@reduxjs/toolkit";
import UserInfoReducer from "../user/userInfo";

export default configureStore({
  reducer: {
    userInfo: UserInfoReducer,
  },
});
