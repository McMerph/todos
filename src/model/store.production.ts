import { createStore } from "redux";
import { Filters } from "./actions/filter/ISetFilterAction";
import ITodoItem from "./ITodoItem";
import { combinedReducer } from "./reducers/combined-reducer";

export const store = createStore(combinedReducer);

// TODO Delete? Unused
export interface IAppStore {

  filter: Filters;
  todoItems: ITodoItem[];

}
