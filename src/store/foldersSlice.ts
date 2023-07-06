import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IFolder } from "../components/Tree";

interface FolderState {
  folders: IFolder[];
}

const initialState: FolderState = {
  folders: [],
};

export const folderSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    updateFolder: (state, action: PayloadAction<IFolder>) => {
      state.folders = state.folders.map((folder: IFolder) =>
        folder.id === action.payload.id ? action.payload : folder
      );
    },

    deleteFolder: (state, action: PayloadAction<IFolder>) => {
      state.folders = state.folders.filter(
        (folder: IFolder) => folder.id !== action.payload.id
      );
    },

    createFolder: (state, action: PayloadAction<IFolder>) => {
      state.folders = [...state.folders, action.payload];
    },

    setFolders: (state, action: PayloadAction<IFolder[]>) => {
      state.folders = action.payload;
    },
  },
});

export const { updateFolder, deleteFolder, createFolder, setFolders } =
  folderSlice.actions;

export default folderSlice.reducer;
