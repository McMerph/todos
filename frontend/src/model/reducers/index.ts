import { combineReducers } from "redux";
import { databaseStatus } from "./databaseStatus";
import { filter } from "./filter";
import { todoItems } from "./todoItems";

const combinedReducer = combineReducers({
  databaseStatus,
  filter,
  todoItems,
});

export default combinedReducer;
