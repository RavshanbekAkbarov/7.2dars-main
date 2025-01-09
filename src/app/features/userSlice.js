import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  authReady: false,
  isPending: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.user = payload;
    },
    logout: (state, { payload }) => {},
    authReadyAct: (state) => {
      state.authReady = true;
    },
    setIsPending: (state, { payload }) => {
      state.isPending = payload;
    },
  },
});

export const { login, logout, authReadyAct, setIsPending } = userSlice.actions;
export default userSlice.reducer;
