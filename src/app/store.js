import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../app/features/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["user.user"], // Ignore non-serializable data in this path
        ignoredActions: ["user/login"], // Ignore specific actions if needed
      },
    }),
});
