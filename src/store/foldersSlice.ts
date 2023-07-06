import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IFolder } from "../components/Tree";
import {
  fetchFolders as fetchFoldersApiCall,
  createFolder as createFolderApiCall,
  updateFolder as updateFolderApiCall,
  deleteFolder as deleteFolderApiCall,
} from "../utils/api";
import { RootState } from ".";

export const fetchFolders = createAsyncThunk("folders/fetch", async () => {
  const response = await fetchFoldersApiCall();
  return response;
});

export const createFolder = createAsyncThunk(
  "folders/create",
  async (folder: IFolder, { dispatch }) => {
    const response = await createFolderApiCall(folder);

    dispatch(fetchFolders());

    return response;
  }
);

export const updateFolder = createAsyncThunk(
  "folders/update",

  async (folder: IFolder, { dispatch }) => {
    const response = await updateFolderApiCall(folder);

    dispatch(fetchFolders());

    return response;
  }
);

export const deleteFolder = createAsyncThunk(
  "folders/delete",

  async (folder: IFolder, { dispatch }) => {
    const response = await deleteFolderApiCall(folder);

    dispatch(fetchFolders());

    return response;
  }
);

interface FolderState {
  loading: boolean;
  failed: boolean;
  folders: IFolder[];
}

const initialState: FolderState = {
  folders: [],
  loading: true,
  failed: false,
};

export const folderSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    setFolders: (state, action: PayloadAction<IFolder[]>) => {
      state.folders = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFolders.fulfilled, (state, action) => {
        state.folders = action.payload;
        state.loading = false;
        state.failed = false;
      })
      .addCase(fetchFolders.pending, (state) => {
        state.loading = true;
        state.failed = false;
      })
      .addCase(fetchFolders.rejected, (state) => {
        state.loading = false;
        state.failed = true;
        state.folders = [];
      });
  },
});

export const { setFolders } = folderSlice.actions;

export const selectFolders = (state: RootState) => state.folders.folders;

export default folderSlice.reducer;
