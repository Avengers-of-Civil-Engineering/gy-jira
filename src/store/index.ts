import { configureStore } from "@reduxjs/toolkit";
import { ProjectListSlice } from "screens/project-list/project-list.slice";
import { AuthSlice } from "./auth.slice";

export const rootReducer = {
  projectList: ProjectListSlice.reducer,
  auth: AuthSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
