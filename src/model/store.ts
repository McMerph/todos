import { createStore } from "redux";
import { Filters } from "./actions/filter/ISetFilterAction";
import ITodoItem from "./ITodoItem";
import { combinedReducer } from "./reducers/combined-reducer";

const enhancer = (window as any).devToolsExtension ? (window as any).devToolsExtension()(createStore) : createStore;
export const store = enhancer(combinedReducer);

export interface IAppStore {

  filter: Filters;
  todoItems: ITodoItem[];

}
