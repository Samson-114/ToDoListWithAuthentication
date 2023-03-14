import { createSlice } from "@reduxjs/toolkit";

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    userId: "",
    token: "",
  },
  reducers: {
    updateUserId: (state, action) => {
      state.userId = action.payload.userId;
    },
    updateToken: (state, action) => {
      state.token = action.payload.token;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUserId, updateToken } = userInfoSlice.actions;
export const selectUserInfo = (state) => state.userInfo;
export default userInfoSlice.reducer;
