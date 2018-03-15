import { combineReducers } from "redux";
import { IAppStore } from "../store";
import { filterReducer } from "./filter/filter-reducer";
import { todoItemsReducer } from "./todo-items/todo-items-reducer";

export const combinedReducer = combineReducers<IAppStore>({
  filter: filterReducer,
  todoItems: todoItemsReducer,
});
