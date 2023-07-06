// import { configureStore } from "@reduxjs/toolkit";

// import { combineReducers, createStore } from "redux";
// import { folderReducer } from "./reducer";
// import { composeWithDevTools } from "redux-devtools-extension";

// const rootReducer = combineReducers({ folders: folderReducer });
// export const store = createStore(rootReducer, composeWithDevTools());

import { configureStore } from "@reduxjs/toolkit";
import folderReducer from "./foldersSlice";

export const store = configureStore({
  reducer: {
    folder: folderReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
