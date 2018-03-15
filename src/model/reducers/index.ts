import { combineReducers } from "redux";
import { IStore } from "../IStore";
import { filter } from "./filter";
import { todoItemsReducer } from "./todo-items/todo-items-reducer";

export const combinedReducer = combineReducers<IStore>({
  filterType: filter,
  todoItems: todoItemsReducer,
});
