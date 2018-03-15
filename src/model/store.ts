import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension/developmentOnly";
import combinedReducer from "./reducers";

const store = createStore(combinedReducer, devToolsEnhancer({}));

export default store;
