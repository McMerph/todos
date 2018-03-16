import FilterType from "./FilterType";
import ITodoItem from "./ITodoItem";

export default interface IStore {
  filter: FilterType;
  todoItems: ITodoItem[];
}
