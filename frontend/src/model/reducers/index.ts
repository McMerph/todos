import { combineReducers } from "redux";
import { filter } from "./filter";
import { serverStatus } from "./serverStatus";
import { todoItems } from "./todoItems";

const combinedReducer = combineReducers({
  filter,
  serverStatus,
  todoItems,
});

export default combinedReducer;
