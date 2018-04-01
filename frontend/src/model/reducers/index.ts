import { combineReducers } from "redux";
import { readFromDatabaseStatus } from "./readFromDatabaseStatus";
import { filter } from "./filter";
import { todoItems } from "./todoItems";

const combinedReducer = combineReducers({
  databaseStatus: readFromDatabaseStatus,
  filter,
  todoItems,
});

export default combinedReducer;
