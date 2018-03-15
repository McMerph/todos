import { createStore } from "redux";
import { Filters } from "./actions/filter/ISetFilterAction";
import { combinedReducer } from "./reducers/combined-reducer";
import TodoItem from "./todo-item";

const enhancer = (window as any).devToolsExtension ? (window as any).devToolsExtension()(createStore) : createStore;
export const store = enhancer(combinedReducer);

export interface IAppStore {

  filter: Filters;
  todoItems: TodoItem[];

}
