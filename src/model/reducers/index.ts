import { combineReducers } from "redux";
import { filter } from "./filter";
import { todoItems } from "./todo-items";

const combinedReducer = combineReducers({
  filter,
  todoItems,
});

export default combinedReducer;
