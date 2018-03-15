import { Filter } from "./actions/filter/ISetFilterAction";
import ITodoItem from "./ITodoItem";

export interface IStore {
  filter: Filter;
  todoItems: ITodoItem[];
}
