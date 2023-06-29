import { combineReducers, createStore } from "redux";
import { folderReducer } from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({ folders: folderReducer });
export const store = createStore(rootReducer, composeWithDevTools());
