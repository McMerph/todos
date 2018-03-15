import { createStore } from "redux";
import { Filters } from "./actions/filter/ISetFilterAction";
import { combinedReducer } from "./reducers/combined-reducer";
import TodoItem from "./todo-item";

export const store = createStore(combinedReducer);

// TODO Delete? Unused
export interface IAppStore {

  filter: Filters;
  todoItems: TodoItem[];

}
