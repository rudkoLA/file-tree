import { configureStore } from "@reduxjs/toolkit";
import folderReducer from "./foldersSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    folders: folderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
