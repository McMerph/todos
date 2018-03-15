import ITodoItem from "./ITodoItem";
import { FilterType } from "./reducers/filter";

export interface IStore {
  filterType: FilterType;
  todoItems: ITodoItem[];
}
