import DatabaseStatus from "./DatabaseStatus";
import FilterType from "./FilterType";
import ITodoItem from "./ITodoItem";

export default interface IStore {
  filter: FilterType;
  todoItems: ITodoItem[];
  databaseStatus: DatabaseStatus;
}
