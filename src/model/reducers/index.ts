import { combineReducers } from "redux";
import IStore from "../IStore";
import { filter } from "./filter";
import { todoItems } from "./todo-items";

const combinedReducer = combineReducers<IStore>({
  filter,
  todoItems,
});

export default combinedReducer;
