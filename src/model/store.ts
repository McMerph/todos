import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension/developmentOnly";
import { combinedReducer } from "./reducers/combined-reducer";

export const store = createStore(combinedReducer, devToolsEnhancer({}));
