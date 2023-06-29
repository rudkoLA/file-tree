import { IFolder } from "../components/Tree";

const initialState = {
  folders: [],
};

export const folderReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case "UPDATE_FOLDER":
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
    case "DELETE_FOLDER":
      return {
        ...state,
        folders: state.folders.filter(
          (folder: IFolder) => folder.id !== action.payload.id
        ),
      };
    case "ADD_FOLDER":
      return {
        ...state,
        folders: [...state.folders, action.payload],
      };
    case "SET_FOLDERS":
      return {
        ...state,
        folders: action.payload,
      };
    default:
      return state;
  }
};
