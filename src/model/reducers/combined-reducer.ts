import { combineReducers } from "redux";
import { IStore } from "../IStore";
import { filterReducer } from "./filter/filter-reducer";
import { todoItemsReducer } from "./todo-items/todo-items-reducer";

export const combinedReducer = combineReducers<IStore>({
  filter: filterReducer,
  todoItems: todoItemsReducer,
});
