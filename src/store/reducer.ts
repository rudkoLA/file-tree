import { IFolder } from "../components/Tree";

const initialState = {
  folders: [],
};

const SET_FOLDERS = "SET_FOLDERS";
const ADD_FOLDER = "ADD_FOLDER";
const DELETE_FOLDER = "DELETE_FOLDER";
const UPDATE_FOLDER = "UPDATE_FOLDER";

export const folderReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_FOLDER:
      return {
        ...state,
        folders: state.folders.map((folder: IFolder) => {
          if (folder.id === action.payload.id) {
            return {
              ...folder,
              name: action.payload.name,
            };
          }
          return folder;
        }),
      };
    case DELETE_FOLDER:
      return {
        ...state,
        folders: state.folders.filter(
          (folder: IFolder) => folder.id !== action.payload.id
        ),
      };
    case ADD_FOLDER:
      return {
        ...state,
        folders: [action.payload, ...state.folders],
      };
    case SET_FOLDERS:
      return {
        ...state,
        folders: action.payload,
      };
    default:
      return state;
  }
};

export const setFolders = (folders: IFolder[]) => ({
  type: SET_FOLDERS,
  payload: folders,
});

export const createFolder = (folder: IFolder) => ({
  type: ADD_FOLDER,
  payload: folder,
});

export const deleteFolder = (folder: IFolder) => ({
  type: DELETE_FOLDER,
  payload: folder,
});

export const updateFolder = (folder: IFolder) => ({
  type: UPDATE_FOLDER,
  payload: folder,
});

export const selectFolders = (state: any) => state.folders;
